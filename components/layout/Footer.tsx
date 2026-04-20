'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, Globe, Share2, ExternalLink, MapPin } from 'lucide-react'

const footerLinks = {
  nosotros: [
    { label: 'Historia', href: '/nosotros#historia' },
    { label: 'Valores', href: '/nosotros#valores' },
    { label: 'RSC', href: '/nosotros#rsc' },
  ],
  servicios: [
    { label: 'Despido y extinción', href: '/servicios#despido-extincion' },
    { label: 'Negociación colectiva', href: '/servicios#negociacion-colectiva' },
    { label: 'Reestructuraciones', href: '/servicios#reestructuraciones' },
    { label: 'Compliance laboral', href: '/servicios#compliance-laboral' },
    { label: 'Alta dirección', href: '/servicios#contratacion-alta-direccion' },
  ],
  firma: [
    { label: 'Equipo', href: '/equipo' },
    { label: 'Actualidad', href: '/actualidad' },
    { label: 'Publicaciones', href: '/publicaciones' },
    { label: 'Contacto', href: '/contacto' },
  ],
}

const sedes = [
  { ciudad: 'Madrid', dir: '' },
  { ciudad: 'Cuenca', dir: '' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A0E00' }}>

      {/* Top bar */}
      <div className="border-b" style={{ borderColor: 'rgba(248,248,240,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="tel:+34678613060"
              className="flex items-center gap-2 font-sans text-xs tracking-wide transition-colors"
              style={{ color: 'rgba(248,248,240,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F8F8F0')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,248,240,0.6)')}
            >
              <Phone size={13} />
              +34 678 613 060
            </a>
            <a
              href="mailto:info@fgabogados-es.com"
              className="flex items-center gap-2 font-sans text-xs tracking-wide transition-colors"
              style={{ color: 'rgba(248,248,240,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F8F8F0')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,248,240,0.6)')}
            >
              <Mail size={13} />
              info@fgabogados-es.com
            </a>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              style={{ color: 'rgba(248,248,240,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F8F8F0')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,248,240,0.6)')}
            >
              <Globe size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              title="X / Twitter"
              style={{ color: 'rgba(248,248,240,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F8F8F0')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,248,240,0.6)')}
            >
              <Share2 size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              style={{ color: 'rgba(248,248,240,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F8F8F0')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,248,240,0.6)')}
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Middle */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Logo + descripción */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo.jpg"
                alt="FG Abogados"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
            <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'rgba(248,248,240,0.5)' }}>
              Despacho de abogados fundado por Pilar Ferrández Garrido, especializado en derecho penal, civil, laboral, fiscal y mercantil, con sedes en Madrid y Cuenca.
            </p>

            {/* Mini newsletter */}
            <p className="font-sans text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(248,248,240,0.4)' }}>
              Suscríbete a nuestra newsletter
            </p>
            <form className="flex gap-0" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 bg-transparent font-sans text-xs px-3 py-2.5 outline-none"
                style={{
                  border: '1px solid rgba(248,248,240,0.2)',
                  color: '#F8F8F0',
                  borderRight: 'none',
                }}
              />
              <button
                type="submit"
                className="font-sans text-xs font-medium tracking-widest uppercase px-4 py-2.5 shrink-0 transition-colors"
                style={{ background: '#B5C87A', color: '#2D1A00' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#8A9E52')}
                onMouseLeave={e => (e.currentTarget.style.background = '#B5C87A')}
              >
                Enviar
              </button>
            </form>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-sans text-xs font-medium tracking-widest uppercase mb-5" style={{ color: 'rgba(248,248,240,0.4)' }}>
              Nosotros
            </h4>
            <ul className="space-y-3">
              {footerLinks.nosotros.map(l => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-sans text-sm transition-colors text-[rgba(248,248,240,0.6)] hover:text-[#F8F8F0]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-medium tracking-widest uppercase mb-5" style={{ color: 'rgba(248,248,240,0.4)' }}>
              Servicios
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map(l => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-sans text-sm transition-colors text-[rgba(248,248,240,0.6)] hover:text-[#F8F8F0]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-medium tracking-widest uppercase mb-5" style={{ color: 'rgba(248,248,240,0.4)' }}>
              FG Abogados
            </h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.firma.map(l => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-sans text-sm transition-colors text-[rgba(248,248,240,0.6)] hover:text-[#F8F8F0]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-sans text-xs font-medium tracking-widest uppercase mb-4" style={{ color: 'rgba(248,248,240,0.4)' }}>
              Sedes
            </h4>
            <ul className="space-y-3">
              {sedes.map(s => (
                <li key={s.ciudad} className="flex items-start gap-1.5">
                  <MapPin size={12} className="mt-1 shrink-0" style={{ color: '#B5C87A' }} />
                  <div>
                    <span className="font-sans text-xs font-medium" style={{ color: 'rgba(248,248,240,0.8)' }}>{s.ciudad}</span>
                    <p className="font-sans text-xs" style={{ color: 'rgba(248,248,240,0.4)' }}>{s.dir}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t" style={{ borderColor: 'rgba(248,248,240,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs" style={{ color: 'rgba(248,248,240,0.4)' }}>
            © 2026 FG Abogados. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terminos" className="font-sans text-xs transition-colors text-[rgba(248,248,240,0.4)] hover:text-[rgba(248,248,240,0.8)]">
              Términos de uso
            </Link>
            <Link href="/privacidad" className="font-sans text-xs transition-colors text-[rgba(248,248,240,0.4)] hover:text-[rgba(248,248,240,0.8)]">
              Política de privacidad
            </Link>
            <Link href="/cookies" className="font-sans text-xs transition-colors text-[rgba(248,248,240,0.4)] hover:text-[rgba(248,248,240,0.8)]">
              Política de cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
