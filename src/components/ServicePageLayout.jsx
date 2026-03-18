import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

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
    transform: vis ? 'none' : 'translateY(20px)',
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
    schemaType      = 'Service',
    relatedArticles = [],
    processSteps    = [],
    faqs            = [],
}) => {
    const [heroRef,   heroVis]   = useReveal(0.05);
    const [featRef,   featVis]   = useReveal(0.08);
    const [procRef,   procVis]   = useReveal(0.08);
    const [faqRef,    faqVis]    = useReveal(0.08);
    const [artRef,    artVis]    = useReveal(0.08);
    const [ctaRef,    ctaVis]    = useReveal(0.15);

    /* FAQ accordion */
    const [openFaq, setOpenFaq] = useState(null);

    /* Structured data */
    const schema = {
        '@context': 'https://schema.org',
        '@type': schemaType,
        name: title,
        description: seoDescription || description,
        provider: {
            '@type': 'Organization',
            name: 'Minderfly',
            url: 'https://minderfly.com',
        },
        ...(canonicalUrl && { url: `https://minderfly.com${canonicalUrl}` }),
    };

    const faqSchema = faqs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
            '@type': 'Question', name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    } : null;

    return (
        <>
            <Helmet>
                <title>{seoTitle || `${title} — Minderfly`}</title>
                <meta name="description" content={seoDescription || description} />
                {seoKeywords && <meta name="keywords" content={seoKeywords} />}
                {canonicalUrl && <link rel="canonical" href={`https://minderfly.com${canonicalUrl}`} />}
                <meta property="og:title"       content={seoTitle || `${title} — Minderfly`} />
                <meta property="og:description" content={seoDescription || description} />
                {image && <meta property="og:image" content={image} />}
                <meta property="og:type" content="website" />
                <meta name="twitter:card"        content="summary_large_image" />
                <meta name="twitter:title"       content={seoTitle || `${title} — Minderfly`} />
                <meta name="twitter:description" content={seoDescription || description} />
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
                {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
            </Helmet>

            <Navbar />

            <main style={{ background: BG, color: '#fff', fontFamily: 'var(--font-body)' }}>

                {/* ═══ HERO ═══════════════════════════════════════════ */}
                <section
                    style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '140px 0 80px', overflow: 'hidden' }}
                    aria-label={`${title} service overview`}
                >
                    {/* Grid bg */}
                    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)', backgroundSize: '68px 68px', maskImage: 'radial-gradient(ellipse 80% 80% at 30% 50%,black,transparent)', pointerEvents: 'none' }} />
                    {/* Glow */}
                    <div aria-hidden="true" style={{ position: 'absolute', right: '0', top: '0', width: '55%', height: '100%', background: 'radial-gradient(ellipse at 70% 40%,rgba(200,242,58,.055) 0%,transparent 65%)', pointerEvents: 'none' }} />

                    <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', padding: '0 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>

                        {/* Left copy */}
                        <div ref={heroRef}>
                            {/* Breadcrumb */}
                            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'rgba(255,255,255,.3)', marginBottom: '2rem' }}>
                                <Link to="/"        style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Home</Link>
                                <span aria-hidden="true">›</span>
                                <Link to="/services" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Services</Link>
                                <span aria-hidden="true">›</span>
                                <span aria-current="page" style={{ color: 'rgba(255,255,255,.55)' }}>{title}</span>
                            </nav>

                            {/* Badge */}
                            <div style={{ ...reveal(heroVis), display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, background: 'rgba(200,242,58,.1)', border: '1px solid rgba(200,242,58,.25)', color: ACCENT, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                                <span style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT }} />
                                {badgeText}
                            </div>

                            <h1 style={{ ...reveal(heroVis, 60), fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem,4.5vw,4.2rem)', fontWeight: 800, lineHeight: 0.97, letterSpacing: '-0.03em', color: '#fff', marginBottom: '1rem' }}>
                                {title}
                            </h1>

                            <p style={{ ...reveal(heroVis, 110), fontSize: '1.3rem', fontWeight: 300, color: 'rgba(255,255,255,.45)', marginBottom: '1.2rem', lineHeight: 1.4 }}>
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
                        </div>

                        {/* Right image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            style={{ position: 'relative' }}
                        >
                            <div aria-hidden="true" style={{ position: 'absolute', inset: -20, background: `radial-gradient(ellipse at center,rgba(200,242,58,.12) 0%,transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
                            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: `1px solid rgba(255,255,255,.1)`, boxShadow: '0 40px 80px rgba(0,0,0,.6)' }}>
                                <img src={image} alt={`${title} by Minderfly`} style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block', filter: 'brightness(.85) saturate(1.1)' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,.7) 0%, transparent 55%)' }} />
                                {/* Corner badge */}
                                <div style={{ position: 'absolute', bottom: 20, left: 20, padding: '8px 16px', borderRadius: 100, background: 'rgba(5,5,5,.85)', border: '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(10px)', fontSize: '0.75rem', fontWeight: 600, color: ACCENT }}>
                                    {badgeText}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══ FEATURES ════════════════════════════════════ */}
                <section
                    ref={featRef}
                    style={{ padding: '110px 0', background: 'rgba(255,255,255,.018)', borderTop: `1px solid ${WIRE}`, borderBottom: `1px solid ${WIRE}` }}
                    aria-label="Service features"
                >
                    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
                        <div style={{ marginBottom: '4rem', ...reveal(featVis) }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                                <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }} />
                                What's Included
                            </div>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
                                Why choose us for<br />
                                <span style={{ color: 'rgba(255,255,255,.28)' }}>{title.toLowerCase()}?</span>
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                            {features.map((f, i) => (
                                <article
                                    key={i}
                                    style={{ background: 'rgba(255,255,255,.03)', border: `1px solid rgba(255,255,255,.07)`, borderRadius: 16, padding: '28px 28px 32px', transition: 'background .25s,border-color .25s,transform .3s', ...reveal(featVis, i * 55) }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.055)'; e.currentTarget.style.borderColor = 'rgba(200,242,58,.22)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; e.currentTarget.style.transform = 'none'; }}
                                >
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(200,242,58,.08)', border: '1px solid rgba(200,242,58,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                                            <path d="M3 9l4 4 8-8" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem' }}>{f.title}</h3>
                                    <p style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,.42)', lineHeight: 1.65 }}>{f.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ PROCESS (optional) ══════════════════════════ */}
                {processSteps.length > 0 && (
                    <section ref={procRef} style={{ padding: '110px 0' }} aria-label="How we work">
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
                            <div style={{ marginBottom: '4rem', ...reveal(procVis) }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                                    <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }} />
                                    Our Process
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
                                    How we deliver<br />
                                    <span style={{ color: 'rgba(255,255,255,.28)' }}>exceptional results.</span>
                                </h2>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${processSteps.length},1fr)`, gap: 0, position: 'relative' }}>
                                <div aria-hidden="true" style={{ position: 'absolute', top: 25, left: '5%', right: '5%', height: 1, background: WIRE }} />
                                {processSteps.map((p, i) => (
                                    <div key={i} style={{ padding: '0 16px', paddingTop: 56, position: 'relative', textAlign: 'center', ...reveal(procVis, i * 80) }}>
                                        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 50, height: 50, borderRadius: '50%', background: BG, border: `1px solid rgba(255,255,255,.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 700, color: ACCENT, zIndex: 1 }}>
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
                        style={{ padding: '110px 0', background: 'rgba(255,255,255,.018)', borderTop: `1px solid ${WIRE}`, borderBottom: `1px solid ${WIRE}` }}
                        aria-label="Frequently asked questions"
                    >
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
                                <div style={reveal(faqVis)}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                                        <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }} />
                                        FAQ
                                    </div>
                                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff', marginBottom: '1rem' }}>
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
                                                <span>{f.q}</span>
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

                {/* ═══ RELATED ARTICLES ════════════════════════════ */}
                {relatedArticles.length > 0 && (
                    <section ref={artRef} style={{ padding: '110px 0' }} aria-label="Related articles">
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
                            <div style={{ marginBottom: '3rem', ...reveal(artVis) }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                                    <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }} />
                                    Related Insights
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
                                    Further reading.
                                </h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
                                {relatedArticles.map((a, i) => (
                                    <Link
                                        to={`/articles/${a.slug}`}
                                        key={a.id}
                                        style={{ display: 'block', background: 'rgba(255,255,255,.03)', border: `1px solid rgba(255,255,255,.07)`, borderRadius: 16, padding: 28, textDecoration: 'none', transition: 'background .25s,border-color .25s,transform .3s', ...reveal(artVis, i * 80) }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.055)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.14)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; e.currentTarget.style.transform = 'none'; }}
                                    >
                                        <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: '0.6rem' }}>{a.category}</span>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem', lineHeight: 1.3 }}>{a.title}</h3>
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
                <section ref={ctaRef} style={{ padding: '80px 0 110px' }} aria-label="Start a project">
                    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
                        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', padding: '80px', background: ACCENT, ...reveal(ctaVis) }}>
                            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 80% at 90% 50%,rgba(255,255,255,.15) 0%,transparent 60%),radial-gradient(30% 50% at 5% 80%,rgba(0,0,0,.07) 0%,transparent 50%)', pointerEvents: 'none' }} />
                            <div style={{ position: 'relative', zIndex: 1, maxWidth: 620 }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,.45)', marginBottom: '1rem' }}>
                                    <span style={{ width: 18, height: 1, background: 'rgba(0,0,0,.45)', display: 'block' }} />
                                    Ready to build?
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,3.5vw,3.2rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#000', marginBottom: '1rem' }}>
                                    Ready to transform<br />your vision into reality?
                                </h2>
                                <p style={{ fontSize: '1rem', fontWeight: 300, color: 'rgba(0,0,0,.55)', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: 460 }}>
                                    Let's build something extraordinary together. Tell us what you need and we'll scope it out within 24 hours.
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
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

            <Footer />
        </>
    );
};

export default ServicePageLayout;