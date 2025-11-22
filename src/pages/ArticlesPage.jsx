import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaClock, FaUser, FaTag } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { articlesData } from '../data/articles';
import './ArticlesPage.css';

const ArticlesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>Articles & Insights - Minderfly | Web Development & Design Blog</title>
                <meta name="description" content="Explore expert articles on web development, React, UI/UX design, and modern development practices. Stay updated with the latest trends and best practices." />
                <meta name="keywords" content="web development blog, React tutorials, UI/UX design, JavaScript articles, frontend development" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://minderfly.com/articles" />
                <meta property="og:title" content="Articles & Insights - Minderfly" />
                <meta property="og:description" content="Expert articles on web development, design, and modern development practices." />
                <meta property="og:image" content="https://minderfly.com/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://minderfly.com/articles" />
                <meta property="twitter:title" content="Articles & Insights - Minderfly" />
                <meta property="twitter:description" content="Expert articles on web development, design, and modern development practices." />
                <meta property="twitter:image" content="https://minderfly.com/og-image.jpg" />

                <link rel="canonical" href="https://minderfly.com/articles" />
            </Helmet>

            <Navbar />

            <section className="articles-page">
                <div className="container">
                    <motion.div
                        className="articles-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1>Articles & <span className="highlight">Insights</span></h1>
                        <p className="articles-subtitle">
                            Exploring the latest trends in web development, design, and technology
                        </p>
                    </motion.div>

                    <div className="articles-scroll-container">
                        <div className="articles-grid">
                            {articlesData.map((article, index) => (
                                <motion.article
                                    key={article.id}
                                    className="article-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                >
                                    <Link to={`/articles/${article.slug}`} className="article-card-link">
                                        <div className="article-card-image">
                                            <div className="article-image-placeholder">
                                                <span className="article-category-badge">{article.category}</span>
                                            </div>
                                        </div>

                                        <div className="article-card-content">
                                            <div className="article-meta">
                                                <span className="article-date">
                                                    <FaClock /> {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <span className="article-read-time">
                                                    {article.readTime}
                                                </span>
                                            </div>

                                            <h2 className="article-title">{article.title}</h2>
                                            <p className="article-excerpt">{article.excerpt}</p>

                                            <div className="article-footer">
                                                <div className="article-author">
                                                    <FaUser />
                                                    <span>{article.author}</span>
                                                </div>
                                                <div className="article-read-more">
                                                    Read More <FaArrowRight />
                                                </div>
                                            </div>

                                            <div className="article-tags">
                                                {article.tags.slice(0, 3).map((tag, idx) => (
                                                    <span key={idx} className="article-tag">
                                                        <FaTag /> {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="article-card-glow"></div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </div>

                    <div className="articles-scroll-hint">
                        <span>Scroll to explore all articles</span>
                        <FaArrowRight className="scroll-arrow-hint" />
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ArticlesPage;
