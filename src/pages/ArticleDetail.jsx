import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaUser, FaTag, FaCalendar } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import './ArticleDetail.css';

const ArticleDetail = () => {
    const { slug } = useParams();
    const article = getArticleBySlug(slug);
    const relatedArticles = article ? getRelatedArticles(slug) : [];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!article) {
        return <Navigate to="/articles" replace />;
    }

    return (
        <>
            <Helmet>
                <title>{article.title} - Minderfly Blog</title>
                <meta name="description" content={article.excerpt} />
                <meta name="keywords" content={article.tags.join(', ')} />
                <meta name="author" content={article.author} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://minderfly.com/articles/${article.slug}`} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.excerpt} />
                <meta property="og:image" content={`https://minderfly.com${article.image}`} />
                <meta property="article:published_time" content={article.date} />
                <meta property="article:author" content={article.author} />
                <meta property="article:section" content={article.category} />
                {article.tags.map((tag, idx) => (
                    <meta key={idx} property="article:tag" content={tag} />
                ))}

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://minderfly.com/articles/${article.slug}`} />
                <meta property="twitter:title" content={article.title} />
                <meta property="twitter:description" content={article.excerpt} />
                <meta property="twitter:image" content={`https://minderfly.com${article.image}`} />

                <link rel="canonical" href={`https://minderfly.com/articles/${article.slug}`} />

                {/* Structured Data - JSON-LD */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": article.title,
                        "description": article.excerpt,
                        "image": `https://minderfly.com${article.image}`,
                        "datePublished": article.date,
                        "author": {
                            "@type": "Person",
                            "name": article.author
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Minderfly",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://minderfly.com/logo.png"
                            }
                        }
                    })}
                </script>
            </Helmet>

            <Navbar />

            <article className="article-detail-page">
                <div className="container">
                    {/* Breadcrumb */}
                    <motion.nav
                        className="breadcrumb"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Link to="/" className="breadcrumb-link">Home</Link>
                        <span className="breadcrumb-separator">/</span>
                        <Link to="/articles" className="breadcrumb-link">Articles</Link>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">{article.title}</span>
                    </motion.nav>

                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/articles" className="back-button">
                            <FaArrowLeft /> Back to Articles
                        </Link>
                    </motion.div>

                    {/* Article Header */}
                    <motion.header
                        className="article-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="article-category">{article.category}</span>
                        <h1 className="article-detail-title">{article.title}</h1>

                        <div className="article-meta-info">
                            <div className="meta-item">
                                <FaUser />
                                <span>{article.author}</span>
                            </div>
                            <div className="meta-item">
                                <FaCalendar />
                                <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="meta-item">
                                <FaClock />
                                <span>{article.readTime}</span>
                            </div>
                        </div>

                        <div className="article-detail-tags">
                            {article.tags.map((tag, idx) => (
                                <span key={idx} className="article-detail-tag">
                                    <FaTag /> {tag}
                                </span>
                            ))}
                        </div>
                    </motion.header>

                    {/* Article Thumbnail */}
                    <motion.div
                        className="article-thumbnail"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="thumbnail-placeholder">
                            <span>{article.category}</span>
                        </div>
                    </motion.div>

                    {/* Article Content */}
                    <motion.div
                        className="article-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="markdown-content">
                            {article.content.split('\n').map((line, idx) => {
                                if (line.startsWith('# ')) {
                                    return <h1 key={idx}>{line.substring(2)}</h1>;
                                } else if (line.startsWith('## ')) {
                                    return <h2 key={idx}>{line.substring(3)}</h2>;
                                } else if (line.startsWith('### ')) {
                                    return <h3 key={idx}>{line.substring(4)}</h3>;
                                } else if (line.trim() === '') {
                                    return <br key={idx} />;
                                } else {
                                    return <p key={idx}>{line}</p>;
                                }
                            })}
                        </div>
                    </motion.div>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <motion.section
                            className="related-articles"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h2 className="related-title">Related Articles</h2>
                            <div className="related-grid">
                                {relatedArticles.map((related) => (
                                    <Link
                                        key={related.id}
                                        to={`/articles/${related.slug}`}
                                        className="related-card"
                                    >
                                        <div className="related-card-image">
                                            <span className="related-category">{related.category}</span>
                                        </div>
                                        <div className="related-card-content">
                                            <h3>{related.title}</h3>
                                            <p>{related.excerpt}</p>
                                            <div className="related-meta">
                                                <span>{related.readTime}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>
            </article>

            <Footer />
        </>
    );
};

export default ArticleDetail;
