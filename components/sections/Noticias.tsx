import { Suspense } from 'react'
import Link from 'next/link'
import { fetchNoticias } from '@/lib/fetchNoticias'
import { noticias as fallback } from '@/lib/data'

async function Lista() {
  let items = await fetchNoticias(4)

  if (items.length === 0) {
    items = fallback.slice(0, 4).map((n) => ({
      titulo: n.titulo,
      extracto: n.extracto,
      fecha: n.fecha,
      url: `/actualidad/${n.slug}`,
      fuente: 'FG Abogados',
      categoria: n.categoria,
    }))
  }

  return (
    <ul className="space-y-0 divide-y divide-border">
      {items.map((n, i) => (
        <li key={i} className="py-6 first:pt-0 last:pb-0">
          <div className="flex flex-col gap-1 group">
            <div className="flex items-center gap-2">
              <span className="cat-label">{n.categoria}</span>
              {n.fuente !== 'FG Abogados' && (
                <>
                  <span className="font-sans text-xs" style={{ color: 'rgba(122,106,85,0.4)' }}>·</span>
                  <span className="font-sans text-xs text-muted">{n.fuente}</span>
                </>
              )}
            </div>
            <p className="font-sans text-xs text-muted">{n.fecha}</p>
            <a
              href={n.url}
              target={n.url.startsWith('http') ? '_blank' : undefined}
              rel={n.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-serif font-semibold text-primary hover:text-accent transition-colors leading-snug block mt-1"
              style={{ fontSize: 'var(--fs-small)' }}
            >
              {n.titulo}
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}

function Skeleton() {
  return (
    <ul className="space-y-0 divide-y divide-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="py-6 first:pt-0 last:pb-0 space-y-2">
          <div className="h-2.5 w-24 bg-border rounded animate-pulse" />
          <div className="h-2.5 w-20 bg-border rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-border rounded animate-pulse" />
        </li>
      ))}
    </ul>
  )
}

export default function Noticias() {
  return (
    <section className="bg-cream py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left col */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="section-line" />
              <p className="cat-label mb-2">Actualidad</p>
              <h2
                className="font-serif font-semibold text-primary leading-tight mb-6"
                style={{ fontSize: 'var(--fs-medium)' }}
              >
                Lo último en derecho
              </h2>
              <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
                Seguimiento permanente de la actualidad jurídica para que estés siempre informado.
              </p>
            </div>
            <Link href="/actualidad" className="btn-secondary self-start">
              Ver toda la actualidad
            </Link>
          </div>

          {/* Right col: news list */}
          <div className="lg:col-span-8">
            <Suspense fallback={<Skeleton />}>
              <Lista />
            </Suspense>
          </div>

        </div>
      </div>
    </section>
  )
}
