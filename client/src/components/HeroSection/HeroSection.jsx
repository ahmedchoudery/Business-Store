// client/src/components/HeroSection/HeroSection.jsx
import { useState, useEffect, Suspense, lazy } from 'react'
import ErrorBoundary from '../Errorboundary/Errorboundary'
import './HeroSection.css'

const Hero3DCanvas = lazy(() => import('./Hero3DCanvas'))

const roles = ['YOUR BUSINESS', 'RESTAURANTS', 'BOUTIQUES', 'CLINICS', 'WEDDING HALLS', 'REAL ESTATE']

const stats = [
    { value: '15+', label: 'Projects' },
    { value: '100%', label: 'Satisfaction' },
    { value: '3d', label: 'Avg. Delivery' },
    { value: '24/7', label: 'Support' },
]

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0)
    const [fade, setFade] = useState(true)

    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false)
            setTimeout(() => { setRoleIndex(i => (i + 1) % roles.length); setFade(true) }, 380)
        }, 2800)
        return () => clearInterval(timer)
    }, [])

    return (
        <section id="hero" className="hero">
            {/* 3D canvas — isolated so a crash here never blanks the page */}
            <ErrorBoundary fallback={null}>
                <Suspense fallback={null}>
                    <Hero3DCanvas />
                </Suspense>
            </ErrorBoundary>

            <div className="container">
                <div className="hero__inner">

                    {/* LEFT — copy */}
                    <div className="hero__left">
                        <div className="hero__badge animate-fade-up animate-delay-1">
                            <span className="hero__badge-dot" />
                            <span>Available for projects · 🇵🇰 Pakistan</span>
                        </div>

                        <h1 className="hero__h1 animate-fade-up animate-delay-2">
                            <span className="hero__line1">WEBSITES</span>
                            <span className="hero__line2">THAT GROW</span>
                            {/* SEO-stable text — always readable by crawlers */}
                            <span className="hero__cycle-static">Pakistani Businesses</span>
                            {/* Animated overlay */}
                            <span
                                aria-hidden="true"
                                className="hero__cycle"
                                style={{
                                    opacity: fade ? 1 : 0,
                                    transform: fade ? 'translateY(0)' : 'translateY(-16px)',
                                }}
                            >
                                {roles[roleIndex]}
                            </span>
                        </h1>

                        <p className="hero__body animate-fade-up animate-delay-3">
                            I craft fast, modern, SEO-optimized websites for Pakistani businesses.
                            From Karachi to Lahore — your brand deserves a powerful digital presence.
                        </p>

                        <div className="hero__actions animate-fade-up animate-delay-4">
                            <button
                                className="btn btn-primary"
                                onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                See Real Results →
                            </button>
                            <a
                                href="https://wa.me/923174307043?text=Hi%20Ahmed%2C%20I%20need%20a%20website%20for%20my%20business"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>

                        <div className="hero__stats animate-fade-up animate-delay-5">
                            {stats.map(s => (
                                <div key={s.value} className="hero__stat">
                                    <div className="hero__stat-val">{s.value}</div>
                                    <div className="hero__stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — floating metric card */}
                    <div className="hero__right animate-fade-up animate-delay-3">
                        <div className="hero__card">
                            <div className="hero__card-top">
                                <div className="hero__card-avatar">A</div>
                                <div>
                                    <div className="hero__card-name">Ahmed · Dev</div>
                                    <div className="hero__card-role">Full-Stack Web Developer</div>
                                </div>
                            </div>
                            <div className="hero__card-divider" />
                            {[
                                ['Projects Delivered', '15+'],
                                ['Avg. Page Speed', '96 / 100'],
                                ['Client Satisfaction', '100%'],
                                ['Response Time', '< 2 hrs'],
                            ].map(([label, val]) => (
                                <div key={label} className="hero__card-metric">
                                    <span className="hero__card-metric-label">{label}</span>
                                    <span className="hero__card-metric-val">{val}</span>
                                </div>
                            ))}
                            <div className="hero__card-tags">
                                {['React', 'Next.js', 'Node.js', 'SEO', 'Tailwind'].map(t => (
                                    <span key={t} className="hero__card-tag">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll indicator */}
            <div aria-hidden="true" className="hero__scroll-indicator">
                <span>SCROLL</span>
                <div className="hero__scroll-line" />
            </div>
        </section>
    )
}