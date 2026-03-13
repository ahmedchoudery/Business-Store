// FILE: client/src/components/HeroSection/HeroSection.jsx
// DIAGNOSTIC VERSION — no 3D canvas at all.
// If the page renders with this file, the 3D canvas was the crash.
// Tell me once this works and I'll add the 3D back properly.

import { useState, useEffect } from 'react';
import './HeroSection.css';

const roles = ['YOUR BUSINESS', 'RESTAURANTS', 'BOUTIQUES', 'CLINICS', 'WEDDING HALLS', 'REAL ESTATE'];

const stats = [
    { value: '15+', label: 'Projects' },
    { value: '100%', label: 'Satisfaction' },
    { value: '3d', label: 'Avg. Delivery' },
    { value: '24/7', label: 'Support' },
];

export default function HeroSection() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setRoleIndex(i => (i + 1) % roles.length);
                setFade(true);
            }, 380);
        }, 2800);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="hero" className="hero">
            {/* Static gradient background — no canvas */}
            <div className="hero__bg" />

            <div className="container">
                <div className="hero__inner">

                    {/* LEFT */}
                    <div className="hero__left">
                        <div className="hero__badge animate-fade-up animate-delay-1">
                            <span className="hero__badge-dot" />
                            <span>Available for projects · 🇵🇰 Pakistan</span>
                        </div>

                        <h1 className="hero__h1 animate-fade-up animate-delay-2">
                            <span className="hero__line1">WEBSITES</span>
                            <span className="hero__line2">THAT GROW</span>
                            <span className="hero__line-static" aria-hidden="true">Pakistani Businesses</span>
                            <span
                                aria-hidden="true"
                                className="hero__cycle"
                                style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(-14px)' }}
                            >
                                {roles[roleIndex]}
                            </span>
                        </h1>

                        <p className="hero__body animate-fade-up animate-delay-3">
                            I craft fast, modern, SEO-optimized websites for Pakistani businesses.
                            From Karachi to Lahore — your brand deserves a powerful digital presence.
                        </p>

                        <div className="hero__actions animate-fade-up animate-delay-4">
                            <button
                                className="btn btn-primary"
                                onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                See Real Results →
                            </button>
                            <a
                                href="https://wa.me/923174307043?text=Hi%20Ahmed%2C%20I%20need%20a%20website%20for%20my%20business"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                            >
                                💬 WhatsApp
                            </a>
                        </div>

                        <div className="hero__stats animate-fade-up animate-delay-5">
                            {stats.map(s => (
                                <div key={s.value} className="hero__stat">
                                    <div className="hero__stat-val">{s.value}</div>
                                    <div className="hero__stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — metric card */}
                    <div className="hero__right animate-fade-up animate-delay-3">
                        <div className="hero__card">
                            <div className="hero__card-top">
                                <div className="hero__card-avatar">A</div>
                                <div>
                                    <div className="hero__card-name">Ahmed · Dev</div>
                                    <div className="hero__card-role">Full-Stack Web Developer</div>
                                </div>
                            </div>
                            <div className="hero__card-divider" />
                            {[
                                ['Projects Delivered', '15+'],
                                ['Avg. Page Speed', '96 / 100'],
                                ['Client Satisfaction', '100%'],
                                ['Response Time', '< 2 hrs'],
                            ].map(([label, val]) => (
                                <div key={label} className="hero__card-metric">
                                    <span className="hero__card-metric-label">{label}</span>
                                    <span className="hero__card-metric-val">{val}</span>
                                </div>
                            ))}
                            <div className="hero__card-tags">
                                {['React', 'Next.js', 'Node.js', 'SEO', 'Tailwind'].map(t => (
                                    <span key={t} className="hero__card-tag">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div aria-hidden="true" className="hero__scroll-indicator">
                <span>SCROLL</span>
                <div className="hero__scroll-line" />
            </div>
        </section>
    );
}