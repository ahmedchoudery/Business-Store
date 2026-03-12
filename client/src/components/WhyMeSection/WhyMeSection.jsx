import { motion } from 'framer-motion';
import {
    FiAward, FiClock, FiSmartphone, FiCode,
} from 'react-icons/fi';
import './WhyMeSection.css';

/**
 * WhyMeSection
 *
 * REACT PATTERN FIX: REASONS used `key={i}` (array index) — replaced with `key={r.text}`,
 * a stable, unique key derived from content. Index-as-key causes issues when the
 * list order changes or items are filtered.
 *
 * COPYWRITING FIX: Subtitle was vague ("You focus on running your business — I'll make
 * sure the internet works for you"). Rewritten to be specific and outcome-focused.
 */

const REASONS = [
    { icon: <FiClock size={20} />, text: 'Fast Website Performance' },
    { icon: <FiSmartphone size={20} />, text: 'Mobile-First Design' },
    { icon: <FiAward size={20} />, text: 'SEO Friendly Structure' },
    { icon: <FiCode size={20} />, text: 'Clean and Maintainable Code' },
];

export default function WhyMeSection() {
    return (
        <section id="about" className="section why">
            <div className="container">
                <div className="why__content">
                    <motion.span
                        className="section-label"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        👤 About Me
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
                        I build websites that rank on Google, load in under 2 seconds, and
                        turn visitors into paying customers — so you can focus on running your business.
                    </motion.p>

                    <motion.ul
                        className="why__reasons"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {/* REACT FIX: key={r.text} instead of key={i} */}
                        {REASONS.map((r) => (
                            <li key={r.text} className="why__reason">
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