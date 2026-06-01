'use client'

interface Props {
  open: boolean
  onClose: () => void
}

export default function DatenschutzModal({ open, onClose }: Props) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="datenschutz-title"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-[#0d2240] border border-gold/20 rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-off-white/40 hover:text-off-white transition-colors text-3xl leading-none"
          aria-label="Schließen"
        >
          ×
        </button>
        <h2 id="datenschutz-title" className="text-gold font-bold text-2xl mb-6">Datenschutzerklärung</h2>
        <div className="text-off-white/70 text-sm space-y-4 leading-relaxed">
          <div>
            <p className="text-off-white font-semibold mb-1">1. Datenschutz auf einen Blick</p>
            <p>
              Diese Website erhebt keine personenbezogenen Daten. Es werden keine Cookies
              gesetzt und keine Tracking-Technologien verwendet.
            </p>
          </div>
          <div>
            <p className="text-off-white font-semibold mb-1">2. Verantwortlicher (Art. 13 DSGVO)</p>
            <p>Sevo Dienstleistungen, Ulm · Telefon: +49 1522 9003063</p>
          </div>
          <div>
            <p className="text-off-white font-semibold mb-1">3. WhatsApp-Links</p>
            <p>
              Durch Klick auf unsere WhatsApp-Links werden Sie zur Plattform von Meta Platforms
              Ireland Limited weitergeleitet. Für die dortige Datenverarbeitung gilt die
              WhatsApp-Datenschutzrichtlinie. Wir haben keinen Einfluss auf die Datenerhebung
              durch WhatsApp.
            </p>
          </div>
          <div>
            <p className="text-off-white font-semibold mb-1">4. Hosting</p>
            <p>
              Diese Website wird statisch gehostet. Es werden keine Server-Logs mit
              personenbezogenen Daten durch uns gespeichert.
            </p>
          </div>
          <div>
            <p className="text-off-white font-semibold mb-1">5. Ihre Rechte (Art. 15–22 DSGVO)</p>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer
              personenbezogenen Daten. Da wir keine Daten erheben, ist dies deklaratorisch.
              Bei Fragen: +49 1522 9003063.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
