import Link from 'next/link'

export default function Intro() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: big headline */}
          <div>
            <span className="section-line" />
            <h2
              className="font-serif font-semibold text-primary leading-tight"
              style={{ fontSize: 'var(--fs-large)' }}
            >
              Especialistas en derecho penal, civil, laboral, fiscal y mercantil.
            </h2>
          </div>

          {/* Right: text + CTAs */}
          <div>
            <p className="font-sans font-light text-muted mb-4 leading-relaxed">
              Fundado por <strong>Pilar Ferrández Garrido</strong>, FG Abogados es un despacho de abogados especializado en las ramas del derecho que más impactan en la vida de las personas y las empresas: penal, civil, laboral, fiscal y mercantil.
            </p>
            <p className="font-sans font-light text-muted mb-10 leading-relaxed">
              Con sedes en Madrid y Cuenca, ofrecemos un asesoramiento jurídico integral, cercano y de calidad, adaptado a cada cliente y situación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/nosotros" className="btn-primary">
                Sobre nosotros
              </Link>
              <Link href="/servicios" className="btn-secondary">
                Nuestros servicios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
