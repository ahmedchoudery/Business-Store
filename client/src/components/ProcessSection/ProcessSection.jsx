import { FiSearch, FiPenTool, FiCode, FiTrendingUp } from 'react-icons/fi';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './ProcessSection.css';

const STEPS = [
  {
    icon: <FiSearch size={22} />,
    title: 'Research & Planning',
    desc: 'Understand your business, target audience, and goals before writing a single line of code.',
  },
  {
    icon: <FiPenTool size={22} />,
    title: 'UI/UX Design',
    desc: 'Design clear, modern layouts that guide visitors towards taking action.',
  },
  {
    icon: <FiCode size={22} />,
    title: 'Development',
    desc: 'Build fast, responsive websites using clean, maintainable code.',
  },
  {
    icon: <FiTrendingUp size={22} />,
    title: 'Launch',
    desc: 'Deploy your site and make sure everything is ready for real visitors.',
  },
];

export default function ProcessSection() {
  const { ref, visible } = useScrollReveal({ threshold: 0.25 });

  return (
    <section id="process" className="section process">
      <div className="container">
        <div className="process__header">
          <span className="section-label">🧭 My Development Process</span>
          <h2 className="section-title">
            From Idea to <span className="gradient-text">Live Website</span>
          </h2>
          <p className="section-subtitle">
            A clear, structured workflow that keeps you in the loop and delivers a website you&apos;re proud to share.
          </p>
        </div>

        <div ref={ref} className={`process__steps ${visible ? 'process__steps--visible' : ''}`}>
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="process__step"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="process__icon-wrap">
                <div className="process__icon">{step.icon}</div>
                {index < STEPS.length - 1 && <div className="process__connector" aria-hidden="true" />}
              </div>
              <div className="process__content">
                <span className="process__step-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="process__title">{step.title}</h3>
                <p className="process__desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

