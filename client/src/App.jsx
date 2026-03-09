import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import TrustedSection from './components/TrustedSection/TrustedSection';
import PortfolioSection from './components/PortfolioSection/PortfolioSection';
import ProcessSection from './components/ProcessSection/ProcessSection';
import SkillsSection from './components/SkillsSection/SkillsSection';
import TechStackSection from './components/TechStackSection/TechStackSection';
import CaseStudySection from './components/CaseStudySection/CaseStudySection';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import WhyMeSection from './components/WhyMeSection/WhyMeSection';
import CTASection from './components/CTASection/CTASection';
import PricingSection from './components/PricingSection/PricingSection';
import ContactSection from './components/ContactSection/ContactSection';
import StatsSection from './components/StatsSection/StatsSection';
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
        <TrustedSection />
        <PortfolioSection />
        <ProcessSection />
        <SkillsSection />
        <TechStackSection />
        <CaseStudySection />
        <TestimonialsSection />
        <WhyMeSection />
        <CTASection />
        <StatsSection />
        <TimelineSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFAB />
    </PageLoader>
  );
}
