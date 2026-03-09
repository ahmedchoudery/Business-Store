import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import StatsSection from './components/StatsSection/StatsSection';
import SkillsSection from './components/SkillsSection/SkillsSection';
import ServicesSection from './components/ServicesSection/ServicesSection';
import WhyMeSection from './components/WhyMeSection/WhyMeSection';
import PortfolioSection from './components/PortfolioSection/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import PricingSection from './components/PricingSection/PricingSection';
import ContactSection from './components/ContactSection/ContactSection';
import TimelineSection from './components/TimelineSection/TimelineSection';
import Footer from './components/Footer/Footer';
import WhatsAppFAB from './components/WhatsAppFAB/WhatsAppFAB';
import CustomCursor from './components/CustomCursor/CustomCursor';
import PageLoader from './components/PageLoader/PageLoader';

export default function App() {
  return (
    <PageLoader>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <SkillsSection />
        <ServicesSection />
        <WhyMeSection />
        <PortfolioSection />
        <TimelineSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFAB />
    </PageLoader>
  );
}
