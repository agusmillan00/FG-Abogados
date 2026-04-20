import { Suspense } from 'react'
import { fetchNoticias } from '@/lib/fetchNoticias'
import { noticias as fallback } from '@/lib/data'

export const revalidate = 3600

async function Lista() {
  let items = await fetchNoticias(12)

  const usandoFallback = items.length === 0
  if (usandoFallback) {
    items = fallback.map((n) => ({
      titulo: n.titulo,
      extracto: n.extracto,
      fecha: n.fecha,
      url: `/actualidad/${n.slug}`,
      fuente: 'FG Abogados',
      categoria: n.categoria,
    }))
  }

  return (
    <>
      {!usandoFallback && (
        <p className="font-sans text-xs text-muted mb-16">
          Fuentes: Noticias Jurídicas · El Derecho · Economist &amp; Jurist — actualizado automáticamente
        </p>
      )}
      {usandoFallback && <div className="mb-16" />}

      <ul className="divide-y divide-border">
        {items.map((n, i) => (
          <li key={i} className="py-10 first:pt-0">
            <div className="sm:col-span-12">
              <div className="flex items-center gap-3 mb-1">
                <span className="cat-label">{n.categoria}</span>
                <span className="font-sans text-xs" style={{ color: 'rgba(122,106,85,0.5)' }}>·</span>
                <span className="font-sans text-xs text-muted">{n.fuente}</span>
              </div>
              <p className="font-sans text-xs text-muted mt-1 mb-3">{n.fecha}</p>
              <h2
                className="font-sans font-semibold text-primary leading-snug mb-3"
                style={{ fontSize: 'var(--fs-small)' }}
              >
                {n.titulo}
              </h2>
              {n.extracto && (
                <p className="font-sans font-light text-muted text-sm leading-relaxed mb-4 max-w-3xl">
                  {n.extracto}
                </p>
              )}
              <a
                href={n.url}
                target={n.url.startsWith('http') ? '_blank' : undefined}
                rel={n.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="cat-label hover:text-accent transition-colors"
              >
                Leer más →
              </a>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

function Skeleton() {
  return (
    <div className="mb-16">
      <div className="h-3 w-64 bg-border rounded animate-pulse mb-16" />
      <ul className="divide-y divide-border">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="py-10 first:pt-0 space-y-3">
            <div className="flex gap-3">
              <div className="h-2.5 w-24 bg-border rounded animate-pulse" />
              <div className="h-2.5 w-24 bg-border rounded animate-pulse" />
            </div>
            <div className="h-2.5 w-32 bg-border rounded animate-pulse" />
            <div className="h-5 w-3/4 bg-border rounded animate-pulse" />
            <div className="h-3 w-full bg-border rounded animate-pulse" />
            <div className="h-3 w-5/6 bg-border rounded animate-pulse" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ActualidadPage() {
  return (
    <section className="bg-cream pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="cat-label mb-3" style={{ color: '#B5C87A' }}>Actualidad</p>
        <h1
          className="font-sans font-semibold text-primary leading-tight mb-4 max-w-2xl"
          style={{ fontSize: 'var(--fs-large)' }}
        >
          Últimas noticias jurídicas
        </h1>
        <Suspense fallback={<Skeleton />}>
          <Lista />
        </Suspense>
      </div>
    </section>
  )
}
