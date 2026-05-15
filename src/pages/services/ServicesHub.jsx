import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { useModal } from '../../context/ModalContext';

const ACCENT = '#c8f23a';

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

const ArrowIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const services = [
    {
        id: '01',
        title: 'Web Development',
        tag: 'MERN · Next.js',
        description: 'Scalable, modern web applications built with the MERN stack and Next.js. We build performant solutions — from SaaS platforms to custom business tools — that grow with your business.',
        link: '/services/web-development',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=700',
    },
    {
        id: '02',
        title: 'Mobile App Development',
        tag: 'Flutter · iOS · Android',
        description: 'Native-quality cross-platform applications using Flutter. Deploy to iOS and Android from a single codebase — 60fps UI, offline support, and both store deployments included.',
        link: '/services/mobile-app-development',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=700',
    },
    {
        id: '03',
        title: 'Graphics Design',
        tag: 'Brand · UI/UX · Illustration',
        description: 'Stunning visual identities, product UI design, and marketing assets. From logo to full design system — we make brands that are impossible to ignore.',
        link: '/services/graphics-design',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=700',
    },
    {
        id: '04',
        title: 'Chrome Extensions',
        tag: 'Manifest v3 · Productivity',
        description: 'Custom browser tools that automate workflows and enhance productivity for individuals and teams. Built on Manifest v3 and published to the Chrome Web Store.',
        link: '/services/chrome-extension-development',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=700',
    },
    {
        id: '05',
        title: 'Chrome Themes',
        tag: 'Branding · Web Store',
        description: 'Personalised browser aesthetics for brands, creators, and communities. Stand out with a custom Chrome theme published to the Web Store.',
        link: '/services/chrome-theme-development',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=700',
    },
    {
        id: '06',
        title: 'AI Automation',
        tag: 'n8n · Zapier Alt · GPT-4',
        description: 'Stop doing things manually. We build AI-powered automation pipelines that connect your tools, eliminate repetitive tasks, and save your team 20+ hours per week.',
        link: '/services/ai-automation',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=700',
        isNew: true,
    },
];

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://minderfly.com/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://minderfly.com/services' },
    ],
};

const serviceListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Minderfly Digital Services',
    itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.title,
        description: s.description,
        url: `https://minderfly.com${s.link}`,
    })),
};

