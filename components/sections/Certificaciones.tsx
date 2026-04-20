import { BadgeCheck, Scale, Laptop, ShieldCheck } from 'lucide-react'

const items = [
  {
    icono: Scale,
    titulo: 'Colegiados',
    texto: 'Todos nuestros abogados están colegiados en los correspondientes Ilustres Colegios de Abogados, garantía de ejercicio legal y ético.',
  },
  {
    icono: Laptop,
    titulo: 'Abogado digital',
    texto: 'Habilitados para la práctica jurídica digital: notificaciones electrónicas, firma digital y actuación telemática ante organismos y tribunales.',
  },
  {
    icono: BadgeCheck,
    titulo: 'Deontología profesional',
    texto: 'Ejercemos bajo los principios del Estatuto General de la Abogacía: independencia, confidencialidad y defensa del cliente.',
  },
  {
    icono: ShieldCheck,
    titulo: 'Seguro de responsabilidad civil',
    texto: 'Contamos con seguro de responsabilidad civil profesional, cubriendo cualquier contingencia en el ejercicio de nuestra actividad.',
  },
]

export default function Certificaciones() {
  return (
    <section className="bg-cream-dark py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-line mx-auto" />
          <p className="cat-label mb-2">Garantías</p>
          <h2 className="font-serif font-semibold text-primary" style={{ fontSize: 'var(--fs-medium)' }}>
            Ejercicio legal, ético y certificado
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const Icono = item.icono
            return (
              <div
                key={item.titulo}
                className="bg-cream border border-border p-8 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-sm shrink-0"
                  style={{ background: 'rgba(181,200,122,0.15)', border: '1px solid rgba(181,200,122,0.3)' }}
                >
                  <Icono size={20} style={{ color: '#B5C87A' }} />
                </div>
                <h3 className="font-serif font-semibold text-primary text-lg">{item.titulo}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{item.texto}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
