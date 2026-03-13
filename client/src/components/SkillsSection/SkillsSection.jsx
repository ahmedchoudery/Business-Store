import { useEffect, useRef } from 'react';
import './SkillsSection.css';

const skillGroups = [
  {
    title: 'FRONTEND',
    skills: [
      { name: 'React / Next.js', pct: 95 },
      { name: 'HTML / CSS', pct: 98 },
      { name: 'JavaScript / TypeScript', pct: 90 },
      { name: 'Tailwind CSS', pct: 95 },
    ],
  },
  {
    title: 'BACKEND & TOOLS',
    skills: [
      { name: 'Node.js / Express', pct: 85 },
      { name: 'SEO Optimization', pct: 92 },
      { name: 'MongoDB / PostgreSQL', pct: 80 },
      { name: 'Figma / UI Design', pct: 88 },
    ],
  },
];

const techChips = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#fff' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Node.js', color: '#339933' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Vercel', color: '#fff' },
  { name: 'Git', color: '#F05032' },
  { name: 'Docker', color: '#2496ED' },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const fills = sectionRef.current?.querySelectorAll('.skill__fill');
    if (!fills) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.pct + '%';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    fills.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="container">
        <div>
          <div className="section-label">Expertise</div>
          <h2 className="section-title">
            SKILLS &amp; <span style={{ color: 'var(--accent)' }}>TECH STACK</span>
          </h2>
        </div>

        <div className="skills__grid">
          {skillGroups.map(g => (
            <div key={g.title}>
              <div className="skills__group-title">{g.title}</div>
              {g.skills.map(s => (
                <div key={s.name} className="skill__bar-wrap">
                  <div className="skill__name">
                    <span>{s.name}</span><span>{s.pct}%</span>
                  </div>
                  <div className="skill__track">
                    <div className="skill__fill" data-pct={s.pct} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="tech__chips">
          {techChips.map(t => (
            <div key={t.name} className="tech__chip">
              <span className="tech__dot" style={{ background: t.color }} />
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}