import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import './PortfolioSection.css';

const PROJECTS = [
    {
        title: 'Falak Halls & Events',
        category: 'Marriage Hall',
        desc: 'A grand marriage hall and event venue featuring luxury decor, catering services, interactive gallery, and direct booking inquiries.',
        tags: ['React', 'Marriage Hall', 'WhatsApp'],
        link: 'https://falak-marriage-hall.vercel.app/',
        gradient: 'linear-gradient(135deg, #ef4444, #f59e0b)',
        emoji: '🕌',
        image: '/1.jpeg',
    },
    {
        title: 'Star Coaching Academy',
        category: 'Coaching Center',
        desc: 'Modern landing page showcasing courses, results & fee structure with lead capture form.',
        tags: ['Landing Page', 'Forms', 'MongoDB'],
        gradient: 'linear-gradient(135deg, #6c63ff, #06b6d4)',
        emoji: '📚',
    },
    {
        title: 'Premier Real Estate',
        category: 'Real Estate Agent',
        desc: 'Property showcase site with listings, agent profile, photo gallery, and direct WhatsApp contact.',
        tags: ['React', 'Gallery', 'WhatsApp'],
        gradient: 'linear-gradient(135deg, #f59e0b, #10b981)',
        emoji: '🏠',
    },
    {
        title: 'City Bakery Shop',
        category: 'Local Business',
        desc: 'Clean static business site with menu, contact form, Google Maps embed, and mobile-first design.',
        tags: ['Static Site', 'Responsive', 'SEO'],
        gradient: 'linear-gradient(135deg, #ec4899, #f59e0b)',
        emoji: '🥐',
    },
    {
        title: 'Yoga & Wellness Studio',
        category: 'Health & Wellness',
        desc: 'Calming, premium website with class bookings, instructor bio, testimonials, and newsletter.',
        tags: ['React', 'Booking', 'Animations'],
        gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
        emoji: '🧘',
    },
    {
        title: 'TechTutor Institute',
        category: 'Coaching Center',
        desc: 'Course catalog site with individual course pages, student portal link, and parent contact form.',
        tags: ['React', 'Multi-page', 'CMS'],
        gradient: 'linear-gradient(135deg, #6c63ff, #ec4899)',
        emoji: '💻',
    },
];

export default function PortfolioSection() {
    return (
        <section id="portfolio" className="section portfolio">
            <div className="container">
                <motion.div
                    className="portfolio__header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-label">🎨 My Work</span>
                    <h2 className="section-title">
                        Projects That <span className="gradient-text">Speak Results</span>
                    </h2>
                    <p className="section-subtitle">
                        A selection of websites built for local businesses — each one designed to convert
                        visitors into real customers.
                    </p>
                </motion.div>

                <div className="portfolio__grid">
                    {PROJECTS.map((project, i) => (
                        <motion.div
                            key={i}
                            className="card portfolio__card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                        >
                            <a
                                href={project.link || '#'}
                                target={project.link ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="portfolio__link-wrapper"
                            >
                                <div
                                    className="portfolio__thumbnail"
                                    style={{ background: project.gradient }}
                                >
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} className="portfolio__image" />
                                    ) : (
                                        <span className="portfolio__emoji">{project.emoji}</span>
                                    )}
                                    <div className="portfolio__overlay">
                                        <span className="portfolio__view">
                                            <FiExternalLink /> View Project
                                        </span>
                                    </div>
                                </div>
                            </a>
                            <div className="portfolio__body">
                                <span className="portfolio__category">{project.category}</span>
                                <h3 className="portfolio__title">
                                    {project.link ? (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                            {project.title}
                                        </a>
                                    ) : project.title}
                                </h3>
                                <p className="portfolio__desc">{project.desc}</p>
                                <div className="services__tags">
                                    {project.tags.map((t) => (
                                        <span key={t} className="services__tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
