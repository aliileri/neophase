'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const WA_URL =
  'https://wa.me/4915229003063?text=Hallo%20Sevo%2C%20ich%20m%C3%B6chte%20eine%20unverbindliche%20Anfrage%20stellen.'

export default function HeroSection() {
  const sectionRef     = useRef<HTMLElement>(null)
  const stageRef       = useRef<HTMLDivElement>(null)
  const videoRef       = useRef<HTMLVideoElement>(null)
  const tiltRef        = useRef<HTMLDivElement>(null)
  const rafParallaxRef = useRef<number>(0)

  // ── GSAP scroll-scrub: map scroll progress → video.currentTime ─────
  // No canvas, no pixel processing. The video plays at full native
  // resolution on the white page and blends seamlessly.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const triggers: Array<{ kill: () => void }> = []

    ;(async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const video   = videoRef.current
      const section = sectionRef.current
      if (!video || !section) return

      const setup = () => {
        const duration = video.duration || 3
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start:   'top top',
            end:     'bottom bottom',
            scrub:   1.2,
            onUpdate: (self) => {
              video.currentTime = self.progress * duration
            },
          })
        )
      }

      if (video.readyState >= 1) setup()
      else video.addEventListener('loadedmetadata', setup, { once: true })
    })()

    return () => triggers.forEach((t) => t.kill())
  }, [])

  // ── Mouse parallax tilt (idle-aware) ───────────────────────────────
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
      targetX =  ny * 10
      targetY = -nx * 10
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
    <section ref={sectionRef} className="relative bg-white" style={{ height: '300vh' }}>

      {/* Sticky full-screen stage */}
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-center pt-20 lg:pt-16">

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

          {/* Right: full-resolution video, blends on white */}
          <div
            className="order-1 lg:order-2 flex items-center justify-center h-full"
            style={{ perspective: '1400px' }}
          >
            <div
              ref={tiltRef}
              className="w-full will-change-transform"
              style={{ transformOrigin: 'center center' }}
            >
              <video
                ref={videoRef}
                src="/assets/hero-transition.mp4"
                muted
                playsInline
                preload="auto"
                poster="/assets/hero.png"
                className="w-full h-auto max-h-[85vh] object-contain select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
          <span className="text-navy/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="text-navy/30 animate-bounce">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  )
}
