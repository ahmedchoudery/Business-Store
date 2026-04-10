import { useEffect, useRef } from 'react';
import '../SkillsSection/SkillsSection.css';
import './RecruiterSkillsSection.css';

export default function RecruiterSkillsSection({ skills }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const fills = sectionRef.current?.querySelectorAll('.skill__fill');
    if (!fills) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = `${entry.target.dataset.pct}%`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    fills.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="container">
        <div>
          <div className="section-label">Expertise</div>
          <h2 className="section-title">{skills.title}</h2>
          <p className="section-subtitle">{skills.subtitle}</p>
        </div>

        <div className="rskills__highlights">
          {skills.highlighted.map((skill) => (
            <div key={skill.name} className="rskills__highlight-card">
              <div className="rskills__highlight-label">{skill.groupTitle}</div>
              <div className="rskills__highlight-name">{skill.name}</div>
              <div className="rskills__highlight-score">{skill.pct}% strength signal</div>
            </div>
          ))}
        </div>

        <div className="skills__grid">
          {skills.groups.map((group) => (
            <div key={group.id}>
              <div className="skills__group-title">{group.title}</div>
              <p className="rskills__group-copy">{group.description}</p>
              {group.skills.map((skill) => (
                <div key={skill.name} className="skill__bar-wrap">
                  <div className="skill__name">
                    <span>{skill.name}</span><span>{skill.pct}%</span>
                  </div>
                  <div className="skill__track">
                    <div className={`skill__fill${skill.highlighted ? ' rskills__fill--highlighted' : ''}`} data-pct={skill.pct} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="tech__chips">
          {skills.chips.map((chip) => (
            <div key={chip.name} className="tech__chip rskills__chip">
              <span className="tech__dot" style={{ background: '#38BDF8' }} />
              {chip.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
