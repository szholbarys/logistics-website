import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/home/hero-section'
import { StatsSection } from '@/components/home/stats-section'
import { MaterialsSection } from '@/components/home/materials-section'
import { CtaSection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <MaterialsSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
