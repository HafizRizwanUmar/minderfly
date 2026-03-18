import { useEffect, useRef, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getArticleBySlug, getRelatedArticles } from '../../data/articles';
import './ArticleDetail.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/* ── icons ── */
const ACCENT = '#c8f23a';

const ClockIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M6.5 3.5v3l2.2 1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
);

const CalIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <rect x="1" y="2.5" width="11" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M1 6h11M4.5 1v3M8.5 1v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
);

const UserIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <circle cx="6.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M1.5 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
);

const ArrowLeftIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M12 7H2M7 2L2 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

/* ── Reading progress bar ── */
const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const scrolled = el.scrollTop;
            const total = el.scrollHeight - el.clientHeight;
            setProgress(total > 0 ? (scrolled / total) * 100 : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 2, zIndex: 9999, background: 'rgba(255,255,255,.06)', pointerEvents: 'none' }} aria-hidden="true">
            <div style={{ height: '100%', width: `${progress}%`, background: ACCENT, transition: 'width .1s linear', borderRadius: 1 }} />
        </div>
    );
};

/* ── Table of contents extractor ── */
const extractHeadings = (content) => {
    if (!content) return [];
    const matches = [...content.matchAll(/^#{1,3}\s+(.+)$/gm)];
    return matches.map((m, i) => ({
        id: `heading-${i}`,
        text: m[1].replace(/\*\*/g, '').replace(/`/g, ''),
        level: m[0].match(/^#+/)[0].length,
    }));
};

/* ── Related card ── */
const RelatedCard = ({ article }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <Link
            to={`/articles/${article.slug}`}
            style={{
                display: 'block', textDecoration: 'none',
                background: hovered ? 'rgba(255,255,255,.05)' : 'rgba(255,255,255,.025)',
                border: `1px solid ${hovered ? 'rgba(255,255,255,.14)' : 'rgba(255,255,255,.07)'}`,
                borderRadius: 16, overflow: 'hidden',
                transform: hovered ? 'translateY(-3px)' : 'none',
                transition: 'background .25s,border-color .25s,transform .3s cubic-bezier(.22,1,.36,1)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {article.image && (
                <div style={{ height: 160, overflow: 'hidden' }}>
                    <img src={article.image} alt={article.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.65) saturate(1.1)', transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform .7s cubic-bezier(.22,1,.36,1)' }} />
                </div>
            )}
            <div style={{ padding: '20px 22px 22px' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: '0.55rem' }}>{article.category}</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: '0.6rem' }}>{article.title}</h3>
                <p style={{ fontSize: '0.8rem', fontWeight: 300, color: 'rgba(255,255,255,.38)', lineHeight: 1.6, marginBottom: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.excerpt}</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 600, color: hovered ? ACCENT : 'rgba(255,255,255,.45)', transition: 'color .2s' }}>
                    Read Article <ArrowRightIcon />
                </span>
            </div>
        </Link>
    );
};

/* ── Page ── */
const ArticleDetail = () => {
    const { slug } = useParams();
    const article = getArticleBySlug(slug);
    const relatedArticles = article ? getRelatedArticles(slug) : [];
    const headings = article ? extractHeadings(article.content) : [];

    useEffect(() => { window.scrollTo(0, 0); }, [slug]);

    if (!article) return <Navigate to="/articles" replace />;

    /* Structured data */
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        image: article.image ? `https://minderfly.com${article.image}` : undefined,
        datePublished: article.date,
        dateModified: article.dateModified || article.date,
        author: { '@type': 'Person', name: article.author },
        publisher: {
            '@type': 'Organization',
            name: 'Minderfly',
            logo: { '@type': 'ImageObject', url: 'https://minderfly.com/logo.png' },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://minderfly.com/articles/${article.slug}` },
        keywords: article.tags?.join(', '),
        articleSection: article.category,
        wordCount: article.content?.split(' ').length,
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://minderfly.com/' },
            { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://minderfly.com/articles' },
            { '@type': 'ListItem', position: 3, name: article.title, item: `https://minderfly.com/articles/${article.slug}` },
        ],
    };

    return (
        <>
            <Helmet>
                <title>{article.title} — Minderfly Blog</title>
                <meta name="description"   content={article.excerpt} />
                <meta name="keywords"      content={article.tags?.join(', ')} />
                <meta name="author"        content={article.author} />
                <link rel="canonical"      href={`https://minderfly.com/articles/${article.slug}`} />

                <meta property="og:type"                content="article" />
                <meta property="og:url"                 content={`https://minderfly.com/articles/${article.slug}`} />
                <meta property="og:title"               content={article.title} />
                <meta property="og:description"         content={article.excerpt} />
                {article.image && <meta property="og:image" content={`https://minderfly.com${article.image}`} />}
                <meta property="article:published_time" content={article.date} />
                <meta property="article:author"         content={article.author} />
                <meta property="article:section"        content={article.category} />
                {article.tags?.map((tag, i) => <meta key={i} property="article:tag" content={tag} />)}

                <meta name="twitter:card"        content="summary_large_image" />
                <meta name="twitter:title"       content={article.title} />
                <meta name="twitter:description" content={article.excerpt} />
                {article.image && <meta name="twitter:image" content={`https://minderfly.com${article.image}`} />}

                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            </Helmet>

            <ReadingProgress />
            <Navbar />

            <main style={{ background: '#050505', color: '#fff', fontFamily: 'var(--font-body)' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>

                    {/* ── Breadcrumb + back ── */}
                    <div style={{ paddingTop: 120 }}>
                        <motion.nav
                            aria-label="Breadcrumb"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'rgba(255,255,255,.3)', marginBottom: '1.5rem', flexWrap: 'wrap' }}
                        >
                            <Link to="/"        style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Home</Link>
                            <span aria-hidden="true">›</span>
                            <Link to="/articles" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Articles</Link>
                            <span aria-hidden="true">›</span>
                            <span aria-current="page" style={{ color: 'rgba(255,255,255,.5)', maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{article.title}</span>
                        </motion.nav>

                        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
                            <Link
                                to="/articles"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', fontWeight: 600, color: 'rgba(255,255,255,.45)', textDecoration: 'none', marginBottom: '3rem', transition: 'color .2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = ACCENT}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.45)'}
                            >
                                <ArrowLeftIcon /> Back to Articles
                            </Link>
                        </motion.div>
                    </div>

                    {/* ── Article header ── */}
                    <motion.header
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65 }}
                        style={{ maxWidth: 780, margin: '0 auto 3rem', textAlign: 'center' }}
                    >
                        {/* Category */}
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 100, background: 'rgba(200,242,58,.1)', border: '1px solid rgba(200,242,58,.25)', color: ACCENT, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, display: 'block' }} />
                            {article.category}
                        </span>

                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4.5vw,3.5rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff', marginBottom: '1.5rem' }}>
                            {article.title}
                        </h1>

                        {/* Meta row */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, fontSize: '0.78rem', color: 'rgba(255,255,255,.38)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(200,242,58,.1)', border: '1px solid rgba(200,242,58,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: ACCENT }}>
                                    {article.author?.charAt(0)}
                                </div>
                                {article.author}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <CalIcon />
                                {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <ClockIcon /> {article.readTime}
                            </span>
                        </div>

                        {/* Tags */}
                        {article.tags?.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                                {article.tags.map((tag, i) => (
                                    <span key={i} style={{ padding: '4px 12px', borderRadius: 100, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.09)', fontSize: '0.72rem', color: 'rgba(255,255,255,.4)', letterSpacing: '0.04em' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.header>

                    {/* ── Hero image ── */}
                    {article.image && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            style={{ maxWidth: 980, margin: '0 auto 4rem', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)' }}
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                style={{ width: '100%', height: 'auto', maxHeight: 520, objectFit: 'cover', display: 'block', filter: 'brightness(.8) saturate(1.1)' }}
                            />
                        </motion.div>
                    )}

                    {/* ── Body layout: TOC + content ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: headings.length > 2 ? '1fr 260px' : '1fr', gap: '4rem', maxWidth: 1100, margin: '0 auto', alignItems: 'start', flexDirection: 'row-reverse' }}>

                        {/* Content */}
                        <motion.div
                            className="markdown-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            style={{ gridColumn: headings.length > 2 ? '1 / 2' : '1 / -1', gridRow: 1 }}
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    img: ({ node, ...props }) => (
                                        <img {...props} className="article-content-image" style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,.08)' }} />
                                    ),
                                    a: ({ node, ...props }) => (
                                        <a {...props} target="_blank" rel="noopener noreferrer" />
                                    ),
                                    table: ({ node, ...props }) => (
                                        <div className="table-container"><table {...props} /></div>
                                    ),
                                    h2: ({ node, children, ...props }) => (
                                        <h2 {...props} id={`h-${String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>{children}</h2>
                                    ),
                                    h3: ({ node, children, ...props }) => (
                                        <h3 {...props} id={`h-${String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>{children}</h3>
                                    ),
                                }}
                            >
                                {article.content}
                            </ReactMarkdown>
                        </motion.div>

                        {/* Table of contents (sticky sidebar) */}
                        {headings.length > 2 && (
                            <aside
                                style={{ gridColumn: '2 / 3', gridRow: 1, position: 'sticky', top: 96, padding: '24px', background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16 }}
                                aria-label="Table of contents"
                            >
                                <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ width: 14, height: 1, background: ACCENT, display: 'block' }} />
                                    Contents
                                </p>
                                <nav>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {headings.map((h, i) => (
                                            <li key={i}>
                                                <a
                                                    href={`#h-${h.text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                                                    style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, color: 'rgba(255,255,255,.45)', textDecoration: 'none', padding: '5px 0 5px', borderLeft: h.level === 2 ? '1px solid rgba(255,255,255,.1)' : 'none', paddingLeft: h.level === 3 ? 20 : h.level === 2 ? 10 : 0, lineHeight: 1.4, transition: 'color .2s' }}
                                                    onMouseEnter={e => e.currentTarget.style.color = ACCENT}
                                                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.45)'}
                                                >
                                                    {h.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </aside>
                        )}
                    </div>

                    {/* ── Author card ── */}
                    <div style={{ maxWidth: 780, margin: '4rem auto', padding: '28px 32px', background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(200,242,58,.1)', border: '1px solid rgba(200,242,58,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: ACCENT, flexShrink: 0 }}>
                            {article.author?.charAt(0)}
                        </div>
                        <div>
                            <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '0.25rem' }}>Written by</p>
                            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '0.2rem' }}>{article.author}</p>
                            <p style={{ fontSize: '0.82rem', fontWeight: 300, color: 'rgba(255,255,255,.38)' }}>Minderfly Team</p>
                        </div>
                    </div>

                    {/* ── Related articles ── */}
                    {relatedArticles.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ paddingTop: '4rem', borderTop: '1px solid rgba(255,255,255,.07)', marginBottom: '6rem' }}
                            aria-label="Related articles"
                        >
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.5rem' }}>
                                        <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }} />
                                        Keep Reading
                                    </div>
                                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,2.5vw,2.2rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                                        Related Articles
                                    </h2>
                                </div>
                                <Link
                                    to="/articles"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,.45)', textDecoration: 'none', transition: 'color .2s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = ACCENT}
                                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.45)'}
                                >
                                    All Articles <ArrowRightIcon />
                                </Link>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(relatedArticles.length, 3)},1fr)`, gap: 20 }}>
                                {relatedArticles.slice(0, 3).map((r) => (
                                    <RelatedCard key={r.id} article={r} />
                                ))}
                            </div>
                        </motion.section>
                    )}

                </div>
            </main>

            <Footer />
        </>
    );
};

export default ArticleDetail;