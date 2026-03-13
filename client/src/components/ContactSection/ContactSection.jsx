import { useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import './ContactSection.css';

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '923174307043';

const contactItems = [
    { icon: '💬', label: 'WhatsApp', value: '+92 317 4307043', sub: 'Fastest response', href: `https://wa.me/${WHATSAPP}` },
    { icon: '📧', label: 'Email', value: 'ahmedchoudery30@gmail.com', sub: 'Within 24 hours', href: 'mailto:ahmedchoudery30@gmail.com' },
    { icon: '💻', label: 'GitHub', value: 'github.com/ahmedchoudery', sub: 'View my code', href: 'https://github.com/ahmedchoudery' },
    { icon: '📍', label: 'Location', value: 'Lahore, Pakistan 🇵🇰', sub: 'Available remotely' },
];

export default function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', message: '', budget: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.phone || !form.message) {
            toast.error('Please fill in all required fields.');
            return;
        }
        setLoading(true);
        try {
            await api.post('/contact', { ...form });
            const msg = encodeURIComponent(
                `Hi Ahmed! I'm ${form.name}${form.business ? ` from ${form.business}` : ''}.\n\n${form.message}${form.budget ? `\n\nBudget: PKR ${form.budget}` : ''}`
            );
            window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
            setSubmitted(true);
        } catch (err) {
            toast.error(err.userMessage || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="contact__header">
                    <div className="section-label">Get In Touch</div>
                    <h2 className="section-title">
                        LET'S BUILD<br /><span style={{ color: 'var(--accent)' }}>TOGETHER</span>
                    </h2>
                </div>
                <div className="contact__grid">
                    {/* Info */}
                    <div className="contact__info">
                        {contactItems.map(c => (
                            <a key={c.label} href={c.href || '#'} className="contact__item" target={c.href ? '_blank' : undefined} rel="noopener noreferrer">
                                <div className="contact__icon">{c.icon}</div>
                                <div>
                                    <div className="contact__label">{c.label}</div>
                                    <div className="contact__val">{c.value}</div>
                                    <div className="contact__sub">{c.sub}</div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="contact__form-wrap">
                        {submitted ? (
                            <div className="contact__success">
                                <div className="contact__success-icon">✓</div>
                                <h3>Message Sent!</h3>
                                <p>Thanks {form.name}! I've received your message and will respond within 2 hours. Check your WhatsApp!</p>
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
                                        <label className="form__label">Business Name</label>
                                        <input className="form__input" name="business" value={form.business} onChange={handleChange} placeholder="My Business" />
                                    </div>
                                </div>
                                <div className="form__group">
                                    <label className="form__label">Budget (PKR)</label>
                                    <select className="form__input" name="budget" value={form.budget} onChange={handleChange}>
                                        <option value="">Select a range</option>
                                        <option value="10,000–20,000">PKR 10,000–20,000</option>
                                        <option value="20,000–40,000">PKR 20,000–40,000</option>
                                        <option value="40,000–80,000">PKR 40,000–80,000</option>
                                        <option value="80,000+">PKR 80,000+</option>
                                    </select>
                                </div>
                                <div className="form__group">
                                    <label className="form__label">Message *</label>
                                    <textarea className="form__textarea" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your business and what you need..." required />
                                </div>
                                <button type="submit" className="form__submit" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message & Open WhatsApp →'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}