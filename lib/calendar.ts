import { google } from 'googleapis'

// ─── Caché de slots ───────────────────────────────────────────────────────────
// El Map persiste en el mismo proceso Node.js entre requests (server-side).
export const slotCache = new Map<string, string>()

// ─── Constantes de localización ───────────────────────────────────────────────
export const DAYS_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
export const MONTHS_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

// ─── Clientes de Google ───────────────────────────────────────────────────────

export function getCalendarClient() {
  const key = Buffer.from(process.env.GOOGLE_PRIVATE_KEY_B64!, 'base64').toString('utf8')
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
    subject: process.env.GOOGLE_IMPERSONATE_EMAIL!,
  })
  return google.calendar({ version: 'v3', auth })
}

export function makeCalendarClient(subject: string) {
  const key = Buffer.from(process.env.GOOGLE_PRIVATE_KEY_B64!, 'base64').toString('utf8')
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
    subject,
  })
  return google.calendar({ version: 'v3', auth })
}

// ─── Disponibilidad ───────────────────────────────────────────────────────────

export async function getAvailability(days = 14, date?: string): Promise<{ id: string; label: string }[]> {
  const calendar = getCalendarClient()
  const nowUTC = new Date()

  let searchFrom = nowUTC
  if (date) {
    const parsed = new Date(`${date}T12:00:00`)
    if (!isNaN(parsed.getTime())) {
      if (parsed < nowUTC) {
        parsed.setFullYear(nowUTC.getFullYear())
        if (parsed < nowUTC) parsed.setFullYear(nowUTC.getFullYear() + 1)
      }
      const correctedDate = parsed.toLocaleDateString('en-CA', { timeZone: 'Europe/Madrid' })
      searchFrom = new Date(`${correctedDate}T00:00:00`)
    }
  }
  const searchDays = date ? 7 : days
  const timeMax = new Date(searchFrom)
  timeMax.setDate(searchFrom.getDate() + searchDays)

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: nowUTC.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: 'Europe/Madrid',
      items: [{ id: 'primary' }],
    },
  })

  const busy = res.data.calendars?.primary?.busy ?? []
  const slots: { id: string; label: string }[] = []

  const maxPerDay = date ? 5 : 3
  const maxTotal = date ? 5 : 8

  for (let dayOffset = 0; dayOffset < searchDays && slots.length < maxTotal; dayOffset++) {
    const checkDate = new Date(searchFrom)
    checkDate.setDate(searchFrom.getDate() + dayOffset)

    const madridDateStr = checkDate.toLocaleDateString('en-CA', { timeZone: 'Europe/Madrid' })
    const madridDayOfWeek = new Date(`${madridDateStr}T12:00:00`).getDay()
    if (madridDayOfWeek === 0 || madridDayOfWeek === 6) continue

    let slotsThisDay = 0

    for (let h = 9; h < 18; h++) {
      if (slots.length >= maxTotal || slotsThisDay >= maxPerDay) break

      const slotStart = new Date(`${madridDateStr}T${h.toString().padStart(2, '0')}:00:00`)
      const slotEnd = new Date(slotStart)
      slotEnd.setHours(slotStart.getHours() + 1)

      if (slotStart <= nowUTC) continue

      const isBusy = busy.some((b) => {
        const bStart = new Date(b.start!)
        const bEnd = new Date(b.end!)
        return slotStart < bEnd && slotEnd > bStart
      })

      if (!isBusy) {
        const id = `slot_${slots.length + 1}`
        const [, mm, dd] = madridDateStr.split('-').map(Number)
        const dayName = DAYS_ES[madridDayOfWeek]
        const label = `${dayName} ${dd} de ${MONTHS_ES[mm - 1]} a las ${h.toString().padStart(2, '0')}:00`
        slotCache.set(id, slotStart.toISOString())
        slots.push({ id, label })
        slotsThisDay++
      }
    }
  }

  return slots
}

// ─── Email de confirmación ────────────────────────────────────────────────────

export async function sendConfirmationEmail(params: {
  name: string
  email: string
  matter: string
  location: string
  locationAddress: string
  startIso: string
}) {
  const key = Buffer.from(process.env.GOOGLE_PRIVATE_KEY_B64!, 'base64').toString('utf8')
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    key,
    scopes: ['https://www.googleapis.com/auth/gmail.send'],
    subject: process.env.GOOGLE_IMPERSONATE_EMAIL!,
  })
  const gmail = google.gmail({ version: 'v1', auth })

  const start = new Date(params.startIso)
  const dateLabel = start.toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const subject = 'Confirmación de su consulta – FG Abogados'
  const body = [
    `Estimado/a ${params.name},`,
    '',
    'Le confirmamos que su consulta ha quedado registrada con los siguientes datos:',
    '',
    `  Fecha:   ${dateLabel}`,
    `  Sede:    ${params.location} — ${params.locationAddress}`,
    `  Asunto:  ${params.matter}`,
    '',
    'Si necesita modificar o cancelar la cita, contacte con nosotros en info@fgabogados-es.com.',
    '',
    'Un cordial saludo,',
    'FG Abogados',
  ].join('\n')

  const raw = [
    `From: FG Abogados <${process.env.GOOGLE_IMPERSONATE_EMAIL}>`,
    `To: ${params.name} <${params.email}>`,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(body, 'utf8').toString('base64'),
  ].join('\r\n')

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: Buffer.from(raw).toString('base64url') },
  })
}

// ─── Reserva de cita ──────────────────────────────────────────────────────────

export async function bookAppointment(params: {
  name: string
  email: string
  phone: string
  matter: string
  slotId: string
  location: string
}) {
  const startIso = slotCache.get(params.slotId)
  if (!startIso) throw new Error(`Slot "${params.slotId}" no encontrado. Llama primero a get_availability.`)

  const start = new Date(startIso)
  const end = new Date(start)
  end.setMinutes(start.getMinutes() + 45)

  const locationAddress =
    params.location === 'Cuenca'
      ? 'Calle Hermanos Valdés 10, 16001 Cuenca'
      : 'Calle Velázquez 22, 28001 Madrid'

  const sedeEmail = params.location === 'Cuenca'
    ? process.env.GOOGLE_EMAIL_CUENCA!
    : process.env.GOOGLE_EMAIL_MADRID!

  const eventBody = {
    summary: `Consulta – ${params.name}`,
    description: `Nombre: ${params.name}\nEmail: ${params.email}\nTeléfono: ${params.phone}\nAsunto: ${params.matter}\nSede: ${params.location}`,
    location: locationAddress,
    start: { dateTime: start.toISOString(), timeZone: 'Europe/Madrid' },
    end: { dateTime: end.toISOString(), timeZone: 'Europe/Madrid' },
    attendees: [
      { email: params.email, displayName: params.name },
      { email: sedeEmail },
    ],
    sendUpdates: 'all' as const,
  }

  const infoCalendar = makeCalendarClient(process.env.GOOGLE_IMPERSONATE_EMAIL!)
  await infoCalendar.events.insert({ calendarId: 'primary', requestBody: eventBody })

  await sendConfirmationEmail({
    name: params.name,
    email: params.email,
    matter: params.matter,
    location: params.location,
    locationAddress,
    startIso,
  })

  return { success: true }
}
