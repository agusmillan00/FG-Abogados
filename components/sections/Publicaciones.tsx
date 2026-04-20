'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { publicaciones } from '@/lib/data'

type Categoria = 'Todas' | 'FG Legal News' | 'Tribunas' | 'Guías Prácticas'
const categorias: Categoria[] = ['Todas', 'FG Legal News', 'Tribunas', 'Guías Prácticas']

export default function Publicaciones() {
  const [cat, setCat] = useState<Categoria>('Todas')
  const [idx, setIdx] = useState(0)

  const filtered = cat === 'Todas' ? publicaciones : publicaciones.filter(p => p.categoria === cat)
  const current = filtered[idx] ?? filtered[0]

  const prevPub = () => setIdx(i => Math.max(0, i - 1))
  const nextPub = () => setIdx(i => Math.min(filtered.length - 1, i + 1))

  const handleCat = (c: Categoria) => { setCat(c); setIdx(0) }

  if (!current) return null

  return (
    <section className="bg-cream-dark py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="section-line" />
            <p className="cat-label mb-2">Conocimiento</p>
            <h2 className="font-serif font-semibold text-primary" style={{ fontSize: 'var(--fs-medium)' }}>
              Publicaciones
            </h2>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categorias.map(c => (
              <button
                key={c}
                onClick={() => handleCat(c)}
                className="font-sans text-xs tracking-widest uppercase px-4 py-2 border transition-colors rounded-sm"
                style={{
                  background: cat === c ? '#2D1A00' : 'transparent',
                  color: cat === c ? '#F8F8F0' : '#7A6A55',
                  borderColor: cat === c ? '#2D1A00' : '#DDD9CC',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Slide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text */}
          <div className="lg:col-span-7">
            <span className="cat-label">{current.categoria}</span>
            <p className="font-sans text-xs text-muted mt-1 mb-4">{current.fecha}</p>
            <h3
              className="font-serif font-semibold text-primary leading-tight mb-6"
              style={{ fontSize: 'var(--fs-small)' }}
            >
              {current.titulo}
            </h3>
            <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
              {current.extracto}
            </p>
            <Link href={`/publicaciones/${current.slug}`} className="btn-primary">
              Leer publicación
            </Link>
          </div>

          {/* Image */}
          <div className="lg:col-span-5">
            <div
              className="relative aspect-[4/3] rounded-sm overflow-hidden flex items-center justify-center"
              style={{ background: '#DDD9CC' }}
            >
              <span className="font-sans text-xs text-muted">Imagen publicación</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          <div className="flex items-center gap-3">
            <button
              onClick={prevPub}
              disabled={idx === 0}
              className="p-2 border border-border rounded-sm disabled:opacity-30 hover:border-accent transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} style={{ color: '#B5C87A' }} />
            </button>
            <button
              onClick={nextPub}
              disabled={idx === filtered.length - 1}
              className="p-2 border border-border rounded-sm disabled:opacity-30 hover:border-accent transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight size={18} style={{ color: '#B5C87A' }} />
            </button>
            <span className="font-sans text-xs text-muted ml-2">
              {idx + 1} / {filtered.length}
            </span>
          </div>
          <Link href="/publicaciones" className="btn-secondary">
            Ver más publicaciones
          </Link>
        </div>
      </div>
    </section>
  )
}
