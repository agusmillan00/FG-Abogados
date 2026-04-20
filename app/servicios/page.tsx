import Link from 'next/link'
import { servicios } from '@/lib/data'
import { ArrowRight } from 'lucide-react'

export default function ServiciosPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="bg-primary pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="cat-label mb-3" style={{ color: 'rgba(181,200,122,0.9)' }}>Áreas de práctica</p>
          <h1
            className="font-serif font-semibold text-cream leading-tight max-w-3xl"
            style={{ fontSize: 'var(--fs-large)' }}
          >
            Soluciones jurídicas para cada situación
          </h1>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map((s) => (
              <div
                key={s.id}
                id={s.slug}
                className="group relative overflow-hidden"
                style={{ height: '320px' }}
              >
                {/* Foto de fondo */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: s.imagen ? `url(${s.imagen})` : undefined, backgroundColor: '#2D1A00' }}
                />

                {/* Overlay base */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(45,26,0,0.85) 40%, rgba(45,26,0,0.35) 100%)' }}
                />

                {/* Overlay hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(45,26,0,0.6)' }}
                />

                {/* Contenido */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h2 className="font-serif font-semibold text-cream text-xl leading-snug mb-3">
                    {s.nombre}
                  </h2>
                  <p
                    className="font-sans font-light text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: 'rgba(248,248,240,0.8)', transitionDelay: '50ms' }}
                  >
                    {s.descripcion}
                  </p>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: '#B5C87A', transitionDelay: '100ms' }}
                  >
                    Consultar <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="bg-primary py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif font-semibold text-cream mb-4" style={{ fontSize: 'var(--fs-medium)' }}>
            ¿No encuentras lo que buscas?
          </h2>
          <p className="font-sans font-light text-sm mb-8" style={{ color: 'rgba(248,248,240,0.65)' }}>
            Nuestro equipo cubre múltiples ramas del derecho. Cuéntanos tu caso y te orientaremos.
          </p>
          <Link href="/contacto" className="btn-accent">
            Habla con nosotros
          </Link>
        </div>
      </section>
    </>
  )
}
