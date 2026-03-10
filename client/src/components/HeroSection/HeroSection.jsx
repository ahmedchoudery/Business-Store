import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { scrollToSection } from '../../utils/scrollTo';
import Hero3DCanvas from './Hero3DCanvas';
import './HeroSection.css';

const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function HeroSection() {
    return (
        <section id="hero" className="hero">
            {/* Background elements */}
            <div className="hero__blob hero__blob--1" aria-hidden="true" />
            <div className="hero__blob hero__blob--2" aria-hidden="true" />
            <div className="hero__grid" aria-hidden="true" />

            <div className="container hero__inner">
                <div className="hero__layout">

                    {/* ── Left: copy ────────────────── */}
                    <div className="hero__left">

                        {/* Status badge */}
                        <motion.div
                            className="hero__badge"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                        >
                            <span className="hero__badge-dot" />
                            <span className="hero__badge-text">Open for new projects</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            className="hero__title"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={1}
                        >
                            Websites That{' '}
                            <span className="gradient-text">Win Customers</span>
                            {' '}for Local Businesses
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="hero__subtitle"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={2}
                        >
                            I build fast, modern, mobile-first websites designed to turn
                            visitors into paying customers — from first click to WhatsApp inquiry.
                        </motion.p>

                        {/* CTAs */}
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
                                onClick={(e) => { e.preventDefault(); scrollToSection('#portfolio'); }}
                            >
                                View My Work <FiArrowRight />
                            </a>
                            <a
                                href="#contact"
                                className="btn btn-outline btn-lg"
                                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                            >
                                Get a Free Quote <FiArrowUpRight />
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
                                <span className="hero__proof-number">5★</span>
                                <span className="hero__proof-label">Client Rating</span>
                            </div>
                            <div className="hero__proof-divider" />
                            <div className="hero__proof-item">
                                <span className="hero__proof-number">100%</span>
                                <span className="hero__proof-label">Mobile-First</span>
                            </div>
                            <div className="hero__proof-divider" />
                            <div className="hero__proof-item">
                                <span className="hero__proof-number">7 Days</span>
                                <span className="hero__proof-label">Avg. Delivery</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Right: 3D canvas ──────────── */}
                    <motion.div
                        className="hero__right"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={5}
                    >
                        <Hero3DCanvas />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}