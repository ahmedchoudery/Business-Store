import { useState, useEffect } from 'react'

const roles = ['Local Businesses', 'Restaurants', 'Boutiques', 'Medical Clinics', 'Wedding Halls', 'Real Estate']

const stats = [
    { value: '15+', label: 'Projects Delivered' },
    { value: '100%', label: 'Client Satisfaction' },
    { value: '3 Days', label: 'Avg. Delivery' },
    { value: '24/7', label: 'Support' },
]

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0)
    const [fade, setFade] = useState(true)

    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false)
            setTimeout(() => {
                setRoleIndex(i => (i + 1) % roles.length)
                setFade(true)
            }, 400)
        }, 2800)
        return () => clearInterval(timer)
    }, [])

    return (
        <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '120px',
            paddingBottom: '80px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Large ambient glow behind hero */}
            <div style={{
                position: 'absolute',
                top: '10%', left: '50%',
                transform: 'translateX(-50%)',
                width: '800px', height: '400px',
                background: 'radial-gradient(ellipse, rgba(0,229,255,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Decorative corner element */}
            <div style={{
                position: 'absolute',
                top: '80px', right: '40px',
                width: '220px', height: '220px',
                border: '1px solid rgba(0,229,255,0.1)',
                borderRadius: '50%',
                animation: 'spin-slow 30s linear infinite',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                top: '120px', right: '80px',
                width: '140px', height: '140px',
                border: '1px solid rgba(0,229,255,0.06)',
                borderRadius: '50%',
                animation: 'spin-slow 20s linear infinite reverse',
                pointerEvents: 'none',
            }} />

            <div className="container">
                {/* Eyebrow */}
                <div className="animate-fade-up animate-delay-1"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: 'var(--accent-dim)', border: '1px solid var(--border)',
                        color: 'var(--accent)', borderRadius: '50px',
                        padding: '6px 14px', fontSize: '0.78rem', fontWeight: '600',
                        letterSpacing: '0.08em',
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-glow 2s infinite', display: 'inline-block' }} />
                        Available for new projects
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>🇵🇰 Serving all of Pakistan</span>
                </div>

                {/* Main Headline */}
                <h1 className="animate-fade-up animate-delay-2" style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
                    fontWeight: '800',
                    lineHeight: '1.08',
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)',
                    maxWidth: '800px',
                    marginBottom: '12px',
                }}>
                    Websites That Grow<br />
                    <span style={{
                        color: 'var(--accent)',
                        transition: 'opacity 0.4s ease',
                        opacity: fade ? 1 : 0,
                    }}>{roles[roleIndex]}</span>
                </h1>

                {/* Subheadline */}
                <p className="animate-fade-up animate-delay-3" style={{
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    color: 'var(--text-secondary)',
                    maxWidth: '560px',
                    lineHeight: '1.7',
                    marginBottom: '40px',
                    marginTop: '16px',
                }}>
                    I build fast, modern, and SEO-optimized websites for Pakistani businesses.
                    From Karachi to Lahore — your business deserves a powerful online presence.
                </p>

                {/* CTAs */}
                <div className="animate-fade-up animate-delay-4"
                    style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '64px' }}>
                    <button className="btn btn-primary"
                        onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                        View My Work →
                    </button>
                    <a href="https://wa.me/923001234567?text=Hi%20Ahmed%2C%20I%20need%20a%20website%20for%20my%20business"
                        target="_blank" rel="noopener noreferrer"
                        className="btn btn-whatsapp">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Chat on WhatsApp
                    </a>
                </div>

                {/* Stats bar */}
                <div className="animate-fade-up animate-delay-5" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1px',
                    background: 'var(--border-subtle)',
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-subtle)',
                    maxWidth: '700px',
                }}>
                    {stats.map(s => (
                        <div key={s.label} style={{
                            background: 'var(--bg-card)',
                            padding: '20px 16px',
                            textAlign: 'center',
                        }}>
                            <div style={{
                                fontFamily: 'var(--font-head)',
                                fontSize: '1.6rem', fontWeight: '800',
                                color: 'var(--accent)',
                                lineHeight: 1,
                                marginBottom: '4px',
                            }}>{s.value}</div>
                            <div style={{
                                fontSize: '0.75rem', color: 'var(--text-muted)',
                                fontWeight: '500', letterSpacing: '0.04em',
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute', bottom: '40px', left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.1em',
                animation: 'float 2.5s ease-in-out infinite',
            }}>
                <span>SCROLL</span>
                <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
            </div>

            <style>{`
        @media (max-width: 600px) {
          #hero [style*="gridTemplateColumns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
        </section>
    )
}