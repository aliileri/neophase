'use client'
import { useEffect, useState } from 'react'

const WA_URL =
  'https://wa.me/4915229003063?text=Hallo%20Sevo%2C%20ich%20m%C3%B6chte%20eine%20unverbindliche%20Anfrage%20stellen.'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-[200] transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <span className="text-navy font-extrabold text-2xl tracking-widest">SEVO</span>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-navy hover:bg-gold/90 transition-all duration-200 px-4 py-2 text-sm font-semibold rounded shadow-sm"
        >
          Jetzt Anfragen
        </a>
      </div>
    </nav>
  )
}
