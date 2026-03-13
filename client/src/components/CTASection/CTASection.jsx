// FILE: client/src/components/CTASection/CTASection.jsx

import { useRef, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './CTASection.css';

export default function CTASection() {
  const { ref, visible } = useScrollReveal({ threshold: 0.3 });
  const bgRef = useRef(null);

  // Parallax scroll effect on bg orb
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const rect = bgRef.current.closest('section')?.getBoundingClientRect();
      if (!rect) return;
      const pct = 1 - (rect.top / window.innerHeight);
      bgRef.current.style.transform = `translate(-50%, calc(-50% + ${pct * 40}px))`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="cta" className="cta">
      {/* Parallax bg orb */}
      <div ref={bgRef} className="cta__orb" />
      <div className="cta__grid-lines" />

      <div className="container">
        <div ref={ref} className={`cta__inner ${visible ? 'cta__inner--visible' : ''}`}>
          <span className="section-label">Ready to Start?</span>
          <h2 className="cta__title">
            Let's Build Something<br />
            <span className="gradient-text">Incredible Together</span>
          </h2>
          <p className="cta__body">
            From idea to launch in days. Get a fast, beautiful, SEO-powered website that
            wins customers and grows your business across Pakistan.
          </p>
          <div className="cta__actions">
            <a
              href="https://wa.me/923174307043?text=Hi%20Ahmed%2C%20I%20want%20to%20start%20a%20project"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              💬 Start on WhatsApp
            </a>
            <a
              href="mailto:ahmedchoudery30@gmail.com"
              className="btn btn-ghost btn-lg"
            >
              ✉️ Send an Email
            </a>
          </div>
          <div className="cta__trust">
            <span>🚀 Fast delivery</span>
            <span>·</span>
            <span>✅ 100% satisfaction</span>
            <span>·</span>
            <span>🔒 Secure & reliable</span>
          </div>
        </div>
      </div>
    </section>
  );
}