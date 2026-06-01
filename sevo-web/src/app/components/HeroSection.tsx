'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const WA_URL =
  'https://wa.me/4915229003063?text=Hallo%20Sevo%2C%20ich%20m%C3%B6chte%20eine%20unverbindliche%20Anfrage%20stellen.'

// Internal canvas resolution. 600 stays crisp at the ~560px display size
// while cutting per-frame pixel work by ~64% vs 1000 → kills the jank.
const SIZE = 600

// Radial feather so the rectangular video edges melt into the navy
// background instead of reading as an isolated box.
const FEATHER_MASK =
  'radial-gradient(ellipse 76% 76% at 50% 44%, #000 48%, rgba(0,0,0,0.55) 66%, transparent 82%)'

export default function HeroSection() {
  const sectionRef     = useRef<HTMLElement>(null)
  const videoRef       = useRef<HTMLVideoElement>(null)
  const canvasRef      = useRef<HTMLCanvasElement>(null)
  const stageRef       = useRef<HTMLDivElement>(null)
  const rafChromaRef   = useRef<number>(0)
  const rafParallaxRef = useRef<number>(0)

  // ── 1. Canvas chroma-key: saturation-based neutral removal ─────────
  useEffect(() => {
    const video  = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let lastTime = -1

    const processFrame = () => {
      // Only reprocess when the frame actually advanced (idle = free).
      if (video.currentTime !== lastTime && video.readyState >= 2) {
        lastTime = video.currentTime
        ctx.clearRect(0, 0, SIZE, SIZE)
        ctx.drawImage(video, 0, 0, SIZE, SIZE)

        const imageData = ctx.getImageData(0, 0, SIZE, SIZE)
        const d = imageData.data

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2]
          const maxC = Math.max(r, g, b)
          const minC = Math.min(r, g, b)
          const sat  = maxC > 0 ? (maxC - minC) / maxC : 0
          const lum  = (r + g + b) / 3

          // Neutral (low-saturation) AND bright → it's the studio backdrop.
          // Coloured / golden / navy model pixels are high-sat → kept.
          if (sat < 0.16 && lum > 140) {
            const t = Math.min((lum - 140) / 60, 1) // feather 140 → 200
            d[i + 3] = Math.round((1 - t) * 255)
          }
        }

        ctx.putImageData(imageData, 0, 0)
      }

      rafChromaRef.current = requestAnimationFrame(processFrame)
    }

    processFrame()
    return () => cancelAnimationFrame(rafChromaRef.current)
  }, [])

  // ── 2. GSAP scroll-scrub (CSS sticky, no pin → layout stays intact) ─
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

  // ── 3. Mouse parallax tilt (idle-aware to avoid pointless writes) ───
  useEffect(() => {
    const stage  = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return

    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0
    let running = false

    const start = () => {
      if (running) return
      running = true
      tick()
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      canvas.style.transform =
        `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`

      // Settle → stop the loop until the next interaction.
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
      targetX =  ny * 12
      targetY = -nx * 12
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
    <section ref={sectionRef} className="relative bg-navy" style={{ height: '300vh' }}>

      {/* Hidden video — sole source for canvas + scrub */}
      <video
        ref={videoRef}
        src="/assets/hero-transition.mp4"
        muted
        playsInline
        preload="auto"
        className="hidden"
        aria-hidden="true"
      />

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">
              Ulm &amp; Umgebung
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-off-white leading-tight mb-6">
              Alles aus <span className="text-gold">einer Hand!</span>
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

          {/* Right: 3D canvas stage */}
          <div
            ref={stageRef}
            className="order-1 lg:order-2 relative flex items-center justify-center"
            style={{ perspective: '1200px' }}
          >
            {/* Ambient radial glow — anchors the asset into the scene */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 50% 46%, rgba(212,175,55,0.14) 0%, rgba(37,99,235,0.06) 38%, transparent 68%)',
                filter: 'blur(8px)',
              }}
            />
            <canvas
              ref={canvasRef}
              width={SIZE}
              height={SIZE}
              className="relative w-full max-w-[560px] h-auto"
              style={{
                transformOrigin: 'center center',
                willChange: 'transform',
                maskImage: FEATHER_MASK,
                WebkitMaskImage: FEATHER_MASK,
              }}
            />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
          <span className="text-off-white/25 text-xs tracking-widest uppercase">Scroll</span>
          <div className="text-off-white/25 animate-bounce">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  )
}
