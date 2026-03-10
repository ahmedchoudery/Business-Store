import { useState } from 'react'

const plans = [
    {
        name: 'Starter',
        price: '15,000',
        priceNote: 'PKR',
        tagline: 'Perfect for getting your business online',
        color: '#8080A8',
        features: [
            { text: 'Up to 5 pages', included: true },
            { text: 'Mobile responsive design', included: true },
            { text: 'Contact form', included: true },
            { text: 'WhatsApp button', included: true },
            { text: 'Google Maps integration', included: true },
            { text: 'Basic SEO setup', included: true },
            { text: 'Free domain for 1 year', included: false },
            { text: 'SEO keyword research', included: false },
            { text: 'E-commerce / shop', included: false },
            { text: '3 months free support', included: false },
        ],
        delivery: '3–5 days',
        popular: false,
        cta: 'Get Started',
    },
    {
        name: 'Business',
        price: '35,000',
        priceNote: 'PKR',
        tagline: 'The complete package for serious businesses',
        color: '#00E5FF',
        features: [
            { text: 'Up to 10 pages', included: true },
            { text: 'Mobile responsive design', included: true },
            { text: 'Contact form + WhatsApp', included: true },
            { text: 'WhatsApp button', included: true },
            { text: 'Google Maps integration', included: true },
            { text: 'Full SEO optimization', included: true },
            { text: 'Free domain for 1 year', included: true },
            { text: 'SEO keyword research', included: true },
            { text: 'E-commerce / shop', included: false },
            { text: '3 months free support', included: true },
        ],
        delivery: '5–8 days',
        popular: true,
        cta: 'Most Popular →',
    },
    {
        name: 'Premium',
        price: '75,000',
        priceNote: 'PKR',
        tagline: 'Custom design + full e-commerce solution',
        color: '#FF4D6D',
        features: [
            { text: 'Unlimited pages', included: true },
            { text: 'Custom UI/UX design', included: true },
            { text: 'Contact form + WhatsApp', included: true },
            { text: 'WhatsApp button', included: true },
            { text: 'Google Maps integration', included: true },
            { text: 'Advanced SEO strategy', included: true },
            { text: 'Free domain for 1 year', included: true },
            { text: 'SEO keyword research', included: true },
            { text: 'E-commerce / shop', included: true },
            { text: '6 months free support', included: true },
        ],
        delivery: '2–3 weeks',
        popular: false,
        cta: 'Go Premium',
    },
]

export default function Pricing() {
    const [hoveredPlan, setHoveredPlan] = useState(null)

    return (
        <section id="pricing" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                {/* Header */}
                <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Transparent Pricing</div>
                    <h2 className="section-title" style={{ textAlign: 'center' }}>
                        Simple, Honest Pricing<br />
                        <span className="text-accent">No Hidden Charges</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Choose the package that fits your business. All prices in Pakistani Rupees.
                        Custom quotes available for unique projects.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    alignItems: 'start',
                }} className="pricing-grid">
                    {plans.map((plan) => (
                        <PricingCard
                            key={plan.name}
                            plan={plan}
                            isHovered={hoveredPlan === plan.name}
                            onHover={setHoveredPlan}
                        />
                    ))}
                </div>

                {/* Trust notes */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                    gap: '32px', marginTop: '48px',
                    padding: '28px', borderRadius: 'var(--radius)',
                    background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                }}>
                    {['✅ 50% upfront, 50% on delivery', '🔄 Unlimited revisions during project', '⚡ Fast turnaround guaranteed', '🤝 Free consultation before starting'].map(note => (
                        <span key={note} style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{note}</span>
                    ))}
                </div>

                {/* Custom quote */}
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        Have a larger project or unique needs?
                    </p>
                    <a href="https://wa.me/923001234567?text=Hi%20Ahmed%2C%20I%20need%20a%20custom%20quote"
                        target="_blank" rel="noopener noreferrer"
                        className="btn btn-ghost" style={{ marginTop: '12px' }}>
                        Request Custom Quote →
                    </a>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; }
        }
      `}</style>
        </section>
    )
}

function PricingCard({ plan, isHovered, onHover }) {
    const isPopular = plan.popular

    return (
        <div
            onMouseEnter={() => onHover(plan.name)}
            onMouseLeave={() => onHover(null)}
            style={{
                background: isPopular ? `linear-gradient(160deg, #0D1A2A, #0C0C1C)` : 'var(--bg-card)',
                border: `1px solid ${isPopular ? plan.color : (isHovered ? 'rgba(255,255,255,0.12)' : 'var(--border-subtle)')}`,
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                position: 'relative',
                overflow: 'visible',
                transition: 'var(--transition)',
                transform: isPopular ? 'scale(1.04)' : (isHovered ? 'translateY(-4px)' : 'none'),
                boxShadow: isPopular ? `0 0 60px ${plan.color}20` : 'none',
            }}
        >
            {/* Popular badge */}
            {isPopular && (
                <div style={{
                    position: 'absolute', top: '-14px', left: '50%',
                    transform: 'translateX(-50%)',
                    background: plan.color, color: '#06060E',
                    fontSize: '0.72rem', fontWeight: '800',
                    letterSpacing: '0.1em', padding: '5px 16px',
                    borderRadius: '50px', whiteSpace: 'nowrap',
                    zIndex: 10,
                }}>⭐ MOST POPULAR</div>
            )}

            {/* Plan name */}
            <div style={{ marginBottom: '24px' }}>
                <span style={{
                    fontSize: '0.75rem', fontWeight: '700',
                    color: plan.color, letterSpacing: '0.12em',
                    display: 'block', marginBottom: '8px',
                }}>{plan.name.toUpperCase()}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>PKR</span>
                    <span style={{
                        fontFamily: 'var(--font-head)', fontSize: '2.8rem', fontWeight: '800',
                        color: plan.color, lineHeight: 1,
                    }}>{plan.price}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: '1.5' }}>{plan.tagline}</p>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    marginTop: '10px', fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    background: 'rgba(255,255,255,0.04)',
                    padding: '4px 10px', borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                }}>
                    ⚡ Delivery: {plan.delivery}
                </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '24px' }} />

            {/* Features */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {plan.features.map(f => (
                    <li key={f.text} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        fontSize: '0.875rem',
                        color: f.included ? 'var(--text-primary)' : 'var(--text-muted)',
                        opacity: f.included ? 1 : 0.45,
                    }}>
                        <span style={{ fontSize: '0.8rem', flexShrink: 0, color: f.included ? plan.color : 'var(--text-muted)' }}>
                            {f.included ? '✓' : '✗'}
                        </span>
                        {f.text}
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <a
                href={`https://wa.me/923001234567?text=Hi%20Ahmed%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(plan.name)}%20package`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '14px', borderRadius: '8px', fontWeight: '600',
                    fontSize: '0.9rem', transition: 'var(--transition)',
                    background: isPopular ? plan.color : 'transparent',
                    color: isPopular ? '#06060E' : plan.color,
                    border: `1px solid ${plan.color}`,
                    textDecoration: 'none',
                }}
                onMouseEnter={e => {
                    if (!isPopular) { e.currentTarget.style.background = plan.color; e.currentTarget.style.color = '#06060E' }
                }}
                onMouseLeave={e => {
                    if (!isPopular) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = plan.color }
                }}
            >{plan.cta}</a>
        </div>
    )
}