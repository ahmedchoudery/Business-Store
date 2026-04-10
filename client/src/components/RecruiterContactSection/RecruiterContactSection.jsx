import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import '../ContactSection/ContactSection.css';

export default function RecruiterContactSection({
  contactView,
  personalizationMeta,
  personalizationInput,
  contactDetails,
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', message: '', budget: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const whatsappHref = `https://wa.me/${contactDetails.whatsapp}`;
  const contactItems = [
    { icon: 'WA', label: 'WhatsApp', value: `+${contactDetails.whatsapp}`, sub: 'Fastest response', href: whatsappHref },
    { icon: 'EM', label: 'Email', value: contactDetails.email, sub: 'Within 24 hours', href: `mailto:${contactDetails.email}` },
    { icon: 'GH', label: 'GitHub', value: contactDetails.github.replace('https://', ''), sub: 'View code and repos', href: contactDetails.github },
    { icon: 'PK', label: 'Location', value: contactDetails.locationLabel, sub: 'Open to remote work' },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/contact', {
        ...form,
        personalizationSessionId: personalizationMeta.sessionId,
        roleTarget: personalizationInput.roleTarget,
        companyName: personalizationInput.companyName,
        jobTitle: personalizationInput.jobTitle,
        recruiterName: personalizationInput.recruiterName,
      });

      const message = encodeURIComponent(
        `Hi Ahmed! I'm ${form.name}${form.business ? ` from ${form.business}` : ''}.\n\n${form.message}${personalizationInput.jobTitle ? `\n\nRole Context: ${personalizationInput.jobTitle}` : ''}${form.budget ? `\n\nPriority: ${form.budget}` : ''}`
      );

      window.open(`${whatsappHref}?text=${message}`, '_blank');
      setSubmitted(true);
    } catch (error) {
      toast.error(error.userMessage || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact__header">
          <div className="section-label">{contactView.title}</div>
          <h2 className="section-title">
            LET&apos;S TALK
            <br />
            <span style={{ color: 'var(--accent)' }}>ABOUT THE ROLE</span>
          </h2>
          <p className="section-subtitle">{contactView.subtitle}</p>
        </div>
        <div className="contact__grid">
          <div className="contact__info">
            {contactItems.map((item) => (
              <a key={item.label} href={item.href || '#'} className="contact__item" target={item.href ? '_blank' : undefined} rel="noopener noreferrer">
                <div className="contact__icon">{item.icon}</div>
                <div>
                  <div className="contact__label">{item.label}</div>
                  <div className="contact__val">{item.value}</div>
                  <div className="contact__sub">{item.sub}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="contact__form-wrap">
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon">+</div>
                <h3>Message Sent!</h3>
                <p>Thanks {form.name}! I have your message and the current recruiter context. Check WhatsApp for the follow-up thread.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact__form">
                <div className="form__row">
                  <div className="form__group">
                    <label className="form__label">Your Name *</label>
                    <input className="form__input" name="name" value={form.name} onChange={handleChange} placeholder="Ali Hassan" required />
                  </div>
                  <div className="form__group">
                    <label className="form__label">Phone *</label>
                    <input className="form__input" name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 0000000" required />
                  </div>
                </div>

                <div className="form__row">
                  <div className="form__group">
                    <label className="form__label">Email *</label>
                    <input className="form__input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="ali@example.com" required />
                  </div>
                  <div className="form__group">
                    <label className="form__label">Company / Team</label>
                    <input className="form__input" name="business" value={form.business} onChange={handleChange} placeholder="Acme Labs" />
                  </div>
                </div>

                <div className="form__group">
                  <label className="form__label">Priority / Stage</label>
                  <select className="form__input" name="budget" value={form.budget} onChange={handleChange}>
                    <option value="">Select a context</option>
                    <option value="Exploring fit">Exploring fit</option>
                    <option value="Hiring this month">Hiring this month</option>
                    <option value="Interview pipeline active">Interview pipeline active</option>
                    <option value="Project inquiry">Project inquiry</option>
                  </select>
                </div>

                <div className="form__group">
                  <label className="form__label">Message *</label>
                  <textarea className="form__textarea" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about the role, team, or what you would like to discuss..." required />
                </div>

                <button type="submit" className="form__submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message & Open WhatsApp ->'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
