import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Sevo Dienstleistungen – Kfz, Renovierung, Reinigung in Ulm',
  description:
    'Ihr zuverlässiger Dienstleister in Ulm: Kfz-Service & Handel, Hausrenovierung, Gebrauchtwarenhandel und professionelle Reinigung – alles aus einer Hand.',
  keywords: 'Kfz Service Ulm, Hausrenovierung Ulm, Reinigung Ulm, Gebrauchtwarenhandel Ulm',
  openGraph: {
    title: 'Sevo Dienstleistungen – Alles aus einer Hand!',
    description: 'Kfz, Renovierung, Reinigung & mehr in Ulm',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="bg-navy text-off-white antialiased">{children}</body>
    </html>
  )
}
