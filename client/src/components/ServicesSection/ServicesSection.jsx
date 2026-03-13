import './ServicesSection.css';

const services = [
    {
        icon: '🖥️', title: 'Business Website', color: '#7C3AED',
        desc: 'A professional website that builds trust with your customers and keeps your business open 24/7 online.',
        tags: ['5–8 Pages', 'Mobile-First', 'Contact Form'],
    },
    {
        icon: '🛒', title: 'E-Commerce Store', color: '#F43F5E',
        desc: 'Sell your products online with a secure, easy-to-manage store. Accept payments and track orders.',
        tags: ['Product Catalog', 'Cart & Checkout', 'Inventory'],
    },
    {
        icon: '🚀', title: 'Landing Page', color: '#10B981',
        desc: 'High-converting single-page sites built for ads, campaigns, and lead generation.',
        tags: ['1-Page Design', 'CTA Focused', 'Fast Load'],
    },
    {
        icon: '🔍', title: 'SEO Optimization', color: '#F59E0B',
        desc: 'Rank higher on Google Pakistan. Get found by local customers when they search for your services.',
        tags: ['Keyword Research', 'On-Page SEO', 'Analytics'],
    },
    {
        icon: '📱', title: 'Mobile-First Design', color: '#A78BFA',
        desc: '80%+ of Pakistani users browse on mobile. Your site will look stunning on every screen size.',
        tags: ['Responsive', 'Touch-Friendly', 'Fast on 4G'],
    },
    {
        icon: '🔧', title: 'Maintenance & Care', color: '#F97316',
        desc: 'Monthly plans to keep your site updated, secure, and fast. Never worry about your website again.',
        tags: ['Monthly Updates', 'Security', 'Backups'],
    },
];

export default function ServicesSection() {
    return (
        <section id="services" className="services">
            <div className="container">
                <div className="services__header">
                    <div className="section-label">What I Offer</div>
                    <h2 className="section-title">
                        SERVICES BUILT<br />
                        <span className="gradient-text">FOR GROWTH</span>
                    </h2>
                    <p className="section-subtitle">
                        Everything your business needs to dominate online — from a fast landing page
                        to a full e-commerce store with SEO baked in from day one.
                    </p>
                </div>

                <div className="services__grid">
                    {services.map((s) => <ServiceCard key={s.title} s={s} />)}
                </div>

                <div className="services__cta-bar">
                    <div>
                        <h3 className="services__cta-h">Not sure what you need?</h3>
                        <p className="services__cta-p">Tell me about your business and I'll recommend the right solution.</p>
                    </div>
                    <a
                        href="https://wa.me/923174307043?text=Hi%20Ahmed%2C%20I%20need%20help%20choosing%20a%20service"
                        target="_blank" rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Get a Free Consultation →
                    </a>
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ s }) {
    return (
        <div className="scard">
            <div className="scard__glow" style={{ background: s.color }} />
            <div className="scard__icon" style={{
                background: `${s.color}18`, border: `1px solid ${s.color}35`, color: s.color,
            }}>
                {s.icon}
            </div>
            <h3 className="scard__title">{s.title}</h3>
            <p className="scard__desc">{s.desc}</p>
            <div className="scard__tags">
                {s.tags.map(t => (
                    <span key={t} className="scard__tag" style={{
                        background: `${s.color}12`, color: s.color, border: `1px solid ${s.color}28`,
                    }}>
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
}