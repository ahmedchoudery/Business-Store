import '../PortfolioSection/PortfolioSection.css';

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '923174307043';

function getLinkProps(url, title) {
  if (url && !url.startsWith('#')) {
    return {
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer',
      children: 'Open Project →',
    };
  }
  // No live URL → open a pre-filled WhatsApp asking for the case study
  const msg = encodeURIComponent(
    `Hi Ahmed! I'd like to see the ${title} project. Can you share more details?`
  );
  return {
    href: `https://wa.me/${WHATSAPP}?text=${msg}`,
    target: '_blank',
    rel: 'noopener noreferrer',
    children: 'Request case study →',
  };
}

export default function RecruiterPortfolioSection({ portfolio }) {
  const featured = portfolio.featured;
  const grid = portfolio.secondary || [];

  return (
    <section id="portfolio">
      <div className="container">
        <div style={{ marginBottom: '60px' }}>
          <div className="section-label">Selected Work</div>
          <h2 className="section-title">
            {portfolio.title}
            <br />
            <span className="text-accent">Ranked For Relevance</span>
          </h2>
          <p className="section-subtitle">{portfolio.subtitle}</p>
        </div>

        {featured ? (
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              marginBottom: '24px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              minHeight: '380px',
            }}
            className="featured-project"
          >
            {/* Visual */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0a1224, #08101d)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '280px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '85%',
                  background: '#0C0C20',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  style={{
                    padding: '10px 14px',
                    background: '#141430',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF5F57' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFBD2E' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28CA41' }} />
                  <div
                    style={{
                      flex: 1,
                      background: '#0C0C1A',
                      borderRadius: '4px',
                      padding: '3px 10px',
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      marginLeft: '8px',
                    }}
                  >
                    {featured.id}.portfolio
                  </div>
                </div>
                <div
                  style={{
                    height: '160px',
                    background: 'linear-gradient(160deg, #07101f 0%, #10213a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '10px',
                    textAlign: 'center',
                    padding: '16px',
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>{'</>'}</div>
                  <div
                    style={{
                      fontFamily: 'var(--font-head)',
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: 'var(--accent)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {featured.title.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{featured.category}</div>
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.1) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    letterSpacing: '0.1em',
                    background: 'rgba(56,189,248,0.15)',
                    color: 'var(--accent)',
                    border: '1px solid rgba(56,189,248,0.25)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                  }}
                >
                  TOP MATCH
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{featured.category}</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: '1.9rem',
                  fontWeight: '800',
                  marginBottom: '14px',
                }}
              >
                {featured.title}
              </h3>

              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: '1.7',
                  marginBottom: '24px',
                }}
              >
                {featured.longDesc || featured.desc}
              </p>

              {featured.stats?.length ? (
                <div style={{ display: 'flex', gap: '24px', marginBottom: '28px', flexWrap: 'wrap' }}>
                  {featured.stats.map((stat) => (
                    <div key={stat.label}>
                      <div
                        style={{
                          fontFamily: 'var(--font-head)',
                          fontSize: '1.5rem',
                          fontWeight: '800',
                          color: 'var(--accent)',
                        }}
                      >
                        {stat.value}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              ) : null}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      background: 'rgba(0,229,255,0.08)',
                      color: 'var(--accent)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {(() => {
                const { children, ...props } = getLinkProps(featured.url, featured.title);
                return (
                  <a {...props} className="btn btn-ghost" style={{ width: 'fit-content' }}>
                    {children}
                  </a>
                );
              })()}
            </div>
          </div>
        ) : null}

        {/* Project Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          {grid.map((projectItem) => {
            const { children: linkLabel, ...linkProps } = getLinkProps(projectItem.url, projectItem.title);
            return (
              <div
                key={projectItem.id}
                className="card"
                style={{ padding: '28px', position: 'relative', overflow: 'hidden' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(to right, ${projectItem.color}, transparent)`,
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      letterSpacing: '0.08em',
                      color: projectItem.color,
                      background: `${projectItem.color}15`,
                      border: `1px solid ${projectItem.color}25`,
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {projectItem.category}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    marginBottom: '8px',
                  }}
                >
                  {projectItem.title}
                </h3>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    marginBottom: '18px',
                  }}
                >
                  {projectItem.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {projectItem.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.7rem',
                        padding: '3px 8px',
                        background: 'rgba(255,255,255,0.04)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a {...linkProps} style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>
                  {linkLabel}
                </a>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.95rem' }}>
            Want to see the portfolio reorder itself for a specific opening?
          </p>
          <a href="#personalize" className="btn btn-primary">
            Open Recruiter Mode →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .featured-project {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
