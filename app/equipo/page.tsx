import Image from 'next/image'
import { equipo } from '@/lib/data'

export default function EquipoPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="bg-primary pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="cat-label mb-3" style={{ color: 'rgba(181,200,122,0.9)' }}>Equipo</p>
          <h1
            className="font-serif font-semibold text-cream leading-tight max-w-3xl"
            style={{ fontSize: 'var(--fs-large)' }}
          >
            Los mejores profesionales del derecho laboral
          </h1>
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="section-line" />
            <p className="cat-label mb-2">Nuestro equipo</p>
            <h2 className="font-serif font-semibold text-primary" style={{ fontSize: 'var(--fs-medium)' }}>
              Socios &amp; Equipo
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {equipo.map(a => (
              <div key={a.id} className="group">
                <div
                  className="relative aspect-[3/4] rounded-sm mb-5 overflow-hidden flex items-center justify-center"
                  style={{ background: '#F2F2E8', border: '1px solid #DDD9CC' }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                    style={{ background: 'rgba(45,26,0,0.75)' }}
                  >
                    <p className="font-sans font-light text-xs text-cream leading-relaxed">
                      {a.especialidad}
                    </p>
                  </div>
                  {a.imagen && !a.imagen.startsWith('/placeholder') ? (
                    <Image
                      src={a.imagen}
                      alt={a.nombre}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <span className="font-sans text-xs text-muted">Foto</span>
                  )}
                </div>
                <h3 className="font-serif font-semibold text-primary text-xl">{a.nombre}</h3>
                <p className="cat-label mt-1">{a.cargo}</p>
                <p className="font-sans text-xs text-muted mt-1.5">{a.especialidad}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-cream-dark py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif font-semibold text-primary mb-4" style={{ fontSize: 'var(--fs-small)' }}>
            ¿Quieres formar parte de FG Abogados?
          </h2>
          <p className="font-sans font-light text-muted text-sm mb-6">
            Buscamos profesionales comprometidos con la excelencia. Envíanos tu candidatura.
          </p>
          <a href="mailto:info@fgabogados-es.com" className="btn-primary">
            Enviar candidatura
          </a>
        </div>
      </section>
    </>
  )
}
