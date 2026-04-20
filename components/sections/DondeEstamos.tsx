import Link from 'next/link'
import Image from 'next/image'

export default function DondeEstamos() {
  return (
    <section className="bg-cream-dark py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: text */}
          <div className="lg:col-span-5">
            <span className="section-line" />
            <p className="cat-label mb-2">Dónde estamos</p>
            <h2
              className="font-serif font-semibold text-primary leading-tight mb-6"
              style={{ fontSize: 'var(--fs-medium)' }}
            >
              Presencia nacional
            </h2>
            <p className="font-sans font-light text-muted text-sm leading-relaxed mb-4">
              Contamos con dos oficinas en España —Madrid y Cuenca— desde las que damos cobertura jurídico-laboral a empresas y particulares en todo el territorio nacional.
            </p>
            <p className="font-sans font-light text-muted text-sm leading-relaxed mb-10">
              Sea cual sea la dimensión de su empresa o la geografía de sus operaciones, nuestro equipo está listo para acompañarle.
            </p>
            <Link href="/nosotros#sedes" className="btn-primary">
              Conócenos
            </Link>

            {/* Tabs */}
            <div className="flex items-center gap-6 mt-12 pt-6 border-t border-border">
              <div className="text-center">
                <p className="font-serif font-semibold text-primary text-3xl">2</p>
                <p className="font-sans text-xs tracking-widest uppercase text-muted mt-1">Sedes</p>
              </div>
            </div>
          </div>

          {/* Right: Spain map image */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <Image
              src="/spain-peninsula.svg"
              alt="Mapa de España con sedes en Madrid y Cuenca"
              width={1024}
              height={768}
              className="w-full max-w-lg"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  )
}
