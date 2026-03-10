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
        { label: 'FAQ', href: '#faq' },
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
        <>
            {/* Floating WhatsApp Button */}
            <a href="https://wa.me/923001234567?text=Hi%20Ahmed%2C%20I%20need%20a%20website"
                target="_blank" rel="noopener noreferrer"
                title="Chat on WhatsApp"
                style={{
                    position: 'fixed', bottom: '28px', right: '28px',
                    width: '58px', height: '58px',
                    background: '#25D366', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 900,
                    boxShadow: '0 4px 20px rgba(37, 211, 102, 0.5)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    animation: 'pulse-glow 2.5s infinite',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(37, 211, 102, 0.7)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.5)' }}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>

            {/* Footer */}
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
        </>
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