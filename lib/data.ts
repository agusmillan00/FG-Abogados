// ─── Types ───────────────────────────────────────────────────────────────────

export interface Noticia {
  id: number
  categoria: string
  fecha: string
  titulo: string
  slug: string
  imagen: string
  extracto: string
}

export interface Publicacion {
  id: number
  categoria: 'FG Legal News' | 'Tribunas' | 'Guías Prácticas'
  fecha: string
  titulo: string
  slug: string
  imagen: string
  extracto: string
}

export interface Reconocimiento {
  id: number
  nombre: string
  descripcion: string
  icono: string
}

export interface Testimonio {
  id: number
  cita: string
  fuente: string
  cargo: string
}

export interface Servicio {
  id: number
  nombre: string
  descripcion: string
  slug: string
  imagen?: string
}

export interface Abogado {
  id: number
  nombre: string
  cargo: string
  especialidad: string
  imagen: string
}

// ─── Noticias ─────────────────────────────────────────────────────────────────

export const noticias: Noticia[] = [
  {
    id: 1,
    categoria: 'Derecho Laboral',
    fecha: '15 enero 2025',
    titulo: 'El Tribunal Supremo fija nueva doctrina sobre despido colectivo en grupos de empresas',
    slug: 'tribunal-supremo-despido-colectivo-grupos',
    imagen: '/placeholder-news-1.jpg',
    extracto: 'La reciente sentencia del TS establece criterios vinculantes para la determinación del umbral numérico en despidos colectivos.',
  },
  {
    id: 2,
    categoria: 'Relaciones Laborales',
    fecha: '8 enero 2025',
    titulo: 'Negociación colectiva 2025: claves para afrontar la nueva oleada de convenios',
    slug: 'negociacion-colectiva-2025-claves',
    imagen: '/placeholder-news-2.jpg',
    extracto: 'El 60% de los convenios colectivos vence este año. Analizamos las principales tendencias y los puntos de conflicto más habituales.',
  },
  {
    id: 3,
    categoria: 'Seguridad Social',
    fecha: '20 diciembre 2024',
    titulo: 'Cambios en la cotización de autónomos: impacto en las relaciones mercantiles',
    slug: 'cotizacion-autonomos-cambios-2024',
    imagen: '/placeholder-news-3.jpg',
    extracto: 'La nueva normativa sobre cotización afecta también a las relaciones entre empresas y trabajadores por cuenta propia.',
  },
  {
    id: 4,
    categoria: 'Compliance Laboral',
    fecha: '5 diciembre 2024',
    titulo: 'Protocolo de acoso: obligaciones reforzadas para empresas de más de 50 trabajadores',
    slug: 'protocolo-acoso-obligaciones-empresas',
    imagen: '/placeholder-news-4.jpg',
    extracto: 'Repasamos las novedades normativas que incrementan las obligaciones de las empresas en materia de prevención del acoso laboral.',
  },
]

// ─── Publicaciones ────────────────────────────────────────────────────────────

export const publicaciones: Publicacion[] = [
  {
    id: 1,
    categoria: 'FG Legal News',
    fecha: 'Enero 2025',
    titulo: 'Boletín Laboral FG: Las sentencias más relevantes del cuarto trimestre de 2024',
    slug: 'boletin-laboral-fg-q4-2024',
    imagen: '/placeholder-pub-1.jpg',
    extracto: 'Selección comentada de las resoluciones judiciales con mayor impacto para las relaciones laborales empresariales.',
  },
  {
    id: 2,
    categoria: 'Tribunas',
    fecha: 'Diciembre 2024',
    titulo: 'Inteligencia artificial y relación laboral: retos jurídicos del algoritmo empleador',
    slug: 'ia-relacion-laboral-retos-juridicos',
    imagen: '/placeholder-pub-2.jpg',
    extracto: 'La automatización de la toma de decisiones laborales plantea nuevas exigencias de transparencia y control sindical.',
  },
  {
    id: 3,
    categoria: 'Guías Prácticas',
    fecha: 'Noviembre 2024',
    titulo: 'Guía práctica para la gestión del absentismo laboral: marco legal y buenas prácticas',
    slug: 'guia-practica-absentismo-laboral',
    imagen: '/placeholder-pub-3.jpg',
    extracto: 'Herramienta de consulta para directores de RR.HH. y jurídicos ante los supuestos más frecuentes de absentismo.',
  },
  {
    id: 4,
    categoria: 'Tribunas',
    fecha: 'Octubre 2024',
    titulo: 'Teletrabajo transnacional: problemas de determinación de la ley aplicable',
    slug: 'teletrabajo-transnacional-ley-aplicable',
    imagen: '/placeholder-pub-4.jpg',
    extracto: 'El trabajo en remoto desde el extranjero genera complejas situaciones de concurrencia de ordenamientos laborales.',
  },
]

// ─── Reconocimientos ──────────────────────────────────────────────────────────

