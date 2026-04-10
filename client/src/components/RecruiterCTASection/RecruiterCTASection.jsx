import { useRef, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import '../CTASection/CTASection.css';

export default function RecruiterCTASection({ cta, onCopyLink, personalized }) {
  const { ref, visible } = useScrollReveal({ threshold: 0.3 });
  const orbRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!orbRef.current) return;
      const section = orbRef.current.closest('section');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const vy = window.innerHeight / 2;
      const pct = (center - vy) / vy;
      orbRef.current.style.transform = `translate(-50%, calc(-50% + ${pct * 40}px))`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  const navPersonalize = () => document.querySelector('#personalize')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="cta" id="cta">
      <div className="cta__scanlines" />
      <div className="cta__grid" />
      <div className="cta__orb" ref={orbRef} />

      <div className="container">
        <div className={`cta__inner reveal${visible ? ' visible' : ''}`} ref={ref}>
          <div className="cta__mono">// recruiter-ready portfolio mode</div>

          <h2 className="cta__title">
            {cta.title}
            <br />
            <span className="cta__title-accent">Today.</span>
          </h2>

          <p className="cta__sub">{cta.subtitle}</p>

          <div className="cta__actions">
            <button className="btn btn-primary btn-lg cta__btn-primary" onClick={navContact}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
              {cta.primaryLabel}
            </button>
            <button type="button" onClick={personalized ? onCopyLink : navPersonalize} className="btn btn-whatsapp btn-lg">
              {cta.secondaryLabel}
            </button>
          </div>

          <div className="cta__features">
            {['Shareable recruiter links', 'Role-based ranking', 'AI-ready personalization', 'Saved context in contact form'].map((feature) => (
              <div key={feature} className="cta__feature">
                <span className="cta__feature-check">+</span>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
