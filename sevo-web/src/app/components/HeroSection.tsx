'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const WA_URL =
  'https://wa.me/4915229003063?text=Hallo%20Sevo%2C%20ich%20m%C3%B6chte%20eine%20unverbindliche%20Anfrage%20stellen.'

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const stageRef    = useRef<HTMLDivElement>(null)
  const rafChromaRef   = useRef<number>(0)
  const rafParallaxRef = useRef<number>(0)

  // ── 1. Canvas Chroma-Key RAF loop ──────────────────────────────────
  useEffect(() => {
    const video  = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let lastTime = -1

    const processFrame = () => {
      if (video.currentTime !== lastTime) {
        lastTime = video.currentTime

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const d = imageData.data

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2]

          // Feathered key: starts fading at 210, fully transparent at 235+
          if (r > 210 && g > 210 && b > 210) {
            const t = Math.min((Math.min(r, g, b) - 210) / 25, 1)
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

  // ── 2. GSAP ScrollTrigger scroll-scrub ────────────────────────────
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
            end:     `+=${window.innerHeight * 2.5}`,
            pin:     true,
            scrub:   1.2,
            onUpdate: (self) => {
              video.currentTime = self.progress * duration
            },
          })
        )
      }

      if (video.readyState >= 1) {
        setup()
      } else {
        video.addEventListener('loadedmetadata', setup, { once: true })
      }
    })()

    return () => triggers.forEach((t) => t.kill())
  }, [])

  // ── 3. Mouse Parallax Tilt ─────────────────────────────────────────
  useEffect(() => {
    const stage  = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return

    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0
    let running = true

    const onMove = (e: MouseEvent) => {
      const r  = stage.getBoundingClientRect()
      const nx = (e.clientX - r.left)  / r.width  - 0.5
      const ny = (e.clientY - r.top)   / r.height - 0.5
      targetX =  ny * 14
      targetY = -nx * 14
    }

    const onLeave = () => { targetX = 0; targetY = 0 }

    const tick = () => {
      if (!running) return
      currentX += (targetX - currentX) * 0.07
      currentY += (targetY - currentY) * 0.07
      canvas.style.transform =
        `rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg)`
      rafParallaxRef.current = requestAnimationFrame(tick)
    }

    tick()
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
      ref={sectionRef}
      className="relative min-h-screen bg-navy flex items-center pt-16 overflow-hidden"
    >
      {/* Hidden video — source for canvas + scroll scrub */}
      <video
        ref={videoRef}
        src="/assets/hero-transition.mp4"
        muted
        playsInline
        preload="auto"
        className="hidden"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 w-full">

        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="order-2 lg:order-1 z-10"
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
          className="order-1 lg:order-2 flex items-center justify-center"
          style={{ perspective: '1200px' }}
        >
          <canvas
            ref={canvasRef}
            width={1000}
            height={1000}
            className="w-full max-w-[520px] h-auto"
            style={{
              transformOrigin: 'center center',
              willChange: 'transform',
              // subtle ambient glow matching navy bg
              filter: 'drop-shadow(0 0 40px rgba(212,175,55,0.08))',
            }}
          />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
        <span className="text-off-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="text-off-white/30 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
