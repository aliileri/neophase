const REVIEWS = [
  {
    name: 'Klaus M.',
    location: 'Ulm',
    service: 'Kfz-Service',
    text: 'Super schnelle Kfz-Reparatur, fairer Preis. Gerne wieder!',
  },
  {
    name: 'Sabine K.',
    location: 'Neu-Ulm',
    service: 'Hausrenovierung',
    text: 'Badezimmer renoviert in 3 Tagen – sauber und professionell.',
  },
  {
    name: 'Thomas B.',
    location: 'Ulm',
    service: 'Gebrauchtwarenhandel',
    text: 'Tolle Gebrauchtware zum fairen Preis. Sehr empfehlenswert!',
  },
  {
    name: 'Monika R.',
    location: 'Ulm',
    service: 'Reinigung',
    text: 'Endreinigung nach Mietende – keine Beanstandungen. Danke!',
  },
  {
    name: 'Stefan H.',
    location: 'Blaustein',
    service: 'Kfz-Service',
    text: 'Zuverlässig, pünktlich, kommunikativ. Sevo macht alles möglich.',
  },
]

function Star() {
  return (
    <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export default function ReviewsSection() {
  return (
    <section id="bewertungen" className="bg-[#060f1e] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-off-white mb-4">
            Was unsere Kunden sagen
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2" aria-label="5 von 5 Sternen">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}
          </div>
          <p className="text-off-white/40 text-sm">5.0 · Über 50 zufriedene Kunden in Ulm</p>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="min-w-[275px] md:min-w-0 snap-start bg-off-white/5 backdrop-blur-sm border border-off-white/10 rounded-xl p-6 flex flex-col gap-3"
            >
              <div className="flex gap-0.5" aria-label="5 Sterne">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}
              </div>
              <p className="text-off-white/80 text-sm italic leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-auto pt-3 border-t border-off-white/10">
                <p className="text-off-white font-semibold text-sm">{r.name}</p>
                <p className="text-off-white/40 text-xs">{r.location} · {r.service}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
