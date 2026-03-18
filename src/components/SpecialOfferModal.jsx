import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaCheck } from 'react-icons/fa';
import './SpecialOfferModal.css';

/* ═══════════════════════════════════════════════
   SpecialOfferModal — Minderfly (FIXED)
   ─ Overlay scrolls so Send button is always reachable
   ─ Right panel has independent overflow-y: auto
   ─ Submit button is position:sticky bottom:0
   ─ Mobile: single column, overlay scrolls
═══════════════════════════════════════════════ */

const SERVICE_TYPES = [
  'Web Development — Starter (Free)',
  'Web Development — Standard ($39)',
  'Web Development — Premium ($99)',
  'Mobile App — Starter (Free)',
  'Mobile App — Standard ($39)',
  'Mobile App — Premium ($99)',
  'Chrome Extension — Basic ($15)',
  'Chrome Extension — Standard ($39)',
  'Chrome Extension — Premium ($99)',
  'VS Code Extension — Basic ($15)',
  'VS Code Extension — Standard ($39)',
  'VS Code Extension — Premium ($99)',
  'Graphic Design — Basic ($15)',
  'Graphic Design — Standard ($39)',
  'Graphic Design — Premium ($99)',
  'Themes & Digital Assets (Free)',
  'General Inquiry',
];

const PITCH_FEATURES = [
  'Direct response within 1 business day',
  'Fixed-price packages — no hidden fees',
  'Source code ownership on all Premium plans',
  'Free revisions included in every plan',
  'Deployed & production-ready delivery',
];

/* ── Modal inner component (rendered when open) ── */
const ModalContent = ({ initialProjectType, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: initialProjectType || 'General Inquiry',
    details: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');
  const firstFieldRef = useRef(null);

  /* Auto-focus first field on open */
  useEffect(() => {
    const t = setTimeout(() => firstFieldRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, []);

  /* Sync project type when prop updates */
  useEffect(() => {
    if (initialProjectType) {
      setForm(f => ({ ...f, projectType: initialProjectType }));
    }
  }, [initialProjectType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill in your name, email, and phone number.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://minderfly-backend.vercel.app/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        form.name,
          email:       form.email,
          phone:       form.phone,
          projectType: form.projectType,
          details:     form.details || '(No additional details provided)',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => { onClose(); setSuccess(false); }, 3500);
      } else {
        setError('Failed to send. Please email us at hello@minderfly.com');
      }
    } catch {
      setError('Network error. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="som-modal"
      initial={{ opacity:0, y:28, scale:.97 }}
      animate={{ opacity:1, y:0, scale:1 }}
      exit={{ opacity:0, y:14, scale:.97 }}
      transition={{ duration:.3, ease:[.22,1,.36,1] }}
      role="dialog"
      aria-modal="true"
      aria-label="Contact Minderfly — request a project"
      onClick={e => e.stopPropagation()}
    >
      {/* Close */}
      <button className="som-close" onClick={onClose} aria-label="Close">
        <FaTimes aria-hidden="true"/>
      </button>

      {/* ── Left pitch panel ── */}
      <aside className="som-left" aria-label="Why work with Minderfly">
        <div className="som-left-eyebrow">
          <span className="som-left-eyebrow-line"/>
          <span className="som-left-eyebrow-label">Let's work together</span>
        </div>
        <h2 className="som-left-title">
          Start your<br/>
          <span className="som-left-title-ac">Project today.</span>
        </h2>
        <p className="som-left-desc">
          Share your requirements and we'll send a personalised proposal within one business day.
        </p>
        <ul className="som-features" aria-label="Our commitments">
          {PITCH_FEATURES.map(f => (
            <li key={f} className="som-feature-item">
              <span className="som-feat-dot" aria-hidden="true"/>
              {f}
            </li>
          ))}
        </ul>
        {form.projectType && form.projectType !== 'General Inquiry' && (
          <div className="som-plan-badge">
            <span className="som-plan-badge-dot" aria-hidden="true"/>
            {form.projectType}
          </div>
        )}
      </aside>

      {/* ── Right form panel — scrolls independently ── */}
      <section className="som-right" aria-label="Request form">
        {!success ? (
          <>
            <div className="som-form-eyebrow">
              <span className="som-form-eyebrow-line"/>
              <span className="som-form-eyebrow-label">Send a request</span>
            </div>
            <h3 className="som-form-title">
              Tell us about<br/>your project
            </h3>
            <p className="som-form-sub">
              We respond to every message within 24 hours, Monday–Saturday.
            </p>

            <form className="som-form" onSubmit={handleSubmit} noValidate>
              {/* Name + Phone */}
              <div className="som-row">
                <label className="som-field">
                  <span className="som-label">Full Name *</span>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="som-input"
                    required
                    autoComplete="name"
                  />
                </label>
                <label className="som-field">
                  <span className="som-label">Phone *</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    className="som-input"
                    required
                    autoComplete="tel"
                  />
                </label>
              </div>

              {/* Email */}
              <label className="som-field">
                <span className="som-label">Email Address *</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  className="som-input"
                  required
                  autoComplete="email"
                />
              </label>

              {/* Service */}
              <label className="som-field">
                <span className="som-label">Service / Plan</span>
                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  className="som-select"
                >
                  {SERVICE_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>

              {/* Details */}
              <label className="som-field">
                <span className="som-label">Project Details (Optional)</span>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  placeholder="Brief description of what you need, your timeline, any specific requirements…"
                  className="som-textarea"
                  rows={4}
                />
              </label>

              {/* Error */}
              {error && (
                <div className="som-error" role="alert">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M7 4v3M7 9v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit — position:sticky so it's always visible */}
              <button
                type="submit"
                className={`som-submit${success ? ' is-success' : ''}`}
                disabled={loading || success}
                aria-live="polite"
              >
                {loading  ? 'Sending…'
                 : success ? <><FaCheck aria-hidden="true"/> Sent!</>
                 :           <><FaPaperPlane aria-hidden="true"/> Send Request</>}
              </button>
            </form>
          </>
        ) : (
          <div className="som-success" role="status" aria-live="polite">
            <motion.div
              className="som-success-icon"
              initial={{ scale:.7, opacity:0 }}
              animate={{ scale:1,  opacity:1 }}
              transition={{ duration:.4, ease:[.22,1,.36,1] }}
            >
              <FaCheck aria-hidden="true"/>
            </motion.div>
            <h3 className="som-success-title">Request sent!</h3>
            <p className="som-success-sub">
              We've received your message and will review your requirements. Expect a reply within one business day.
            </p>
            <button className="som-submit" onClick={() => { onClose(); }}>
              Close
            </button>
          </div>
        )}
      </section>
    </motion.div>
  );
};

/* ── Main export ── */
const SpecialOfferModal = ({ isOpen, onClose, initialProjectType = 'General Inquiry' }) => {
  /* Prevent body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="som-overlay"
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          exit={{ opacity:0 }}
          transition={{ duration:.2 }}
          onClick={onClose}  /* click backdrop to close */
        >
          <ModalContent
            initialProjectType={initialProjectType}
            onClose={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpecialOfferModal;
