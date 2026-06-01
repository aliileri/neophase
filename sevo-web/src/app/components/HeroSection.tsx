'use client'
import { motion } from 'framer-motion'

const WA_URL =
  'https://wa.me/4915229003063?text=Hallo%20Sevo%2C%20ich%20m%C3%B6chte%20eine%20unverbindliche%20Anfrage%20stellen.'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-navy flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 w-full">

        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="order-2 lg:order-1"
        >
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Ulm &amp; Umgebung
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-off-white leading-tight mb-6">
            Alles aus{' '}
            <span className="text-gold">einer Hand!</span>
          </h1>
          <p className="text-off-white/60 text-lg mb-8 max-w-md leading-relaxed">
            Kfz-Service, Hausrenovierung, Gebrauchtwarenhandel und Reinigung —
            Ihr zuverlässiger Partner in Ulm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-navy font-bold px-8 py-4 rounded text-center hover:bg-gold/90 transition-all duration-200 text-lg"
            >
              Unverbindliche Anfrage
            </a>
            <a
              href="tel:+4915229003063"
              className="border border-off-white/30 text-off-white px-8 py-4 rounded text-center hover:border-gold hover:text-gold transition-all duration-200 text-lg"
            >
              ☎ Anrufen
            </a>
          </div>
        </motion.div>

        {/* Right: Video */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="order-1 lg:order-2"
        >
          <div className="relative rounded-2xl overflow-hidden border border-gold/30 shadow-[0_0_60px_rgba(212,175,55,0.12)]">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/hero.png"
              className="w-full h-auto max-h-[520px] object-cover"
            >
              <source src="/assets/hero-transition.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-off-white/30 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
