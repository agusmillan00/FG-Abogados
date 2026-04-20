import { NextRequest, NextResponse } from 'next/server'
import { getAvailability, bookAppointment } from '@/lib/calendar'

// GET /api/cita?date=YYYY-MM-DD  →  { slots: [{id, label}] }
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date') ?? undefined
    const slots = await getAvailability(14, date)
    return NextResponse.json({ slots })
  } catch (err) {
    console.error('[cita GET] Error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// POST /api/cita  →  { success: true }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name: string
      email: string
      phone: string
      matter: string
      slotId: string
      location: string
    }

    const { name, email, phone, matter, slotId, location } = body

    if (!name || !email || !matter || !slotId || !location) {
      return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 })
    }

    await bookAppointment({ name, email, phone: phone ?? '', matter, slotId, location })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[cita POST] Error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
