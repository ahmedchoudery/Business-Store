import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { RiCodeSSlashLine } from 'react-icons/ri';
import { scrollToSection } from '../../utils/scrollTo';
import './Navbar.css';

const NAV_LINKS = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

const THEME_KEY = 'ahmeddev-theme';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem(THEME_KEY) : null;
        let initial = stored || 'dark';
        if (!stored && window.matchMedia) {
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            initial = prefersLight ? 'light' : 'dark';
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(initial);
        document.documentElement.setAttribute('data-theme', initial === 'light' ? 'light' : 'dark');
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        scrollToSection(href);
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="container navbar__inner">
                <a href="#hero" className="navbar__logo" onClick={(e) => handleNavClick(e, '#hero')}>
                    <RiCodeSSlashLine size={22} />
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

                <div className="navbar__actions">
                    <button
                        type="button"
                        className="navbar__theme-toggle"
                        onClick={() => setTheme((p) => (p === 'dark' ? 'light' : 'dark'))}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
                    </button>

                    <a
                        href="#contact"
                        className="btn btn-primary navbar__cta"
                        onClick={(e) => handleNavClick(e, '#contact')}
                    >
                        Get a Quote
                    </a>

                    <button
                        className="navbar__hamburger"
                        onClick={() => setMenuOpen((p) => !p)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
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
                    Get a Quote
                </a>
            </div>
        </nav>
    );
}