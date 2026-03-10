const projects = [
    {
        id: 1,
        title: 'Falak Halls & Events',
        category: 'Wedding Hall',
        desc: 'A stunning venue showcase website with gallery, booking inquiries, and WhatsApp integration for Pakistan\'s premier wedding hall.',
        tags: ['React', 'SEO', 'WhatsApp CTA', 'Gallery'],
        url: 'https://falak-marriage-hall.vercel.app/',
        featured: true,
        stats: [{ label: 'Booking Inquiries', value: '+65%' }, { label: 'Page Speed', value: '96/100' }],
        color: '#FF4D6D',
    },
    {
        id: 2,
        title: 'Spice Route Restaurant',
        category: 'Food & Dining',
        desc: 'Online menu, table reservations, and Google Maps integration for a family restaurant in Lahore.',
        tags: ['Next.js', 'SEO', 'Maps API'],
        url: '#portfolio',
        featured: false,
        color: '#FFB800',
    },
    {
        id: 3,
        title: 'Noor Boutique',
        category: 'Fashion & Retail',
        desc: 'E-commerce store for a ladies clothing brand with product catalog, size guide, and WhatsApp order system.',
        tags: ['E-Commerce', 'Product Catalog', 'Mobile'],
        url: '#portfolio',
        featured: false,
        color: '#A78BFA',
    },
    {
        id: 4,
        title: 'CityMed Clinic',
        category: 'Healthcare',
        desc: 'Patient appointment booking system with doctor profiles, services listing, and location map.',
        tags: ['Booking System', 'Responsive', 'SEO'],
        url: '#portfolio',
        featured: false,
        color: '#00FFA3',
    },
]

export default function Portfolio() {
    const featured = projects.find(p => p.featured)
    const grid = projects.filter(p => !p.featured)

    return (
        <section id="portfolio">
            <div className="container">
                {/* Header */}
                <div style={{ marginBottom: '60px' }}>
                    <div className="section-label">My Work</div>
                    <h2 className="section-title">
                        Real Results for<br />
                        <span className="text-accent">Real Businesses</span>
                    </h2>
                    <p className="section-subtitle">
                        Every project is built with purpose — to help Pakistani businesses attract
                        more customers and grow their revenue online.
                    </p>
                </div>

                {/* Featured Project */}
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    marginBottom: '24px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    minHeight: '380px',
                }} className="featured-project">
                    {/* Visual */}
                    <div style={{
                        background: `linear-gradient(135deg, #1a0010, #0d0022)`,
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: '280px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        {/* Browser mockup */}
                        <div style={{
                            width: '85%', background: '#0C0C20',
                            borderRadius: '10px', overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}>
                            <div style={{
                                padding: '10px 14px',
                                background: '#141430',
                                display: 'flex', alignItems: 'center', gap: '6px',
                                borderBottom: '1px solid rgba(255,255,255,0.06)',
                            }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF5F57' }} />
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFBD2E' }} />
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28CA41' }} />
                                <div style={{
                                    flex: 1, background: '#0C0C1A', borderRadius: '4px',
                                    padding: '3px 10px', fontSize: '0.65rem', color: 'var(--text-muted)',
                                    marginLeft: '8px',
                                }}>falak-marriage-hall.vercel.app</div>
                            </div>
                            <div style={{
                                height: '160px',
                                background: 'linear-gradient(160deg, #1a0016 0%, #0a0030 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexDirection: 'column', gap: '10px',
                            }}>
                                <div style={{ fontSize: '2rem' }}>💍</div>
                                <div style={{ fontFamily: 'var(--font-head)', fontSize: '1rem', fontWeight: '700', color: '#FF4D6D', letterSpacing: '0.05em' }}>FALAK HALLS & EVENTS</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Premium Wedding Venue · Gujrat, Pakistan</div>
                            </div>
                        </div>
                        {/* Glow */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'radial-gradient(circle at 50% 50%, rgba(255,77,109,0.1) 0%, transparent 70%)',
                            pointerEvents: 'none',
                        }} />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                            <span style={{
                                fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em',
                                background: 'rgba(255,77,109,0.15)', color: '#FF4D6D',
                                border: '1px solid rgba(255,77,109,0.25)',
                                padding: '4px 10px', borderRadius: '4px',
                            }}>FEATURED PROJECT</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{featured.category}</span>
                        </div>

                        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.9rem', fontWeight: '800', marginBottom: '14px' }}>
                            {featured.title}
                        </h3>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '24px' }}>
                            {featured.desc}
                        </p>

                        {/* Stats */}
                        <div style={{ display: 'flex', gap: '24px', marginBottom: '28px' }}>
                            {featured.stats.map(s => (
                                <div key={s.label}>
                                    <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', fontWeight: '800', color: '#FF4D6D' }}>{s.value}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                            {featured.tags.map(t => (
                                <span key={t} style={{
                                    fontSize: '0.75rem', padding: '4px 10px',
                                    background: 'rgba(0,229,255,0.08)', color: 'var(--accent)',
                                    border: '1px solid var(--border)', borderRadius: '4px',
                                }}>{t}</span>
                            ))}
                        </div>

                        <a href={featured.url} target="_blank" rel="noopener noreferrer"
                            className="btn btn-ghost" style={{ width: 'fit-content' }}>
                            View Live Site ↗
                        </a>
                    </div>
                </div>

                {/* Project Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
                    {grid.map(p => (
                        <div key={p.id} className="card" style={{ padding: '28px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                                background: `linear-gradient(to right, ${p.color}, transparent)`,
                            }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                                <span style={{
                                    fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.08em',
                                    color: p.color, background: `${p.color}15`,
                                    border: `1px solid ${p.color}25`, padding: '3px 8px', borderRadius: '4px',
                                }}>{p.category}</span>
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>{p.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '18px' }}>{p.desc}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                                {p.tags.map(t => (
                                    <span key={t} style={{
                                        fontSize: '0.7rem', padding: '3px 8px',
                                        background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)',
                                        border: '1px solid var(--border-subtle)', borderRadius: '4px',
                                    }}>{t}</span>
                                ))}
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Coming Soon</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.95rem' }}>
                        Want to be my next featured project?
                    </p>
                    <a href="https://wa.me/923001234567?text=Hi%20Ahmed%2C%20I%27d%20like%20a%20website%20for%20my%20business"
                        target="_blank" rel="noopener noreferrer"
                        className="btn btn-primary">
                        Start Your Project →
                    </a>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .featured-project {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    )
}