import { motion } from 'framer-motion';
import {
    FiAward, FiClock, FiSmartphone,
} from 'react-icons/fi';
import './WhyMeSection.css';

const REASONS = [
    { icon: <FiClock size={20} />, text: 'Fast delivery (24h-48h turnaround)' },
    { icon: <FiSmartphone size={20} />, text: 'Clean, responsive mobile design' },
    { icon: <FiAward size={20} />, text: 'Business‑focused solutions that sell' },
    { icon: <FiAward size={20} />, text: 'Friendly, clear communication' },
];

export default function WhyMeSection() {
    return (
        <section id="why-me" className="section why">
            <div className="container">
                <div className="why__content">
                    <motion.span
                        className="section-label"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        🎯 Values
                    </motion.span>
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Why Choose <span className="gradient-text">AhmedDev?</span>
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
            </div>
        </section>
    );
}
