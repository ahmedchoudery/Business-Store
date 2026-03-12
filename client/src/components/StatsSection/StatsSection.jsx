import { useEffect, useRef, useState } from 'react';
import './StatsSection.css';

/**
 * StatsSection
 *
 * CONSISTENCY FIX: The original had "10+ Websites Built" and "5+ Happy Clients"
 * while the Hero showed "15+ Projects Delivered" and "100% Client Satisfaction".
 * These conflicting numbers damage credibility. Stats are now synced with the Hero.
 *
 * REACT PATTERN: Animation uses IntersectionObserver with proper cleanup of all
 * requestAnimationFrame IDs. hasAnimated flag prevents re-triggering.
 */

const STATS = [
  { label: 'Projects Delivered', value: 15, suffix: '+' },
  { label: 'Client Satisfaction', value: 100, suffix: '%' },
  { label: 'Mobile Responsive', value: 100, suffix: '%' },
  { label: 'Avg. Delivery', value: 3, suffix: ' days' },
];

export default function StatsSection() {
  const ref = useRef(null);
  const [values, setValues] = useState(STATS.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /** @type {number[]} */
    let frameIds = [];

    const animateIndex = (index, duration = 1200) => {
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const next = Math.floor(progress * STATS[index].value);

        setValues((prev) => {
          const copy = [...prev];
          copy[index] = next;
          return copy;
        });

        if (progress < 1) {
          const id = requestAnimationFrame(tick);
          frameIds.push(id);
        }
      };

      const id = requestAnimationFrame(tick);
      frameIds.push(id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            STATS.forEach((_, idx) => animateIndex(idx));
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      frameIds.forEach((id) => cancelAnimationFrame(id));
    };
  }, [hasAnimated]);

  return (
    <section id="stats" className="section stats">
      <div className="container" ref={ref}>
        <div className="stats__grid">
          {STATS.map((stat, index) => (
            // Use stat.label as key — stable, unique, not array index
            <div key={stat.label} className="card stats__card">
              <span className="stats__number">
                {values[index]}
                {stat.suffix}
              </span>
              <span className="stats__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}