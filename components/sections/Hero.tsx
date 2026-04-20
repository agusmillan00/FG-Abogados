'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(45, 26, 0, 0.65)', zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          className="font-sans text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: 'rgba(248,248,240,0.75)' }}
        >
          Derecho Penal · Civil · Laboral · Fiscal · Mercantil
        </p>
        <p
          className="font-sans text-xs tracking-[0.2em] uppercase mb-2"
          style={{ color: 'rgba(248,248,240,0.45)' }}
        >
          Fundada en 1994
        </p>

        <h1
          className="font-serif font-semibold text-cream mb-6 leading-tight"
          style={{ fontSize: 'var(--fs-hero)' }}
        >
          Expertos en tu defensa
        </h1>

        <p
          className="font-sans font-light mb-10 max-w-xl mx-auto"
          style={{
            color: 'rgba(248,248,240,0.8)',
            fontSize: 'var(--fs-small)',
          }}
        >
          Especialistas en derecho penal, civil, laboral y fiscal para empresas y particulares
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/servicios" className="btn-accent">
            Nuestros servicios
          </Link>
          <Link href="/contacto" className="btn-cream">
            Contáctanos
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-sans text-[0.55rem] tracking-[0.2em] uppercase" style={{ color: 'rgba(248,248,240,0.4)' }}>
          Scroll
        </span>
        <div
          className="w-px h-10 animate-pulse"
          style={{ background: 'rgba(248,248,240,0.3)' }}
        />
      </div>
    </section>
  )
}
