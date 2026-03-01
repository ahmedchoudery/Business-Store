import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiSend, FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import api from '../../api/axios';
import './ContactSection.css';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '923174307043';

const SERVICES = [
    { value: '', label: 'Select a service...' },
    { value: 'bug-fixes', label: '🛠️ HTML/CSS/JS Bug Fixes' },
    { value: 'responsive-design', label: '📱 Responsive Website Design' },
    { value: 'landing-pages', label: '🚀 Landing Pages' },
    { value: 'small-business', label: '🏢 Small Business Website' },
    { value: 'portfolio', label: '🎨 Portfolio Website' },
    { value: 'other', label: '💬 Other / Discuss' },
];

export default function ContactSection() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // FIX: removed leading slash. Axios with baseURL '/api' resolves 
            // 'contact' to '/api/contact', but resolves '/contact' to just '/contact'.
            await api.post('contact', data);
            setSubmitted(true);
            reset();
            toast.success("Message sent! I'll get back to you within 24 hours. 🎉");
        } catch (err) {
            const msg = err.userMessage || 'Failed to send message. Please try WhatsApp instead.';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section contact">
            <div className="contact__bg-blob" aria-hidden="true" />
            <div className="container">
                <div className="contact__layout">
                    {/* Left info panel */}
                    <motion.div
                        className="contact__info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="section-label">📬 Get In Touch</span>
                        <h2 className="section-title">
                            Let's Build <span className="gradient-text">Something Great</span>
                        </h2>
                        <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                            Ready to take your business online? Fill the form and I'll respond within 24
                            hours. Or just ping me on WhatsApp — I'm usually online!
                        </p>

                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                "Hi Ahmed! I want to discuss a website project."
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp btn-lg contact__whatsapp"
                        >
                            <BsWhatsapp size={22} /> Chat on WhatsApp Now
                        </a>

                        <div className="contact__details">
                            <div className="contact__detail">
                                <FiMail size={18} /> <span>ahmedchoudery30@gmail.com</span>
                            </div>
                            <div className="contact__detail">
                                <BsWhatsapp size={18} /> <span>+92 317 4307043</span>
                            </div>
                            <div className="contact__detail">
                                <span>⌚</span> <span>Response within 24 hours</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right form */}
                    <motion.div
                        className="card contact__form-card"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {submitted ? (
                            <div className="contact__success">
                                <div className="contact__success-icon">✅</div>
                                <h3>Message Sent!</h3>
                                <p>Thank you! I'll get back to you within 24 hours.</p>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setSubmitted(false)}
                                    style={{ marginTop: '1rem' }}
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="contact__form" noValidate>
                                <h3 className="contact__form-title">Send a Message</h3>

                                <div className="contact__row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            <FiUser size={14} /> Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? 'error' : ''}`}
                                            placeholder="e.g. Ahmed Ali"
                                            {...register('name', {
                                                required: 'Name is required',
                                                maxLength: { value: 100, message: 'Name is too long' },
                                            })}
                                        />
                                        {errors.name && (
                                            <span className="form-error">⚠ {errors.name.message}</span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <FiPhone size={14} /> Phone / WhatsApp *
                                        </label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.phone ? 'error' : ''}`}
                                            placeholder="e.g. 03001234567"
                                            {...register('phone', {
                                                required: 'Phone is required',
                                                pattern: {
                                                    value: /^[0-9+\s\-()]{7,15}$/,
                                                    message: 'Enter a valid phone number',
                                                },
                                            })}
                                        />
                                        {errors.phone && (
                                            <span className="form-error">⚠ {errors.phone.message}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <FiMail size={14} /> Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'error' : ''}`}
                                        placeholder="e.g. you@example.com"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message: 'Enter a valid email address',
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <span className="form-error">⚠ {errors.email.message}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Service Needed *</label>
                                    <select
                                        className={`form-control ${errors.service ? 'error' : ''}`}
                                        {...register('service', { required: 'Please select a service' })}
                                    >
                                        {SERVICES.map((s) => (
                                            <option key={s.value} value={s.value} disabled={s.value === ''}>
                                                {s.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.service && (
                                        <span className="form-error">⚠ {errors.service.message}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <FiMessageSquare size={14} /> Your Message *
                                    </label>
                                    <textarea
                                        className={`form-control ${errors.message ? 'error' : ''}`}
                                        rows={4}
                                        placeholder="Tell me about your business, what you need, and your budget..."
                                        {...register('message', {
                                            required: 'Message is required',
                                            maxLength: { value: 1000, message: 'Message too long (max 1000 chars)' },
                                        })}
                                    />
                                    {errors.message && (
                                        <span className="form-error">⚠ {errors.message.message}</span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg contact__submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="contact__spinner" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
