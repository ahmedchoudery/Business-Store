import { useState, useEffect } from 'react'

const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

    const handleNav = (href) => {
        setMenuOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '0 24px',
                height: '72px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                background: scrolled
                    ? 'rgba(6, 6, 14, 0.92)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(0,229,255,0.08)' : '1px solid transparent',
            }}>
                {/* Logo */}
                <a href="#hero" onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <div style={{
                        width: '36px', height: '36px',
                        background: 'var(--accent)',
                        borderRadius: '8px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-head)',
                        fontWeight: '800',
                        color: '#06060E',
                        fontSize: '16px',
                    }}>A</div>
                    <span style={{ fontFamily: 'var(--font-head)', fontWeight: '700', fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                        Ahmed<span style={{ color: 'var(--accent)' }}>Dev</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
                    {navLinks.map(link => (
                        <button key={link.href} onClick={() => handleNav(link.href)}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.9rem', fontWeight: '500',
                                padding: '8px 14px', borderRadius: '6px',
                                transition: 'var(--transition)',
                            }}
                            onMouseEnter={e => { e.target.style.color = 'var(--text-primary)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
                            onMouseLeave={e => { e.target.style.color = 'var(--text-secondary)'; e.target.style.background = 'none' }}
                        >{link.label}</button>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <a href="https://wa.me/923001234567?text=Hi%20Ahmed%2C%20I%20need%20a%20website%20for%20my%20business"
                        target="_blank" rel="noopener noreferrer"
                        className="btn btn-primary desktop-nav"
                        style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                        <span>💬</span> WhatsApp Me
                    </a>

                    {/* Hamburger */}
                    <button onClick={() => setMenuOpen(!menuOpen)}
                        className="mobile-menu-btn"
                        style={{
                            background: 'none', border: '1px solid var(--border-subtle)',
                            borderRadius: '8px', padding: '8px', cursor: 'pointer',
                            display: 'flex', flexDirection: 'column', gap: '5px',
                            width: '40px', height: '40px', alignItems: 'center', justifyContent: 'center',
                        }}>
                        {menuOpen
                            ? <span style={{ color: 'var(--accent)', fontSize: '18px', lineHeight: 1 }}>✕</span>
                            : <>
                                <span style={{ display: 'block', width: '18px', height: '2px', background: 'var(--text-primary)', borderRadius: '2px' }} />
                                <span style={{ display: 'block', width: '18px', height: '2px', background: 'var(--text-primary)', borderRadius: '2px' }} />
                                <span style={{ display: 'block', width: '14px', height: '2px', background: 'var(--text-primary)', borderRadius: '2px', alignSelf: 'flex-start', marginLeft: '2px' }} />
                            </>
                        }
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div style={{
                position: 'fixed',
                top: '72px', left: 0, right: 0,
                background: 'rgba(6, 6, 14, 0.98)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--border)',
                padding: '24px',
                zIndex: 999,
                display: menuOpen ? 'flex' : 'none',
                flexDirection: 'column',
                gap: '8px',
            }}>
                {navLinks.map(link => (
                    <button key={link.href} onClick={() => handleNav(link.href)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-secondary)',
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.05rem', fontWeight: '500',
                            padding: '14px 16px', borderRadius: '8px',
                            transition: 'var(--transition)',
                            textAlign: 'left',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-dim)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'none' }}
                    >{link.label}</button>
                ))}
                <a href="https://wa.me/923001234567?text=Hi%20Ahmed%2C%20I%20need%20a%20website%20for%20my%20business"
                    target="_blank" rel="noopener noreferrer"
                    style={{
                        marginTop: '12px', padding: '14px 20px', borderRadius: '8px',
                        background: '#25D366', color: '#fff', fontWeight: '600',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    }}>
                    💬 Chat on WhatsApp
                </a>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
        </>
    )
}