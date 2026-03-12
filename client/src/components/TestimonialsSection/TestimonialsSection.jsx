import { useState } from 'react'

const testimonials = [
  {
    name: 'Tariq Hassan',
    role: 'Owner, Falak Halls & Events',
    location: 'Gujrat, Punjab',
    text: 'Ahmed built our wedding hall website and within the first month, our WhatsApp inquiries doubled. The design is beautiful and our clients love how easy it is to find information. Best investment we made for our business.',
    rating: 5,
    initials: 'TH',
    color: '#FF4D6D',
  },
  {
    name: 'Ayesha Malik',
    role: 'Owner, Noor Boutique',
    location: 'Lahore, Punjab',
    text: 'I was skeptical about getting a website for my clothing store, but Ahmed made it so simple. Our online orders now account for 30% of our revenue. He was patient, professional, and delivered exactly what he promised.',
    rating: 5,
    initials: 'AM',
    color: '#A78BFA',
  },
  {
    name: 'Dr. Faisal Qureshi',
    role: 'Medical Director, CityMed Clinic',
    location: 'Islamabad',
    text: 'Our clinic needed a proper online presence so patients could find us and book appointments. Ahmed delivered a fast, professional website in under a week. Our Google ranking has improved significantly.',
    rating: 5,
    initials: 'FQ',
    color: '#00FFA3',
  },
  {
    name: 'Usman Raza',
    role: 'CEO, Raza Properties',
    location: 'Karachi, Sindh',
    text: 'Ahmed understood exactly what a real estate business needs. Property listings, contact forms, WhatsApp integration — everything was done perfectly. Our leads have increased by 80% since the new website launched.',
    rating: 5,
    initials: 'UR',
    color: '#00E5FF',
  },
  {
    name: 'Sana Ibrahim',
    role: 'Owner, Spice Route Restaurant',
    location: 'Lahore, Punjab',
    text: 'We wanted a website that shows our menu and lets customers make reservations. Ahmed delivered beyond expectations. The mobile design is especially beautiful — our customers frequently compliment it.',
    rating: 5,
    initials: 'SI',
    color: '#FFB800',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive(i => (i + 1) % testimonials.length)

  const t = testimonials[active]

  return (
    <section id="testimonials" style={{ background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Client Reviews</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            What My Clients<br />
            <span className="text-accent">Say About My Work</span>
          </h2>
        </div>

        {/* Featured testimonial */}
        <div style={{
          maxWidth: '780px', margin: '0 auto',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '48px',
          position: 'relative',
          marginBottom: '32px',
        }}>
          {/* Quote mark */}
          <div style={{
            position: 'absolute', top: '24px', right: '32px',
            fontFamily: 'Georgia, serif', fontSize: '6rem',
            color: `${t.color}15`, lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none',
          }}>"</div>

          {/* Stars */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
            {[...Array(t.rating)].map((_, i) => (
              <span key={i} style={{ color: '#FFB800', fontSize: '1.1rem' }}>★</span>
            ))}
          </div>

          {/* Quote */}
          <p style={{
            fontSize: '1.1rem', lineHeight: '1.75',
            color: 'var(--text-primary)', marginBottom: '32px',
            fontStyle: 'italic',
          }}>
            "{t.text}"
          </p>

          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: `${t.color}20`, border: `2px solid ${t.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-head)', fontWeight: '800',
              fontSize: '1rem', color: t.color, flexShrink: 0,
            }}>{t.initials}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: '700', fontSize: '1rem' }}>{t.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.role}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {t.location}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
          <button onClick={prev} className="btn btn-ghost" style={{ padding: '10px 16px', fontSize: '1rem' }}>←</button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px', borderRadius: '4px',
                  background: i === active ? 'var(--accent)' : 'var(--border)',
                  border: 'none', cursor: 'pointer',
                  transition: 'var(--transition)',
                  padding: 0,
                }} />
            ))}
          </div>

          <button onClick={next} className="btn btn-ghost" style={{ padding: '10px 16px', fontSize: '1rem' }}>→</button>
        </div>

        {/* Mini thumbnails */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap',
        }}>
          {testimonials.map((t, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 14px', borderRadius: '50px',
                background: i === active ? 'var(--accent-dim)' : 'transparent',
                border: `1px solid ${i === active ? 'var(--border)' : 'transparent'}`,
                transition: 'var(--transition)',
              }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: `${t.color}25`, border: `1px solid ${t.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: '800', color: t.color,
              }}>{t.initials}</div>
              <span style={{ fontSize: '0.78rem', color: i === active ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: '500' }}>
                {t.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}