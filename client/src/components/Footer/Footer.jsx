import './Footer.css'

const footerLinks = {
    services: [
        { label: 'business.website()', href: '#services' },
        { label: 'ecommerce.store()', href: '#services' },
        { label: 'landing.page()', href: '#services' },
        { label: 'seo.optimize()', href: '#services' },
        { label: 'maintenance()', href: '#services' },
    ],
    company: [
        { label: 'about.me()', href: '#about' },
        { label: 'portfolio()', href: '#portfolio' },
        { label: 'testimonials()', href: '#testimonials' },
        { label: 'pricing()', href: '#pricing' },
        { label: 'contact()', href: '#contact' },
    ],
    industries: [
        { label: 'restaurants', href: '#services' },
        { label: 'fashion_retail', href: '#services' },
        { label: 'healthcare', href: '#services' },
        { label: 'wedding_halls', href: '#services' },
        { label: 'real_estate', href: '#services' },
    ],
}

export default function Footer() {
    const nav = (href) => {
        if (href.startsWith('#')) {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <footer className="footer">
            <div className="container">

                {/* ── Top grid ── */}
                <div className="footer__grid">

                    {/* Brand column */}
                    <div className="footer__brand-col">
                        {/* Logo mark */}
                        <div className="footer__logo">
                            <svg width="36" height="36" viewBox="0 0 512 512" fill="none">
                                <defs>
                                    <linearGradient id="ftBlue" x1="256" y1="32" x2="256" y2="480" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#7DD3FC"/>
                                        <stop offset="50%" stopColor="#38BDF8"/>
                                        <stop offset="100%" stopColor="#0369A1"/>
                                    </linearGradient>
                                    <linearGradient id="ftGold" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#FCD34D"/>
                                        <stop offset="100%" stopColor="#F59E0B"/>
                                    </linearGradient>
                                    <mask id="ftMask">
                                        <rect width="512" height="512" fill="white"/>
                                        <polygon points="256,164 206,288 306,288" fill="black"/>
                                    </mask>
                                </defs>
                                <g mask="url(#ftMask)">
                                    <path d="M 256 42 Q 260 42 262 46 L 428 450 Q 432 458 425 464 L 369 464 Q 363 464 360 458 L 324 378 L 188 378 L 152 458 Q 149 464 143 464 L 87 464 Q 80 458 84 450 L 250 46 Q 252 42 256 42 Z" fill="url(#ftBlue)"/>
                                </g>
                                <g strokeLinecap="round" strokeLinejoin="round" fill="none">
                                    <polyline points="245,204 221,240 245,276" stroke="#FBBF24" strokeWidth="13"/>
                                    <polyline points="267,204 291,240 267,276" stroke="#FBBF24" strokeWidth="13"/>
                                </g>
                                <rect x="174" y="340" width="164" height="16" rx="8" fill="url(#ftGold)"/>
                            </svg>
                            <div className="footer__logo-text">
                                <span className="footer__logo-ahmed">Ahmed </span>
                                <span className="footer__logo-code">Code</span>
                                <span className="footer__logo-studio"> Studio</span>
                            </div>
                        </div>

                        {/* Tagline */}
                        <div className="footer__code-comment">
                            {'/**'}<br />
                            {' * Building fast, modern websites'}<br />
                            {' * for businesses across Pakistan.'}<br />
                            {' * React · Next.js · Node.js · SEO'}<br />
                            {' */'}
                        </div>

                        {/* Social links */}
                        <div className="footer__socials">
                            <a
                                href="https://github.com/ahmedchoudery"
                                target="_blank" rel="noopener noreferrer"
                                className="footer__social"
                                aria-label="GitHub"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                                GitHub
                            </a>
                            <a
                                href="https://wa.me/923174307043"
                                target="_blank" rel="noopener noreferrer"
                                className="footer__social footer__social--green"
                                aria-label="WhatsApp"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.444h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.447z" /></svg>
                                WhatsApp
                            </a>
                            <a
                                href="mailto:ahmedchoudery30@gmail.com"
                                className="footer__social footer__social--blue"
                                aria-label="Email"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>
                                Email
                            </a>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group} className="footer__link-col">
                            <h4 className="footer__col-title">
                                <span className="footer__col-slash">// </span>{group}
                            </h4>
                            <ul className="footer__links">
                                {links.map(link => (
                                    <li key={link.label}>
                                        <button
                                            className="footer__link"
                                            onClick={() => nav(link.href)}
                                        >
                                            <span className="footer__link-arrow">›</span>
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="footer__divider" />

                {/* Bottom bar */}
                <div className="footer__bottom">
                    <p className="footer__copy">
                        <span className="footer__copy-comment">{'// '}</span>
                        © {new Date().getFullYear()} Ahmed Code Studio · Built with React + ❤️ in Gujrat, Pakistan 🇵🇰
                    </p>
                    <p className="footer__stack">
                        <span className="footer__stack-tag">React</span>
                        <span className="footer__stack-tag">Vite</span>
                        <span className="footer__stack-tag">Three.js</span>
                        <span className="footer__stack-tag">Node.js</span>
                    </p>
                </div>

            </div>
        </footer>
    )
}