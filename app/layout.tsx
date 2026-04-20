import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Chatbot from '@/components/chat/Chatbot'

export const metadata: Metadata = {
  title: 'FG Abogados – Despacho Especializado en Derecho Laboral',
  description:
    'FG Abogados, despacho líder en derecho laboral. Asesoramiento jurídico de élite para empresas y trabajadores desde 1995.',
  keywords: 'abogados laboralistas, derecho laboral, asesoramiento laboral, despido, convenios colectivos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  )
}
