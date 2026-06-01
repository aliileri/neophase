'use client'
import { useState } from 'react'
import ImpressumModal from './ImpressumModal'
import DatenschutzModal from './DatenschutzModal'

export default function Footer() {
  const [impressumOpen, setImpressumOpen] = useState(false)
  const [datenschutzOpen, setDatenschutzOpen] = useState(false)

  return (
    <>
      <ImpressumModal open={impressumOpen} onClose={() => setImpressumOpen(false)} />
      <DatenschutzModal open={datenschutzOpen} onClose={() => setDatenschutzOpen(false)} />

      <footer className="bg-[#060f1e] border-t border-off-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <span className="text-gold font-extrabold text-2xl tracking-widest block mb-3">SEVO</span>
              <p className="text-off-white/40 text-sm max-w-xs leading-relaxed">
                Ihr zuverlässiger Dienstleistungspartner in Ulm und Umgebung.
              </p>
              <p className="text-off-white/40 text-sm mt-3">📍 Ulm, Baden-Württemberg</p>
              <p className="text-off-white/40 text-sm">
                📞{' '}
                <a href="tel:+4915229003063" className="hover:text-gold transition-colors">
                  +49 1522 9003063
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end justify-center">
              <button
                onClick={() => setImpressumOpen(true)}
                className="text-off-white/50 hover:text-gold transition-colors text-sm underline underline-offset-4 text-left sm:text-right"
              >
                Impressum
              </button>
              <button
                onClick={() => setDatenschutzOpen(true)}
                className="text-off-white/50 hover:text-gold transition-colors text-sm underline underline-offset-4 text-left sm:text-right"
              >
                Datenschutz
              </button>
            </div>
          </div>
          <div className="border-t border-off-white/5 pt-6 text-center">
            <p className="text-off-white/20 text-xs">
              © 2025 Sevo Dienstleistungen · Alle Rechte vorbehalten
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
