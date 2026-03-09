import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './SkillsSection.css';

const SKILLS = [
  { name: 'HTML', level: 95 },
  { name: 'CSS', level: 92 },
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 88 },
  { name: 'Responsive Design', level: 96 },
  { name: 'UI/UX Principles', level: 85 },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const { visible } = useScrollReveal({ threshold: 0.25 });

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">🧠 Skills &amp; Expertise</span>
          <h2 className="section-title">
            Modern <span className="gradient-text">Frontend Skills</span>
          </h2>
          <p className="section-subtitle">
            A focused skillset built around designing and developing high-converting websites for local businesses.
          </p>
        </motion.div>

        <div ref={ref} className="skills__grid">
          {SKILLS.map((skill, index) => (
            <div key={skill.name} className="skills__item">
              <div className="skills__top">
                <span className="skills__name">{skill.name}</span>
                <span className="skills__value">{skill.level}%</span>
              </div>
              <div className="skills__bar">
                <div
                  className="skills__bar-fill"
                  style={{ width: visible ? `${skill.level}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

