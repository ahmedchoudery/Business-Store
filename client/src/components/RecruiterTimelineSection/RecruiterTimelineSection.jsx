import { useScrollReveal } from '../../hooks/useScrollReveal';
import '../TimelineSection/TimelineSection.css';

export default function RecruiterTimelineSection({ timelineData }) {
  const { ref, visible } = useScrollReveal({ threshold: 0.25 });

  return (
    <section id="timeline" className="section timeline">
      <div className="container">
        <div className="timeline__header">
          <span className="section-label">Experience & Projects</span>
          <h2 className="section-title">{timelineData.title}</h2>
          <p className="section-subtitle">{timelineData.subtitle}</p>
        </div>

        <div ref={ref} className={`timeline__list ${visible ? 'timeline__list--visible' : ''}`}>
          {timelineData.items.map((item, index) => (
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
