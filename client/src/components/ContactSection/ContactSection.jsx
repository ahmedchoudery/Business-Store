import { useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '923174307043'

const contactMethods = [
    { icon: '💬', label: 'WhatsApp', value: '+92 317 4307043', sub: 'Fastest response', color: '#25D366', href: `https://wa.me/${WHATSAPP}` },
    { icon: '📧', label: 'Email', value: 'ahmedchoudery30@gmail.com', sub: 'Within 24 hours', color: '#00E5FF', href: 'mailto:ahmedchoudery30@gmail.com' },
    { icon: '💻', label: 'GitHub', value: 'github.com/ahmedchoudery', sub: 'View my code', color: '#A78BFA', href: 'https://github.com/ahmedchoudery' },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', message: '', budget: '' })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.phone || !form.message) {
            toast.error('Please fill in all required fields.')
            return
        }

        setLoading(true)
        try {
            await api.post('/contact', {
                name: form.name,
                email: form.email,
                phone: form.phone,
                business: form.business,
                message: form.message,
                budget: form.budget,
            })

            // Lead saved — now open WhatsApp with pre-filled message
            const msg = encodeURIComponent(
                `Hi Ahmed! I'm ${form.name}${form.business ? ` from ${form.business}` : ''}.\n\n${form.message}${form.budget ? `\n\nBudget: PKR ${form.budget}` : ''}${form.phone ? `\n\nMy number: ${form.phone}` : ''}`
            )
            window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
            setSubmitted(true)
        } catch (err) {
            toast.error(err.userMessage || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="contact" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Get In Touch</div>
                    <h2 className="section-title" style={{ textAlign: 'center' }}>
                        Ready to Grow<br />
                        <span className="text-accent">Your Business Online?</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Describe your project below and I&apos;ll get back to you within 2 hours with a free quote.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.6fr',
                    gap: '40px',
                    alignItems: 'start',
                }} className="contact-grid">

                    {/* Left: contact methods + process */}
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                            {contactMethods.map(c => (
                                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                                    style={{ textDecoration: 'none' }}
                                    onMouseEnter={e => e.currentTarget.firstChild.style.borderColor = c.color}
                                    onMouseLeave={e => e.currentTarget.firstChild.style.borderColor = 'var(--border-subtle)'}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '14px',
                                        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                                        borderRadius: 'var(--radius)', padding: '18px 20px',
                                        transition: 'var(--transition)',
                                    }}>
                                        <div style={{
                                            width: '44px', height: '44px', borderRadius: '10px',
                                            background: `${c.color}15`, border: `1px solid ${c.color}25`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '1.2rem', flexShrink: 0,
                                        }}>{c.icon}</div>
                                        <div>
                                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '2px' }}>{c.label}</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{c.value}</div>
                                            <div style={{ fontSize: '0.75rem', color: c.color }}>{c.sub}</div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div style={{
                            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius)', padding: '24px',
                        }}>
                            <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: '700', marginBottom: '16px', fontSize: '0.95rem' }}>
                                How It Works
                            </h4>
                            {[
                                { n: '01', title: 'You reach out', desc: 'Tell me about your business and goals' },
                                { n: '02', title: 'Free consultation', desc: 'We discuss requirements and pricing' },
                                { n: '03', title: 'Build & deliver', desc: 'I build your site and hand it over' },
                            ].map(step => (
                                <div key={step.n} style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                                    <div style={{
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        background: 'var(--accent-dim)', border: '1px solid var(--border)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.65rem', fontWeight: '800', color: 'var(--accent)',
                                        flexShrink: 0,
                                    }}>{step.n}</div>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{step.title}</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{step.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: form or success */}
                    {submitted ? (
                        <div style={{
                            background: 'var(--bg-card)', border: '1px solid rgba(0,255,163,0.2)',
                            borderRadius: 'var(--radius-lg)', padding: '60px 40px',
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
                            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', marginBottom: '10px' }}>
                                Message Sent!
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                                Your details have been saved. WhatsApp is open — just hit send to get a reply within 2 hours.
                            </p>
                            <button className="btn btn-ghost" onClick={() => setSubmitted(false)}>
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '40px',
                        }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <FormField label="Your Name *" name="name" value={form.name} onChange={handleChange} placeholder="Muhammad Ali" required />
                                <FormField label="Email Address *" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <FormField label="WhatsApp Number *" name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 0000000" required />
                                <FormField label="Business Name" name="business" value={form.business} onChange={handleChange} placeholder="Your Business Name" />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={labelStyle}>Budget Range (PKR)</label>
                                <select name="budget" value={form.budget} onChange={handleChange}
                                    style={{ ...inputStyle, appearance: 'none' }}>
                                    <option value="">Select budget range</option>
                                    <option value="10,000–20,000">PKR 10,000 – 20,000</option>
                                    <option value="20,000–40,000">PKR 20,000 – 40,000</option>
                                    <option value="40,000–80,000">PKR 40,000 – 80,000</option>
                                    <option value="80,000+">PKR 80,000+</option>
                                    <option value="Not sure yet">Not sure yet</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={labelStyle}>Tell Me About Your Project *</label>
                                <textarea name="message" value={form.message} onChange={handleChange} required
                                    placeholder="Describe your business and what kind of website you need..."
                                    rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }} />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-whatsapp"
                                style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '16px', opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? (
                                    <span style={{
                                        display: 'inline-block', width: '18px', height: '18px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTopColor: '#fff', borderRadius: '50%',
                                        animation: 'contact-spin 0.7s linear infinite',
                                    }} />
                                ) : (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Save & Open WhatsApp
                                    </>
                                )}
                            </button>
                            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>
                                Your details are saved securely. WhatsApp opens automatically on success.
                            </p>
                        </form>
                    )}
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .contact-grid { grid-template-columns: 1fr !important; }
                }
                @keyframes contact-spin { to { transform: rotate(360deg); } }
                input:focus, select:focus, textarea:focus {
                    outline: none;
                    border-color: var(--accent) !important;
                }
            `}</style>
        </section>
    )
}

const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginBottom: '6px',
    letterSpacing: '0.04em',
}

const inputStyle = {
    width: '100%',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '8px',
    padding: '12px 14px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    transition: 'border-color 0.2s',
}

function FormField({ label, name, value, onChange, placeholder, required, type = 'text' }) {
    return (
        <div>
            <label style={labelStyle}>{label}</label>
            <input
                type={type} name={name} value={value} onChange={onChange}
                placeholder={placeholder} required={required}
                style={inputStyle}
            />
        </div>
    )
}