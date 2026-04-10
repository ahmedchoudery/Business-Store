import '../Footer/Footer.css';

export default function RecruiterFooter({ meta, contactDetails }) {
  const nav = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand-col">
            <div className="footer__logo">
              <svg width="36" height="36" viewBox="0 0 512 512" fill="none">
                <defs>
                  <linearGradient id="ftBlue" x1="256" y1="32" x2="256" y2="480" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#7DD3FC" />
                    <stop offset="50%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0369A1" />
                  </linearGradient>
                  <linearGradient id="ftGold" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FCD34D" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                  <mask id="ftMask">
                    <rect width="512" height="512" fill="white" />
                    <polygon points="256,164 206,288 306,288" fill="black" />
                  </mask>
                </defs>
                <g mask="url(#ftMask)">
                  <path d="M 256 42 Q 260 42 262 46 L 428 450 Q 432 458 425 464 L 369 464 Q 363 464 360 458 L 324 378 L 188 378 L 152 458 Q 149 464 143 464 L 87 464 Q 80 458 84 450 L 250 46 Q 252 42 256 42 Z" fill="url(#ftBlue)" />
                </g>
                <g strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <polyline points="245,204 221,240 245,276" stroke="#FBBF24" strokeWidth="13" />
                  <polyline points="267,204 291,240 267,276" stroke="#FBBF24" strokeWidth="13" />
                </g>
                <rect x="174" y="340" width="164" height="16" rx="8" fill="url(#ftGold)" />
              </svg>
              <div className="footer__logo-text">
                <span className="footer__logo-ahmed">Ahmed </span>
                <span className="footer__logo-code">Dev</span>
                <span className="footer__logo-studio"> Portfolio</span>
              </div>
            </div>

            <div className="footer__code-comment">
              {'/**'}<br />
              {' * Building recruiter-friendly portfolio views'}<br />
              {' * with React, APIs, and practical product thinking.'}<br />
              {' * React · Node.js · MongoDB · Prompting'}<br />
              {' */'}
            </div>

            <div className="footer__socials">
              <a href={contactDetails.github} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="GitHub">
                GitHub
              </a>
              <a href={`https://wa.me/${contactDetails.whatsapp}`} target="_blank" rel="noopener noreferrer" className="footer__social footer__social--green" aria-label="WhatsApp">
                WhatsApp
              </a>
              <a href={`mailto:${contactDetails.email}`} className="footer__social footer__social--blue" aria-label="Email">
                Email
              </a>
            </div>
          </div>

          {Object.entries(meta.footerLinkGroups).map(([group, links]) => (
            <div key={group} className="footer__link-col">
              <h4 className="footer__col-title">
                <span className="footer__col-slash">// </span>{group}
              </h4>
              <ul className="footer__links">
                {links.map((link) => (
                  <li key={`${group}-${link.label}`}>
                    <button className="footer__link" onClick={() => nav(link.href)}>
                      <span className="footer__link-arrow">&gt;</span>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copy">
            <span className="footer__copy-comment">// </span>
            © {new Date().getFullYear()} Ahmed Dev Portfolio · Built with React in Pakistan
          </p>
          <p className="footer__stack">
            <span className="footer__stack-tag">React</span>
            <span className="footer__stack-tag">Vite</span>
            <span className="footer__stack-tag">Node.js</span>
            <span className="footer__stack-tag">MongoDB</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