export const reconocimientos: Reconocimiento[] = [
  {
    id: 1,
    nombre: 'Chambers Europe 2025',
    descripcion: 'Band 1 en Derecho Laboral – España',
    icono: '⚖️',
  },
  {
    id: 2,
    nombre: 'Legal 500 EMEA 2024',
    descripcion: 'Tier 1 – Employment & Labour Law',
    icono: '🏆',
  },
  {
    id: 3,
    nombre: 'Best Lawyers España 2025',
    descripcion: 'Firma del Año en Derecho Laboral',
    icono: '★',
  },
  {
    id: 4,
    nombre: 'IFLR1000 2024',
    descripcion: 'Highly Regarded – Labour & Employment',
    icono: '◆',
  },
  {
    id: 5,
    nombre: 'Expansión Mejores Despachos 2024',
    descripcion: 'Top 5 – Especialistas Laboralistas',
    icono: '✦',
  },
]

// ─── Testimonios ──────────────────────────────────────────────────────────────

export const testimonios: Testimonio[] = [
  {
    id: 1,
    cita: 'FG Abogados tiene una capacidad excepcional para manejar los asuntos más complejos de derecho laboral con una visión estratégica que va mucho más allá del simple asesoramiento jurídico.',
    fuente: 'Chambers Europe 2025',
    cargo: 'Cliente corporativo – sector financiero',
  },
  {
    id: 2,
    cita: 'Su equipo destaca por la profundidad de conocimiento, la disponibilidad absoluta y la capacidad de anticipar los problemas antes de que se conviertan en conflictos.',
    fuente: 'Legal 500 EMEA 2024',
    cargo: 'Director de RR.HH. – empresa multinacional',
  },
  {
    id: 3,
    cita: 'Llevan años siendo nuestros asesores en todas las negociaciones colectivas. El resultado habla por sí solo: acuerdos sólidos y relaciones laborales estables.',
    fuente: 'Best Lawyers 2025',
    cargo: 'Consejero Delegado – grupo industrial',
  },
]

// ─── Servicios ────────────────────────────────────────────────────────────────

export const servicios: Servicio[] = [
  {
    id: 1,
    nombre: 'Derecho Penal',
    descripcion: 'Defensa y acusación en toda clase de procedimientos penales, desde las diligencias previas hasta el juicio oral.',
    slug: 'derecho-penal',
    imagen: '/servicios/penal.jpg',
  },
  {
    id: 2,
    nombre: 'Derecho Laboral',
    descripcion: 'Asesoramiento y defensa en materia laboral desde la papeleta de conciliación, abarcando despidos, reclamaciones y relaciones laborales.',
    slug: 'derecho-laboral',
    imagen: '/servicios/laboral.jpg',
  },
  {
    id: 3,
    nombre: 'Derecho de Familia y Sucesiones',
    descripcion: 'Herencias, divorcios, convenios reguladores, pensiones de alimentos y servicios de contador-partidor.',
    slug: 'derecho-familia-sucesiones',
    imagen: '/servicios/familia.jpg',
  },
  {
    id: 4,
    nombre: 'Derecho Civil',
    descripcion: 'Redacción, revisión y defensa en todo tipo de contratos civiles y reclamaciones entre particulares.',
    slug: 'derecho-civil',
    imagen: '/servicios/civil.jpg',
  },
  {
    id: 5,
    nombre: 'Derecho Mercantil',
    descripcion: 'Constitución de sociedades, personalidad jurídica, contratos mercantiles, procedimientos de concurso y Ley de Segunda Oportunidad.',
    slug: 'derecho-mercantil',
    imagen: '/servicios/mercantil.jpg',
  },
  {
    id: 6,
    nombre: 'Derecho de Extranjería y Movilidad Internacional',
    descripcion: 'Gestión de autorizaciones de residencia y trabajo, reagrupación familiar, nacionalidad y asesoramiento en movilidad internacional.',
    slug: 'derecho-extranjeria',
    imagen: '/servicios/extranjeria.jpg',
  },
  {
    id: 7,
    nombre: 'Derecho Administrativo',
    descripcion: 'Desde instancias iniciales, recursos potestativos de reposición y alzada hasta la judicialización en vía contencioso-administrativa.',
    slug: 'derecho-administrativo',
    imagen: '/servicios/administrativo.jpg',
  },
]

// ─── Equipo ───────────────────────────────────────────────────────────────────

export const equipo: Abogado[] = [
  {
    id: 1,
    nombre: 'Pilar Ferrández Garrido',
    cargo: 'Socia Fundadora',
    especialidad: 'Negociación colectiva y reestructuraciones',
    imagen: '/equipo-placeholder.png',
  },
  {
    id: 2,
    nombre: 'Marta Millán Fernández',
    cargo: 'Socia',
    especialidad: 'Derecho laboral y relaciones laborales',
    imagen: '/placeholder-team-2.jpg',
  },
  {
    id: 3,
    nombre: 'Agustín Millán Fernández',
    cargo: 'Equipo técnico de informática',
    especialidad: 'Tecnología y sistemas de FG Abogados',
    imagen: '/placeholder-team-3.jpg',
  },
]
