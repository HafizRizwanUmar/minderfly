import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaArrowRight, FaRegClock } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { articlesData } from '../data/articles';
import './ArticlesPage.css';

const ArticlesPage = () => {
    const [activeCategory, setActiveCategory] = useState('ALL TOPICS');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = ['ALL TOPICS', 'TECHNOLOGY', 'SOFTWARE DEVELOPMENT', 'SOCIETY', 'PROGRAMMING', 'AI'];

    // Hero Article (Use the first one or a specific featured one)
    const heroArticle = articlesData[0];

    // Sidebar Featured Posts (Next 3)
    const featuredPosts = articlesData.slice(1, 4);

    return (
        <>
            <Navbar />

            <section className="news-portal-section">
                <div className="container">

                    {/* Top Navigation & Search */}
                    <div className="news-top-bar">
                        <div className="news-categories">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                            <button className="category-arrow"><FaArrowRight /></button>
                        </div>

                        <div className="news-search-bar">
                            <div className="search-input-wrapper">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search by Articles or Categories"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="btn-search">SEARCH</button>
                        </div>
                    </div>

                    <h1 className="section-heading">ALL TOPICS</h1>

                    {/* Main Grid Layout */}
                    <div className="news-grid-layout">

                        {/* Main Content Column */}
                        <div className="news-main-column">
                            <Link to={`/articles/${heroArticle.slug}`} className="news-hero-card">
                                <div className="hero-image-bg" style={{ backgroundImage: `url(${heroArticle.image})` }}>
                                    <div className="hero-overlay"></div>
                                </div>
                                <div className="hero-content">
                                    <div className="hero-meta">
                                        <span className="hero-date">{heroArticle.date}</span>
                                        <span className="dot-separator">•</span>
                                        <span className="hero-read-time">{heroArticle.readTime}</span>
                                        <span className="dot-separator">•</span>
                                        <span className="hero-tag">{heroArticle.category}</span>
                                    </div>
                                    <h2 className="hero-title">{heroArticle.title}</h2>
                                    <p className="hero-excerpt">{heroArticle.excerpt}</p>
                                </div>
                                <div className="hero-indicator"></div>
                            </Link>

                            {/* Remaining Articles List */}
                            <div className="news-feed-list">
                                {articlesData.slice(1).map((article) => (
                                    <Link to={`/articles/${article.slug}`} key={article.id} className="feed-article-card">
                                        <div className="feed-article-image">
                                            <img src={article.image} alt={article.title} />
                                        </div>
                                        <div className="feed-article-content">
                                            <div className="feed-meta">
                                                <span className="feed-category">{article.category}</span>
                                                <span className="dot-separator">•</span>
                                                <span className="feed-date">{article.date}</span>
                                            </div>
                                            <h3 className="feed-title">{article.title}</h3>
                                            <p className="feed-excerpt">{article.excerpt}</p>
                                            <div className="feed-footer">
                                                <span className="read-more">Read Article <FaArrowRight /></span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="news-sidebar">

                            {/* Newsletter Widget */}
                            <div className="newsletter-widget">
                                <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
                                <p>Stay informed about the latest project launches, insights, and updates.</p>
                                <div className="newsletter-form">
                                    <input type="email" placeholder="Enter your email" />
                                    <button>SUBSCRIBE</button>
                                </div>
                            </div>

                            {/* Featured Posts List */}
                            <div className="featured-posts-widget">
                                <h3>FEATURED POSTS</h3>
                                <div className="featured-list">
                                    {featuredPosts.map((post) => (
                                        <Link to={`/articles/${post.slug}`} key={post.id} className="featured-list-item">
                                            <div className="featured-thumb">
                                                <img src={post.image} alt={post.title} />
                                            </div>
                                            <div className="featured-info">
                                                <h4>{post.title}</h4>
                                                <div className="featured-meta">
                                                    <span>{post.date}</span>
                                                    <span>•</span>
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
};

export default ArticlesPage;
