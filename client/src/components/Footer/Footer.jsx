const footerLinks = {
    Services: [
        { label: 'Business Website', href: '#services' },
        { label: 'E-Commerce Store', href: '#services' },
        { label: 'Landing Page', href: '#services' },
        { label: 'SEO Optimization', href: '#services' },
        { label: 'Maintenance', href: '#services' },
    ],
    Company: [
        { label: 'About Me', href: '#about' },
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
}

export default function Footer() {
    const handleNav = (href) => {
        if (href.startsWith('#')) {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <footer style={{
            background: '#04040C',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '72px',
            paddingBottom: '32px',
        }}>
            <div className="container">
                {/* Top: Brand + Links */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: '48px',
                    marginBottom: '60px',
                }} className="footer-grid">
                    {/* Brand col */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <div style={{
                                width: '36px', height: '36px', background: 'var(--accent)',
                                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-head)', fontWeight: '800', color: '#06060E', fontSize: '16px',
                            }}>A</div>
                            <span style={{ fontFamily: 'var(--font-head)', fontWeight: '700', fontSize: '1.15rem' }}>
                                Ahmed<span style={{ color: 'var(--accent)' }}>Dev</span>
                            </span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.7', maxWidth: '280px', marginBottom: '20px' }}>
                            Professional web developer helping local businesses across Pakistan establish and grow their online presence.
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <a href="https://github.com/ahmedchoudery" target="_blank" rel="noopener noreferrer"
                                style={socialBtn}>GH</a>
                            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
                                style={{ ...socialBtn, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', color: '#25D366' }}>WA</a>
                            <a href="mailto:ahmedchoudery30@gmail.com"
                                style={{ ...socialBtn, background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)', color: 'var(--accent)' }}>@</a>
                        </div>
                    </div>

                    {/* Link cols */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '16px', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                                {group}
                            </h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {links.map(link => (
                                    <li key={link.label}>
                                        <button onClick={() => handleNav(link.href)}
                                            style={{
                                                background: 'none', border: 'none', cursor: 'pointer',
                                                color: 'var(--text-muted)', fontSize: '0.85rem',
                                                transition: 'color 0.2s', padding: 0,
                                                fontFamily: 'var(--font-body)',
                                            }}
                                            onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                                            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                                        >{link.label}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '24px' }} />

                {/* Bottom bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        © {new Date().getFullYear()} AhmedDev. Built with React + ❤️ in Pakistan 🇵🇰
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        Web Developer for Local Businesses across Pakistan
                    </p>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
                }
                @media (max-width: 580px) {
                    .footer-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </footer>
    )
}

const socialBtn = {
    width: '36px', height: '36px', borderRadius: '8px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.72rem', fontWeight: '800',
    background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)',
    color: 'var(--text-muted)', transition: 'var(--transition)',
    textDecoration: 'none', letterSpacing: '0.05em',
}