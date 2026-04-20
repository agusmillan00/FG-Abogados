import Link from 'next/link'
import { equipo } from '@/lib/data'

export default function NosotrosPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="bg-primary pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="cat-label mb-3" style={{ color: 'rgba(181,200,122,0.9)' }}>FG Abogados</p>
          <h1
            className="font-serif font-semibold text-cream leading-tight max-w-3xl"
            style={{ fontSize: 'var(--fs-large)' }}
          >
            Especialistas en derecho penal, civil, laboral, fiscal y mercantil
          </h1>
        </div>
      </section>

      {/* Historia */}
      <section id="historia" className="bg-cream py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-line" />
              <h2 className="font-serif font-semibold text-primary mb-6" style={{ fontSize: 'var(--fs-medium)' }}>
                Nuestra historia
              </h2>
              <p className="font-sans font-light text-muted text-sm leading-relaxed mb-4">
                FG Abogados fue fundado por <strong>Pilar Ferrández Garrido</strong> con una vocación clara: ofrecer asesoramiento jurídico de calidad en las áreas que más impactan en la vida cotidiana de personas y empresas. FG Abogados nació con una visión integral del derecho, abarcando desde el principio las ramas penal, civil, laboral, fiscal y mercantil.
              </p>
              <p className="font-sans font-light text-muted text-sm leading-relaxed mb-4">
                Bajo el liderazgo de Pilar, el despacho ha crecido de forma orgánica, incorporando profesionales comprometidos con la excelencia y sumando sedes en Madrid y Cuenca para estar más cerca de sus clientes.
              </p>
              <p className="font-sans font-light text-muted text-sm leading-relaxed">
                Hoy, FG Abogados es un despacho de confianza para quienes necesitan un equipo sólido, especializado y cercano que les acompañe en cualquier asunto jurídico, con independencia de su complejidad.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src="/despacho.png"
                alt="Despacho FG Abogados"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section id="valores" className="bg-cream-dark py-20 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="section-line mx-auto" />
          <h2 className="font-serif font-semibold text-primary mb-12" style={{ fontSize: 'var(--fs-medium)' }}>
            Lo que nos define
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { titulo: 'Especialización', texto: 'Derecho laboral exclusivo. Toda nuestra energía enfocada en una sola disciplina.', destacada: false },
              { titulo: 'Independencia', texto: 'Sin afiliaciones partidistas ni sindicales. Solo el interés del cliente.', destacada: true },
              { titulo: 'Innovación', texto: 'Adoptamos nuevas tecnologías y metodologías para ofrecer un servicio más eficiente.', destacada: false },
            ].map(v => (
              <div
                key={v.titulo}
                className="p-8 border"
                style={v.destacada
                  ? { background: '#2D1A00', borderColor: '#2D1A00' }
                  : { background: 'var(--color-bg-light)', borderColor: 'var(--color-border)' }
                }
              >
                <h3
                  className="font-serif font-semibold text-2xl mb-3"
                  style={{ color: v.destacada ? '#F8F8F0' : '#2D1A00' }}
                >
                  {v.titulo}
                </h3>
                <p
                  className="font-sans font-light text-sm leading-relaxed"
                  style={{ color: v.destacada ? 'rgba(248,248,240,0.65)' : '#7A6A55' }}
                >
                  {v.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo resumen */}
      <section className="bg-cream py-20 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="section-line" />
              <h2 className="font-serif font-semibold text-primary" style={{ fontSize: 'var(--fs-medium)' }}>
                Nuestro equipo
              </h2>
            </div>
            <Link href="/equipo" className="btn-secondary hidden sm:inline-block">Ver el equipo</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipo.slice(0, 3).map(a => (
              <div key={a.id} className="group">
                <div
                  className="aspect-[3/4] rounded-sm mb-4 flex items-center justify-center overflow-hidden"
                  style={{ background: '#F2F2E8', border: '1px solid #DDD9CC' }}
                >
                  <span className="font-sans text-xs text-muted">Foto</span>
                </div>
                <h3 className="font-serif font-semibold text-primary text-xl">{a.nombre}</h3>
                <p className="cat-label mt-1">{a.cargo}</p>
                <p className="font-sans text-xs text-muted mt-1">{a.especialidad}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:hidden">
            <Link href="/equipo" className="btn-secondary">Ver el equipo</Link>
          </div>
        </div>
      </section>
    </>
  )
}
