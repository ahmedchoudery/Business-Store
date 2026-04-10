import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
    { label: 'personalize', href: '#personalize' },
    { label: 'projects', href: '#portfolio' },
    { label: 'skills', href: '#skills' },
    { label: 'about', href: '#about' },
    { label: 'timeline', href: '#timeline' },
    { label: 'contact', href: '#contact' },
]

export default function Navbar({ meta }) {
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
                        <svg width="30" height="30" viewBox="0 0 512 512" className="navbar__logo-icon" fill="none">
                            <defs>
                                <linearGradient id="navBlue" x1="256" y1="32" x2="256" y2="480" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#7DD3FC"/>
                                    <stop offset="50%" stopColor="#38BDF8"/>
                                    <stop offset="100%" stopColor="#0369A1"/>
                                </linearGradient>
                                <linearGradient id="navGold" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#FCD34D"/>
                                    <stop offset="100%" stopColor="#F59E0B"/>
                                </linearGradient>
                                <mask id="navMask">
                                    <rect width="512" height="512" fill="white"/>
                                    <polygon points="256,164 206,288 306,288" fill="black"/>
                                </mask>
                            </defs>
                            <g mask="url(#navMask)">
                                <path d="M 256 42 Q 260 42 262 46 L 428 450 Q 432 458 425 464 L 369 464 Q 363 464 360 458 L 324 378 L 188 378 L 152 458 Q 149 464 143 464 L 87 464 Q 80 458 84 450 L 250 46 Q 252 42 256 42 Z" fill="url(#navBlue)"/>
                            </g>
                            <g strokeLinecap="round" strokeLinejoin="round" fill="none">
                                <polyline points="245,204 221,240 245,276" stroke="#FBBF24" strokeWidth="13"/>
                                <polyline points="267,204 291,240 267,276" stroke="#FBBF24" strokeWidth="13"/>
                            </g>
                            <rect x="174" y="340" width="164" height="16" rx="8" fill="url(#navGold)"/>
                        </svg>
                        <span className="navbar__brand-text">
                            Ahmed <span className="navbar__brand-accent">Dev</span><span className="navbar__brand-studio"> Portfolio</span>
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
                            {meta.personalized ? '$ discuss.role()' : '$ contact.me()'}
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
                        <span style={{ color: '#FBBF24' }}> Dev</span>
                        <span style={{ color: 'rgba(255,255,255,0.5)' }}> Portfolio</span>
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
                            <span className="navbar__drawer-arrow">-&gt;</span>
                        </button>
                    ))}
                </nav>
                <div className="navbar__drawer-footer">
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => nav('#contact')}>
                        $ contact.me()
                    </button>
                </div>
            </div>
        </>
    )
}
