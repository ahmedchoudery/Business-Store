import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
    { label: 'services', href: '#services' },
    { label: 'portfolio', href: '#portfolio' },
    { label: 'process', href: '#process' },
    { label: 'pricing', href: '#pricing' },
    { label: 'testimonials', href: '#testimonials' },
    { label: 'contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [active, setActive] = useState('')

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    const nav = (href) => {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
        setActive(href)
    }

    return (
        <>
            <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
                <div className="navbar__inner container">

                    {/* Brand */}
                    <button className="navbar__brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <svg width="30" height="30" viewBox="0 0 100 100" className="navbar__logo-icon">
                            <rect width="100" height="100" rx="16" fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.25)" strokeWidth="2" />
                            <line x1="14" y1="85" x2="50" y2="14" stroke="#38BDF8" strokeWidth="9" strokeLinecap="round" />
                            <line x1="86" y1="85" x2="50" y2="14" stroke="#38BDF8" strokeWidth="9" strokeLinecap="round" />
                            <circle cx="50" cy="14" r="5.5" fill="#FBBF24" />
                            <line x1="28" y1="68" x2="72" y2="50" stroke="#FBBF24" strokeWidth="7.5" strokeLinecap="round" />
                        </svg>
                        <span className="navbar__brand-text">
                            Ahmed <span className="navbar__brand-accent">Code</span><span className="navbar__brand-studio"> Studio</span>
                        </span>
                    </button>

                    {/* Desktop links */}
                    <nav className="navbar__links">
                        {NAV_LINKS.map(l => (
                            <button
                                key={l.href}
                                className={`navbar__link${active === l.href ? ' navbar__link--active' : ''}`}
                                onClick={() => nav(l.href)}
                            >
                                <span className="navbar__link-slash">/</span>{l.label}
                            </button>
                        ))}
                    </nav>

                    {/* CTA + Hamburger */}
                    <div className="navbar__actions">
                        <button className="btn btn-primary navbar__cta" onClick={() => nav('#contact')}>
                            $ hire.me()
                        </button>
                        <button
                            className={`navbar__hamburger${menuOpen ? ' is-open' : ''}`}
                            onClick={() => setMenuOpen(m => !m)}
                            aria-label="Toggle menu"
                        >
                            <span /><span /><span />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile overlay */}
            <div className={`navbar__drawer-overlay${menuOpen ? ' is-open' : ''}`} onClick={() => setMenuOpen(false)} />

            {/* Mobile drawer */}
            <div className={`navbar__drawer${menuOpen ? ' is-open' : ''}`}>
                <div className="navbar__drawer-header">
                    <span className="navbar__drawer-brand">
                        <span style={{ color: '#38BDF8' }}>Ahmed</span>
                        <span style={{ color: '#FBBF24' }}> Code</span>
                        <span style={{ color: 'rgba(255,255,255,0.5)' }}> Studio</span>
                    </span>
                    <button className="navbar__drawer-close" onClick={() => setMenuOpen(false)}>✕</button>
                </div>
                <div className="navbar__drawer-mono">// navigation</div>
                <nav className="navbar__drawer-links">
                    {NAV_LINKS.map((l, i) => (
                        <button
                            key={l.href}
                            className="navbar__drawer-link"
                            style={{ animationDelay: `${i * 0.06}s` }}
                            onClick={() => nav(l.href)}
                        >
                            <span className="navbar__drawer-num">0{i + 1}.</span>
                            {l.label}
                            <span className="navbar__drawer-arrow">→</span>
                        </button>
                    ))}
                </nav>
                <div className="navbar__drawer-footer">
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => nav('#contact')}>
                        $ get.started()
                    </button>
                </div>
            </div>
        </>
    )
}