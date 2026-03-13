// FILE: client/src/components/TestimonialsSection/TestimonialsSection.jsx

import { useRef, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './TestimonialsSection.css';

const REVIEWS = [
  { name: 'Kamran Malik', role: 'Owner, Falak Wedding Halls', stars: 5, text: 'Ahmed delivered exactly what we needed. Our booking enquiries doubled within the first month. Professional, fast, and always responsive.' },
  { name: 'Sara Iqbal', role: 'Founder, Noor Boutique', stars: 5, text: 'My online store is beautiful and so easy to manage. Ahmed explained everything clearly and was patient throughout. 100% recommended!' },
  { name: 'Dr. Usman Raza', role: 'CityMed Clinic, Lahore', stars: 5, text: 'We needed a site that looked trustworthy for patients. Ahmed nailed it. Page loads fast, looks great on mobile, and SEO is already working.' },
  { name: 'Aisha Shahid', role: 'Star Coaching Academy', stars: 5, text: 'From day one Ahmed understood what we wanted. The design is modern and the students can find info easily. Delivered ahead of schedule!' },
  { name: 'Tariq Mahmood', role: 'Premier Estate, Rawalpindi', stars: 5, text: 'Properties are getting more leads now. The website looks premium and loads instantly. Ahmed was professional from start to finish.' },
  { name: 'Fatima Khan', role: 'Spice Route Restaurant', stars: 5, text: 'Online orders increased significantly after launching our new website. Ahmed built exactly what a restaurant needs — simple and effective.' },
];

const ALL = [...REVIEWS, ...REVIEWS]; // duplicate for seamless loop

export default function TestimonialsSection() {
  const { ref: headRef, visible: headVisible } = useScrollReveal({ threshold: 0.3 });
  const track1 = useRef(null);
  const track2 = useRef(null);

  return (
    <section id="testimonials" className="testi">
      <div className="container">
        <div ref={headRef} className={`testi__head ${headVisible ? 'reveal visible' : 'reveal'}`}>
          <span className="section-label">Client Love</span>
          <h2 className="section-title">What They <span className="gradient-text">Say About Me</span></h2>
          <p className="section-subtitle">Real results from real Pakistani businesses. Every word is genuine.</p>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="testi__carousel">
        <div className="testi__track testi__track--left" ref={track1}
          onMouseEnter={() => { if (track1.current) track1.current.style.animationPlayState = 'paused'; }}
          onMouseLeave={() => { if (track1.current) track1.current.style.animationPlayState = 'running'; }}
        >
          {ALL.map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="testi__carousel">
        <div className="testi__track testi__track--right" ref={track2}
          onMouseEnter={() => { if (track2.current) track2.current.style.animationPlayState = 'paused'; }}
          onMouseLeave={() => { if (track2.current) track2.current.style.animationPlayState = 'running'; }}
        >
          {[...ALL].reverse().map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="testi-card">
      <div className="testi-card__stars">{'★'.repeat(review.stars)}</div>
      <p className="testi-card__text">"{review.text}"</p>
      <div className="testi-card__author">
        <div className="testi-card__avatar">
          {review.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <div className="testi-card__name">{review.name}</div>
          <div className="testi-card__role">{review.role}</div>
        </div>
      </div>
    </div>
  );
}