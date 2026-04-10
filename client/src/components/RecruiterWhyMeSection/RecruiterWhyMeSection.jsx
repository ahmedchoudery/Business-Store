import { motion } from 'framer-motion';
import { FiAward, FiClock, FiSmartphone, FiCode } from 'react-icons/fi';
import '../WhyMeSection/WhyMeSection.css';

const ICONS = [FiClock, FiSmartphone, FiAward, FiCode];

export default function RecruiterWhyMeSection({ whyMe }) {
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
            About Me
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {whyMe.title}
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {whyMe.subtitle}
          </motion.p>

          <motion.ul
            className="why__reasons"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {whyMe.reasons.map((reason, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <li key={reason} className="why__reason">
                  <span className="why__reason-icon"><Icon size={20} /></span>
                  <span>{reason}</span>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
