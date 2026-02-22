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
        icon: <FiSmartphone size={28} />,
        title: 'Responsive Websites',
        desc: 'Pixel-perfect layouts that look stunning on every device — phone, tablet, or desktop. Built with CSS Grid, Flexbox & media queries.',
        tags: ['Mobile-First', 'CSS Grid', 'Flexbox'],
        color: 'var(--color-primary)',
    },
    {
        icon: <FiLayout size={28} />,
        title: 'Landing Pages',
        desc: 'High-converting landing pages for your business with WhatsApp integration and a professional contact form to capture leads.',
        tags: ['Lead Gen', 'WhatsApp', 'CTA Focused'],
        color: '#f59e0b',
    },
    {
        icon: <FiCode size={28} />,
        title: 'React Business Websites',
        desc: 'Fast, modern React-based websites with smooth animations, clean code structure, and component reusability built for scale.',
        tags: ['React', 'Vite', 'Framer Motion'],
        color: '#06b6d4',
    },
    {
        icon: <FiShoppingBag size={28} />,
        title: 'Static Business Sites',
        desc: 'Clean and professional static websites for local shops, gyms, real estate agents, and coaching centers. Quick to launch, easy to maintain.',
        tags: ['Fast Load', 'SEO Ready', 'Local Business'],
        color: '#10b981',
    },
    {
        icon: <FiZap size={28} />,
        title: 'Speed Optimization',
        desc: 'Slow website losing customers? I audit and optimize load times, compress assets, lazy-load images, and improve Core Web Vitals.',
        tags: ['Core Web Vitals', 'Lazy Load', 'Minification'],
        color: '#f59e0b',
    },
    {
        icon: <FiCheckCircle size={28} />,
        title: 'CSS Bug Fixes & JS Validation',
        desc: 'Fixing broken layouts, cross-browser issues, and adding basic client-side JavaScript form validation to your existing site.',
        tags: ['Bug Fixing', 'Cross-browser', 'Validation'],
        color: '#ec4899',
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
