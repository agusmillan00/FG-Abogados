export default function TerminosPage() {
  return (
    <>
      <section className="bg-primary pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="cat-label mb-3" style={{ color: 'rgba(181,200,122,0.9)' }}>Legal</p>
          <h1 className="font-serif font-semibold text-cream leading-tight" style={{ fontSize: 'var(--fs-large)' }}>
            Términos de uso
          </h1>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 prose-legal">

          <p className="font-sans text-xs text-muted mb-12">Última actualización: abril de 2026</p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">1. Objeto y ámbito de aplicación</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            Los presentes Términos de Uso regulan el acceso y la utilización del sitio web <strong>www.fgabogados.es</strong> (en adelante, «el Sitio Web»), titularidad de <strong>FG Abogados, S.L.P.</strong> (en adelante, «la Firma»), con domicilio en Calle Velázquez, 22, 28001 Madrid, y NIF B-XXXXXXXX. El acceso al Sitio Web implica la aceptación íntegra de estos términos.
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">2. Uso permitido</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            El usuario se compromete a utilizar el Sitio Web de conformidad con la ley, la moral y el orden público, y a no emplearlo para fines ilícitos o contrarios a los presentes términos. Queda prohibida la reproducción, distribución o comunicación pública de los contenidos sin autorización expresa de la Firma.
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">3. Propiedad intelectual</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            Todos los contenidos del Sitio Web —textos, imágenes, logotipos, diseño gráfico y software— son propiedad exclusiva de FG Abogados o de terceros que han autorizado su uso, y están protegidos por la normativa vigente en materia de propiedad intelectual e industrial.
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">4. Exclusión de responsabilidad</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            La información publicada en el Sitio Web tiene carácter meramente informativo y no constituye asesoramiento jurídico. La Firma no garantiza la exactitud, integridad o actualidad de los contenidos, y no se responsabiliza de los daños derivados de su uso. Para obtener asesoramiento legal, le rogamos contacte directamente con nuestro despacho.
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">5. Enlaces a terceros</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            El Sitio Web puede contener enlaces a páginas de terceros. La Firma no controla dichos sitios y no asume responsabilidad alguna por sus contenidos o políticas de privacidad.
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">6. Ley aplicable y jurisdicción</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            Los presentes Términos de Uso se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten, con renuncia a cualquier otro fuero, a los Juzgados y Tribunales de Madrid.
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">7. Modificaciones</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed">
            La Firma se reserva el derecho a modificar estos términos en cualquier momento. Las modificaciones serán efectivas desde su publicación en el Sitio Web. El uso continuado del Sitio Web tras la publicación de los cambios implica su aceptación.
          </p>

        </div>
      </section>
    </>
  )
}
