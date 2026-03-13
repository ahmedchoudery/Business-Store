import { useEffect, useState } from 'react';
import './PageLoader.css';

export default function PageLoader({ children }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const done = () => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    };
    if (document.readyState === 'complete') { done(); }
    else {
      window.addEventListener('load', done);
      const t = setTimeout(done, 2400);
      return () => { window.removeEventListener('load', done); clearTimeout(t); };
    }
  }, []);

  return (
    <>
      {loading && (
        <div className={`page-loader ${fadeOut ? 'page-loader--out' : ''}`}>
          <div className="page-loader__inner">
            <div className="page-loader__logo">AHMED.</div>
            <div className="page-loader__bar"><div className="page-loader__fill" /></div>
            <div className="page-loader__sub">Loading experience...</div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}