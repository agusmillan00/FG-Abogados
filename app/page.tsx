export const revalidate = 3600

import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import Stats from '@/components/sections/Stats'
import Noticias from '@/components/sections/Noticias'
import DondeEstamos from '@/components/sections/DondeEstamos'
import Valores from '@/components/sections/Valores'
import Certificaciones from '@/components/sections/Certificaciones'
import Videoconsulta from '@/components/sections/Videoconsulta'
import Contacto from '@/components/sections/Contacto'
import Newsletter from '@/components/sections/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Stats />
      <Noticias />
      <DondeEstamos />
      <Valores />
      <Certificaciones />
      <Videoconsulta />
      <Contacto />
      <Newsletter />
    </>
  )
}
