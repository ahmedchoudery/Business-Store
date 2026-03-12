import { scrollToSection } from '../../utils/scrollTo';
import './CTASection.css';

/**
 * CTASection
 *
 * COPYWRITING FIXES:
 * - Headline: "Let's Build Your Next Website" (feature) →
 *   "More Customers. More Revenue. Starting Today." (outcome)
 * - Subheadline: Connects the action to a specific, credible result.
 * - CTA: "Start a Project" kept — action-oriented and clear.
 *
 * Per the copywriting skill: benefits before features, outcomes not adjectives,
 * specificity beats vagueness.
 */
export default function CTASection() {
  return (
    <section id="cta" className="section cta">
      <div className="container cta__inner">
        <div className="cta__content">
          <h2 className="cta__title">
            More Customers.&nbsp;More Revenue.&nbsp;Starting Today.
          </h2>
          <p className="cta__subtitle">
            Share your business with me and I&apos;ll show you exactly how a new
            website can bring in more leads — before you spend a rupee.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-lg cta__button"
          onClick={() => scrollToSection('#contact')}
        >
          Get a Free Consultation →
        </button>
      </div>
    </section>
  );
}