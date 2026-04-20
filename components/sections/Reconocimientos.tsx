'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { reconocimientos } from '@/lib/data'

export default function Reconocimientos() {
  const [idx, setIdx] = useState(0)
  const visible = 3
  const max = Math.max(0, reconocimientos.length - visible)

  const prev = () => setIdx(i => Math.max(0, i - 1))
  const next = () => setIdx(i => Math.min(max, i + 1))

  return (
    <section className="bg-cream-dark py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="section-line" />
            <p className="cat-label mb-2">Galardones &amp; Rankings</p>
            <h2 className="font-serif font-semibold text-primary" style={{ fontSize: 'var(--fs-medium)' }}>
              Excelencia reconocida
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={prev}
              disabled={idx === 0}
              className="p-2 border border-border rounded-sm disabled:opacity-30 transition-colors hover:border-accent"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} style={{ color: '#B5C87A' }} />
            </button>
            <button
              onClick={next}
              disabled={idx === max}
              className="p-2 border border-border rounded-sm disabled:opacity-30 transition-colors hover:border-accent"
              aria-label="Siguiente"
            >
              <ChevronRight size={18} style={{ color: '#B5C87A' }} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{ transform: `translateX(calc(-${idx} * (100% / ${visible} + 24px / ${visible})))` }}
          >
            {reconocimientos.map((r) => (
              <div
                key={r.id}
                className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-cream border border-border p-8 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="text-4xl mb-4"
                  style={{ color: '#B5C87A' }}
                  aria-hidden="true"
                >
                  {r.icono}
                </div>
                <h3 className="font-serif font-semibold text-primary text-xl mb-2">
                  {r.nombre}
                </h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">
                  {r.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile arrows */}
        <div className="flex sm:hidden items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            disabled={idx === 0}
            className="p-2 border border-border rounded-sm disabled:opacity-30"
          >
            <ChevronLeft size={18} style={{ color: '#B5C87A' }} />
          </button>
          <span className="font-sans text-xs text-muted">{idx + 1} / {reconocimientos.length}</span>
          <button
            onClick={next}
            disabled={idx === max}
            className="p-2 border border-border rounded-sm disabled:opacity-30"
          >
            <ChevronRight size={18} style={{ color: '#B5C87A' }} />
          </button>
        </div>
      </div>
    </section>
  )
}
