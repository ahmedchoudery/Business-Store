import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    FiLayout,
    FiSmartphone,
    FiZap,
    FiCode,
    FiCheckCircle,
    FiShoppingBag,
} from 'react-icons/fi';
import './ServicesSection.css';

const SERVICES = [
    {
        icon: <FiCheckCircle size={28} />,
        title: 'HTML/CSS/JS Bug Fixes',
        desc: 'I will fix your broken website layout, cross-browser issues, and JavaScript errors in 24 hours.',
        tags: ['24h Delivery', 'Layout Fix', 'JS Debug'],
        color: '#ec4899',
    },
    {
        icon: <FiSmartphone size={28} />,
        title: 'Responsive Website Design',
        desc: 'I will make your website mobile-friendly and responsive, ensuring it looks perfect on every screen.',
        tags: ['Mobile-First', 'Auto-Scaling', 'UI/UX'],
        color: 'var(--color-primary)',
    },
    {
        icon: <FiLayout size={28} />,
        title: 'Landing Pages',
        desc: 'I will build a modern, high-converting landing page for your business or product launching.',
        tags: ['Conversion', 'Fast-Load', 'Modern UI'],
        color: '#f59e0b',
    },
    {
        icon: <FiShoppingBag size={28} />,
        title: 'Small Business Website',
        desc: 'I will create a 4-page website with WhatsApp integration, Google Maps, and basic SEO setup.',
        tags: ['Complete SEO', 'Maps', 'WhatsApp'],
        color: '#10b981',
    },
    {
        icon: <FiCode size={28} />,
        title: 'Portfolio Website',
        desc: 'I will design a clean, professional portfolio or resume website for you to showcase your work.',
        tags: ['Personal Brand', 'Modern Design', 'Portfolio'],
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
    const isInView = useInView(ref, { once: true, margin: '-100px' });

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
                    animate={isInView ? 'visible' : 'hidden'}
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
