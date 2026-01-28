import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaWindows, FaLaptopCode, FaBolt, FaCheck, FaMobileAlt } from 'react-icons/fa';
import './NishanProduct.css'; // Reusing the same CSS as it shares the design

const FlutterWebEmulator = () => {
    const features = [
        {
            icon: <FaLaptopCode />,
            title: 'Run Inside VS Code',
            desc: 'View your Flutter Web app directly within VS Code. No more Alt-Tab.'
        },
        {
            icon: <FaMobileAlt />,
            title: 'Device Simulation',
            desc: 'Test responsiveness on different device sizes (iPhone, iPad, Pixel) instantly.'
        },
        {
            icon: <FaBolt />,
            title: 'Hot Reload Ready',
            desc: 'Works seamlessly with Flutter Hot Reload for instant updates.'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Flutter Web Emulator - Minderfly Store</title>
                <meta name="description" content="Run Flutter Web apps inside VS Code with this powerful extension. Download for free." />
            </Helmet>

            {/* Reusing Nishan Nav styles */}
            <nav className="nishan-nav">
                <div className="nishan-container nav-container">
                    <Link to="/store" className="nishan-back-link">
                        ← Back to Store
                    </Link>
                    <div className="nishan-logo">
                        Flutter <span className="nishan-accent">Web Emulator</span>
                    </div>
                    <a href="#download" className="btn-nishan-sm">Download</a>
                </div>
            </nav>

            <div className="nishan-page">
                {/* Hero Section */}
                <section className="nishan-hero">
                    <div className="nishan-container">
                        <motion.div
                            className="nishan-hero-content"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="nishan-badge">Dev Tool</span>
                            <h1>Flutter <span className="nishan-accent">Web Emulator</span></h1>
                            <p className="nishan-subtitle">
                                The missing piece for Flutter Web development. Run, debug, and test your apps without leaving VS Code.
                            </p>

                            <div className="nishan-cta-group">
                                <a
                                    href="https://marketplace.visualstudio.com/items?itemName=HafizRizwanUmar.flutter-web-emulator"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-nishan-primary"
                                >
                                    <FaWindows /> Get for VS Code
                                </a>
                                <span className="nishan-price-info">Free & Open Source</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="nishan-hero-visual"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Abstract representation of the app UI */}
                            <div className="app-mockup">
                                <div className="app-window-bar">
                                    <div className="window-dots">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                                <div className="app-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1e1e1e' }}>
                                    <FaLaptopCode style={{ fontSize: '4rem', color: '#0078d7' }} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="nishan-features">
                    <div className="nishan-container">
                        <div className="features-grid">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    className="feature-box"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <div className="feature-icon">{feature.icon}</div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing/Download Section */}
                <section className="nishan-pricing" id="download">
                    <div className="nishan-container">
                        <motion.div
                            className="pricing-card-wrapper"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="pricing-card">
                                <h2>Free for Everyone</h2>
                                <p>Boost your productivity today</p>

                                <div className="plans-container" style={{ justifyContent: 'center' }}>
                                    <div className="plan pro-plan">
                                        <div className="popular-tag">Recommended</div>
                                        <h3>VS Code Extension</h3>
                                        <div className="price">Free</div>
                                        <ul className="plan-features">
                                            <li><FaCheck /> <strong>Unlimited</strong> Usage</li>
                                            <li><FaCheck /> Device Simulation</li>
                                            <li><FaCheck /> Hot Reload Support</li>
                                            <li><FaCheck /> Regular Updates</li>
                                        </ul>
                                        <a href="https://marketplace.visualstudio.com/items?itemName=HafizRizwanUmar.flutter-web-emulator" target="_blank" rel="noopener noreferrer" className="btn-nishan-buy">Install Now</a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="nishan-footer">
                    <div className="nishan-container">
                        <div className="nishan-footer-content">
                            <div className="nishan-footer-left">
                                <span className="nishan-logo-sm">Flutter Web Emulator</span>
                                <p>&copy; {new Date().getFullYear()} Hafiz Rizwan Umar. All rights reserved.</p>
                            </div>
                            <div className="nishan-footer-links">
                                <Link to="/store">Store</Link>
                                <Link to="/">Minderfly Home</Link>
                                <a href="https://marketplace.visualstudio.com/items?itemName=HafizRizwanUmar.flutter-web-emulator">Marketplace</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default FlutterWebEmulator;
