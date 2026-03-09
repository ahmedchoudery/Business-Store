import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { scrollToSection } from '../../utils/scrollTo'; // shared utility with navbar offset
import Hero3DCanvas from './Hero3DCanvas';
import './HeroSection.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function HeroSection() {
    const [parallax, setParallax] = useState({ x: 0, y: 0 });

    const handleParallaxMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setParallax({
            x: x * 12,
            y: y * 6,
        });
    };

    return (
        <section id="hero" className="hero">
            {/* Animated background blobs */}
            <div className="hero__blob hero__blob--1" aria-hidden="true" />
            <div className="hero__blob hero__blob--2" aria-hidden="true" />
            <div className="hero__grid" aria-hidden="true" />

            <div
                className="container hero__inner"
                onMouseMove={handleParallaxMove}
            >
                <div className="hero__layout">
                    <div className="hero__left">
                        <motion.div
                            className="hero__text"
                            style={{
                                transform: `translate3d(${parallax.x * 0.6}px, ${parallax.y * 0.6}px, 0)`,
                            }}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                        >
                            <span className="section-label">
                                🚀 Open for Projects
                            </span>

                            <h1 className="hero__title hero__title--3d">
                                I Build <span className="gradient-text">High-Converting</span>
                                <br />
                                Websites for
                                <br />
                                Local Businesses
                            </h1>

                            <p className="hero__subtitle">
                                Fast, modern, mobile-first websites that help businesses attract more customers.
                            </p>

                            <div className="hero__ctas">
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
                            </div>
                        </motion.div>

                        <motion.div
                            className="hero__highlights"
                            style={{
                                transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
                            }}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={3.5}
                        >
                            <div className="hero__highlight-card">
                                <span className="hero__highlight-label">Conversion-focused layouts</span>
                                <p>Designed to turn visitors into leads for local businesses.</p>
                            </div>
                            <div className="hero__highlight-card">
                                <span className="hero__highlight-label">Done-for-you websites</span>
                                <p>From copy to deployment, I handle the full launch for you.</p>
                            </div>
                            <div className="hero__highlight-card">
                                <span className="hero__highlight-label">Fast & mobile-first</span>
                                <p>Optimized for speed, SEO, and WhatsApp inquiries.</p>
                            </div>
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
                        <Hero3DCanvas />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
