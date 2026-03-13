import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Skills', href: '#skills' },
    { label: 'Pricing', href: '#pricing' },
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
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
                <button className="navbar__logo" onClick={() => handleNav('#hero')}>
                    AHMED.
                </button>

                <ul className="navbar__links desktop-only">
                    {navLinks.map(link => (
                        <li key={link.href}>
                            <button onClick={() => handleNav(link.href)} className="navbar__link">
                                {link.label}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="navbar__right">
                    <a
                        href="https://wa.me/923174307043?text=Hi%20Ahmed%2C%20I%20need%20a%20website"
                        target="_blank" rel="noopener noreferrer"
                        className="navbar__cta desktop-only"
                    >
                        Get a Quote
                    </a>
                    <button
                        className="navbar__hamburger mobile-only"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen
                            ? <span className="hamburger-close">✕</span>
                            : <><span /><span /><span /></>
                        }
                    </button>
                </div>
            </nav>

            {/* Mobile drawer */}
            <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
                {navLinks.map(link => (
                    <button key={link.href} onClick={() => handleNav(link.href)} className="navbar__drawer-link">
                        {link.label}
                    </button>
                ))}
                <a
                    href="https://wa.me/923174307043?text=Hi%20Ahmed%2C%20I%20need%20a%20website"
                    target="_blank" rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ marginTop: '12px', justifyContent: 'center' }}
                >
                    Chat on WhatsApp
                </a>
            </div>
        </>
    )
}