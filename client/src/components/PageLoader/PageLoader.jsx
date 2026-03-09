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

    if (document.readyState === 'complete') {
      done();
    } else {
      window.addEventListener('load', done);
      const timer = setTimeout(done, 2000);
      return () => {
        window.removeEventListener('load', done);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <>
      {loading && (
        <div className={`page-loader ${fadeOut ? 'page-loader--hidden' : ''}`}>
          <div className="page-loader__logo">
            <span className="page-loader__icon">&lt;/&gt;</span>
            <span className="page-loader__text">AhmedDev</span>
          </div>
          <div className="page-loader__spinner" />
        </div>
      )}
      {children}
    </>
  );
}

