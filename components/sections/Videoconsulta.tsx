import Link from 'next/link'
import { Video, Clock, Shield, ArrowRight } from 'lucide-react'

export default function Videoconsulta() {
  return (
    <section className="bg-primary py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <span className="section-line" style={{ background: '#B5C87A' }} />
            <p className="cat-label mb-2" style={{ color: 'rgba(181,200,122,0.9)' }}>Consulta online</p>
            <h2
              className="font-serif font-semibold text-cream leading-tight mb-6"
              style={{ fontSize: 'var(--fs-medium)' }}
            >
              Videoconsulta con un abogado especialista
            </h2>
            <p className="font-sans font-light mb-8 leading-relaxed" style={{ color: 'rgba(248,248,240,0.7)' }}>
              Resuelve tus dudas jurídicas desde cualquier lugar. En una sesión de videollamada con uno de nuestros abogados analizamos tu caso, te orientamos y te indicamos los pasos a seguir.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
              <div className="text-center">
                <p className="font-serif font-semibold text-cream" style={{ fontSize: 'var(--fs-medium)' }}>100€</p>
                <p className="font-sans text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(248,248,240,0.45)' }}>por sesión</p>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block" />
              <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(248,248,240,0.5)' }}>
                Precio por consulta de hasta 45 minutos.<br />IVA no incluido.
              </p>
            </div>

            <Link href="/contacto" className="btn-accent inline-flex items-center gap-2">
              Reservar videoconsulta <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right: features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <Video size={20} style={{ color: '#B5C87A' }} />,
                titulo: 'Online y sin desplazamiento',
                texto: 'Conéctate desde casa, la oficina o donde estés. Solo necesitas un dispositivo con cámara.',
              },
              {
                icon: <Clock size={20} style={{ color: '#B5C87A' }} />,
                titulo: 'Hasta 45 minutos',
                texto: 'Tiempo suficiente para analizar tu situación y trazar un plan de actuación claro.',
              },
              {
                icon: <Shield size={20} style={{ color: '#B5C87A' }} />,
                titulo: 'Confidencial',
                texto: 'Toda la información compartida está protegida por el secreto profesional del abogado.',
              },
              {
                icon: <ArrowRight size={20} style={{ color: '#B5C87A' }} />,
                titulo: 'Cualquier área',
                texto: 'Penal, civil, laboral, fiscal, mercantil, familia, extranjería o administrativo.',
              },
            ].map(f => (
              <div
                key={f.titulo}
                className="p-6 border"
                style={{ borderColor: 'rgba(248,248,240,0.1)', background: 'rgba(248,248,240,0.04)' }}
              >
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-sans font-medium text-cream text-sm mb-2">{f.titulo}</h3>
                <p className="font-sans font-light text-xs leading-relaxed" style={{ color: 'rgba(248,248,240,0.5)' }}>
                  {f.texto}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
