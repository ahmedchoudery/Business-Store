import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
    FiLayout,
    FiSmartphone,
    FiZap,
    FiCode,
    FiCheckCircle,
    FiShoppingBag,
} from 'react-icons/fi';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './ServicesSection.css';

const SERVICES = [
    {
        icon: <FiShoppingBag size={28} />,
        title: 'Business Website Development',
        desc: 'Full websites tailored for local businesses with clear service pages, contact options, and calls-to-action that convert visitors into leads.',
        tags: ['Multi-page', 'Lead-Focused', 'WhatsApp'],
        color: '#10b981',
    },
    {
        icon: <FiSmartphone size={28} />,
        title: 'Landing Page Design',
        desc: 'Single-page, high-converting landing pages built for campaigns, product launches, and special offers.',
        tags: ['Conversion Focused', 'Modern UI', 'Copy Guidance'],
        color: 'var(--color-primary)',
    },
    {
        icon: <FiLayout size={28} />,
        title: 'Website Redesign',
        desc: 'Transform outdated or underperforming sites into fast, modern experiences without losing your existing content or SEO.',
        tags: ['Modernization', 'UX Upgrade', 'Brand Refresh'],
        color: '#f59e0b',
    },
    {
        icon: <FiCode size={28} />,
        title: 'Website Performance Optimization',
        desc: 'Speed audits and optimizations so your site loads quickly, ranks better in search, and feels snappy on mobile data.',
        tags: ['Core Web Vitals', 'Lazy Loading', 'Code Cleanup'],
        color: '#06b6d4',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function ServicesSection() {
    const ref = useRef(null);
    const { visible } = useScrollReveal({ threshold: 0.3 });

    return (
        <section id="services" className="section services">
            <div className="container">
                <div className="services__header">
                    <motion.span
                        className="section-label"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        💼 What I Offer
                    </motion.span>
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Services That <span className="gradient-text">Grow Your Business</span>
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Every service is tailored for local businesses who want to look professional online
                        and start converting visitors into paying customers.
                    </motion.p>
                </div>

                <motion.div
                    ref={ref}
                    className="services__grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={visible ? 'visible' : 'hidden'}
                >
                    {SERVICES.map((service, i) => (
                        <motion.div key={i} className="card services__card" variants={cardVariants}>
                            <div
                                className="services__icon"
                                style={{
                                    color: service.color,
                                    background: `${service.color}18`,
                                }}
                            >
                                {service.icon}
                            </div>
                            <h3 className="services__title">{service.title}</h3>
                            <p className="services__desc">{service.desc}</p>
                            <div className="services__tags">
                                {service.tags.map((tag) => (
                                    <span key={tag} className="services__tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
