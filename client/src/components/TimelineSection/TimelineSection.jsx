import { useScrollReveal } from '../../hooks/useScrollReveal';
import './TimelineSection.css';

const ITEMS = [
  {
    year: '2024',
    title: 'Falak Halls & Events Website',
    body: 'Designed and developed a high-converting site with gallery, services, and WhatsApp booking for a premium event venue.',
  },
  {
    year: '2023',
    title: 'Local Coaching & Training Websites',
    body: 'Built multiple sites for coaching centers with course listings, results, and lead capture forms.',
  },
  {
    year: '2022',
    title: 'Small Business Landing Pages',
    body: 'Created landing pages for gyms, bakeries, and service providers focused on clear offers and calls-to-action.',
  },
];

export default function TimelineSection() {
  const { ref, visible } = useScrollReveal({ threshold: 0.25 });

  return (
    <section id="timeline" className="section timeline">
      <div className="container">
        <div className="timeline__header">
          <span className="section-label">📈 Experience & Projects</span>
          <h2 className="section-title">
            A Track Record of <span className="gradient-text">Shipping</span>
          </h2>
          <p className="section-subtitle">
            A snapshot of recent years building web experiences focused on results for local businesses.
          </p>
        </div>

        <div ref={ref} className={`timeline__list ${visible ? 'timeline__list--visible' : ''}`}>
          {ITEMS.map((item, index) => (
            <div key={item.title} className="timeline__item" style={{ transitionDelay: `${index * 80}ms` }}>
              <div className="timeline__point" />
              <div className="timeline__content">
                <span className="timeline__year">{item.year}</span>
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

