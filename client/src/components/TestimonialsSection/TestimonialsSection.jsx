import { useState } from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    name: 'Tariq Hassan', role: 'Owner, Falak Halls & Events', location: 'Gujrat, Punjab',
    text: 'Ahmed built our wedding hall website and within the first month, our WhatsApp inquiries doubled. The design is beautiful and our clients love how easy it is to find information. Best investment we made for our business.',
    rating: 5, initials: 'TH', color: '#F43F5E',
  },
  {
    name: 'Ayesha Malik', role: 'Owner, Noor Boutique', location: 'Lahore, Punjab',
    text: 'I was skeptical about getting a website, but Ahmed made it so simple. Our online orders now account for 30% of revenue. He was patient, professional, and delivered exactly what he promised.',
    rating: 5, initials: 'AM', color: '#A78BFA',
  },
  {
    name: 'Dr. Faisal Qureshi', role: 'Medical Director, CityMed Clinic', location: 'Islamabad',
    text: 'Our clinic needed a proper online presence so patients could find us and book appointments. Ahmed delivered a fast, professional website in under a week. Our Google ranking has improved significantly.',
    rating: 5, initials: 'FQ', color: '#10B981',
  },
  {
    name: 'Usman Raza', role: 'CEO, Raza Properties', location: 'Karachi, Sindh',
    text: 'Ahmed understood exactly what a real estate business needs. Property listings, contact forms, WhatsApp integration — everything was done perfectly. Our leads have increased by 80% since launch.',
    rating: 5, initials: 'UR', color: '#7C3AED',
  },
  {
    name: 'Sana Ibrahim', role: 'Owner, Spice Route Restaurant', location: 'Lahore, Punjab',
    text: 'We wanted a website that shows our menu and lets customers make reservations. Ahmed delivered beyond expectations. The mobile design is especially beautiful.',
    rating: 5, initials: 'SI', color: '#F59E0B',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <div className="section-label" style={{ justifyContent: 'center' }}>Client Love</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            WHAT THEY<br /><span style={{ color: 'var(--amber)' }}>SAY ABOUT ME</span>
          </h2>
        </div>

        <div className="testi__card">
          <div className="testi__quote-mark" style={{ color: `${t.color}18` }}>"</div>
          <div className="testi__stars">{'★'.repeat(t.rating)}</div>
          <p className="testi__text">"{t.text}"</p>
          <div className="testi__author">
            <div className="testi__avatar" style={{ background: `${t.color}20`, border: `2px solid ${t.color}45`, color: t.color }}>
              {t.initials}
            </div>
            <div>
              <div className="testi__name">{t.name}</div>
              <div className="testi__role">{t.role}</div>
              <div className="testi__loc">📍 {t.location}</div>
            </div>
          </div>
        </div>

        <div className="testi__nav">
          <button className="btn btn-ghost" onClick={() => setActive(i => (i - 1 + testimonials.length) % testimonials.length)} aria-label="Previous">←</button>
          <div className="testi__dots">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className={`testi__dot ${i === active ? 'testi__dot--active' : ''}`} />
            ))}
          </div>
          <button className="btn btn-ghost" onClick={() => setActive(i => (i + 1) % testimonials.length)} aria-label="Next">→</button>
        </div>

        <div className="testi__thumbs">
          {testimonials.map((t, i) => (
            <button key={t.name} onClick={() => setActive(i)} className={`testi__thumb ${i === active ? 'testi__thumb--active' : ''}`}>
              <div className="testi__thumb-avatar" style={{ background: `${t.color}22`, border: `1px solid ${t.color}40`, color: t.color }}>
                {t.initials}
              </div>
              <span>{t.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}