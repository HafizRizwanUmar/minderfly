import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articlesData } from '../data/articles'; // Assuming this exists from previous analysis
import './ArticleSection.css';

const ArticleSection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    // Get the latest 2 articles
    const latestArticles = articlesData.slice(0, 2);

    return (
        <section className="article-section" ref={sectionRef}>
            <div className="container">
                <div className="article-header">
                    <span className="subtitle">LATEST IN</span>
                    <h2 className="title">Tech & Insights</h2>
                </div>

                <div className="article-grid">
                    {latestArticles.map((article, index) => (
                        <motion.div
                            className="article-card-home"
                            key={article.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Link to={`/articles/${article.slug}`} className="article-link">
                                <div className="image-wrapper">
                                    <img src={article.image} alt={article.title} />
                                    {/* Mock overlay phone layers if needed, for now just image */}
                                    {index === 0 && (
                                        <div className="phone-overlay">
                                            {/* Design element to match screenshot: phone mockup over image if feasible without images */}
                                        </div>
                                    )}
                                </div>
                                <div className="content">
                                    <span className="author">BY {article.author.toUpperCase()}</span>
                                    <h3>{article.title}</h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="article-footer-home">
                    <Link to="/articles" className="btn-neon">
                        More Articles
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ArticleSection;
