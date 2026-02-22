import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import ServicesSection from './components/ServicesSection/ServicesSection';
import WhyMeSection from './components/WhyMeSection/WhyMeSection';
import PortfolioSection from './components/PortfolioSection/PortfolioSection';
import PricingSection from './components/PricingSection/PricingSection';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';
import WhatsAppFAB from './components/WhatsAppFAB/WhatsAppFAB';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyMeSection />
        <PortfolioSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
