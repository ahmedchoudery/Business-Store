import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <About />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}