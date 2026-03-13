// FILE: client/src/components/ServicesSection/ServicesSection.jsx

import { useRef, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './ServicesSection.css';

const SERVICES = [
    { icon: '🖥️', title: 'Business Website', desc: 'A professional site that keeps your business open 24/7 and builds trust with every visitor.', tags: ['5–8 Pages', 'Mobile-First', 'Contact Form'], color: '#7C3AED' },
    { icon: '🛒', title: 'E-Commerce Store', desc: 'Sell your products online with a secure, easy-to-manage store. Accept payments and track orders.', tags: ['Product Catalog', 'Cart & Checkout', 'Inventory'], color: '#F43F5E' },
    { icon: '🚀', title: 'Landing Page', desc: 'High-converting single pages built for ads and lead gen. More clicks = more sales.', tags: ['1-Page Design', 'CTA Focused', 'Fast Load'], color: '#10B981' },
    { icon: '🔍', title: 'SEO Optimization', desc: 'Rank higher on Google Pakistan. Get found by local customers searching for your services.', tags: ['Keyword Research', 'On-Page SEO', 'Analytics'], color: '#F59E0B' },
    { icon: '📱', title: 'Mobile-First Design', desc: 'Over 80% of Pakistani users browse on mobile. Your site will look perfect on every screen.', tags: ['Responsive', 'Touch-Friendly', 'Fast on 4G'], color: '#A78BFA' },
    { icon: '🔧', title: 'Website Maintenance', desc: 'Keep your site updated, secure, and fast. Monthly care plans so you never worry again.', tags: ['Monthly Updates', 'Security', 'Support'], color: '#38BDF8' },
];

function ServiceCard({ service, index }) {
    const cardRef = useRef(null);
    const { ref: revealRef, visible } = useScrollReveal({ threshold: 0.12 });

    // Magnetic tilt on hover
    useEffect(() => {
        const card = cardRef.current;
        if (!card || window.matchMedia('(pointer: coarse)').matches) return;

        const onMove = (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const rx = ((e.clientY - cy) / (rect.height / 2)) * -10;
            const ry = ((e.clientX - cx) / (rect.width / 2)) * 10;
            card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        };
        const onLeave = () => { card.style.transform = ''; };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        return () => {
            card.removeEventListener('mousemove', onMove);
            card.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    const delay = (index % 3) * 0.1;

    return (
        <div
            ref={(el) => { cardRef.current = el; revealRef.current = el; }}
            className={`svc-card ${visible ? 'svc-card--visible' : ''}`}
            style={{ '--color': service.color, '--delay': `${delay}s` }}
        >
            <div className="svc-card__glow" />
            <div className="svc-card__icon">{service.icon}</div>
            <h3 className="svc-card__title">{service.title}</h3>
            <p className="svc-card__desc">{service.desc}</p>
            <div className="svc-card__tags">
                {service.tags.map(t => <span key={t} className="svc-card__tag">{t}</span>)}
            </div>
            <div className="svc-card__arrow">→</div>
        </div>
    );
}

export default function ServicesSection() {
    const { ref: headRef, visible: headVisible } = useScrollReveal({ threshold: 0.3 });

    return (
        <section id="services" className="services">
            <div className="container">
                <div ref={headRef} className={`services__head ${headVisible ? 'reveal visible' : 'reveal'}`}>
                    <span className="section-label">What I Build</span>
                    <h2 className="section-title">Services That <span className="gradient-text">Drive Growth</span></h2>
                    <p className="section-subtitle">
                        Every service is designed to attract customers, build trust, and make your business stand out in the Pakistani market.
                    </p>
                </div>

                <div className="services__grid">
                    {SERVICES.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
                </div>
            </div>
        </section>
    );
}