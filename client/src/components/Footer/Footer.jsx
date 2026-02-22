import { RiCodeSSlashLine } from 'react-icons/ri';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import './Footer.css';

const NAV_LINKS = [
    { label: 'Services', href: '#services' },
    { label: 'Why Me', href: '#why-me' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
];

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '923001234567';

export default function Footer() {
    const year = new Date().getFullYear();

    const scroll = (e, href) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__brand">
                    <a href="#hero" className="footer__logo" onClick={(e) => scroll(e, '#hero')}>
                        <RiCodeSSlashLine size={22} />
                        <span>Ahmed<span className="footer__logo-accent">Dev</span></span>
                    </a>
                    <p className="footer__tagline">
                        Building fast, modern React-based business websites for local entrepreneurs across
                        Pakistan.
                    </p>
                    <div className="footer__socials">
                        <a
                            href={`https://wa.me/${WHATSAPP}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            className="footer__social"
                        >
                            <BsWhatsapp size={18} />
                        </a>
                        <a
                            href="https://github.com/ahmedchoudery"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="footer__social"
                        >
                            <FiGithub size={18} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="footer__social"
                        >
                            <FiLinkedin size={18} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="footer__social"
                        >
                            <FiInstagram size={18} />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="footer__heading">Quick Links</h4>
                    <ul className="footer__links">
                        {NAV_LINKS.map((l) => (
                            <li key={l.label}>
                                <a href={l.href} className="footer__link" onClick={(e) => scroll(e, l.href)}>
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="footer__heading">Services</h4>
                    <ul className="footer__links">
                        {[
                            'Landing Pages',
                            'Business Websites',
                            'React Development',
                            'Responsive Design',
                            'Speed Optimization',
                            'CSS Bug Fixes',
                        ].map((s) => (
                            <li key={s}>
                                <a href="#services" className="footer__link" onClick={(e) => scroll(e, '#services')}>
                                    {s}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="footer__heading">I Serve</h4>
                    <ul className="footer__links">
                        {[
                            '🏋️ Gym & Fitness Studios',
                            '📚 Coaching Centers',
                            '🏠 Real Estate Agents',
                            '🛍️ Local Shops',
                            '🧘 Wellness Studios',
                            '🏥 Clinics & Services',
                        ].map((s) => (
                            <li key={s}>
                                <span className="footer__link">{s}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <span>© {year} AhmedDev. All rights reserved.</span>
                    <span>Built with ⚛️ React + Node.js + MongoDB</span>
                </div>
            </div>
        </footer>
    );
}
