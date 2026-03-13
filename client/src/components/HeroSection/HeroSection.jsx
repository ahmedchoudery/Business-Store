// FILE: client/src/components/HeroSection/HeroSection.jsx

import { useState, useEffect, useRef } from 'react';
import Hero3DCanvas from './Hero3DCanvas';
import './HeroSection.css';

const ROLES = ['YOUR BUSINESS', 'RESTAURANTS', 'BOUTIQUES', 'CLINICS', 'WEDDING HALLS', 'REAL ESTATE'];
const STATS = [
    { val: '15+', label: 'Projects' },
    { val: '100%', label: 'Satisfaction' },
    { val: '3d', label: 'Delivery' },
    { val: '24/7', label: 'Support' },
];

export default function HeroSection() {
    const [roleIdx, setRoleIdx] = useState(0);
    const [fade, setFade] = useState(true);
    const sectionRef = useRef(null);

    // Cycle roles
    useEffect(() => {
        const id = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setRoleIdx(i => (i + 1) % ROLES.length);
                setFade(true);
            }, 380);
        }, 2800);
        return () => clearInterval(id);
    }, []);

    // Parallax on mouse move (desktop only)
    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        const section = sectionRef.current;
        if (!section) return;

        let raf;
        let tx = 0, ty = 0;

        const onMove = (e) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            tx = (e.clientX - cx) / cx;
            ty = (e.clientY - cy) / cy;
        };

        const loop = () => {
            const layers = section.querySelectorAll('[data-parallax]');
            layers.forEach(el => {
                const depth = parseFloat(el.dataset.parallax);
                el.style.transform = `translate(${tx * depth}px, ${ty * depth}px)`;
            });
            raf = requestAnimationFrame(loop);
        };

        raf = requestAnimationFrame(loop);
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
    }, []);

    return (
        <section id="hero" className="hero" ref={sectionRef}>
            {/* ── 3D Canvas fills the full right side and background ── */}
            <Hero3DCanvas />

            {/* Gradient overlays */}
            <div className="hero__grad hero__grad--l" />
            <div className="hero__grad hero__grad--b" />

            {/* Floating bg orbs */}
            <div className="hero__orb hero__orb--1" data-parallax="-18" />
            <div className="hero__orb hero__orb--2" data-parallax="12" />

            <div className="container">
                <div className="hero__content">

                    {/* ── LEFT ── */}
                    <div className="hero__left">

                        <div className="hero__badge animate-fade-up animate-delay-1">
                            <span className="hero__badge-pulse" />
                            <span>Available for projects · 🇵🇰 Pakistan</span>
                        </div>

                        <h1 className="hero__h1 animate-fade-up animate-delay-2">
                            <span className="hero__line1">WEBSITES</span>
                            <span className="hero__line2">THAT GROW</span>
                            <span className="hero__line-wrap">
                                {/* Invisible spacer keeps layout stable */}
                                <span className="hero__line-spacer" aria-hidden="true">{ROLES[0]}</span>
                                <span
                                    className="hero__cycle"
                                    style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(-16px)' }}
                                >
                                    {ROLES[roleIdx]}
                                </span>
                            </span>
                        </h1>

                        <p className="hero__body animate-fade-up animate-delay-3">
                            I craft fast, modern, SEO-optimized websites for Pakistani businesses.
                            From Karachi to Lahore — your brand deserves a powerful digital presence.
                        </p>

                        <div className="hero__actions animate-fade-up animate-delay-4">
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                See Real Results →
                            </button>
                            <a
                                href="https://wa.me/923174307043?text=Hi%20Ahmed%2C%20I%20need%20a%20website"
                                target="_blank" rel="noopener noreferrer"
                                className="btn btn-whatsapp btn-lg"
                            >
                                💬 WhatsApp Me
                            </a>
                        </div>

                        <div className="hero__stats animate-fade-up animate-delay-5">
                            {STATS.map(s => (
                                <div key={s.val} className="hero__stat">
                                    <div className="hero__stat-val">{s.val}</div>
                                    <div className="hero__stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT metric card ── */}
                    <div className="hero__right animate-fade-up animate-delay-3" data-parallax="10">
                        <div className="hero__card">
                            <div className="hero__card-glow" />
                            <div className="hero__card-top">
                                <div className="hero__card-avatar">A</div>
                                <div>
                                    <div className="hero__card-name">Ahmed · Dev</div>
                                    <div className="hero__card-role">Full-Stack Web Developer</div>
                                </div>
                                <div className="hero__card-online">
                                    <span className="hero__card-dot" />
                                    Online
                                </div>
                            </div>
                            <div className="hero__card-divider" />
                            {[
                                ['Projects Delivered', '15+'],
                                ['Avg. Page Speed', '96 / 100'],
                                ['Client Satisfaction', '100%'],
                                ['Response Time', '< 2 hrs'],
                            ].map(([l, v]) => (
                                <div key={l} className="hero__card-row">
                                    <span className="hero__card-row-label">{l}</span>
                                    <span className="hero__card-row-val">{v}</span>
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

            <div className="hero__scroll" aria-hidden="true">
                <span>SCROLL</span>
                <div className="hero__scroll-line" />
            </div>
        </section>
    );
}