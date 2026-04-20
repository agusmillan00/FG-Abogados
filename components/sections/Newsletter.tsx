'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!privacy || !email) return
    setSent(true)
  }

  return (
    <section className="bg-primary py-20 md:py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <span
          className="block mx-auto mb-8"
          style={{ width: 60, height: 2, background: '#B5C87A' }}
        />
        <h2
          className="font-serif font-semibold text-cream leading-tight mb-4"
          style={{ fontSize: 'var(--fs-medium)' }}
        >
          Recibe nuestra{' '}
          <span
            className="relative inline-block"
            style={{
              textDecoration: 'underline',
              textDecorationColor: '#B5C87A',
              textUnderlineOffset: '6px',
            }}
          >
            newsletter
          </span>{' '}
          jurídica
        </h2>
        <p
          className="font-sans font-light text-sm leading-relaxed mb-10"
          style={{ color: 'rgba(248,248,240,0.6)' }}
        >
          Análisis, sentencias y novedades legislativas en materia laboral, directo a tu bandeja de entrada.
        </p>

        {sent ? (
          <p className="font-sans text-sm" style={{ color: '#B5C87A' }}>
            ¡Suscripción confirmada! Pronto recibirás nuestras novedades.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-0 mb-4 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 bg-transparent font-sans text-sm px-4 py-3 outline-none"
                style={{
                  border: '1px solid rgba(248,248,240,0.25)',
                  borderRight: 'none',
                  color: '#F8F8F0',
                }}
              />
              <button
                type="submit"
                className="font-sans text-xs font-medium tracking-widest uppercase px-6 py-3 shrink-0 transition-colors"
                style={{ background: '#B5C87A', color: '#2D1A00', border: '1px solid #B5C87A' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#8A9E52')}
                onMouseLeave={e => (e.currentTarget.style.background = '#B5C87A')}
              >
                Enviar
              </button>
            </div>

            <label className="flex items-start gap-3 max-w-md mx-auto cursor-pointer">
              <input
                type="checkbox"
                checked={privacy}
                onChange={e => setPrivacy(e.target.checked)}
                required
                className="mt-1 shrink-0 accent-accent"
              />
              <span
                className="font-sans text-xs leading-relaxed text-left"
                style={{ color: 'rgba(248,248,240,0.5)' }}
              >
                He leído y acepto la{' '}
                <a
                  href="/privacidad"
                  style={{ color: 'rgba(248,248,240,0.7)', textDecoration: 'underline' }}
                >
                  política de privacidad
                </a>
                {' '}de FG Abogados.
              </span>
            </label>
          </form>
        )}
      </div>
    </section>
  )
}
