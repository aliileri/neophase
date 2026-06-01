import ServiceCard from './ServiceCard'

const SERVICES = [
  {
    icon: '🚗',
    title: 'Kfz-Service & Handel',
    description:
      'Reparatur, Inspektion, An- und Verkauf von Fahrzeugen. Schnell, zuverlässig und zu fairen Preisen in Ulm und Umgebung.',
    whatsappText: 'Hallo Sevo, ich interessiere mich für Ihren Kfz-Service & Handel.',
  },
  {
    icon: '🏠',
    title: 'Hausrenovierung',
    description:
      'Trockenbau, Malerarbeiten, Bodenbelag und mehr – komplette Renovierungen termingerecht und aus einer Hand.',
    whatsappText: 'Hallo Sevo, ich interessiere mich für Ihre Hausrenovierungs-Dienstleistungen.',
  },
  {
    icon: '📦',
    title: 'Gebrauchtwarenhandel',
    description:
      'Möbel, Haushaltsgeräte und mehr – günstig kaufen und verkaufen. Haushaltsauflösungen auf Anfrage.',
    whatsappText: 'Hallo Sevo, ich interessiere mich für Ihren Gebrauchtwarenhandel.',
  },
  {
    icon: '✨',
    title: 'Professionelle Reinigung',
    description:
      'Büro-, Haushalts- und Endreinigung nach höchstem Standard. Pünktlich, gründlich und mit Garantie.',
    whatsappText: 'Hallo Sevo, ich interessiere mich für Ihre Reinigungsdienstleistungen.',
  },
]

export default function ServicesSection() {
  return (
    <section id="leistungen" className="bg-navy py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-off-white mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-off-white/40 max-w-xl mx-auto">
            Vier Kernbereiche — ein Ansprechpartner. Alles aus einer Hand in Ulm.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
