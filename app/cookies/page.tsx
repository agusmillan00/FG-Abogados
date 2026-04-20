export default function CookiesPage() {
  return (
    <>
      <section className="bg-primary pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="cat-label mb-3" style={{ color: 'rgba(181,200,122,0.9)' }}>Legal</p>
          <h1 className="font-serif font-semibold text-cream leading-tight" style={{ fontSize: 'var(--fs-large)' }}>
            Política de cookies
          </h1>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">

          <p className="font-sans text-xs text-muted mb-12">Última actualización: abril de 2026</p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">1. ¿Qué son las cookies?</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten recordar sus preferencias y mejorar su experiencia de navegación en visitas sucesivas.
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">2. Cookies que utilizamos</h2>

          <h3 className="font-sans font-medium text-primary text-sm tracking-widest uppercase mb-3" style={{ color: '#B5C87A' }}>Cookies técnicas (necesarias)</h3>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-6">
            Son imprescindibles para el correcto funcionamiento del Sitio Web. No recogen información personal ni pueden desactivarse. Incluyen cookies de sesión y de preferencias de idioma.
          </p>

          <h3 className="font-sans font-medium text-primary text-sm tracking-widest uppercase mb-3" style={{ color: '#B5C87A' }}>Cookies analíticas</h3>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-6">
            Nos permiten analizar el tráfico del Sitio Web de forma anónima y agregada para mejorar nuestros contenidos y servicios. Utilizamos Google Analytics con IP anonimizada.
          </p>

          <h3 className="font-sans font-medium text-primary text-sm tracking-widest uppercase mb-3" style={{ color: '#B5C87A' }}>Cookies de preferencias</h3>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            Recuerdan sus opciones en el Sitio Web (por ejemplo, el idioma seleccionado) para ofrecerle una experiencia personalizada.
          </p>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">3. Cómo gestionar las cookies</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-4">
            Puede configurar su navegador para aceptar, rechazar o eliminar las cookies en cualquier momento. Tenga en cuenta que deshabilitar ciertas cookies puede afectar al funcionamiento del Sitio Web.
          </p>
          <ul className="font-sans font-light text-muted text-sm leading-relaxed mb-8 list-disc list-inside space-y-1">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">Microsoft Edge</a></li>
          </ul>

          <h2 className="font-serif font-semibold text-primary text-2xl mb-4">4. Actualizaciones</h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed">
            Esta política puede actualizarse para adaptarse a cambios legales o tecnológicos. Le recomendamos revisarla periódicamente. La fecha de la última actualización figura al inicio de este documento.
          </p>

        </div>
      </section>
    </>
  )
}
