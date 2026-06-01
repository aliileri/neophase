'use client'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ImpressumModal({ open, onClose }: Props) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="impressum-title"
    >
      <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" />
      <div
        className="relative bg-white border border-gold/30 rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-navy/40 hover:text-navy transition-colors text-3xl leading-none"
          aria-label="Schließen"
        >
          ×
        </button>
        <h2 id="impressum-title" className="text-navy font-bold text-2xl mb-6">Impressum</h2>
        <div className="text-navy/70 text-sm space-y-4 leading-relaxed">
          <div>
            <p className="text-navy font-semibold mb-1">Angaben gemäß § 5 TMG</p>
            <p>Sevo Dienstleistungen</p>
            <p>Ulm, Baden-Württemberg, Deutschland</p>
          </div>
          <div>
            <p className="text-navy font-semibold mb-1">Kontakt</p>
            <p>
              Telefon:{' '}
              <a href="tel:+4915229003063" className="text-gold hover:underline">
                +49 1522 9003063
              </a>
            </p>
            <p>
              WhatsApp:{' '}
              <a
                href="https://wa.me/4915229003063"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                +49 1522 9003063
              </a>
            </p>
          </div>
          <div>
            <p className="text-navy font-semibold mb-1">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </p>
            <p>Sevo Dienstleistungen, Ulm</p>
          </div>
          <div>
            <p className="text-navy font-semibold mb-1">Haftungsausschluss</p>
            <p>
              Die Inhalte dieser Webseite wurden sorgfältig erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr.
            </p>
          </div>
          <div>
            <p className="text-navy font-semibold mb-1">Streitschlichtung</p>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
              (OS) bereit: https://ec.europa.eu/consumers/odr. Wir nehmen nicht an einem
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
