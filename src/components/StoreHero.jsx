import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './StoreHero.css';

const StoreHero = () => {
    // Placeholder avatars for "friends using"
    const friends = [
        "https://i.pravatar.cc/150?u=1",
        "https://i.pravatar.cc/150?u=2",
        "https://i.pravatar.cc/150?u=3",
        "https://i.pravatar.cc/150?u=4"
    ];

    return (
        <section className="store-hero">
            <motion.div
                className="hero-banner"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="hero-bg-image" style={{ backgroundImage: "url('/debtsettler_preview.svg')" }}></div>
                <div className="hero-overlay"></div>

                <div className="hero-content-wrapper">
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Debt Settler:<br />
                        Split Bills & Track<br />
                        Expenses Effortlessly
                    </motion.h1>

                    <motion.div
                        className="hero-footer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="friends-bubble">
                            <div className="avatars">
                                {friends.map((src, i) => (
                                    <img key={i} src={src} alt="user" className="avatar" />
                                ))}
                            </div>
                            <div className="friends-text">
                                <span className="count">+10k</span>
                                <span className="label">active users</span>
                            </div>
                        </div>

                        <Link to="/store/debt-settler" className="play-now-btn">
                            Get it Free
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default StoreHero;
