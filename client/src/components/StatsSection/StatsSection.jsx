import { useEffect, useRef, useState } from 'react';
import './StatsSection.css';

const STATS = [
  { label: 'Projects Delivered', value: 15, suffix: '+' },
  { label: 'Client Satisfaction', value: 100, suffix: '%' },
  { label: 'Mobile Responsive', value: 100, suffix: '%' },
  { label: 'Avg. Page Speed', value: 96, suffix: '' },
];

export default function StatsSection() {
  const ref = useRef(null);
  const [values, setValues] = useState(STATS.map(() => 0));
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frameIds = [];
    const animate = (idx, dur = 1300) => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        setValues(prev => { const c = [...prev]; c[idx] = Math.floor(p * STATS[idx].value); return c; });
        if (p < 1) { const id = requestAnimationFrame(tick); frameIds.push(id); }
      };
      frameIds.push(requestAnimationFrame(tick));
    };
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !hasRun) {
        setHasRun(true);
        STATS.forEach((_, i) => animate(i));
      }
    }, { threshold: 0.3 });
    io.observe(node);
    return () => { io.disconnect(); frameIds.forEach(cancelAnimationFrame); };
  }, [hasRun]);

  return (
    <section id="stats" className="stats" ref={ref}>
      <div className="container">
        <div className="stats__grid">
          {STATS.map((s, i) => (
            <div key={s.label} className="stat__card">
              <div className="stat__num">{values[i]}{s.suffix}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}