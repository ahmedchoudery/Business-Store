import { useScrollReveal } from '../../hooks/useScrollReveal'
import './TestimonialsSection.css'

const TESTIMONIALS_A = [
  { name: 'Bilal Hassan', role: 'Owner, Falak Halls', text: 'Ahmed delivered our wedding hall website in just 5 days. The design is stunning and we are getting booking inquiries daily now!', rating: 5 },
  { name: 'Sana Malik', role: 'Founder, Noor Boutique', text: 'Our sales increased by 40% after Ahmed built our e-commerce store. The WhatsApp ordering system is genius!', rating: 5 },
  { name: 'Dr. Usman Raza', role: 'MediCare Clinic', text: 'Professional, fast, and excellent communication. Our clinic now ranks on page 1 for local searches. Highly recommended!', rating: 5 },
  { name: 'Tariq Mehmood', role: 'CEO, Star Motors', text: 'Clean code, fast delivery, amazing results. Ahmed completely transformed our online presence.', rating: 5 },
]
const TESTIMONIALS_B = [
  { name: 'Ayesha Khan', role: 'Manager, Royal Catering', text: 'We got 3 new catering contracts within a week of launching our new website. Money well spent!', rating: 5 },
  { name: 'Kamran Ali', role: 'Spice Route Restaurant', text: 'Our restaurant website looks better than any big chain. Customers can view the menu and book tables online now.', rating: 5 },
  { name: 'Fatima Zara', role: 'Bloom Salon Owner', text: 'Ahmed understood my vision perfectly. The colors, fonts, everything is exactly how I imagined. Love it!', rating: 5 },
  { name: 'Rehan Zahid', role: 'TechStart PK', text: 'Super fast delivery, responsive design, and the SEO work has us ranking for competitive terms already!', rating: 5 },
]

function Stars({ n }) {
  return <div className="tcard__stars">{'★'.repeat(n)}</div>
}

function TestiCard({ t }) {
  return (
    <div className="tcard">
      <Stars n={t.rating} />
      <p className="tcard__text">"{t.text}"</p>
      <div className="tcard__author">
        <div className="tcard__avatar">{t.name[0]}</div>
        <div>
          <div className="tcard__name">{t.name}</div>
          <div className="tcard__role">{t.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const { ref, visible } = useScrollReveal({ threshold: 0.1 })
  const trackA = [...TESTIMONIALS_A, ...TESTIMONIALS_A]
  const trackB = [...TESTIMONIALS_B, ...TESTIMONIALS_B]
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className={`reveal${visible ? ' visible' : ''}`} ref={ref} style={{ marginBottom: 56 }}>
          <div className="section-label">testimonials</div>
          <h2 className="section-title">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle">Real results from real Pakistani businesses.</p>
        </div>
      </div>

      {/* Row 1 — left scroll */}
      <div className="testimonials__carousel testimonials__carousel--l">
        <div className="testimonials__track testimonials__track--l">
          {trackA.map((t, i) => <TestiCard key={i} t={t} />)}
        </div>
      </div>

      {/* Row 2 — right scroll */}
      <div className="testimonials__carousel testimonials__carousel--r" style={{ marginTop: 20 }}>
        <div className="testimonials__track testimonials__track--r">
          {trackB.map((t, i) => <TestiCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  )
}