const ServicesHub = () => {
    const { openModal } = useModal();
    const [hovered, setHovered] = useState(null);
    const width = useWindowWidth();
    const isMobile = width < 768;

    return (
        <>
            <SEOHead
                title="Tech Services — Web, Mobile, AI Automation & Browser Tools | Minderfly"
                description="Minderfly offers professional web development (MERN, Next.js), Flutter mobile apps, AI workflow automation, graphics design, Chrome extension development, and Chrome theme design. End-to-end digital product services worldwide."
                keywords="web development services, Flutter mobile app development, AI workflow automation, graphics design, Chrome extension development, Chrome theme design, MERN stack, Next.js, n8n automation, zapier alternative, digital agency services"
                canonical="https://minderfly.com/services"
                ogType="website"
                schema={[breadcrumbSchema, serviceListSchema]}
            />

            <Navbar />

            <main style={{ background: '#050505', color: '#fff', fontFamily: 'var(--font-body)', minHeight: '100vh' }}>

                {/* ── Hero header ── */}
                <section style={{ padding: isMobile ? '100px 0 0' : '140px 0 0', position: 'relative', overflow: 'hidden' }} aria-label="Services introduction">
                    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)', backgroundSize: '68px 68px', maskImage: 'radial-gradient(ellipse 80% 60% at 20% 40%,black,transparent)', pointerEvents: 'none' }}/>

                    <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1.25rem' : '0 3rem' }}>
                        {/* Breadcrumb */}
                        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'rgba(255,255,255,.3)', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                            <Link to="/" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Home</Link>
                            <span aria-hidden="true">›</span>
                            <span aria-current="page" style={{ color: 'rgba(255,255,255,.55)' }}>Services</span>
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '1.5rem' }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'block' }} />
                                What We Build
                            </div>
                            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(2.5rem,10vw,4rem)' : 'clamp(3.5rem,6vw,6.5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.04em', color: '#fff', marginBottom: '1.8rem' }}>
                                We craft<br />
                                digital{' '}
                                <span style={{ WebkitTextStroke: '1px rgba(255,255,255,.25)', color: 'transparent' }}>excellence.</span>
                            </h1>
                            <p style={{ fontSize: isMobile ? '0.95rem' : '1.05rem', fontWeight: 300, color: 'rgba(255,255,255,.4)', maxWidth: 500, lineHeight: 1.65, marginBottom: '2.5rem' }}>
                                From AI automation and browser tools to full-stack platforms and brand identities —
                                we deliver end-to-end digital products built to perform.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ── Services list ── */}
                <section style={{ padding: isMobile ? '40px 0 100px' : '80px 0 140px' }} aria-label="Service list">
                    <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1.25rem' : '0 3rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {services.map((service, index) => (
                                <Link
                                    key={service.id}
                                    to={service.link}
                                    aria-label={`${service.title} — ${service.tag}`}
                                    style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,.08)', padding: isMobile ? '24px 0' : '36px 0', textDecoration: 'none', display: 'block', transition: 'padding .35s ease' }}
                                    onMouseEnter={(e) => { if (!isMobile) { setHovered(index); e.currentTarget.style.paddingLeft = '24px'; } }}
                                    onMouseLeave={(e) => { if (!isMobile) { setHovered(null); e.currentTarget.style.paddingLeft = '0'; } }}
                                >
                                    {/* Last item bottom border */}
                                    {index === services.length - 1 && (
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,.08)' }} />
                                    )}

                                    {/* Hover bg */}
                                    <div style={{ position: 'absolute', inset: 0, background: hovered === index ? 'rgba(255,255,255,.02)' : 'transparent', transition: 'background .3s', pointerEvents: 'none' }} />

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
                                        {/* Left */}
                                        <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'baseline', gap: isMobile ? 16 : 36, flex: 1, minWidth: 0 }}>
                                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'rgba(255,255,255,.2)', fontStyle: 'italic', fontWeight: 400, flexShrink: 0 }}>
                                                {service.id}
                                            </span>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                                                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(1.3rem,5vw,1.8rem)' : 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, color: hovered === index ? ACCENT : '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em', transition: 'color .3s' }}>
                                                        {service.title}
                                                    </h2>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                                        <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(255,255,255,.25)', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                                                            {service.tag}
                                                        </span>
                                                        {service.isNew && (
                                                            <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', background: ACCENT, padding: '2px 8px', borderRadius: 100 }}>
                                                                NEW
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <p style={{ marginTop: 8, color: 'rgba(255,255,255,.38)', fontSize: '0.88rem', fontWeight: 300, maxWidth: 520, lineHeight: 1.6, opacity: isMobile ? 1 : (hovered === index ? 1 : 0.5), transform: isMobile ? 'none' : (hovered === index ? 'none' : 'translateY(4px)'), transition: 'opacity .3s, transform .3s' }}>
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div style={{ color: hovered === index ? ACCENT : 'rgba(255,255,255,.2)', opacity: isMobile ? 0.5 : (hovered === index ? 1 : 0.3), transform: isMobile ? 'none' : (hovered === index ? 'translateX(0)' : 'translateX(-12px)'), transition: 'all .35s ease', flexShrink: 0, marginLeft: 16 }}>
                                            <ArrowIcon />
                                        </div>
                                    </div>

                                    {/* Floating image preview — desktop only */}
                                    {!isMobile && (
                                        <AnimatePresence>
                                            {hovered === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.88, rotate: -3, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.88, rotate: -3, y: 10 }}
                                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                    style={{ position: 'absolute', top: '50%', right: '8%', transform: 'translateY(-50%)', width: 360, height: 240, borderRadius: 14, overflow: 'hidden', pointerEvents: 'none', zIndex: 10, boxShadow: '0 24px 60px rgba(0,0,0,.6)', border: '1px solid rgba(255,255,255,.1)' }}
                                                    aria-hidden="true"
                                                >
                                                    <img src={service.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.8) saturate(1.1)' }} loading="lazy" />
                                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,.3) 0%, transparent 60%)' }} />
                                                    <div style={{ position: 'absolute', bottom: 14, left: 14, padding: '5px 12px', borderRadius: 100, background: 'rgba(5,5,5,.8)', border: '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', fontSize: '0.72rem', fontWeight: 600, color: ACCENT, letterSpacing: '0.06em' }}>
                                                        {service.tag}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Bottom CTA row */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,.07)', flexWrap: 'wrap', gap: '1.5rem' }}>
                            <div>
                                <p style={{ fontSize: '1.1rem', fontWeight: 300, color: 'rgba(255,255,255,.5)', marginBottom: '0.25rem' }}>
                                    Not sure where to start?
                                </p>
                                <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(255,255,255,.3)' }}>
                                    Tell us your idea — we'll recommend the right approach.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => openModal('New Project Inquiry')}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 28px', borderRadius: 100, background: ACCENT, border: 'none', color: '#000', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'background .2s,transform .2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = 'none'; }}
                                >
                                    Start a Project <ArrowIcon />
                                </button>
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
                    </div>
                </section>

            </main>

            <Footer onContactClick={() => openModal('General Inquiry')} />
        </>
    );
};

export default ServicesHub;