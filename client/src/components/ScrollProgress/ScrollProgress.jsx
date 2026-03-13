// FILE: client/src/components/ScrollProgress/ScrollProgress.jsx

import { useEffect, useState } from 'react';
import './ScrollProgress.css';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setPct(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="sp" aria-hidden="true">
      <div className="sp__bar" style={{ width: `${pct}%` }} />
    </div>
  );
}