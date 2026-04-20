import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Props {
  numero: string
  nombre: string
  descripcion: string
  slug: string
}

export default function FlipCard({ numero, nombre, descripcion, slug }: Props) {
  return (
    /*
     * Flip card — pure-CSS approach.
     *
     * Why not React state + inline styles?
     * The inner div needs `transform-style: preserve-3d`, but any ancestor
     * that creates a CSS stacking context (opacity, will-change, isolation,
     * filter, or certain Tailwind utilities) silently flattens preserve-3d,
     * making the rotation appear 2-D and invisible. The CSS :hover selector
     * resolves entirely inside the same stacking context as the element, so
     * it is immune to that flattening. It also avoids a React hydration frame
     * where state is false and the transition fires immediately on first
     * render in some Next.js 14 streaming configurations.
     *
     * The .flip-card* rules already exist in globals.css — we just use them.
     * `width: 100%` on the outer div is required so the card fills the grid
     * cell; globals.css does not set it because it cannot know the layout.
     */
    <div
      id={slug}
      className="flip-card"
      style={{ width: '100%', cursor: 'pointer' }}
    >
      <div className="flip-card-inner">

        {/* Cara delantera */}
        <div
          className="flip-card-front"
          style={{
            background: '#F2F2E8',
            border: '1px solid #DDD9CC',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '3.5rem',
              fontWeight: 600,
              color: 'rgba(181,200,122,0.25)',
              userSelect: 'none',
              lineHeight: 1,
            }}
          >
            {numero}
          </span>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontWeight: 600,
              fontSize: '1.15rem',
              color: '#2D1A00',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {nombre}
          </h2>
        </div>

        {/* Cara trasera */}
        <div
          className="flip-card-back"
          style={{
            background: '#2D1A00',
            border: '1px solid #4a3010',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 300,
              fontSize: '0.82rem',
              lineHeight: 1.7,
              color: 'rgba(248,248,240,0.85)',
              margin: 0,
            }}
          >
            {descripcion}
          </p>
          <Link
            href="/contacto"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#B5C87A',
              textDecoration: 'none',
            }}
          >
            Consultar <ArrowRight size={11} />
          </Link>
        </div>

      </div>
    </div>
  )
}
