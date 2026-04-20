export default function PrivacidadPage() {
  return (
    <>
      <section className="bg-primary pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="cat-label mb-3" style={{ color: 'rgba(181,200,122,0.9)' }}>Legal</p>
          <h1 className="font-serif font-semibold text-cream leading-tight" style={{ fontSize: 'var(--fs-large)' }}>
            Política de privacidad
          </h1>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">

          <p className="font-sans text-xs text-muted mb-12">Última actualización: abril de 2026</p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">1. Responsable del tratamiento</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            <strong>FG Abogados, S.L.P.</strong><br />
            Calle Velázquez, 22, 28001 Madrid<br />
            NIF: B-XXXXXXXX<br />
            Email: <a href="mailto:info@fgabogados-es.com" className="underline hover:text-accent transition-colors">info@fgabogados-es.com</a>
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">2. Datos que recogemos</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-4">
            Recogemos los datos que usted nos facilita voluntariamente a través de los formularios del Sitio Web, entre ellos:
          </p>
          <ul className="font-sans font-light text-muted text-sm leading-relaxed mb-8 list-disc list-inside space-y-1">
            <li>Nombre y apellidos</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Nombre de empresa (opcional)</li>
            <li>Descripción de la consulta jurídica</li>
          </ul>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">3. Finalidad y base jurídica del tratamiento</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            Los datos recabados se utilizan exclusivamente para atender su consulta o solicitud de información (base jurídica: consentimiento del interesado, art. 6.1.a RGPD), y para el envío de la newsletter en caso de suscripción expresa. No se utilizarán para ninguna otra finalidad sin su consentimiento previo.
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">4. Conservación de los datos</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            Los datos se conservarán durante el tiempo necesario para atender la consulta y, en su caso, durante el plazo legalmente exigido. Los datos de suscriptores a la newsletter se conservarán hasta que se solicite la baja.
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">5. Destinatarios</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            Los datos no se cederán a terceros salvo obligación legal. No realizamos transferencias internacionales de datos.
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">6. Derechos del interesado</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-4">
            Puede ejercer en cualquier momento los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad dirigiéndose a:
          </p>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            <strong>FG Abogados, S.L.P.</strong> — Calle Velázquez, 22, 28001 Madrid<br />
            Email: <a href="mailto:info@fgabogados-es.com" className="underline hover:text-accent transition-colors">info@fgabogados-es.com</a>
          </p>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">www.aepd.es</a>).
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">7. Seguridad</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed">
            La Firma adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad de sus datos y evitar su alteración, pérdida, tratamiento o acceso no autorizados, conforme a lo establecido en el RGPD y la LOPDGDD.
          </p>

        </div>
      </section>
    </>
  )
}
