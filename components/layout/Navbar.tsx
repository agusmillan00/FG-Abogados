'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Globe } from 'lucide-react'
import { servicios, noticias } from '@/lib/data'

type Megamenu = 'servicios' | 'actualidad' | null

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megamenu, setMegamenu] = useState<Megamenu>(null)
  const [mobileOpen, setMobileOpen] = useState<string | null>(null)
  const [lang, setLang] = useState<'ES' | 'EN'>('ES')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const lastTwoNoticias = noticias.slice(0, 2)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-cream border-b border-border transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.jpg"
              alt="FG Abogados"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            <li>
              <Link href="/" className="nav-link">Inicio</Link>
            </li>
            <li>
              <Link href="/nosotros" className="nav-link">Nosotros</Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setMegamenu('servicios')}
              onMouseLeave={() => setMegamenu(null)}
            >
              <Link href="/servicios" className="nav-link">Servicios</Link>
              {megamenu === 'servicios' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[560px] bg-cream border border-border shadow-lg py-6 px-8">
                  <p className="cat-label mb-4">Áreas de práctica</p>
                  <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {servicios.map((s) => (
                      <li key={s.id}>
                        <Link
                          href={`/servicios#${s.slug}`}
                          className="block text-sm font-sans text-primary hover:text-accent transition-colors"
                        >
                          {s.nombre}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-border">
                    <Link href="/servicios" className="cat-label hover:text-accent-dark transition-colors">
                      Ver todos los servicios →
                    </Link>
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link href="/equipo" className="nav-link">Equipo</Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setMegamenu('actualidad')}
              onMouseLeave={() => setMegamenu(null)}
            >
              <Link href="/actualidad" className="nav-link">Actualidad</Link>
              {megamenu === 'actualidad' && (
                <div className="absolute top-full right-0 mt-4 w-96 bg-cream border border-border shadow-lg py-6 px-6">
                  <p className="cat-label mb-4">Últimas noticias</p>
                  <ul className="space-y-4">
                    {lastTwoNoticias.map((n) => (
                      <li key={n.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <span className="cat-label">{n.categoria}</span>
                        <Link
                          href={`/actualidad/${n.slug}`}
                          className="block font-sans text-base text-primary hover:text-accent transition-colors mt-1 leading-snug"
                        >
                          {n.titulo}
                        </Link>
                        <span className="text-xs font-sans text-muted mt-1 block">{n.fecha}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <Link href="/actualidad" className="cat-label hover:text-accent-dark transition-colors">
                      Ver toda la actualidad →
                    </Link>
                  </div>
                </div>
              )}
            </li>
          </ul>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Language selector */}
            <button
              className="flex items-center gap-1 font-sans text-xs tracking-widest uppercase text-muted hover:text-primary transition-colors"
              onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
            >
              <Globe size={12} />
              {lang === 'ES' ? 'ES | EN' : 'EN | ES'}
            </button>

            {/* Contact CTA */}
            <Link href="/contacto" className="btn-primary text-xs py-2.5 px-5">
              Contacto
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-primary p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-cream border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
            <Link href="/" className="block py-3 nav-link border-b border-border" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link href="/nosotros" className="block py-3 nav-link border-b border-border" onClick={() => setMenuOpen(false)}>Nosotros</Link>

            {/* Servicios collapsible */}
            <div className="border-b border-border">
              <button
                className="w-full flex items-center justify-between py-3 nav-link"
                onClick={() => setMobileOpen(mobileOpen === 'servicios' ? null : 'servicios')}
              >
                Servicios
                <ChevronDown size={14} className={`transition-transform ${mobileOpen === 'servicios' ? 'rotate-180' : ''}`} />
              </button>
              {mobileOpen === 'servicios' && (
                <ul className="pb-3 pl-4 space-y-2">
                  {servicios.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/servicios#${s.slug}`}
                        className="block text-sm font-sans text-muted hover:text-accent py-1"
                        onClick={() => setMenuOpen(false)}
                      >
                        {s.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link href="/equipo" className="block py-3 nav-link border-b border-border" onClick={() => setMenuOpen(false)}>Equipo</Link>

            {/* Actualidad collapsible */}
            <div className="border-b border-border">
              <button
                className="w-full flex items-center justify-between py-3 nav-link"
                onClick={() => setMobileOpen(mobileOpen === 'actualidad' ? null : 'actualidad')}
              >
                Actualidad
                <ChevronDown size={14} className={`transition-transform ${mobileOpen === 'actualidad' ? 'rotate-180' : ''}`} />
              </button>
              {mobileOpen === 'actualidad' && (
                <ul className="pb-3 pl-4 space-y-2">
                  {lastTwoNoticias.map((n) => (
                    <li key={n.id}>
                      <Link
                        href={`/actualidad/${n.slug}`}
                        className="block text-sm font-sans text-muted hover:text-accent py-1"
                        onClick={() => setMenuOpen(false)}
                      >
                        {n.titulo}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                className="font-sans text-xs tracking-widest uppercase text-muted"
                onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
              >
                {lang === 'ES' ? 'ES | EN' : 'EN | ES'}
              </button>
              <Link href="/contacto" className="btn-primary text-xs py-2 px-4" onClick={() => setMenuOpen(false)}>
                Contacto
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
