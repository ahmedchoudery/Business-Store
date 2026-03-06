import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { RiCodeSSlashLine } from 'react-icons/ri';
import { scrollToSection } from '../../utils/scrollTo';
import './Navbar.css';

const NAV_LINKS = [
    { label: 'Services', href: '#services' },
    { label: 'About Me', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact Us', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        scrollToSection(href);
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="container navbar__inner">
                <a href="#hero" className="navbar__logo" onClick={(e) => handleNavClick(e, '#hero')}>
                    <RiCodeSSlashLine size={24} />
                    <span>Ahmed<span className="navbar__logo-accent">Dev</span></span>
                </a>

                <ul className="navbar__links">
                    {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                className="navbar__link"
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <a
                    href="#contact"
                    className="btn btn-primary navbar__cta"
                    onClick={(e) => handleNavClick(e, '#contact')}
                >
                    Get Started
                </a>

                <button
                    className="navbar__hamburger"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
                {NAV_LINKS.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="navbar__mobile-link"
                        onClick={(e) => handleNavClick(e, link.href)}
                    >
                        {link.label}
                    </a>
                ))}
                <a
                    href="#contact"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                    onClick={(e) => handleNavClick(e, '#contact')}
                >
                    Get Started
                </a>
            </div>
        </nav>
    );
}
