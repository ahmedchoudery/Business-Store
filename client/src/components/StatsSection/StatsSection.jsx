// FILE: client/src/components/StatsSection/StatsSection.jsx

import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './StatsSection.css';

const STATS = [
  { end: 15, suffix: '+', label: 'Projects Completed', sub: 'Across Pakistan', icon: '🚀' },
  { end: 100, suffix: '%', label: 'Client Satisfaction', sub: '5-star average rating', icon: '⭐' },
  { end: 3, suffix: 'd', label: 'Average Delivery Time', sub: 'Lightning fast turnaround', icon: '⚡' },
  { end: 80, suffix: '%', label: 'Mobile Traffic Share', sub: 'Mobile-first built', icon: '📱' },
  { end: 96, suffix: '', label: 'Avg PageSpeed Score', sub: 'Out of 100 on Google', icon: '💡' },
  { end: 24, suffix: '/7', label: 'Support Available', sub: 'Always here to help', icon: '🛡️' },
];

function CountUp({ end, suffix, run }) {
  const [val, setVal] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!run) return;
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3); // ease-out cubic
      setVal(Math.round(eased * end));
      if (pct < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [run, end]);

  return <>{val}{suffix}</>;
}

export default function StatsSection() {
  const { ref, visible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="stats" className="stats-sec" ref={ref}>
      <div className="container">
        <div className="stats-sec__head">
          <span className="section-label">By the Numbers</span>
          <h2 className="section-title">Results That <span className="gradient-text">Speak Louder</span></h2>
        </div>

        <div className="stats-sec__grid">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`stats-item ${visible ? 'stats-item--visible' : ''}`}
              style={{ '--delay': `${i * 0.08}s` }}
            >
              <div className="stats-item__icon">{s.icon}</div>
              <div className="stats-item__val">
                <CountUp end={s.end} suffix={s.suffix} run={visible} />
              </div>
              <div className="stats-item__label">{s.label}</div>
              <div className="stats-item__sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}