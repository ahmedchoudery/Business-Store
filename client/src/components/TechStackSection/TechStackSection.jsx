import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiJavascript, SiNextdotjs } from 'react-icons/si';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './TechStackSection.css';

const STACK = [
  {
    icon: <FaHtml5 />,
    name: 'HTML',
    level: '5+ years',
  },
  {
    icon: <FaCss3Alt />,
    name: 'CSS',
    level: '5+ years',
  },
  {
    icon: <SiJavascript />,
    name: 'JavaScript',
    level: '4+ years',
  },
  {
    icon: <FaReact />,
    name: 'React',
    level: '3+ years',
  },
  {
    icon: <FaNodeJs />,
    name: 'Node.js',
    level: '2+ years',
  },
  {
    icon: <SiNextdotjs />,
    name: 'Next.js',
    level: '2+ years',
  },
];

export default function TechStackSection() {
  const { ref, visible } = useScrollReveal({ threshold: 0.25 });

  return (
    <section id="tech-stack" className="section tech">
      <div className="container">
        <div className="tech__header">
          <span className="section-label">🛠 Tech Stack</span>
          <h2 className="section-title">
            Tools I <span className="gradient-text">Build With</span>
          </h2>
          <p className="section-subtitle">
            Modern technologies for fast, maintainable websites that are easy to update and scale as your business grows.
          </p>
        </div>

        <div ref={ref} className={`tech__grid ${visible ? 'tech__grid--visible' : ''}`}>
          {STACK.map((item, index) => (
            <div
              key={item.name}
              className="tech__item"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="tech__icon">{item.icon}</div>
              <span className="tech__name">{item.name}</span>
              <span className="tech__level">{item.level}</span>
              <div className="tech__tooltip">
                <strong>{item.name}</strong>
                <span>{item.level} experience</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

