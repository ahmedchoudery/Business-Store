import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
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
        // Initialize theme from localStorage or system preference
        const stored = typeof window !== 'undefined' ? localStorage.getItem(THEME_KEY) : null;
        let initial = stored || 'dark';

        if (!stored && window.matchMedia) {
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            initial = prefersLight ? 'light' : 'dark';
        }

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

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
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

                <div className="navbar__actions">
                    <button
                        type="button"
                        className="navbar__theme-toggle"
                        onClick={toggleTheme}
                        aria-label={`Activate ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </button>

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
