import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import './HeroSection.css';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '923001234567';
const WHATSAPP_MSG = encodeURIComponent(
    "Hi Ahmed! I saw your website and I'm interested in getting a website built for my business. Can we discuss?"
);

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function HeroSection() {
    return (
        <section id="hero" className="hero">
            {/* Animated background blobs */}
            <div className="hero__blob hero__blob--1" aria-hidden="true" />
            <div className="hero__blob hero__blob--2" aria-hidden="true" />
            <div className="hero__grid" aria-hidden="true" />

            <div className="container hero__inner">
                <motion.span
                    className="section-label"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                >
                    🚀 Open for Projects
                </motion.span>

                <motion.h1
                    className="hero__title"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                >
                    I Build <span className="gradient-text">High-Converting</span>
                    <br />
                    Websites for
                    <br />
                    Local Businesses
                </motion.h1>

                <motion.p
                    className="hero__subtitle"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                >
                    Stunning websites for <strong>Coaches, Gyms, Agents & Shops</strong>.
                    Built to turn your visitors into customers with WhatsApp integration and modern design.
                </motion.p>

                <motion.div
                    className="hero__ctas"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                >
                    <a
                        href="#contact"
                        className="btn btn-primary btn-lg"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Get a Free Quote <FiArrowRight />
                    </a>
                    <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-lg"
                    >
                        <BsWhatsapp size={20} /> Chat on WhatsApp
                    </a>
                </motion.div>

                {/* Social proof bar */}
                <motion.div
                    className="hero__proof"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                >
                    <div className="hero__proof-item">
                        <span className="hero__proof-number">100%</span>
                        <span className="hero__proof-label">Mobile-First</span>
                    </div>
                    <div className="hero__proof-divider" />
                    <div className="hero__proof-item">
                        <span className="hero__proof-number">24h</span>
                        <span className="hero__proof-label">Response Time</span>
                    </div>
                    <div className="hero__proof-divider" />
                    <div className="hero__proof-item">
                        <span className="hero__proof-number">Fast</span>
                        <span className="hero__proof-label">Delivery</span>
                    </div>
                    <div className="hero__proof-divider" />
                    <div className="hero__proof-item">
                        <span className="hero__proof-number">⭐ 5/5</span>
                        <span className="hero__proof-label">Client Satisfaction</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
