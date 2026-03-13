// FILE: client/src/components/Navbar/Navbar.jsx

import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Skills', href: '#skills' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeHref, setActive] = useState('');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close drawer on resize to desktop
    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const go = (href) => {
        setMenuOpen(false);
        setActive(href);
        setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 50);
    };

    return (
        <>
            <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
                {/* Logo */}
                <button className="nav__logo" onClick={() => go('#hero')}>
                    AHMED.
                </button>

                {/* Desktop links */}
                <ul className="nav__links">
                    {NAV.map((n, i) => (
                        <li key={n.href} style={{ '--i': i }}>
                            <button
                                onClick={() => go(n.href)}
                                className={`nav__link ${activeHref === n.href ? 'nav__link--active' : ''}`}
                            >
                                {n.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Right side */}
                <div className="nav__right">
                    <a
                        href="https://wa.me/923174307043?text=Hi%20Ahmed%2C%20I%20need%20a%20website"
                        target="_blank" rel="noopener noreferrer"
                        className="nav__cta"
                    >
                        Get a Quote
                    </a>
                    <button
                        className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* Mobile drawer overlay */}
            <div
                className={`nav__overlay ${menuOpen ? 'nav__overlay--open' : ''}`}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile drawer */}
            <div className={`nav__drawer ${menuOpen ? 'nav__drawer--open' : ''}`} role="dialog" aria-modal="true">
                <div className="nav__drawer-header">
                    <span className="nav__drawer-logo">AHMED.</span>
                    <button className="nav__drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                </div>

                <ul className="nav__drawer-links">
                    {NAV.map((n, i) => (
                        <li key={n.href} style={{ '--i': i }} className={menuOpen ? 'nav__drawer-item--in' : ''}>
                            <button onClick={() => go(n.href)} className="nav__drawer-link">
                                <span className="nav__drawer-num">0{i + 1}</span>
                                {n.label}
                                <span className="nav__drawer-arrow">→</span>
                            </button>
                        </li>
                    ))}
                </ul>

                <a
                    href="https://wa.me/923174307043?text=Hi%20Ahmed%2C%20I%20need%20a%20website"
                    target="_blank" rel="noopener noreferrer"
                    className="nav__drawer-cta"
                    onClick={() => setMenuOpen(false)}
                >
                    💬 Chat on WhatsApp
                </a>
            </div>
        </>
    );
}