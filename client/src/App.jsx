import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/Errorboundary/Errorboundary';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import CustomCursor from './components/CustomCursor/CustomCursor';
import PageLoader from './components/PageLoader/PageLoader';
import WhatsAppFAB from './components/WhatsAppFAB/WhatsAppFAB';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';

const PersonalizationPanel = lazy(() => import('./components/PersonalizationPanel/PersonalizationPanel'));
const RecruiterPortfolioSection = lazy(() => import('./components/RecruiterPortfolioSection/RecruiterPortfolioSection'));
const RecruiterSkillsSection = lazy(() => import('./components/RecruiterSkillsSection/RecruiterSkillsSection'));
const RecruiterWhyMeSection = lazy(() => import('./components/RecruiterWhyMeSection/RecruiterWhyMeSection'));
const RecruiterTimelineSection = lazy(() => import('./components/RecruiterTimelineSection/RecruiterTimelineSection'));
const RecruiterCTASection = lazy(() => import('./components/RecruiterCTASection/RecruiterCTASection'));
const RecruiterContactSection = lazy(() => import('./components/RecruiterContactSection/RecruiterContactSection'));
const RecruiterFooter = lazy(() => import('./components/RecruiterFooter/RecruiterFooter'));
import { profile } from './data/portfolioContent';
import { usePortfolioPersonalization } from './hooks/usePortfolioPersonalization';

export default function App() {
  const {
    draftInput,
    view,
    loading,
    handleFieldChange,
    handleGenerate,
    handleReset,
    handleCopyLink,
  } = usePortfolioPersonalization();

  return (
    <ErrorBoundary>
      <PageLoader>
        <ScrollProgress />
        <CustomCursor />
        <WhatsAppFAB />
        <Navbar meta={view.meta} />
        <main>
          <HeroSection hero={view.hero} />
          <Suspense fallback={null}>
            <PersonalizationPanel
              input={draftInput}
              roleOptions={view.meta.recruiterRoleOptions}
              companyTypeOptions={view.meta.companyTypeOptions}
              activeMeta={view.meta}
              loading={loading}
              onFieldChange={handleFieldChange}
              onGenerate={handleGenerate}
              onReset={handleReset}
              onCopyLink={handleCopyLink}
            />
            <RecruiterPortfolioSection portfolio={view.portfolio} />
            <RecruiterSkillsSection skills={view.skills} />
            <RecruiterWhyMeSection whyMe={view.whyMe} />
            <RecruiterTimelineSection timelineData={view.timeline} />
            <RecruiterCTASection cta={view.cta} onCopyLink={handleCopyLink} personalized={view.meta.personalized} />
            <RecruiterContactSection
              contactView={view.contact}
              personalizationMeta={view.meta}
              personalizationInput={draftInput}
              contactDetails={profile.contact}
            />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <RecruiterFooter meta={view.meta} contactDetails={profile.contact} />
        </Suspense>
      </PageLoader>
    </ErrorBoundary>
  );
}
