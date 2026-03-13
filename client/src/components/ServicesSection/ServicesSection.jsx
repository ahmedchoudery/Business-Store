import { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './ServicesSection.css'

const SERVICES = [
    {
        icon: '⚡', num: '01',
        title: 'Business Website',
        desc: 'Fast, SEO-optimized business sites that convert visitors into customers. Mobile-first, Google-ready.',
        tags: ['React', 'SEO', 'Responsive'],
        color: '#38BDF8',
    },
    {
        icon: '🛒', num: '02',
        title: 'E-Commerce Store',
        desc: 'Full-featured online stores with product catalog, cart, WhatsApp checkout, and order management.',
        tags: ['Next.js', 'Stripe', 'WhatsApp'],
        color: '#10B981',
    },
    {
        icon: '🚀', num: '03',
        title: 'Landing Page',
        desc: 'High-converting landing pages built for campaigns, launches, and lead generation.',
        tags: ['React', 'Animation', 'CRO'],
        color: '#A78BFA',
    },
    {
        icon: '📈', num: '04',
        title: 'SEO Optimization',
        desc: 'Rank higher on Google. Technical SEO, keyword research, on-page optimization, and speed improvements.',
        tags: ['Google', 'Core Web Vitals', 'Analytics'],
        color: '#FBBF24',
    },
    {
        icon: '🎨', num: '05',
        title: 'UI/UX Design',
        desc: 'Beautiful, intuitive interfaces designed with users in mind. Figma design to pixel-perfect code.',
        tags: ['Figma', 'Tailwind', 'Animations'],
        color: '#F43F5E',
    },
    {
        icon: '🔧', num: '06',
        title: 'Maintenance & Support',
        desc: 'Keep your site fast, secure, and up-to-date. Monthly retainer or one-time fixes.',
        tags: ['Updates', 'Security', 'Hosting'],
        color: '#38BDF8',
    },
]

function ServiceCard({ service, delay }) {
    const cardRef = useRef(null)
    const { ref, visible } = useScrollReveal({ threshold: 0.2 })

    const onMove = (e) => {
        const card = cardRef.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / (rect.width / 2)
        const dy = (e.clientY - cy) / (rect.height / 2)
        card.style.transform = `perspective(900px) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg) translateZ(8px)`
        card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
        card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
    }
    const onLeave = () => {
        if (cardRef.current) cardRef.current.style.transform = ''
    }

    const setRefs = (el) => { cardRef.current = el; ref.current = el }

    return (
        <div
            ref={setRefs}
            className={`svc-card reveal${visible ? ' visible' : ''}`}
            style={{ animationDelay: `${delay}s`, '--accent-color': service.color }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
        >
            <div className="svc-card__glow" />
            <div className="svc-card__num">{service.num}</div>
            <div className="svc-card__icon">{service.icon}</div>
            <h3 className="svc-card__title">{service.title}</h3>
            <p className="svc-card__desc">{service.desc}</p>
            <div className="svc-card__tags">
                {service.tags.map(t => <span key={t} className="svc-card__tag">{t}</span>)}
            </div>
            <div className="svc-card__arrow">→</div>
        </div>
    )
}

export default function ServicesSection() {
    const { ref, visible } = useScrollReveal({ threshold: 0.1 })

    return (
        <section id="services" className="services">
            <div className="container">
                <div className={`services__header reveal${visible ? ' visible' : ''}`} ref={ref}>
                    <div className="section-label">services</div>
                    <h2 className="section-title">
                        What I <span className="gradient-text">Build</span>
                    </h2>
                    <p className="section-subtitle">
                        End-to-end web solutions for Pakistani businesses — from concept to launch.
                    </p>
                </div>
                <div className="services__grid">
                    {SERVICES.map((s, i) => (
                        <ServiceCard key={s.num} service={s} delay={i * 0.08} />
                    ))}
                </div>
            </div>
        </section>
    )
}