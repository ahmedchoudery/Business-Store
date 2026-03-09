import './CaseStudySection.css';

export default function CaseStudySection() {
  return (
    <section id="case-study" className="section case">
      <div className="container case__inner">
        <div className="case__media">
          <div className="case__image-placeholder">
            <span>Falak Halls &amp; Events</span>
          </div>
        </div>
        <div className="case__content">
          <span className="section-label">📂 Case Study</span>
          <h2 className="section-title">
            Turning Browsers into <span className="gradient-text">Booked Events</span>
          </h2>

          <div className="case__grid">
            <div>
              <h3 className="case__heading">Problem</h3>
              <p className="case__text">
                Falak Halls had no dedicated website and relied on word of mouth and WhatsApp messages.
                Potential clients couldn&apos;t see the venue, pricing, or services without visiting in person.
              </p>
            </div>
            <div>
              <h3 className="case__heading">Solution</h3>
              <p className="case__text">
                Designed and built a high-converting website with gallery, packages, services, FAQs, and a
                prominent WhatsApp inquiry button on every section.
              </p>
            </div>
            <div>
              <h3 className="case__heading">Technologies</h3>
              <p className="case__text">React, CSS, Vite, Vercel, WhatsApp integration, basic on-page SEO.</p>
            </div>
            <div>
              <h3 className="case__heading">Results</h3>
              <p className="case__text">
                +45% increase in WhatsApp inquiries within the first month and a professional online presence
                that matches the venue&apos;s premium positioning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

