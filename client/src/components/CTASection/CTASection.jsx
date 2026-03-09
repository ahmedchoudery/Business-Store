import { scrollToSection } from '../../utils/scrollTo';
import './CTASection.css';

export default function CTASection() {
  return (
    <section id="cta" className="section cta">
      <div className="container cta__inner">
        <div className="cta__content">
          <h2 className="cta__title">Let&apos;s Build Your Next Website</h2>
          <p className="cta__subtitle">
            Tell me about your business and I&apos;ll design a website that helps you win more customers.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-lg cta__button"
          onClick={() => scrollToSection('#contact')}
        >
          Start a Project
        </button>
      </div>
    </section>
  );
}

