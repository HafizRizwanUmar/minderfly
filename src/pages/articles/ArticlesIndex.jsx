import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { articlesData } from '../../data/articles';

/* ── helpers ── */
const ACCENT = '#c8f23a';

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

const ClockIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
);

const CalIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1 5h10M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
);

const ArrowIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

/* ── Structured data ── */
const buildSchema = (articles) => ({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Minderfly Blog',
    description: 'Deep dives into web development, Flutter, Chrome extensions, and software engineering — by the Minderfly team.',
    url: 'https://minderfly.com/articles',
    publisher: {
        '@type': 'Organization',
        name: 'Minderfly',
        url: 'https://minderfly.com',
        logo: { '@type': 'ImageObject', url: 'https://minderfly.com/logo.png' },
    },
    blogPost: articles.slice(0, 10).map(a => ({
        '@type': 'BlogPosting',
        headline: a.title,
        description: a.excerpt,
        url: `https://minderfly.com/articles/${a.slug}`,
        datePublished: a.date,
        author: { '@type': 'Person', name: a.author },
        image: a.image ? `https://minderfly.com${a.image}` : undefined,
        keywords: a.tags?.join(', '),
    })),
});

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://minderfly.com/' },
        { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://minderfly.com/articles' },
    ],
};

/* ── ArticleCard ── */
const ArticleCard = ({ article, index }) => {
    const [hovered, setHovered] = useState(false);
    const [ref, vis] = useReveal(0.1);

    return (
        <article
            ref={ref}
            style={{
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(22px)',
                transform: vis ? 'none' : 'translateY(22px)',
                background: hovered ? 'rgba(255,255,255,.05)' : 'rgba(255,255,255,.025)',
                border: `1px solid ${hovered ? 'rgba(255,255,255,.14)' : 'rgba(255,255,255,.07)'}`,
                borderRadius: 18,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: `background .25s,border-color .25s,transform .3s cubic-bezier(.22,1,.36,1),opacity .6s ease ${index * 70}ms,transform .6s cubic-bezier(.22,1,.36,1) ${index * 70}ms`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image */}
            <Link
                to={`/articles/${article.slug}`}
                style={{ display: 'block', position: 'relative', aspectRatio: '16/9', overflow: 'hidden', textDecoration: 'none' }}
                tabIndex={-1}
                aria-hidden="true"
            >
                {article.image ? (
                    <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform .7s cubic-bezier(.22,1,.36,1)', filter: 'brightness(.7) saturate(1.1)' }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: 'rgba(200,242,58,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 800, color: ACCENT, opacity: 0.3 }}>{article.category?.[0]}</span>
                    </div>
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,.65) 0%, transparent 55%)' }} />
                {/* Category badge */}
                <div style={{ position: 'absolute', top: 14, left: 14, padding: '4px 12px', borderRadius: 100, background: 'rgba(5,5,5,.75)', border: '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', fontSize: '0.68rem', fontWeight: 600, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {article.category}
                </div>
            </Link>

            {/* Body */}
            <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.72rem', color: 'rgba(255,255,255,.3)', marginBottom: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><CalIcon /> {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><ClockIcon /> {article.readTime}</span>
                </div>

                {/* Title */}
                <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '0.65rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.18rem', fontWeight: 700, color: hovered ? ACCENT : '#fff', lineHeight: 1.28, letterSpacing: '-0.02em', margin: 0, transition: 'color .2s' }}>
                        {article.title}
                    </h2>
                </Link>

                {/* Excerpt */}
                <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'rgba(255,255,255,.42)', lineHeight: 1.65, marginBottom: '1.5rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.excerpt}
                </p>

                {/* Footer row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(200,242,58,.12)', border: '1px solid rgba(200,242,58,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: ACCENT }}>
                            {article.author?.charAt(0)}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,.4)', fontWeight: 500 }}>{article.author}</span>
                    </div>
                    <Link
                        to={`/articles/${article.slug}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', fontWeight: 600, color: hovered ? ACCENT : 'rgba(255,255,255,.45)', textDecoration: 'none', transition: 'color .2s' }}
                    >
                        Read <ArrowIcon />
                    </Link>
                </div>
            </div>
        </article>
    );
};

/* ── Featured card (first article) ── */
const FeaturedCard = ({ article }) => {
    const [hovered, setHovered] = useState(false);
    const [ref, vis] = useReveal(0.05);

    return (
        <Link
            ref={ref}
            to={`/articles/${article.slug}`}
            aria-label={`Featured: ${article.title}`}
            style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
                borderRadius: 20, overflow: 'hidden',
                border: `1px solid ${hovered ? 'rgba(255,255,255,.16)' : 'rgba(255,255,255,.08)'}`,
                textDecoration: 'none', marginBottom: '3rem',
                opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
                transition: 'opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1), border-color .25s',
                cursor: 'pointer',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image side */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 340 }}>
                {article.image ? (
                    <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform .8s cubic-bezier(.22,1,.36,1)', filter: 'brightness(.65) saturate(1.1)' }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: 'rgba(200,242,58,.06)' }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,.2) 0%, rgba(5,5,5,.05) 100%)' }} />
                <div style={{ position: 'absolute', top: 18, left: 18, padding: '4px 12px', borderRadius: 100, background: ACCENT, fontSize: '0.68rem', fontWeight: 700, color: '#000', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Featured
                </div>
            </div>

            {/* Content side */}
            <div style={{ background: 'rgba(255,255,255,.03)', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: '0.75rem' }}>{article.category}</span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem,2.2vw,2rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', color: '#fff', marginBottom: '1rem' }}>{article.title}</h2>
                <p style={{ fontSize: '0.92rem', fontWeight: 300, color: 'rgba(255,255,255,.45)', lineHeight: 1.7, marginBottom: '1.75rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.75rem', color: 'rgba(255,255,255,.3)', marginBottom: '1.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><CalIcon /> {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><ClockIcon /> {article.readTime}</span>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', fontWeight: 600, color: hovered ? ACCENT : '#fff', transition: 'color .2s' }}>
                    Read Article <ArrowIcon />
                </span>
            </div>
        </Link>
    );
};

/* ── Page ── */
const ArticlesIndex = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [headerRef, headerVis] = useReveal(0.05);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const categories = ['All', ...new Set(articlesData.map(a => a.category))];
    const filtered = selectedCategory === 'All'
        ? articlesData
        : articlesData.filter(a => a.category === selectedCategory);

    const featured = articlesData[0];
    const rest     = filtered.filter(a => a.id !== featured.id);

    const schema = buildSchema(articlesData);

    return (
        <>
            <Helmet>
                <title>Blog & Resources — Web Dev, Flutter, Chrome Extensions | Minderfly</title>
                <meta name="description" content="In-depth articles on MERN stack development, Flutter mobile apps, Chrome extension development, VS Code tooling, and modern software engineering — by the Minderfly team." />
                <meta name="keywords" content="web development blog, Flutter tutorials, Chrome extension development guide, MERN stack articles, software engineering blog, React tutorials, Node.js articles, mobile app development blog, developer resources" />
                <link rel="canonical" href="https://minderfly.com/articles" />
                <meta property="og:title"       content="Blog & Resources — Minderfly" />
                <meta property="og:description" content="Deep dives into web development, Flutter, Chrome extensions, and software engineering." />
                <meta property="og:type"        content="website" />
                <meta property="og:url"         content="https://minderfly.com/articles" />
                <meta name="twitter:card"       content="summary_large_image" />
                <meta name="twitter:title"      content="Blog & Resources — Minderfly" />
                <meta name="twitter:description" content="Deep dives into web development, Flutter, Chrome extensions, and software engineering." />
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            </Helmet>

            <Navbar />

            <main style={{ background: '#050505', color: '#fff', fontFamily: 'var(--font-body)', minHeight: '100vh' }}>

                {/* ── Hero header ── */}
                <section style={{ padding: '140px 0 80px', position: 'relative', overflow: 'hidden' }} aria-label="Articles header">
                    {/* Grid */}
                    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)', backgroundSize: '68px 68px', maskImage: 'radial-gradient(ellipse 70% 70% at 50% 30%,black,transparent)', pointerEvents: 'none' }} />
                    <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '60%', background: 'radial-gradient(ellipse at 50% 0%,rgba(200,242,58,.055) 0%,transparent 65%)', pointerEvents: 'none' }} />

                    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
                        {/* Breadcrumb */}
                        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'rgba(255,255,255,.3)', marginBottom: '2.5rem' }}>
                            <Link to="/" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Home</Link>
                            <span aria-hidden="true">›</span>
                            <span aria-current="page" style={{ color: 'rgba(255,255,255,.55)' }}>Articles</span>
                        </nav>

                        <div ref={headerRef} style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto', opacity: headerVis ? 1 : 0, transform: headerVis ? 'none' : 'translateY(28px)', transition: 'opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1)' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginBottom: '1.5rem' }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'block' }} />
                                The Library
                            </div>
                            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem,5.5vw,5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#fff', marginBottom: '1.25rem' }}>
                                Insights &{' '}
                                <span style={{ WebkitTextStroke: '1px rgba(255,255,255,.22)', color: 'transparent' }}>Resources.</span>
                            </h1>
                            <p style={{ fontSize: '1.05rem', fontWeight: 300, color: 'rgba(255,255,255,.42)', lineHeight: 1.65 }}>
                                Deep dives into modern web development, Flutter, Chrome tooling, and software architecture — by the Minderfly team.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Category filter ── */}
                <div style={{ borderBottom: '1px solid rgba(255,255,255,.07)', marginBottom: '4rem' }}>
                    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
                        <div role="tablist" aria-label="Filter articles by category" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingBottom: '1.5rem' }}>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    role="tab"
                                    aria-selected={selectedCategory === cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{
                                        padding: '7px 18px', borderRadius: 100,
                                        background: selectedCategory === cat ? ACCENT : 'rgba(255,255,255,.05)',
                                        border: `1px solid ${selectedCategory === cat ? ACCENT : 'rgba(255,255,255,.08)'}`,
                                        color: selectedCategory === cat ? '#000' : 'rgba(255,255,255,.5)',
                                        fontSize: '0.82rem', fontWeight: selectedCategory === cat ? 600 : 400,
                                        fontFamily: 'var(--font-body)',
                                        cursor: 'pointer', transition: 'all .2s', letterSpacing: '0.02em',
                                    }}
                                    onMouseEnter={e => { if (selectedCategory !== cat) { e.currentTarget.style.background = 'rgba(255,255,255,.09)'; e.currentTarget.style.color = '#fff'; } }}
                                    onMouseLeave={e => { if (selectedCategory !== cat) { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.color = 'rgba(255,255,255,.5)'; } }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Content ── */}
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem 110px' }}>

                    {/* Featured (only when All is selected) */}
                    {selectedCategory === 'All' && featured && (
                        <FeaturedCard article={featured} />
                    )}

                    {/* Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {(selectedCategory === 'All' ? rest : filtered).length > 0 ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                                    {(selectedCategory === 'All' ? rest : filtered).map((article, i) => (
                                        <ArticleCard key={article.id} article={article} index={i} />
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '5rem 0', color: 'rgba(255,255,255,.3)', fontSize: '0.95rem' }}>
                                    No articles found in this category.
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default ArticlesIndex;