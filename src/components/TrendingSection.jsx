import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './TrendingSection.css';

const TrendingSection = () => {
    const [activeTab, setActiveTab] = useState('Popular');

    // Mock data based on provided product list but styled for games/apps
    const items = [
        {
            id: 1,
            title: "Sanad PDF Editor",
            category: "Productivity",
            image: "/sanad_preview.svg",
            rating: 4.9,
            link: "/store/sanad-pdf-editor"
        },
        {
            id: 2,
            title: "Debt Settler",
            category: "Finance",
            image: "/debtsettler_preview.svg",
            rating: 4.8,
            link: "/store/debt-settler"
        },
        {
            id: 3,
            title: "Nishan QR",
            category: "Utilities",
            image: "/nishan_preview.svg",
            rating: 4.7,
            link: "/store/nishan-qr"
        },
        {
            id: 4,
            title: "Chrome Themes",
            category: "Design",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
            rating: 4.8,
            link: "/store/chrome-themes"
        },
        {
            id: 5,
            title: "Flutter Web",
            category: "Dev Tools",
            image: "/flutter_preview.png",
            rating: 4.5,
            link: "/store/flutter-web-emulator"
        }
    ];

    return (
        <section className="trending-section">
            <div className="trending-header">
                <h2 className="trending-title">Top Trending</h2>

                <div className="trending-controls">
                    <div className="trending-tabs">
                        {['Popular', 'Trending', 'Upcoming'].map(tab => (
                            <button
                                key={tab}
                                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div
                                        className="tab-indicator"
                                        layoutId="activeTab"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="nav-arrows">
                        <button className="arrow-btn"><FaChevronLeft /></button>
                        <button className="arrow-btn active"><FaChevronRight /></button>
                    </div>
                </div>
            </div>

            <motion.div
                className="trending-grid"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        className="trending-card"
                        whileHover={{ y: -10, transition: { duration: 0.2 } }}
                    >
                        <Link to={item.link} className="card-link-wrapper" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                            <div className="card-image-wrapper">
                                <img src={item.image} alt={item.title} className="card-image" />
                                <div className="card-overlay">
                                    <button className="add-btn">+</button>
                                </div>
                            </div>
                            <div className="card-info">
                                <h3 className="card-title">{item.title}</h3>
                                <div className="card-meta">
                                    <span className="card-category">{item.category}</span>
                                    <span className="card-rating">
                                        <FaStar className="star-icon" /> {item.rating}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default TrendingSection;
