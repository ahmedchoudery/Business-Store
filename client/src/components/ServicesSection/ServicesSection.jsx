const services = [
    {
        icon: '🖥️',
        title: 'Business Website',
        desc: 'A professional website that builds trust with your customers and keeps your business open 24/7 online.',
        tags: ['5–8 Pages', 'Mobile-First', 'Contact Form'],
        color: '#00E5FF',
    },
    {
        icon: '🛒',
        title: 'E-Commerce Store',
        desc: 'Sell your products online with a secure, easy-to-manage store. Accept payments and track orders.',
        tags: ['Product Catalog', 'Cart & Checkout', 'Inventory'],
        color: '#FF4D6D',
    },
    {
        icon: '🚀',
        title: 'Landing Page',
        desc: 'High-converting single-page sites built for ads, campaigns, and lead generation. More clicks = more sales.',
        tags: ['1-Page Design', 'CTA Focused', 'Fast Load'],
        color: '#00FFA3',
    },
    {
        icon: '🔍',
        title: 'SEO Optimization',
        desc: 'Rank higher on Google Pakistan. Get found by local customers when they search for your services.',
        tags: ['Keyword Research', 'On-Page SEO', 'Google Analytics'],
        color: '#FFB800',
    },
    {
        icon: '📱',
        title: 'Mobile-First Design',
        desc: 'Over 80% of Pakistani internet users browse on mobile. Your site will look perfect on every screen size.',
        tags: ['Responsive', 'Touch-Friendly', 'Fast on 4G'],
        color: '#A78BFA',
    },
    {
        icon: '🔧',
        title: 'Website Maintenance',
        desc: 'Keep your site updated, secure, and fast. Monthly care plans so you never worry about your website again.',
        tags: ['Monthly Updates', 'Security Scans', 'Backups'],
        color: '#F97316',
    },
]

export default function Services() {
    return (
        <section id="services" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                {/* Header */}
                <div style={{ marginBottom: '60px' }}>
                    <div className="section-label">What I Offer</div>
                    <h2 className="section-title">
                        Services Built for<br />
                        <span className="text-accent">Pakistani Businesses</span>
                    </h2>
                    <p className="section-subtitle">
                        Everything your business needs to thrive online — from a simple website
                        to a full e-commerce store with SEO built in from day one.
                    </p>
                </div>

                {/* Services Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px',
                }}>
                    {services.map((s, i) => (
                        <ServiceCard key={s.title} service={s} delay={i * 0.05} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div style={{
                    marginTop: '56px',
                    padding: '40px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '24px',
                    flexWrap: 'wrap',
                }}>
                    <div>
                        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', marginBottom: '6px' }}>
                            Not sure what you need?
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Tell me about your business and I'll recommend the right solution.
                        </p>
                    </div>
                    <a href="https://wa.me/923001234567?text=Hi%20Ahmed%2C%20I%20need%20help%20choosing%20a%20service"
                        target="_blank" rel="noopener noreferrer"
                        className="btn btn-primary">
                        Get a Free Consultation →
                    </a>
                </div>
            </div>
        </section>
    )
}

function ServiceCard({ service: s }) {
    return (
        <div className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
            {/* Glow spot */}
            <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '100px', height: '100px',
                background: `radial-gradient(circle, ${s.color}20 0%, transparent 70%)`,
                pointerEvents: 'none',
                transition: 'var(--transition)',
            }} />

            {/* Icon */}
            <div style={{
                fontSize: '2.2rem',
                width: '56px', height: '56px',
                background: `${s.color}15`,
                border: `1px solid ${s.color}30`,
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
            }}>{s.icon}</div>

            <h3 style={{
                fontFamily: 'var(--font-head)',
                fontSize: '1.15rem', fontWeight: '700',
                marginBottom: '10px', color: 'var(--text-primary)',
            }}>{s.title}</h3>

            <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem', lineHeight: '1.65',
                marginBottom: '20px',
            }}>{s.desc}</p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {s.tags.map(tag => (
                    <span key={tag} style={{
                        fontSize: '0.72rem', fontWeight: '600',
                        padding: '4px 10px', borderRadius: '4px',
                        background: `${s.color}12`,
                        color: s.color,
                        border: `1px solid ${s.color}25`,
                        letterSpacing: '0.04em',
                    }}>{tag}</span>
                ))}
            </div>
        </div>
    )
}