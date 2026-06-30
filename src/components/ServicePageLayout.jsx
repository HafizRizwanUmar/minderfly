import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';

/* ── Window width hook ── */
const useWindowWidth = () => {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
    useEffect(() => {
        const handle = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, []);
    return width;
};

/* ── Intersection reveal hook ── */
const useReveal = (threshold = 0.1) => {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, vis];
};

const reveal = (vis, delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'none' : 'translateY(24px)',
    transition: `opacity .65s ease ${delay}ms, transform .65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
});

const ArrowIcon = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

/* ── Constants ── */
const ACCENT = '#c8f23a';
const WIRE   = 'rgba(255,255,255,0.07)';
const BG     = '#050505';

/* ─────────────────────────────────────────────
   HOOK 1: Urgency Banner (dismissible)
───────────────────────────────────────────── */
const UrgencyBanner = () => {
    const [visible, setVisible] = useState(true);
    const [slots] = useState(() => Math.floor(Math.random() * 2) + 2); // 2–3
    if (!visible) return null;
    return (
        <div style={{
            background: `linear-gradient(90deg, #0a1a00 0%, #0f2500 50%, #0a1a00 100%)`,
            borderBottom: `1px solid rgba(200,242,58,.2)`,
            padding: '10px 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            position: 'relative',
            zIndex: 10,
        }}>
            <span style={{ fontSize: '1rem' }}>🔥</span>
            <p style={{ fontSize: '0.82rem', fontWeight: 500, color: 'rgba(255,255,255,.85)', textAlign: 'center', margin: 0 }}>
                <span style={{ color: ACCENT, fontWeight: 700 }}>Only {slots} client spots</span> open for April — we respond within 24 hours.{' '}
                <Link to="/contact" style={{ color: ACCENT, textDecoration: 'underline', textUnderlineOffset: 3 }}>
                    Claim your spot →
                </Link>
            </p>
            <button
                onClick={() => setVisible(false)}
                aria-label="Dismiss banner"
                style={{ position: 'absolute', right: '1rem', background: 'none', border: 'none', color: 'rgba(255,255,255,.35)', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1, padding: '4px 6px' }}
            >×</button>
        </div>
    );
};

/* ─────────────────────────────────────────────
   HOOK 2: Live Activity Pulse Badge
───────────────────────────────────────────── */
const LivePulseBadge = ({ text }) => {
    const [show, setShow] = useState(false);
    useEffect(() => { const t = setTimeout(() => setShow(true), 600); return () => clearTimeout(t); }, []);
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '5px 14px', borderRadius: 100,
                        background: 'rgba(200,242,58,.1)', border: '1px solid rgba(200,242,58,.25)',
                        color: ACCENT, fontSize: '0.72rem', fontWeight: 600,
                        letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem',
                    }}
                >
                    {/* pulsing dot */}
                    <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
                        <span style={{
                            position: 'absolute', inset: 0, borderRadius: '50%',
                            background: ACCENT, animation: 'spl-pulse 1.8s ease-out infinite',
                        }} />
                        <span style={{ position: 'absolute', inset: 1, borderRadius: '50%', background: ACCENT }} />
                    </span>
                    {text}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/* ─────────────────────────────────────────────
   HOOK 3: Trust Strip
───────────────────────────────────────────── */
const TrustStrip = () => (
    <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '10px 20px',
        alignItems: 'center', marginTop: '1.5rem',
    }}>
        {[
            { icon: '✅', text: '40+ clients served' },
            { icon: '⚡', text: '24hr response' },
            { icon: '🔒', text: 'Satisfaction guaranteed' },
            { icon: '🌍', text: 'Worldwide' },
        ].map(({ icon, text }) => (
            <span key={text} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: '0.78rem', fontWeight: 500,
                color: 'rgba(255,255,255,.45)',
            }}>
                <span style={{ fontSize: '0.85rem' }}>{icon}</span>{text}
            </span>
        ))}
    </div>
);

