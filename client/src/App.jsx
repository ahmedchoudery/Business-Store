
// FILE: client/src/App.jsx
// ErrorBoundary wraps every section so one crash never blanks the entire page.

import ErrorBoundary from './components/Errorboundary/Errorboundary';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import CustomCursor from './components/CustomCursor/CustomCursor';
import PageLoader from './components/PageLoader/PageLoader';
import WhatsAppFAB from './components/WhatsAppFAB/WhatsAppFAB';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import TrustedSection from './components/TrustedSection/TrustedSection';
import ServicesSection from './components/ServicesSection/ServicesSection';
import ProcessSection from './components/ProcessSection/ProcessSection';
import PortfolioSection from './components/PortfolioSection/PortfolioSection';
import CaseStudySection from './components/CaseStudySection/CaseStudySection';
import SkillsSection from './components/SkillsSection/SkillsSection';
import TechStackSection from './components/TechStackSection/TechStackSection';
import StatsSection from './components/StatsSection/StatsSection';
import WhyMeSection from './components/WhyMeSection/WhyMeSection';
import TimelineSection from './components/TimelineSection/TimelineSection';
import PricingSection from './components/PricingSection/PricingSection';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import CTASection from './components/CTASection/CTASection';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';

const safe = (Component) => (
  <ErrorBoundary>
    <Component />
  </ErrorBoundary>
);

export default function App() {
  return (
    <PageLoader>
      <ErrorBoundary fallback={null}><ScrollProgress /></ErrorBoundary>
      <ErrorBoundary fallback={null}><CustomCursor /></ErrorBoundary>
      <ErrorBoundary fallback={null}><WhatsAppFAB /></ErrorBoundary>
      <ErrorBoundary fallback={null}><Navbar /></ErrorBoundary>
      <main>
        {safe(HeroSection)}
        {safe(TrustedSection)}
        {safe(ServicesSection)}
        {safe(ProcessSection)}
        {safe(PortfolioSection)}
        {safe(CaseStudySection)}
        {safe(SkillsSection)}
        {safe(TechStackSection)}
        {safe(StatsSection)}
        {safe(WhyMeSection)}
        {safe(TimelineSection)}
        {safe(PricingSection)}
        {safe(TestimonialsSection)}
        {safe(CTASection)}
        {safe(ContactSection)}
      </main>
      <ErrorBoundary><Footer /></ErrorBoundary>
    </PageLoader>
  );
}
