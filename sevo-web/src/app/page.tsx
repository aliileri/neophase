import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import ReviewsSection from './components/ReviewsSection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ReviewsSection />
      <CtaSection />
      <Footer />
      <WhatsAppFab />
    </main>
  )
}
