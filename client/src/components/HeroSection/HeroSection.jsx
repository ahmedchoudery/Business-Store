import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import './HeroSection.css'

const Hero3DCanvas = lazy(() => import('./Hero3DCanvas'))

export default function HeroSection({ hero }) {
    const [roleIdx, setRoleIdx] = useState(0)
    const [typed, setTyped] = useState('')
    const [deleting, setDeleting] = useState(false)
    const sectionRef = useRef(null)
    const parallaxRef = useRef([])
    const roles = hero.typewriterRoles?.length ? hero.typewriterRoles : ['Frontend Engineer']

    useEffect(() => {
        setRoleIdx(0)
        setTyped('')
        setDeleting(false)
    }, [roles.join('|')])

    /* ── Typewriter ── */
    useEffect(() => {
        const current = roles[roleIdx] || roles[0]
        let t
        if (!deleting && typed.length < current.length) {
            t = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 65)
        } else if (!deleting && typed.length === current.length) {
            t = setTimeout(() => setDeleting(true), 1800)
        } else if (deleting && typed.length > 0) {
            t = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 30)
        } else if (deleting && typed.length === 0) {
            setDeleting(false)
            setRoleIdx(i => (i + 1) % roles.length)
        }
        return () => clearTimeout(t)
    }, [typed, deleting, roleIdx, roles])

    /* ── Mouse parallax ── */
    useEffect(() => {
        let raf
        const onMove = (e) => {
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
                const hw = window.innerWidth / 2
                const hh = window.innerHeight / 2
                const dx = (e.clientX - hw) / hw
                const dy = (e.clientY - hh) / hh
                parallaxRef.current.forEach((el, i) => {
                    if (!el) return
                    const depth = (i + 1) * 12
                    el.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`
                })
            })
        }
        window.addEventListener('mousemove', onMove, { passive: true })
        return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
    }, [])

    const nav = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section className="hero" ref={sectionRef} id="home">
            {/* 3D Background */}
            <div className="hero__canvas">
                <Suspense fallback={<div className="hero__canvas-fallback" />}>
                    <Hero3DCanvas />
                </Suspense>
            </div>

            {/* Dark overlay gradient */}
            <div className="hero__overlay" />

            {/* Parallax orbs */}
            <div className="hero__orb hero__orb--1" ref={el => parallaxRef.current[0] = el} />
            <div className="hero__orb hero__orb--2" ref={el => parallaxRef.current[1] = el} />
            <div className="hero__orb hero__orb--3" ref={el => parallaxRef.current[2] = el} />

            {/* Content */}
            <div className="container hero__content">
                <div className="hero__left">

                    {/* Status badge */}
                    <div className="hero__badge animate-fade-up animate-delay-1">
                        <span className="hero__badge-dot" />
                        <span className="hero__badge-mono">{hero.badge} - Pakistan</span>
                    </div>

                    <div className="hero__context animate-fade-up animate-delay-1">
                        {hero.recruiterContext}
                    </div>

                    {/* Headline */}
                    <h1 className="hero__title animate-fade-up animate-delay-2">
                        <span className="hero__title-line hero__title-dim">{hero.titleLines[0]}</span>
                        <span className="hero__title-line">{hero.titleLines[1]}</span>
                        <span className="hero__title-line hero__title-accent">{hero.titleLines[2]}</span>
                    </h1>

                    {/* Typewriter role */}
                    <div className="hero__typewriter animate-fade-up animate-delay-3">
                        <span className="hero__typewriter-prompt">$</span>
                        <span className="hero__typewriter-text">{typed}</span>
                        <span className="hero__typewriter-cursor">_</span>
                    </div>

                    <p className="hero__headline animate-fade-up animate-delay-3">
                        {hero.headline}
                    </p>

                    {/* Sub */}
                    <p className="hero__sub animate-fade-up animate-delay-4">
                        {hero.summary}
                    </p>

                    {/* CTAs */}
                    <div className="hero__ctas animate-fade-up animate-delay-5">
                        <button className="btn btn-primary btn-lg" onClick={() => nav('#personalize')}>
                            Personalize Portfolio
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                        </button>
                        <button className="btn btn-ghost btn-lg" onClick={() => nav('#contact')}>
                            $ contact.ahmed()
                        </button>
                    </div>

                    {/* Tech stack quick pills */}
                    <div className="hero__stack animate-fade-up" style={{ animationDelay: '.72s' }}>
                        {hero.stackPills.map(t => (
                            <span key={t} className="hero__stack-tag">{t}</span>
                        ))}
                    </div>
                </div>

                {/* Right side — code snippet decoration */}
                <div className="hero__right animate-fade-up animate-delay-3">
                    <div className="hero__code-card">
                        <div className="hero__code-bar">
                            <span className="hero__code-dot" style={{ background: '#F43F5E' }} />
                            <span className="hero__code-dot" style={{ background: '#FBBF24' }} />
                            <span className="hero__code-dot" style={{ background: '#10B981' }} />
                            <span className="hero__code-filename">{hero.code.filename}</span>
                        </div>
                        <pre className="hero__code-body"><code>{hero.code.snippet}</code></pre>
                    </div>

                    {/* Stats mini row */}
                    <div className="hero__mini-stats">
                        {hero.quickFacts.map(s => (
                            <div key={s.label} className="hero__mini-stat">
                                <span className="hero__mini-val">{s.val}</span>
                                <span className="hero__mini-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <div className="hero__scroll-hint">
                <span className="hero__scroll-line" />
                <span className="hero__scroll-label">scroll</span>
            </div>
        </section>
    )
}
