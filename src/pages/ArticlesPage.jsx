import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
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

    // Structured data for blog
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Minderfly Blog - Web Development & Design Insights",
        "description": "Expert articles on web development, MERN stack, Flutter, React, Node.js, and modern development practices",
        "url": "https://minderfly.com/articles",
        "publisher": {
            "@type": "Organization",
            "name": "Minderfly",
            "logo": {
                "@type": "ImageObject",
                "url": "https://minderfly.com/logo.png"
            }
        },
        "blogPost": articlesData.map(article => ({
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.excerpt,
            "datePublished": article.date,
            "author": {
                "@type": "Person",
                "name": article.author
            },
            "url": `https://minderfly.com/articles/${article.slug}`
        }))
    };

    return (
        <>
            <SEOHead
                title="Articles & Insights - Web Development Blog"
                description="Explore expert articles on web development, MERN stack, Flutter, React, Node.js, UI/UX design, and modern development practices. Stay updated with the latest trends, tutorials, and best practices from Minderfly."
                keywords="web development blog, MERN stack tutorials, Flutter articles, React tutorials, Node.js guides, JavaScript articles, frontend development, backend development, UI/UX design, programming blog, software development insights"
                canonical="https://minderfly.com/articles"
                schema={structuredData}
            />

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
