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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <span className="text-gold font-extrabold text-2xl tracking-widest">SEVO</span>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-200 px-4 py-2 text-sm font-semibold rounded"
        >
          Jetzt Anfragen
        </a>
      </div>
    </nav>
  )
}
