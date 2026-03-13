// FILE: client/src/components/PageLoader/PageLoader.jsx

import { useEffect, useState } from 'react';
import './PageLoader.css';

export default function PageLoader({ children }) {
  const [pct, setPct] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    // Animate bar quickly to 90% then wait for load
    const fast = setInterval(() => {
      p = Math.min(p + Math.random() * 12, 88);
      setPct(Math.floor(p));
      if (p >= 88) clearInterval(fast);
    }, 80);

    const finish = () => {
      clearInterval(fast);
      setPct(100);
      setTimeout(() => setFadeOut(true), 300);
      setTimeout(() => setDone(true), 900);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
      const fallback = setTimeout(finish, 2600);
      return () => { clearInterval(fast); clearTimeout(fallback); };
    }
    return () => clearInterval(fast);
  }, []);

  return (
    <>
      {!done && (
        <div className={`pl ${fadeOut ? 'pl--out' : ''}`} aria-hidden="true">
          <div className="pl__inner">
            <div className="pl__logo">AHMED.</div>
            <div className="pl__bar">
              <div className="pl__fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="pl__pct">{pct}%</div>
          </div>
          {/* Corner decorations */}
          <span className="pl__corner pl__corner--tl" />
          <span className="pl__corner pl__corner--br" />
        </div>
      )}
      {children}
    </>
  );
}