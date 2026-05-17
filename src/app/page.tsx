import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import About from '@/components/About'
import Programs from '@/components/Programs'
import Strengths from '@/components/Strengths'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <Programs />
      <Strengths />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
