import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import MagneticButton from './MagneticButton';
import './Footer.css';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

const Footer = () => {
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setError('Please complete all fields before sending.');
            return;
        }

        const emailRe = /\S+@\S+\.\S+/;
        if (!emailRe.test(form.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Simulated submit (replace with API call)
        setTimeout(() => {
            setSubmitted(true);
            setForm({ name: '', email: '', message: '' });
        }, 700);
    };

    return (
        <footer className="footer" id="contact">
            <div className="footer-grid-bg"></div>
            <div className="container footer-container">
                <motion.div
                    className="footer-hero"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="footer-title">
                        LET'S <span className="highlight-accent">BUILD</span>
                        <br />
                        TOGETHER
                    </h2>

                    <p className="footer-subtitle">
                        Transforming ideas into exceptional digital experiences. Ready to bring your vision to life?
                    </p>

                    <div className="footer-cta-wrapper">
                        <a href="https://wa.me/923449233424?text=Hi%2C%20I%20would%20like%20to%20book%20a%20call" target="_blank" rel="noopener noreferrer" className="circle-cta">
                            Book a call
                        </a>
                    </div>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                className="contact-modal-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.18 }}
                            >
                                <motion.div
                                    className="contact-modal"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 10, opacity: 0 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    <button className="contact-close" onClick={() => setOpen(false)} aria-label="Close contact form">×</button>
                                    {!submitted ? (
                                        <form className="contact-form" onSubmit={handleSubmit} noValidate>
                                            <h3>Start a conversation</h3>
                                            <p className="muted">Tell us about your project and we'll respond within one business day.</p>

                                            <label className="field">
                                                <span className="label-text">Name</span>
                                                <input type="text" name="name" value={form.name} onChange={handleChange} required />
                                            </label>

                                            <label className="field">
                                                <span className="label-text">Email</span>
                                                <input type="email" name="email" value={form.email} onChange={handleChange} required />
                                            </label>

                                            <label className="field">
                                                <span className="label-text">Message</span>
                                                <textarea name="message" value={form.message} onChange={handleChange} rows={6} required />
                                            </label>

                                            {error && <div className="form-error" role="alert">{error}</div>}

                                            <div className="form-actions">
                                                <button type="submit" className="btn btn-primary">Send message</button>
                                                <button type="button" className="btn ghost" onClick={() => {
                                                    window.open(`https://wa.me/923449233424?text=${encodeURIComponent('Hi, I would like to discuss a project: ' + form.message)}`, '_blank');
                                                }}>WhatsApp instead</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="contact-success">
                                            <h3>Thanks — message sent</h3>
                                            <p className="muted">We'll review your request and get back to you shortly.</p>
                                            <div className="form-actions">
                                                <button className="btn btn-primary" onClick={() => { setSubmitted(false); setOpen(false); }}>Close</button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Minimal Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-links-minimal">
                        <a href="#services">Services</a>
                        <a href="#work">Work</a>
                        <a href="#team">Team</a>
                        <a href="/articles">Articles</a>
                        <a href="/game">Play Neon Rush</a>
                        <a href="/antigravity-masterclass" className="highlight-accent">Masterclass</a>
                    </div>
                    <p className="copyright">&copy; 2024 Minderfly. Crafted with passion.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
