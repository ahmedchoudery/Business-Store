import './CTASection.css';
import { scrollToSection } from '../../utils/scrollTo';

export default function CTASection() {
  return (
    <section id="cta" className="cta-section">
      <div className="container">
        <div className="cta__inner">
          <h2 className="cta__title">
            MORE CUSTOMERS.<br />MORE REVENUE.<br />STARTING TODAY.
          </h2>
          <p className="cta__sub">
            Share your business with me and I'll show you exactly how a new website
            can bring in more leads — before you spend a rupee.
          </p>
          <div className="cta__actions">
            <button className="btn btn-primary btn-lg" onClick={() => scrollToSection('#contact')}>
              Get a Free Consultation →
            </button>
            <a
              href="https://wa.me/923174307043?text=Hi%20Ahmed%2C%20I%20want%20to%20discuss%20a%20website"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              Start on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}