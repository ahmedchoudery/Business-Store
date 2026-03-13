import { useRef, useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './CTASection.css'

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '923174307043'

export default function CTASection() {
  const { ref, visible } = useScrollReveal({ threshold: 0.3 })
  const orbRef = useRef(null)

  /* ── Scroll parallax on the orb ── */
  useEffect(() => {
    const onScroll = () => {
      if (!orbRef.current) return
      const section = orbRef.current.closest('section')
      if (!section) return
      const rect = section.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const vy = window.innerHeight / 2
      const pct = (center - vy) / vy
      orbRef.current.style.transform = `translate(-50%, calc(-50% + ${pct * 40}px))`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Ahmed! I'm interested in a website for my business.")}`

  return (
    <section className="cta" id="cta">
      {/* Scanline texture overlay */}
      <div className="cta__scanlines" />
      {/* Grid lines */}
      <div className="cta__grid" />
      {/* Parallax orb */}
      <div className="cta__orb" ref={orbRef} />

      <div className="container">
        <div className={`cta__inner reveal${visible ? ' visible' : ''}`} ref={ref}>

          {/* Top tag */}
          <div className="cta__mono">// ready to build something great?</div>

          <h2 className="cta__title">
            Start Your Project<br />
            <span className="cta__title-accent">Today.</span>
          </h2>

          <p className="cta__sub">
            Let's turn your business idea into a fast, modern website that actually brings you customers.
            Free consultation — no commitments.
          </p>

          {/* Buttons */}
          <div className="cta__actions">
            <button className="btn btn-primary btn-lg cta__btn-primary" onClick={nav}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
              $ get.started()
            </button>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.444h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.447z" /></svg>
              WhatsApp Now
            </a>
          </div>

          {/* Feature pills */}
          <div className="cta__features">
            {['Free Consultation', '3-Day Delivery', '100% Satisfaction', 'PKR 15,000+'].map(f => (
              <div key={f} className="cta__feature">
                <span className="cta__feature-check">✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}