import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import './PricingSection.css';

const PLANS = [
    {
        name: 'Starter',
        price: '15,000',
        currency: 'PKR',
        desc: 'Perfect for local shops and small businesses needing a clean online presence.',
        features: [
            'Single-page responsive website',
            'WhatsApp integration button',
            'Contact form (MongoDB)',
            'Mobile-first design',
            '1 revision round',
            'Delivery in 3–5 days',
        ],
        cta: 'Get Started',
        popular: false,
        color: 'var(--color-text-muted)',
    },
    {
        name: 'Business',
        price: '35,000',
        currency: 'PKR',
        desc: 'Best for coaching centers, gyms, and real estate agents who need a complete site.',
        features: [
            'Multi-section React website',
            'WhatsApp + Contact form',
            'Services / Portfolio pages',
            'Testimonials section',
            'Speed optimization',
            '3 revision rounds',
            'Delivery in 7–10 days',
            'Free 30-day support',
        ],
        cta: 'Most Popular',
        popular: true,
        color: 'var(--color-primary)',
    },
    {
        name: 'Premium',
        price: '65,000',
        currency: 'PKR',
        desc: 'Full-featured business site with dashboard-ready backend and admin features.',
        features: [
            'Everything in Business plan',
            'Admin dashboard (basic)',
            'Login/auth system',
            'Booking inquiry system',
            'REST API (Node.js)',
            'MongoDB Atlas setup',
            'Vercel deployment',
            '60-day support',
        ],
        cta: 'Go Premium',
        popular: false,
        color: 'var(--color-accent)',
    },
];

export default function PricingSection() {
    const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '923001234567';

    return (
        <section id="pricing" className="section pricing">
            <div className="container">
                <motion.div
                    className="pricing__header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-label">💰 Pricing</span>
                    <h2 className="section-title">
                        Transparent <span className="gradient-text">Pricing Plans</span>
                    </h2>
                    <p className="section-subtitle">
                        No hidden fees. No surprises. Just honest pricing for quality work. Need a custom
                        quote? Let's talk on WhatsApp.
                    </p>
                </motion.div>

                <div className="pricing__grid">
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={i}
                            className={`card pricing__card ${plan.popular ? 'pricing__card--popular' : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            {plan.popular && (
                                <div className="pricing__badge">⭐ Most Popular</div>
                            )}
                            <div className="pricing__plan-name" style={{ color: plan.color }}>
                                {plan.name}
                            </div>
                            <div className="pricing__price">
                                <span className="pricing__currency">{plan.currency}</span>
                                <span className="pricing__amount">{plan.price}</span>
                            </div>
                            <p className="pricing__desc">{plan.desc}</p>
                            <ul className="pricing__features">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="pricing__feature">
                                        <FiCheck className="pricing__check" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                                    `Hi Ahmed! I'm interested in the ${plan.name} plan. Can we discuss?`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} pricing__btn`}
                            >
                                {plan.cta}
                            </a>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    className="pricing__note"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    💬 Prices are flexible. Have a tight budget? Let's talk — I'm open to discussing.
                </motion.p>
            </div>
        </section>
    );
}
