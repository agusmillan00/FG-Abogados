'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonios } from '@/lib/data'

export default function Testimonios() {
  const [idx, setIdx] = useState(0)
  const t = testimonios[idx]

  const prev = () => setIdx(i => (i - 1 + testimonios.length) % testimonios.length)
  const next = () => setIdx(i => (i + 1) % testimonios.length)

  return (
    <section className="bg-cream py-24 md:py-32 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <span className="section-line mx-auto" />
        <p className="cat-label mb-10">Qué dicen de nosotros</p>

        <div className="relative">
          {/* Big decorative quote */}
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 font-serif leading-none select-none pointer-events-none"
            style={{ fontSize: '10rem', color: '#B5C87A', opacity: 0.15, lineHeight: 1 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote
            className="font-serif italic text-primary leading-relaxed relative z-10"
            style={{ fontSize: 'var(--fs-small)' }}
          >
            &ldquo;{t.cita}&rdquo;
          </blockquote>
        </div>

        <div className="mt-8 flex flex-col items-center gap-1">
          <p className="font-sans text-xs font-medium tracking-widest uppercase" style={{ color: '#B5C87A' }}>
            {t.fuente}
          </p>
          <p className="font-sans text-xs text-muted">{t.cargo}</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            className="p-2 border border-border rounded-sm hover:border-accent transition-colors"
            aria-label="Anterior testimonio"
          >
            <ChevronLeft size={18} style={{ color: '#B5C87A' }} />
          </button>

          <div className="flex gap-2">
            {testimonios.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="transition-all rounded-full"
                style={{
                  width: i === idx ? 24 : 8,
                  height: 8,
                  background: i === idx ? '#B5C87A' : '#DDD9CC',
                }}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 border border-border rounded-sm hover:border-accent transition-colors"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight size={18} style={{ color: '#B5C87A' }} />
          </button>
        </div>
      </div>
    </section>
  )
}
