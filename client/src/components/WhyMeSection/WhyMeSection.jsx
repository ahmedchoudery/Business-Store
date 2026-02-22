import { motion } from 'framer-motion';
import {
    FiAward, FiClock, FiSmartphone, FiDollarSign,
} from 'react-icons/fi';
import { BsBuilding, BsPersonBoundingBox } from 'react-icons/bs';
import { MdFitnessCenter } from 'react-icons/md';
import { RiHomeSmileLine } from 'react-icons/ri';
import './WhyMeSection.css';

const TARGETS = [
    {
        icon: <MdFitnessCenter size={28} />,
        title: 'Gym Trainers & Fitness Studios',
        desc: 'Showcase your programs, trainer bios, class schedules, and a booking inquiry form. Let clients find you online.',
        color: '#ef4444',
    },
    {
        icon: <BsPersonBoundingBox size={28} />,
        title: 'Coaching Centers',
        desc: 'Highlight your courses, faculty, fee structure, and results. A professional site makes parents trust you instantly.',
        color: '#6c63ff',
    },
    {
        icon: <RiHomeSmileLine size={28} />,
        title: 'Real Estate Agents',
        desc: 'Display property listings, agent profile, contact form, and WhatsApp for instant inquiries. Close deals faster.',
        color: '#f59e0b',
    },
    {
        icon: <BsBuilding size={28} />,
        title: 'Local Shops & Businesses',
        desc: 'Get discovered by local customers online. Showcase products/services, address, hours, and a direct WhatsApp contact.',
        color: '#10b981',
    },
];

const REASONS = [
    { icon: <FiSmartphone size={20} />, text: 'Mobile-first, responsive design' },
    { icon: <FiClock size={20} />, text: 'Fast turnaround — delivered on time' },
    { icon: <FiDollarSign size={20} />, text: 'Affordable pricing for local businesses' },
    { icon: <FiAward size={20} />, text: 'Clean, modern code you can expand later' },
];

export default function WhyMeSection() {
    return (
        <section id="why-me" className="section why">
            <div className="container">
                <div className="why__layout">
                    <div className="why__left">
                        <motion.span
                            className="section-label"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            🎯 Who I Help
                        </motion.span>
                        <motion.h2
                            className="section-title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Built for <span className="gradient-text">Local Businesses</span>
                            <br /> That Want to Win Online
                        </motion.h2>
                        <motion.p
                            className="section-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            You focus on running your business. I'll make sure the internet works for you.
                        </motion.p>

                        <motion.ul
                            className="why__reasons"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {REASONS.map((r, i) => (
                                <li key={i} className="why__reason">
                                    <span className="why__reason-icon">{r.icon}</span>
                                    <span>{r.text}</span>
                                </li>
                            ))}
                        </motion.ul>
                    </div>

                    <div className="why__right">
                        {TARGETS.map((target, i) => (
                            <motion.div
                                key={i}
                                className="card why__card"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div
                                    className="why__card-icon"
                                    style={{ color: target.color, background: `${target.color}18` }}
                                >
                                    {target.icon}
                                </div>
                                <div>
                                    <h3 className="why__card-title">{target.title}</h3>
                                    <p className="why__card-desc">{target.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
