import './PricingSection.css';

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '923174307043';

const plans = [
    {
        name: 'Starter', price: '15,000', note: 'PKR',
        tagline: 'Get online and get found fast',
        color: '#8080A8', popular: false,
        features: [
            'Up to 5 pages',
            'Mobile responsive design',
            'Contact form + WhatsApp button',
            'Google Maps integration',
            'Basic on-page SEO',
            '3-day delivery',
            '30-day free support',
        ],
        cta: 'Get Started',
        waMsg: "Hi Ahmed! I'm interested in the Starter plan.",
    },
    {
        name: 'Business', price: '35,000', note: 'PKR',
        tagline: 'The complete package to attract more customers',
        color: '#7C3AED', popular: true,
        features: [
            'Up to 10 pages',
            'Mobile responsive design',
            'Contact form + WhatsApp',
            'Full SEO + keyword research',
            'Free domain for 1 year',
            '3 months free support',
            '5–8 day delivery',
        ],
        cta: 'Start Now →',
        waMsg: "Hi Ahmed! I'm interested in the Business plan.",
    },
    {
        name: 'Premium', price: '75,000', note: 'PKR',
        tagline: 'Turn your website into a revenue machine',
        color: '#F43F5E', popular: false,
        features: [
            'Unlimited pages',
            'Custom UI/UX design',
            'Full e-commerce store',
            'Payment gateway integration',
            'Admin dashboard',
            '6 months free support',
            'Priority delivery',
        ],
        cta: 'Go Premium',
        waMsg: "Hi Ahmed! I'm interested in the Premium plan.",
    },
];

export default function PricingSection() {
    return (
        <section id="pricing" className="pricing">
            <div className="container">
                <div className="pricing__header">
                    <div className="section-label">Investment</div>
                    <h2 className="section-title">
                        TRANSPARENT <span style={{ color: 'var(--accent)' }}>PRICING</span>
                    </h2>
                    <p className="section-subtitle">No hidden fees. Fixed prices in PKR. Pay half upfront, half on delivery.</p>
                </div>
                <div className="pricing__grid">
                    {plans.map(p => <PriceCard key={p.name} plan={p} />)}
                </div>
            </div>
        </section>
    );
}

function PriceCard({ plan: p }) {
    return (
        <div className={`price__card ${p.popular ? 'price__card--featured' : ''}`}>
            {p.popular && <div className="price__badge">Most Popular</div>}
            <div className="price__tier">{p.name}</div>
            <div className="price__amount">{p.price} <span>{p.note}</span></div>
            <p className="price__tagline">{p.tagline}</p>
            <div className="price__divider" />
            <ul className="price__features">
                {p.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(p.waMsg)}`}
                target="_blank" rel="noopener noreferrer"
                className={`price__btn ${p.popular ? 'price__btn--featured' : ''}`}
            >
                {p.cta}
            </a>
        </div>
    );
}