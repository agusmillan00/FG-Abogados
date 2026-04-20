'use client'

import { useState, useEffect } from 'react'
import { servicios } from '@/lib/data'
import { MapPin, Phone, Mail } from 'lucide-react'

const sedes = [
  { ciudad: 'Madrid', dir: 'Calle Velázquez, 22, 28001 Madrid', tel: '+34 678 613 060', email: 'marta@fgabogados-es.com' },
  { ciudad: 'Cuenca', dir: 'Calle Hermanos Valdés 10, 16001 Cuenca', tel: '+34 699 455 410', email: 'pilar@fgabogados-es.com' },
]

interface Slot {
  id: string
  label: string
}

// ─── Indicador de progreso ────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-sans text-xs font-medium transition-colors"
              style={{
                backgroundColor: step <= current ? '#B5C87A' : 'transparent',
                border: step <= current ? '1px solid #B5C87A' : '1px solid #DDD9CC',
                color: step <= current ? '#2B2B2B' : '#9C9482',
              }}
            >
              {step}
            </div>
            <span
              className="font-sans text-xs"
              style={{ color: step === current ? '#2B2B2B' : '#9C9482' }}
            >
              {step === 1 ? 'Sus datos' : step === 2 ? 'Sede y horario' : 'Confirmación'}
            </span>
          </div>
          {step < 3 && <div className="w-6 h-px" style={{ backgroundColor: '#DDD9CC' }} />}
        </div>
      ))}
    </div>
  )
}

// ─── Estilos reutilizables ────────────────────────────────────────────────────

const inputClass = 'w-full bg-transparent font-sans text-sm text-primary px-4 py-3 outline-none focus:border-accent transition-colors'
const inputStyle = { border: '1px solid #DDD9CC' }
const labelClass = 'block font-sans text-xs tracking-widest uppercase text-muted mb-1.5'

// ─── Página principal ─────────────────────────────────────────────────────────

