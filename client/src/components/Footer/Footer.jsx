import './Footer.css';

const footerLinks = {
    Services: [
        { label: 'Business Website', href: '#services' },
        { label: 'E-Commerce Store', href: '#services' },
        { label: 'Landing Page', href: '#services' },
        { label: 'SEO Optimization', href: '#services' },
        { label: 'Maintenance', href: '#services' },
    ],
    Company: [
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Contact', href: '#contact' },
    ],
    Industries: [
        { label: 'Restaurants', href: '#services' },
        { label: 'Fashion & Retail', href: '#services' },
        { label: 'Healthcare', href: '#services' },
        { label: 'Wedding Halls', href: '#services' },
        { label: 'Real Estate', href: '#services' },
    ],
};

export default function Footer() {
    const nav = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div>
                        <div className="footer__logo">AHMED.</div>
                        <p className="footer__brand-desc">
                            Professional web developer helping local businesses across Pakistan
                            establish and grow their online presence.
                        </p>
                        <div className="footer__socials">
                            <a href="https://github.com/ahmedchoudery" target="_blank" rel="noopener noreferrer" className="footer__social">GH</a>
                            <a href="https://wa.me/923174307043" target="_blank" rel="noopener noreferrer" className="footer__social footer__social--wa">WA</a>
                            <a href="mailto:ahmedchoudery30@gmail.com" className="footer__social footer__social--em">@</a>
                        </div>
                    </div>
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <h4 className="footer__group-title">{group}</h4>
                            <ul className="footer__links">
                                {links.map(l => (
                                    <li key={l.label}>
                                        <button onClick={() => nav(l.href)} className="footer__link">{l.label}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="footer__divider" />
                <div className="footer__bottom">
                    <span>© {new Date().getFullYear()} AhmedDev. Built with React + ❤️ in Pakistan 🇵🇰</span>
                    <span>Web Developer for Local Businesses across Pakistan</span>
                </div>
            </div>
        </footer>
    );
}