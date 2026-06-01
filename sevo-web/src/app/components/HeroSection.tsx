'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const WA_URL =
  'https://wa.me/4915229003063?text=Hallo%20Sevo%2C%20ich%20m%C3%B6chte%20eine%20unverbindliche%20Anfrage%20stellen.'

export default function HeroSection() {
  const stageRef       = useRef<HTMLDivElement>(null)
  const tiltRef        = useRef<HTMLDivElement>(null)
  const rafParallaxRef = useRef<number>(0)

  // Mouse parallax tilt — pure GPU transform, idle-aware, no jank.
  useEffect(() => {
    const stage = stageRef.current
    const tilt  = tiltRef.current
    if (!stage || !tilt) return

    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0
    let running = false

    const start = () => { if (!running) { running = true; tick() } }

    const tick = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      tilt.style.transform =
        `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`
      if (Math.abs(targetX - currentX) < 0.01 && Math.abs(targetY - currentY) < 0.01) {
        running = false
        return
      }
      rafParallaxRef.current = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      const r  = stage.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width  - 0.5
      const ny = (e.clientY - r.top)  / r.height - 0.5
      targetX =  ny * 8
      targetY = -nx * 8
      start()
    }
    const onLeave = () => { targetX = 0; targetY = 0; start() }

    stage.addEventListener('mousemove', onMove)
    stage.addEventListener('mouseleave', onLeave)
    return () => {
      running = false
      cancelAnimationFrame(rafParallaxRef.current)
      stage.removeEventListener('mousemove', onMove)
      stage.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      ref={stageRef}
      className="relative min-h-screen bg-white flex items-center pt-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full py-12">

        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="order-2 lg:order-1 relative z-10"
        >
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Ulm &amp; Umgebung
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy leading-tight mb-6">
            Alles aus <span className="text-gold">einer Hand!</span>
          </h1>
          <p className="text-navy/60 text-lg mb-8 max-w-md leading-relaxed">
            Kfz-Service, Hausrenovierung, Gebrauchtwarenhandel und Reinigung —
            Ihr zuverlässiger Partner in Ulm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-navy font-bold px-8 py-4 rounded text-center hover:bg-gold/90 transition-all duration-200 text-lg shadow-lg shadow-gold/20"
            >
              Unverbindliche Anfrage
            </a>
            <a
              href="tel:+4915229003063"
              className="border border-navy/20 text-navy px-8 py-4 rounded text-center hover:border-gold hover:text-gold transition-all duration-200 text-lg"
            >
              ☎ Anrufen
            </a>
          </div>
        </motion.div>

        {/* Right: self-playing video, multiply-blended onto white */}
        <div
          className="order-1 lg:order-2 flex items-center justify-center"
          style={{ perspective: '1400px' }}
        >
          <div
            ref={tiltRef}
            className="w-full will-change-transform"
            style={{ transformOrigin: 'center center' }}
          >
            <video
              src="/assets/hero-transition.mp4"
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/hero.png"
              className="w-full h-auto max-h-[80vh] object-contain select-none pointer-events-none"
              style={{ mixBlendMode: 'multiply', filter: 'brightness(1.13) contrast(1.02)' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#leistungen"
        aria-label="Nach unten scrollen"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-navy/30 hover:text-gold transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <span className="animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </a>
    </section>
  )
}
