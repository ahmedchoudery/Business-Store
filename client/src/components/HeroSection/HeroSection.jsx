import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { scrollToSection } from '../../utils/scrollTo'; // shared utility with navbar offset
import './HeroSection.css';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '923174307043';
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
                <div className="hero__layout">
                    <div className="hero__left">
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
                            Fast, modern, mobile-first websites that help businesses attract more customers.
                        </motion.p>

                        <motion.div
                            className="hero__ctas"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={3}
                        >
                            <a
                                href="#portfolio"
                                className="btn btn-primary btn-lg"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('#portfolio');
                                }}
                            >
                                View My Work <FiArrowRight />
                            </a>
                            <a
                                href="#contact"
                                className="btn btn-outline btn-lg"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('#contact');
                                }}
                            >
                                Get a Free Quote
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
                                <span className="hero__proof-number">10+</span>
                                <span className="hero__proof-label">Websites Built</span>
                            </div>
                            <div className="hero__proof-divider" />
                            <div className="hero__proof-item">
                                <span className="hero__proof-number">5+</span>
                                <span className="hero__proof-label">Happy Clients</span>
                            </div>
                            <div className="hero__proof-divider" />
                            <div className="hero__proof-item">
                                <span className="hero__proof-number">100%</span>
                                <span className="hero__proof-label">Mobile Responsive</span>
                            </div>
                            <div className="hero__proof-divider" />
                            <div className="hero__proof-item">
                                <span className="hero__proof-number">⚡</span>
                                <span className="hero__proof-label">Fast Delivery</span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="hero__right"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={4.5}
                    >
                        <div className="hero__mockup">
                            <div className="hero__mockup-header">
                                <div className="hero__mockup-dots">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                <span className="hero__mockup-url">ahmeddev.studio</span>
                            </div>
                            <div className="hero__mockup-body">
                                <div className="hero__mockup-hero">
                                    <span className="hero__mockup-badge">Featured Project</span>
                                    <h3>Falak Halls &amp; Events</h3>
                                    <p>High-converting website for a luxury events and marriage hall business.</p>
                                </div>
                                <div className="hero__mockup-metrics">
                                    <div>
                                        <span className="hero__mockup-metric-value">+45%</span>
                                        <span className="hero__mockup-metric-label">More inquiries</span>
                                    </div>
                                    <div>
                                        <span className="hero__mockup-metric-value">1.2s</span>
                                        <span className="hero__mockup-metric-label">Page load</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