export default function ContactoPage() {
  const [step, setStep] = useState(1)
  const [booked, setBooked] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Paso 1 — datos personales
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    area: '',
    mensaje: '',
    privacy: false,
  })

  // Paso 2 — sede y slot
  const [sede, setSede] = useState<'Madrid' | 'Cuenca' | ''>('')
  const [slots, setSlots] = useState<Slot[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState('')
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  // Cargar slots automáticamente al llegar al paso 2
  useEffect(() => {
    if (step !== 2) return
    setSlotsLoading(true)
    setSlotsError('')
    setSlots([])
    setSelectedSlot(null)

    fetch('/api/cita')
      .then(r => r.json())
      .then((data: { slots?: Slot[]; error?: string }) => {
        if (data.error) {
          setSlotsError('No se pudieron cargar los horarios. Inténtelo de nuevo.')
        } else {
          setSlots(data.slots ?? [])
        }
      })
      .catch(() => setSlotsError('Error de conexión al cargar los horarios.'))
      .finally(() => setSlotsLoading(false))
  }, [step])

  // ── Paso 1: validación y avance ──
  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  // ── Paso 2: avance ──
  const handleStep2 = () => {
    if (!sede || !selectedSlot) return
    setStep(3)
  }

  // ── Paso 3: confirmar reserva ──
  const handleConfirm = async () => {
    if (!selectedSlot) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/cita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.nombre,
          email: form.email,
          phone: form.telefono,
          matter: form.area ? `${form.area} — ${form.mensaje}` : form.mensaje,
          slotId: selectedSlot.id,
          location: sede,
        }),
      })
      const data = await res.json() as { success?: boolean; error?: string }
      if (!res.ok || !data.success) {
        setSubmitError(data.error ?? 'Ha ocurrido un error. Inténtelo de nuevo.')
      } else {
        setBooked(true)
      }
    } catch {
      setSubmitError('Error de conexión. Comprueba tu conexión e inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero banner */}
      <section className="bg-primary pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="cat-label mb-3" style={{ color: 'rgba(181,200,122,0.9)' }}>Contacto</p>
          <h1
            className="font-serif font-semibold text-cream leading-tight max-w-3xl"
            style={{ fontSize: 'var(--fs-large)' }}
          >
            Cuéntanos tu caso
          </h1>
        </div>
      </section>

      {/* Form + info */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Form column */}
            <div className="lg:col-span-7">
              <span className="section-line" />
              <h2 className="font-serif font-semibold text-primary mb-8" style={{ fontSize: 'var(--fs-small)' }}>
                Solicitud de consulta
              </h2>

              {/* ── Reserva completada ── */}
              {booked ? (
                <div className="bg-cream-dark border border-border p-8 text-center">
                  <p className="font-serif text-2xl text-primary mb-2">¡Reserva confirmada!</p>
                  <p className="font-sans font-light text-muted text-sm">
                    Recibirá un email de confirmación con todos los detalles de su consulta.
                  </p>
                </div>
              ) : (
                <>
                  <StepIndicator current={step} />

                  {/* ══ Paso 1 ══ */}
                  {step === 1 && (
                    <form onSubmit={handleStep1} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClass}>Nombre *</label>
                          <input
                            required type="text" value={form.nombre} onChange={e => set('nombre', e.target.value)}
                            className={inputClass} style={inputStyle}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Email *</label>
                          <input
                            required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                            className={inputClass} style={inputStyle}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Teléfono</label>
                        <input
                          type="tel" value={form.telefono} onChange={e => set('telefono', e.target.value)}
                          className={inputClass} style={inputStyle}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Área de consulta</label>
                        <select
                          value={form.area} onChange={e => set('area', e.target.value)}
                          className="w-full bg-cream font-sans text-sm text-primary px-4 py-3 outline-none"
                          style={inputStyle}
                        >
                          <option value="">Selecciona un área...</option>
                          {servicios.map(s => (
                            <option key={s.id} value={s.slug}>{s.nombre}</option>
                          ))}
                          <option value="otro">Otro</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelClass}>Descripción del asunto *</label>
                        <textarea
                          required rows={5} value={form.mensaje} onChange={e => set('mensaje', e.target.value)}
                          className="w-full bg-transparent font-sans text-sm text-primary px-4 py-3 outline-none resize-none focus:border-accent transition-colors"
                          style={inputStyle}
                          placeholder="Describe brevemente tu consulta..."
                        />
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox" required checked={form.privacy}
                          onChange={e => set('privacy', e.target.checked)}
                          className="mt-1 shrink-0"
                        />
                        <span className="font-sans text-xs text-muted leading-relaxed">
                          He leído y acepto la{' '}
                          <a href="/privacidad" className="underline hover:text-accent transition-colors">política de privacidad</a>.
                        </span>
                      </label>

                      <button type="submit" className="btn-primary">
                        Continuar
                      </button>
                    </form>
                  )}

                  {/* ══ Paso 2 ══ */}
                  {step === 2 && (
                    <div className="space-y-6">
                      {/* Selector de sede */}
                      <div>
                        <p className={labelClass}>Sede *</p>
                        <div className="flex gap-3">
                          {(['Madrid', 'Cuenca'] as const).map(s => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSede(s)}
                              className="font-sans text-sm px-5 py-2.5 transition-colors"
                              style={{
                                border: sede === s ? '1px solid #B5C87A' : '1px solid #DDD9CC',
                                color: sede === s ? '#2B2B2B' : '#9C9482',
                                backgroundColor: sede === s ? 'rgba(181,200,122,0.08)' : 'transparent',
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Slots disponibles */}
                      <div>
                        <p className={labelClass}>Horario disponible *</p>

                        {slotsLoading && (
                          <p className="font-sans text-sm text-muted py-2">Cargando horarios disponibles…</p>
                        )}

                        {slotsError && (
                          <p className="font-sans text-sm py-2" style={{ color: '#C0392B' }}>{slotsError}</p>
                        )}

                        {!slotsLoading && !slotsError && slots.length === 0 && (
                          <p className="font-sans text-sm text-muted py-2">
                            No hay horarios disponibles en los próximos días. Contáctenos directamente.
                          </p>
                        )}

                        {!slotsLoading && slots.length > 0 && (
                          <div className="flex flex-col gap-2">
                            {slots.map(slot => (
                              <button
                                key={slot.id}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className="w-full text-left font-sans text-sm px-4 py-3 transition-colors"
                                style={{
                                  border: selectedSlot?.id === slot.id ? '1px solid #B5C87A' : '1px solid #DDD9CC',
                                  color: selectedSlot?.id === slot.id ? '#2B2B2B' : '#9C9482',
                                  backgroundColor: selectedSlot?.id === slot.id ? 'rgba(181,200,122,0.08)' : 'transparent',
                                }}
                              >
                                {slot.label.charAt(0).toUpperCase() + slot.label.slice(1)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Navegación */}
                      <div className="flex items-center gap-4 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="font-sans text-sm text-muted hover:text-primary transition-colors underline underline-offset-2"
                        >
                          Volver
                        </button>
                        <button
                          type="button"
                          onClick={handleStep2}
                          disabled={!sede || !selectedSlot}
                          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Continuar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ══ Paso 3 ══ */}
                  {step === 3 && (
                    <div className="space-y-6">
                      {/* Resumen */}
                      <div className="p-6 space-y-3" style={{ border: '1px solid #DDD9CC' }}>
                        <p className={labelClass} style={{ marginBottom: '0.75rem' }}>Resumen de su reserva</p>

                        <div className="grid grid-cols-[120px_1fr] gap-y-2.5">
                          <span className="font-sans text-xs text-muted">Nombre</span>
                          <span className="font-sans text-sm text-primary">{form.nombre}</span>

                          <span className="font-sans text-xs text-muted">Email</span>
                          <span className="font-sans text-sm text-primary">{form.email}</span>

                          {form.telefono && (
                            <>
                              <span className="font-sans text-xs text-muted">Teléfono</span>
                              <span className="font-sans text-sm text-primary">{form.telefono}</span>
                            </>
                          )}

                          <span className="font-sans text-xs text-muted">Sede</span>
                          <span className="font-sans text-sm text-primary">{sede}</span>

                          <span className="font-sans text-xs text-muted">Fecha y hora</span>
                          <span className="font-sans text-sm text-primary">
                            {selectedSlot
                              ? selectedSlot.label.charAt(0).toUpperCase() + selectedSlot.label.slice(1)
                              : '—'}
                          </span>
                        </div>
                      </div>

                      {/* Coste */}
                      <div className="flex items-center gap-3 px-6 py-4" style={{ border: '1px solid #B5C87A', backgroundColor: 'rgba(181,200,122,0.06)' }}>
                        <span className="font-sans text-sm text-primary">
                          La consulta tiene un coste de{' '}
                          <strong className="font-semibold">100 €</strong>.
                        </span>
                      </div>

                      {/* Error */}
                      {submitError && (
                        <p className="font-sans text-sm py-2" style={{ color: '#C0392B' }}>{submitError}</p>
                      )}

                      {/* Navegación */}
                      <div className="flex items-center gap-4 pt-2">
                        <button
                          type="button"
                          onClick={() => { setStep(2); setSubmitError('') }}
                          className="font-sans text-sm text-muted hover:text-primary transition-colors underline underline-offset-2"
                        >
                          Volver
                        </button>
                        <button
                          type="button"
                          onClick={handleConfirm}
                          disabled={submitting}
                          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {submitting ? 'Confirmando…' : 'Confirmar reserva'}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Columna de oficinas — sin cambios */}
            <div className="lg:col-span-5">
              <h3 className="font-serif font-semibold text-primary text-2xl mb-8">Nuestras oficinas</h3>
              <div className="space-y-8">
                {sedes.map(s => (
                  <div key={s.ciudad} className="pb-8 border-b border-border last:border-0 last:pb-0">
                    <h4 className="font-sans text-xs font-medium tracking-widest uppercase mb-3" style={{ color: '#B5C87A' }}>
                      {s.ciudad}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin size={13} className="mt-0.5 shrink-0 text-muted" />
                        <span className="font-sans text-xs text-muted">{s.dir}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={13} className="shrink-0 text-muted" />
                        <a href={`tel:${s.tel.replace(/\s/g, '')}`} className="font-sans text-xs text-muted hover:text-accent transition-colors">{s.tel}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={13} className="shrink-0 text-muted" />
                        <a href={`mailto:${s.email}`} className="font-sans text-xs text-muted hover:text-accent transition-colors">{s.email}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
