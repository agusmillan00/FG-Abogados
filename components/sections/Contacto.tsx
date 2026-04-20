import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'

export default function Contacto() {
  return (
    <section className="bg-cream-dark py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: image placeholder */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src="/despacho.png"
                alt="Despacho FG Abogados"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: text + CTA */}
          <div className="lg:col-span-7">
            <span className="section-line" />
            <p className="cat-label mb-3">Contacto</p>
            <h2
              className="font-serif font-semibold text-primary leading-tight mb-6"
              style={{ fontSize: 'var(--fs-medium)' }}
            >
              ¿Necesitas asesoramiento especializado?
            </h2>
            <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
              Nuestro equipo está disponible para analizar tu situación y ofrecerte una primera orientación sin compromiso. Cuéntanos tu caso y te asignaremos el abogado más adecuado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/contacto" className="btn-primary">
                Contáctanos
              </Link>
              <a href="tel:+34678613060" className="btn-secondary flex items-center gap-2">
                <Phone size={14} />
                +34 678 613 060
              </a>
            </div>

            {/* Quick info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-border">
              <div>
                <p className="cat-label mb-1">Email</p>
                <a
                  href="mailto:info@fgabogados-es.com"
                  className="font-sans text-sm text-primary hover:text-accent transition-colors flex items-center gap-1"
                >
                  info@fgabogados-es.com
                  <ArrowRight size={12} />
                </a>
              </div>
              <div>
                <p className="cat-label mb-1">Sede principal</p>
                <p className="font-sans text-sm text-muted">
                  Calle Velázquez, 22<br />28001 Madrid
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
