import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, TrendingUp } from 'lucide-react'

const valores = [
  {
    icono: Star,
    titulo: 'Excelencia',
    texto: 'Aplicamos los más altos estándares técnicos en cada asunto, sin excepciones ni atajos.',
  },
  {
    icono: Heart,
    titulo: 'Cercanía',
    texto: 'Tratamos cada caso con la atención que merece, manteniendo una relación directa y transparente con el cliente.',
  },
  {
    icono: TrendingUp,
    titulo: 'Resultados',
    texto: 'Orientamos toda nuestra estrategia a conseguir los mejores resultados posibles en el menor tiempo.',
  },
]

export default function Valores() {
  return (
    <section className="bg-primary py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: placeholder image */}
          <div className="lg:col-span-5">
            <div
              className="relative aspect-[4/5] rounded-sm overflow-hidden"
              style={{ border: '1px solid rgba(248,248,240,0.1)' }}
            >
              <Image
                src="/equipo-placeholder.png"
                alt="Equipo de FG Abogados"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right: content */}
          <div className="lg:col-span-7">
            <span
              className="block mb-8"
              style={{ width: 60, height: 2, background: '#B5C87A' }}
            />
            <p className="cat-label mb-3" style={{ color: 'rgba(248,248,240,0.5)' }}>
              Nuestros valores
            </p>
            <h2
              className="font-serif font-semibold text-cream leading-tight mb-10"
              style={{ fontSize: 'var(--fs-medium)' }}
            >
              Comprometidos con tu causa
            </h2>

            <ul className="space-y-8 mb-12">
              {valores.map((v) => {
                const Icono = v.icono
                return (
                  <li key={v.titulo} className="flex items-start gap-5">
                    <div
                      className="p-3 rounded-sm shrink-0"
                      style={{ background: 'rgba(181,200,122,0.15)', border: '1px solid rgba(181,200,122,0.3)' }}
                    >
                      <Icono size={20} style={{ color: '#B5C87A' }} />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-cream text-xl mb-1">{v.titulo}</h3>
                      <p className="font-sans font-light text-sm leading-relaxed" style={{ color: 'rgba(248,248,240,0.65)' }}>
                        {v.texto}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>

            <Link href="/equipo" className="btn-cream">
              Únete al equipo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