/* ─────────────────────────────────────────────
   HOOK 4: Social Activity Toast
───────────────────────────────────────────── */
const ActivityToast = () => {
    const toasts = [
        'Someone in Dubai just requested a quote',
        'A startup in London booked a consultation',
        'A business in New York just got a quote',
        'A company in Toronto started their project',
    ];
    const [idx] = useState(() => Math.floor(Math.random() * toasts.length));
    const [show, setShow] = useState(false);
    useEffect(() => {
        const showT = setTimeout(() => setShow(true), 8000);
        const hideT = setTimeout(() => setShow(false), 14000);
        return () => { clearTimeout(showT); clearTimeout(hideT); };
    }, []);
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, x: -30, y: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    style={{
                        position: 'fixed', bottom: 90, left: 20, zIndex: 999,
                        background: 'rgba(15,15,15,.95)', border: '1px solid rgba(255,255,255,.1)',
                        borderLeft: `3px solid ${ACCENT}`, borderRadius: 12,
                        padding: '12px 16px', backdropFilter: 'blur(12px)',
                        maxWidth: 280, pointerEvents: 'none',
                    }}
                    aria-live="polite"
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>🟢</span>
                        <div>
                            <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>
                                Just now
                            </p>
                            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,.5)', margin: 0, lineHeight: 1.4 }}>
                                {toasts[idx]}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/* ─────────────────────────────────────────────
   HOOK 5: Sticky Mobile CTA Bar
───────────────────────────────────────────── */
const StickyMobileCTA = ({ ctaLink, ctaText }) => {
    const width = useWindowWidth();
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handle = () => setScrolled(window.scrollY > 300);
        window.addEventListener('scroll', handle, { passive: true });
        return () => window.removeEventListener('scroll', handle);
    }, []);
    if (width >= 768) return null;
    return (
        <AnimatePresence>
            {scrolled && (
                <motion.div
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    exit={{ y: 80 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 998,
                        background: 'rgba(5,5,5,.97)', borderTop: `1px solid rgba(200,242,58,.25)`,
                        padding: '12px 20px 20px',
                        display: 'flex', gap: 10,
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    <Link
                        to={ctaLink}
                        style={{
                            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: 8, padding: '13px 20px', borderRadius: 100,
                            background: ACCENT, color: '#000', fontSize: '0.9rem',
                            fontWeight: 700, textDecoration: 'none',
                        }}
                    >
                        {ctaText} <ArrowIcon />
                    </Link>
                    <a
                        href="https://wa.me/923001234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: 48, borderRadius: 100,
                            background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)',
                            color: '#fff', fontSize: '1.2rem', textDecoration: 'none', flexShrink: 0,
                        }}
                        aria-label="Chat on WhatsApp"
                    >💬</a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/* ═══════════════════════════════════════════════
   MAIN LAYOUT COMPONENT
═══════════════════════════════════════════════ */
const ServicePageLayout = ({
    title,
    subtitle,
    description,
    features        = [],
    image,
    ctaText         = 'Start Your Project',
    ctaLink         = '/contact',
    badgeText       = 'Expert Service',
    seoTitle,
    seoDescription,
    seoKeywords     = '',
    canonicalUrl    = '',
    schemaType      = 'ProfessionalService',
    relatedArticles = [],
    processSteps    = [],
    faqs            = [],
    extraSchema     = null,
    /* ── New content props ── */
    problems        = [],   // [{ icon, problem, solution }]
    stats           = [],   // [{ value, label }]
    whyUs           = [],   // [{ title, us, them }]
    seoArticle      = null, // { heading, paragraphs: [string] }
}) => {
    const width = useWindowWidth();
    const isMobile  = width < 768;
    const isTablet  = width < 1024;

    const [heroRef,   heroVis]   = useReveal(0.05);
    const [probRef,   probVis]   = useReveal(0.08);
    const [statsRef,  statsVis]  = useReveal(0.15);
    const [featRef,   featVis]   = useReveal(0.08);
    const [whyRef,    whyVis]    = useReveal(0.08);
    const [procRef,   procVis]   = useReveal(0.08);
    const [faqRef,    faqVis]    = useReveal(0.08);
    const [artRef,    artVis]    = useReveal(0.08);
    const [artSeoRef, artSeoVis] = useReveal(0.05);
    const [ctaRef,    ctaVis]    = useReveal(0.15);

    /* FAQ accordion */
    const [openFaq, setOpenFaq] = useState(null);

    /* Structured data */
    const canonicalFull = canonicalUrl ? `https://www.minderfly.com${canonicalUrl}` : 'https://www.minderfly.com/services';

    const schema = {
        '@context': 'https://schema.org',
        '@type': schemaType,
        name: title,
        description: seoDescription || description,
        url: canonicalFull,
        image: image || 'https://www.minderfly.com/og-image.png',
        priceRange: 'Contact for Pricing',
        areaServed: 'Worldwide',
        provider: {
            '@type': 'Organization',
            name: 'Minderfly',
            url: 'https://www.minderfly.com',
            logo: 'https://www.minderfly.com/logo.png',
            sameAs: [
                'https://twitter.com/minderfly',
                'https://linkedin.com/company/minderfly',
            ],
        },
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            url: canonicalFull,
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://www.minderfly.com/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.minderfly.com/services' },
            { '@type': 'ListItem', position: 3, name: title,      item: canonicalFull },
        ],
    };

    const faqSchema = faqs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
            '@type': 'Question', name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    } : null;

    /* Responsive feature columns */
    const featCols = isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)';
    /* Responsive process columns */
    const procCols = isMobile
        ? '1fr'
        : processSteps.length <= 3
            ? `repeat(${processSteps.length},1fr)`
            : isTablet ? 'repeat(2,1fr)' : `repeat(${processSteps.length},1fr)`;

    return (
        <>
      <SEOHead 
        title={seoTitle || `${title} Services — Minderfly`}
        description={seoDescription || description}
        keywords={seoKeywords}
        canonical={canonicalFull}
        ogImage={image || 'https://www.minderfly.com/og-image.png'}
        ogType="website"
        schema={[schema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : []), ...(extraSchema ? [extraSchema] : [])]}
      />

      <style>{`
          @keyframes spl-pulse {
              0%   { transform: scale(1);   opacity: .8; }
              70%  { transform: scale(2.4); opacity: 0; }
              100% { transform: scale(1);   opacity: 0; }
          }
      `}</style>

            {/* HOOK 1: Urgency Banner */}
            <UrgencyBanner />

            <Navbar />

            {/* HOOK 4: Social Activity Toast */}
            <ActivityToast />

            {/* HOOK 5: Sticky Mobile CTA */}
            <StickyMobileCTA ctaLink={ctaLink} ctaText={ctaText} />

            <main style={{ background: BG, color: '#fff', fontFamily: 'var(--font-body)' }}>

                {/* ═══ HERO ═══════════════════════════════════════════ */}
                <section
                    style={{
                        position: 'relative',
                        minHeight: isMobile ? 'auto' : '88vh',
                        display: 'flex', alignItems: 'center',
                        padding: isMobile ? '100px 0 60px' : '140px 0 80px',
                        overflow: 'hidden',
                    }}
                    aria-label={`${title} service overview`}
                >
                    {/* Grid bg */}
                    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)', backgroundSize: '68px 68px', maskImage: 'radial-gradient(ellipse 80% 80% at 30% 50%,black,transparent)', pointerEvents: 'none' }} />
                    {/* Glow */}
                    <div aria-hidden="true" style={{ position: 'absolute', right: '0', top: '0', width: '55%', height: '100%', background: 'radial-gradient(ellipse at 70% 40%,rgba(200,242,58,.055) 0%,transparent 65%)', pointerEvents: 'none' }} />

                    <div style={{
                        maxWidth: 1280, margin: '0 auto', width: '100%',
                        padding: isMobile ? '0 1.25rem' : isTablet ? '0 2rem' : '0 3rem',
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '3rem' : '6rem',
                        alignItems: 'center',
                    }}>

                        {/* Left copy */}
                        <div ref={heroRef}>
                            {/* Breadcrumb */}
                            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'rgba(255,255,255,.3)', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                <Link to="/"        style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Home</Link>
                                <span aria-hidden="true">›</span>
                                <Link to="/services" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Services</Link>
                                <span aria-hidden="true">›</span>
                                <span aria-current="page" style={{ color: 'rgba(255,255,255,.55)' }}>{title}</span>
                            </nav>

                            {/* HOOK 2: Live Pulse Badge */}
                            <LivePulseBadge text={badgeText} />

                            <h1 style={{ ...reveal(heroVis, 60), fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(2rem,8vw,2.8rem)' : 'clamp(2.5rem,4.5vw,4.2rem)', fontWeight: 800, lineHeight: 0.97, letterSpacing: '-0.03em', color: '#fff', marginBottom: '1rem' }}>
                                {title}
                            </h1>

                            <p style={{ ...reveal(heroVis, 110), fontSize: isMobile ? '1.05rem' : '1.3rem', fontWeight: 300, color: 'rgba(255,255,255,.45)', marginBottom: '1.2rem', lineHeight: 1.4 }}>
                                {subtitle}
                            </p>

                            <p style={{ ...reveal(heroVis, 150), fontSize: '1rem', fontWeight: 300, color: 'rgba(255,255,255,.5)', lineHeight: 1.7, maxWidth: 500, marginBottom: '2.5rem' }}>
                                {description}
                            </p>

                            <div style={{ ...reveal(heroVis, 200), display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                <Link
                                    to={ctaLink}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 28px', borderRadius: 100, background: ACCENT, color: '#000', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'background .2s,transform .2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = 'none'; }}
                                >
                                    {ctaText} <ArrowIcon />
                                </Link>
                                <Link
                                    to="/work"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 100, background: 'none', border: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.6)', fontSize: '0.9rem', textDecoration: 'none', transition: 'border-color .2s,color .2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.4)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'; e.currentTarget.style.color = 'rgba(255,255,255,.6)'; }}
                                >
                                    View Portfolio
                                </Link>
                            </div>

                            {/* HOOK 3: Trust Strip */}
                            <TrustStrip />
                        </div>

                        {/* Right image — hidden on mobile to keep page clean & fast */}
                        {!isMobile && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                style={{ position: 'relative' }}
                            >
                                <div aria-hidden="true" style={{ position: 'absolute', inset: -20, background: `radial-gradient(ellipse at center,rgba(200,242,58,.12) 0%,transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
                                <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: `1px solid rgba(255,255,255,.1)`, boxShadow: '0 40px 80px rgba(0,0,0,.6)' }}>
                                    <img src={image} alt={`${title} by Minderfly`} style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block', filter: 'brightness(.85) saturate(1.1)' }} loading="lazy" />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,.7) 0%, transparent 55%)' }} />
                                    <div style={{ position: 'absolute', bottom: 20, left: 20, padding: '8px 16px', borderRadius: 100, background: 'rgba(5,5,5,.85)', border: '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(10px)', fontSize: '0.75rem', fontWeight: 600, color: ACCENT }}>
                                        {badgeText}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* ═══ PROBLEMS / PAIN POINTS ══════════════════════ */}
                {problems.length > 0 && (
                    <section
                        ref={probRef}
                        style={{ padding: isMobile ? '60px 0' : '100px 0' }}
                        aria-label={`Common problems with ${title.toLowerCase()}`}
                    >
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1.25rem' : isTablet ? '0 2rem' : '0 3rem' }}>
                            <div style={{ marginBottom: isMobile ? '2.5rem' : '4rem', ...reveal(probVis) }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                                    <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }} />
                                    Sound Familiar?
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(1.5rem,5vw,2.2rem)' : 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
                                    The problems we<br />
                                    <span style={{ color: 'rgba(255,255,255,.28)' }}>solve every day.</span>
                                </h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 16 }}>
                                {problems.map((p, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            background: 'rgba(255,255,255,.025)',
                                            border: '1px solid rgba(255,255,255,.07)',
                                            borderRadius: 18, overflow: 'hidden',
                                            ...reveal(probVis, i * 70),
                                        }}
                                    >
                                        {/* Problem bar */}
                                        <div style={{ padding: isMobile ? '20px 20px 16px' : '26px 28px 20px', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                            <div style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: 2 }}>{p.icon}</div>
                                            <div>
                                                <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#f87171', marginBottom: '0.4rem' }}>The Problem</div>
                                                <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'rgba(255,255,255,.75)', lineHeight: 1.5, margin: 0 }}>{p.problem}</p>
                                            </div>
                                        </div>
                                        {/* Solution bar */}
                                        <div style={{ padding: isMobile ? '16px 20px 20px' : '20px 28px 26px', display: 'flex', gap: 14, alignItems: 'flex-start', background: 'rgba(200,242,58,.03)' }}>
                                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(200,242,58,.15)', border: '1px solid rgba(200,242,58,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M1.5 5.5l3 3 5-5" stroke="#c8f23a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.4rem' }}>Our Solution</div>
                                                <p style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,.5)', lineHeight: 1.65, margin: 0 }}>{p.solution}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ═══ STATS BAR ═══════════════════════════════════ */}
                {stats.length > 0 && (
                    <div
                        ref={statsRef}
                        style={{ borderTop: `1px solid ${WIRE}`, borderBottom: `1px solid ${WIRE}`, background: 'rgba(255,255,255,.018)' }}
                        role="region"
                        aria-label="Key statistics"
                    >
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1.25rem' : isTablet ? '0 2rem' : '0 3rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : `repeat(${stats.length},1fr)`, borderLeft: `1px solid ${WIRE}` }}>
                                {stats.map((s, i) => (
                                    <div key={i} style={{ padding: isMobile ? '24px 12px' : '32px 2rem', borderRight: `1px solid ${WIRE}`, textAlign: 'center', ...reveal(statsVis, i * 80) }}>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(1.6rem,6vw,2.2rem)' : 'clamp(1.8rem,2.5vw,2.6rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1, marginBottom: '0.35rem' }}>
                                            {s.value}<span style={{ color: ACCENT }}>{s.suffix || ''}</span>
                                        </div>
                                        <div style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(255,255,255,.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <section
                    ref={featRef}
                    style={{ padding: isMobile ? '60px 0' : '110px 0', background: 'rgba(255,255,255,.018)', borderTop: `1px solid ${WIRE}`, borderBottom: `1px solid ${WIRE}` }}
                    aria-label="Service features"
                >
                    <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1.25rem' : isTablet ? '0 2rem' : '0 3rem' }}>
                        <div style={{ marginBottom: isMobile ? '2.5rem' : '4rem', ...reveal(featVis) }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                                <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }} />
                                What's Included
                            </div>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(1.5rem,5vw,2.2rem)' : 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
                                Why choose us for<br />
                                <span style={{ color: 'rgba(255,255,255,.28)' }}>{title.toLowerCase()}?</span>
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: featCols, gap: 16 }}>
                            {features.map((f, i) => (
                                <article
                                    key={i}
                                    style={{ background: 'rgba(255,255,255,.03)', border: `1px solid rgba(255,255,255,.07)`, borderRadius: 16, padding: isMobile ? '22px 20px 26px' : '28px 28px 32px', transition: 'background .25s,border-color .25s,transform .3s', ...reveal(featVis, i * 55) }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.055)'; e.currentTarget.style.borderColor = 'rgba(200,242,58,.22)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; e.currentTarget.style.transform = 'none'; }}
                                >
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(200,242,58,.08)', border: '1px solid rgba(200,242,58,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                                            <path d="M3 9l4 4 8-8" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem' }}>{f.title}</h3>
                                    <p style={{ fontSize: '0.87rem', fontWeight: 300, color: 'rgba(255,255,255,.42)', lineHeight: 1.65 }}>{f.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ WHY MINDERFLY COMPARISON ═══════════════════ */}
                {whyUs.length > 0 && (
                    <section
                        ref={whyRef}
                        style={{ padding: isMobile ? '60px 0' : '100px 0', background: 'rgba(255,255,255,.018)', borderTop: `1px solid ${WIRE}`, borderBottom: `1px solid ${WIRE}` }}
                        aria-label="Why choose Minderfly"
                    >
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1.25rem' : isTablet ? '0 2rem' : '0 3rem' }}>
                            <div style={{ marginBottom: isMobile ? '2.5rem' : '4rem', ...reveal(whyVis) }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                                    <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }} />
                                    Why Minderfly
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(1.5rem,5vw,2.2rem)' : 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
                                    Us vs. the alternatives.<br />
                                    <span style={{ color: 'rgba(255,255,255,.28)' }}>Side by side.</span>
                                </h2>
                            </div>
                            {/* Column headers */}
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr', gap: 0, marginBottom: 8, padding: '0 4px' }}>
                                {!isMobile && <div />}
                                <div style={{ padding: '8px 16px', background: 'rgba(200,242,58,.1)', border: '1px solid rgba(200,242,58,.22)', borderBottom: 'none', borderRadius: '12px 12px 0 0', textAlign: 'center', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT }}>Minderfly</div>
                                <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,.02)', border: `1px solid ${WIRE}`, borderBottom: 'none', borderRadius: '12px 12px 0 0', textAlign: 'center', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.28)' }}>Others</div>
                            </div>
                            {/* Rows */}
                            {whyUs.map((row, i) => (
                                <div key={i} style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr',
                                    gap: 0,
                                    borderTop: `1px solid ${WIRE}`,
                                    ...reveal(whyVis, i * 60),
                                }}>
                                    {!isMobile && (
                                        <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', borderRight: `1px solid ${WIRE}` }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,.65)' }}>{row.title}</span>
                                        </div>
                                    )}
                                    <div style={{ padding: '18px 16px', background: 'rgba(200,242,58,.035)', borderRight: `1px solid ${WIRE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: ACCENT, textAlign: 'center', lineHeight: 1.4 }}>{row.us}</span>
                                    </div>
                                    <div style={{ padding: '18px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '0.82rem', fontWeight: 400, color: 'rgba(255,255,255,.32)', textAlign: 'center', lineHeight: 1.4 }}>{row.them}</span>
                                    </div>
                                </div>
                            ))}
                            {/* Bottom border */}
                            <div style={{ borderTop: `1px solid ${WIRE}`, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }} />
                        </div>
                    </section>
                )}

                {/* ═══ PROCESS (optional) ══════════════════════════ */}
                {processSteps.length > 0 && (
                    <section ref={procRef} style={{ padding: isMobile ? '60px 0' : '110px 0' }} aria-label="How we work">
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1.25rem' : isTablet ? '0 2rem' : '0 3rem' }}>
                            <div style={{ marginBottom: isMobile ? '2.5rem' : '4rem', ...reveal(procVis) }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                                    <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }} />
                                    Our Process
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(1.5rem,5vw,2.2rem)' : 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
                                    How we deliver<br />
                                    <span style={{ color: 'rgba(255,255,255,.28)' }}>exceptional results.</span>
                                </h2>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: procCols, gap: isMobile ? 0 : 0, position: 'relative' }}>
                                {!isMobile && <div aria-hidden="true" style={{ position: 'absolute', top: 25, left: '5%', right: '5%', height: 1, background: WIRE }} />}
                                {processSteps.map((p, i) => (
                                    <div key={i} style={{
                                        padding: isMobile ? '16px 0 16px 60px' : '0 16px',
                                        paddingTop: isMobile ? '16px' : 56,
                                        position: 'relative',
                                        textAlign: isMobile ? 'left' : 'center',
                                        ...reveal(procVis, i * 80),
                                        borderBottom: isMobile && i < processSteps.length - 1 ? `1px solid ${WIRE}` : 'none',
                                        marginBottom: isMobile ? 0 : 0,
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: isMobile ? '50%' : 0,
                                            left: isMobile ? 0 : '50%',
                                            transform: isMobile ? 'translateY(-50%)' : 'translateX(-50%)',
                                            width: 44, height: 44, borderRadius: '50%',
                                            background: BG, border: `1px solid rgba(255,255,255,.12)`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 700, color: ACCENT, zIndex: 1,
                                        }}>
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.55rem' }}>{p.title}</h3>
                                        <p style={{ fontSize: '0.82rem', fontWeight: 300, color: 'rgba(255,255,255,.38)', lineHeight: 1.6 }}>{p.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ═══ FAQ (optional) ══════════════════════════════ */}
                {faqs.length > 0 && (
                    <section
                        ref={faqRef}
                        style={{ padding: isMobile ? '60px 0' : '110px 0', background: 'rgba(255,255,255,.018)', borderTop: `1px solid ${WIRE}`, borderBottom: `1px solid ${WIRE}` }}
                        aria-label="Frequently asked questions"
                    >
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1.25rem' : isTablet ? '0 2rem' : '0 3rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: isMobile ? '2.5rem' : 80, alignItems: 'start' }}>
                                <div style={reveal(faqVis)}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                                        <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }} />
                                        FAQ
                                    </div>
                                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(1.5rem,5vw,2.2rem)' : 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff', marginBottom: '1rem' }}>
                                        Common<br /><span style={{ color: 'rgba(255,255,255,.28)' }}>questions.</span>
                                    </h2>
                                    <p style={{ fontSize: '0.95rem', fontWeight: 300, color: 'rgba(255,255,255,.38)', lineHeight: 1.7 }}>
                                        More questions?{' '}
                                        <Link to="/contact" style={{ color: ACCENT, textDecoration: 'none', borderBottom: '1px solid rgba(200,242,58,.35)' }}>Contact us</Link>
                                        {' '}— we reply within one business day.
                                    </p>
                                </div>
                                <div style={{ borderTop: `1px solid ${WIRE}`, ...reveal(faqVis, 80) }}>
                                    {faqs.map((f, i) => (
                                        <div key={i} style={{ borderBottom: `1px solid ${WIRE}` }}>
                                            <button
                                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                                aria-expanded={openFaq === i}
                                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.2rem 0', background: 'none', border: 'none', color: openFaq === i ? '#fff' : 'rgba(255,255,255,.65)', fontSize: '0.95rem', fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left', transition: 'color .2s' }}
                                            >
                                                <span style={{ lineHeight: 1.45 }}>{f.q}</span>
                                                <span style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${openFaq === i ? ACCENT : 'rgba(255,255,255,.15)'}`, background: openFaq === i ? ACCENT : 'transparent', color: openFaq === i ? '#000' : 'rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, transition: 'all .2s' }}>
                                                    {openFaq === i ? '−' : '+'}
                                                </span>
                                            </button>
                                            <div style={{ maxHeight: openFaq === i ? 300 : 0, overflow: 'hidden', transition: 'max-height .4s cubic-bezier(.22,1,.36,1)' }}>
                                                <p style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,.42)', lineHeight: 1.7, paddingBottom: '1.2rem' }}>{f.a}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ═══ SEO ARTICLE SECTION ═════════════════════════ */}
                {seoArticle && (
                    <section
                        ref={artSeoRef}
                        style={{ padding: isMobile ? '60px 0' : '100px 0' }}
                        aria-label={`Guide: ${seoArticle.heading}`}
                    >
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1.25rem' : isTablet ? '0 2rem' : '0 3rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? '2.5rem' : '6rem', alignItems: 'start' }}>
                                {/* Sticky sidebar */}
                                <div style={{ ...reveal(artSeoVis) }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                                        <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }} />
                                        In-Depth Guide
                                    </div>
                                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(1.4rem,5vw,2rem)' : 'clamp(1.6rem,2.5vw,2.4rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.025em', color: '#fff', marginBottom: '1.25rem' }}>
                                        {seoArticle.heading}
                                    </h2>
                                    <Link
                                        to={ctaLink}
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 100, background: ACCENT, color: '#000', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}
                                    >
                                        Get a Free Quote <ArrowIcon />
                                    </Link>
                                </div>
                                {/* Article body */}
                                <article style={{ ...reveal(artSeoVis, 120) }}>
                                    {seoArticle.paragraphs.map((para, i) => (
                                        typeof para === 'string' ? (
                                            <p key={i} style={{ fontSize: isMobile ? '0.9rem' : '0.97rem', fontWeight: 300, color: 'rgba(255,255,255,.55)', lineHeight: 1.8, marginBottom: '1.4rem' }}>
                                                {para}
                                            </p>
                                        ) : (
                                            <h3 key={i} style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1rem' : '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', marginTop: '2.25rem', letterSpacing: '-0.01em' }}>
                                                {para.h3}
                                            </h3>
                                        )
                                    ))}
                                </article>
                            </div>
                        </div>
                    </section>
                )}

                {/* ═══ RELATED ARTICLES ════════════════════════════ */}
                {relatedArticles.length > 0 && (
                    <section ref={artRef} style={{ padding: isMobile ? '60px 0' : '110px 0' }} aria-label="Related articles">
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1.25rem' : isTablet ? '0 2rem' : '0 3rem' }}>
                            <div style={{ marginBottom: '3rem', ...reveal(artVis) }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                                    <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }} />
                                    Related Insights
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(1.5rem,5vw,2.2rem)' : 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
                                    Further reading.
                                </h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 16 }}>
                                {relatedArticles.map((a, i) => (
                                    <Link
                                        to={`/articles/${a.slug}`}
                                        key={a.id}
                                        style={{ display: 'block', background: 'rgba(255,255,255,.03)', border: `1px solid rgba(255,255,255,.07)`, borderRadius: 16, padding: 24, textDecoration: 'none', transition: 'background .25s,border-color .25s,transform .3s', ...reveal(artVis, i * 80) }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.055)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.14)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; e.currentTarget.style.transform = 'none'; }}
                                    >
                                        <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: '0.6rem' }}>{a.category}</span>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem', lineHeight: 1.3 }}>{a.title}</h3>
                                        <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'rgba(255,255,255,.4)', lineHeight: 1.6, marginBottom: '1.2rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.excerpt}</p>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 600, color: 'rgba(255,255,255,.5)' }}>
                                            Read Article <ArrowIcon />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ═══ CTA BANNER ══════════════════════════════════ */}
                <section ref={ctaRef} style={{ padding: isMobile ? '50px 0 80px' : '80px 0 110px' }} aria-label="Start a project">
                    <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1.25rem' : isTablet ? '0 2rem' : '0 3rem' }}>
                        <div style={{ position: 'relative', borderRadius: isMobile ? 16 : 24, overflow: 'hidden', padding: isMobile ? '48px 28px' : '80px', background: ACCENT, ...reveal(ctaVis) }}>
                            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 80% at 90% 50%,rgba(255,255,255,.15) 0%,transparent 60%),radial-gradient(30% 50% at 5% 80%,rgba(0,0,0,.07) 0%,transparent 50%)', pointerEvents: 'none' }} />
                            <div style={{ position: 'relative', zIndex: 1, maxWidth: 620 }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,.45)', marginBottom: '1rem' }}>
                                    <span style={{ width: 18, height: 1, background: 'rgba(0,0,0,.45)', display: 'block' }} />
                                    Ready to build?
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(1.6rem,6vw,2.4rem)' : 'clamp(2rem,3.5vw,3.2rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#000', marginBottom: '1rem' }}>
                                    Ready to transform<br />your vision into reality?
                                </h2>
                                <p style={{ fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 300, color: 'rgba(0,0,0,.55)', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: 460 }}>
                                    Let's build something extraordinary together. Tell us what you need and we'll scope it out within 24 hours.
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                    <Link
                                        to={ctaLink}
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 28px', borderRadius: 100, background: '#000', color: '#fff', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'background .2s,transform .2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.transform = 'none'; }}
                                    >
                                        Get a Quote <ArrowIcon />
                                    </Link>
                                    <a href="mailto:hello@minderfly.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 100, background: 'none', border: '1px solid rgba(0,0,0,.2)', color: 'rgba(0,0,0,.65)', fontSize: '0.9rem', textDecoration: 'none', transition: 'border-color .2s,color .2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,.5)'; e.currentTarget.style.color = '#000'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,.2)'; e.currentTarget.style.color = 'rgba(0,0,0,.65)'; }}>
                                        hello@minderfly.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Add bottom padding on mobile to avoid overlap with sticky CTA */}
            {isMobile && <div style={{ height: 80 }} aria-hidden="true" />}

            <Footer />
        </>
    );
};

export default ServicePageLayout;