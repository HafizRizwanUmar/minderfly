import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaWindows, FaQrcode, FaInfinity, FaBolt, FaCheck } from 'react-icons/fa';
import './NishanProduct.css';

const NishanProduct = () => {
    const features = [
        {
            icon: <FaQrcode />,
            title: 'High Resolution',
            desc: 'Generate crisp, high-quality QR codes for any use case.'
        },
        {
            icon: <FaInfinity />,
            title: 'Unlimited Creation',
            desc: 'Create as many QR codes as you need without limits (Premium).'
        },
        {
            icon: <FaBolt />,
            title: 'Lightning Fast',
            desc: 'Native Windows performance for instant generation.'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Nishan QR Code Generator - Minderfly Store</title>
                <meta name="description" content="Download Nishan QR Code Generator for Windows. Create custom QR codes easily." />
            </Helmet>

            {/* Custom Navbar for Nishan Product */}
            <nav className="nishan-nav">
                <div className="nishan-container nav-container">
                    <Link to="/store" className="nishan-back-link">
                        ← Back to Store
                    </Link>
                    <div className="nishan-logo">
                        Nishan <span className="nishan-accent">QR</span>
                    </div>
                    <a href="#pricing" className="btn-nishan-sm">Get Started</a>
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
                            <span className="nishan-badge">New Release</span>
                            <h1>Nishan <span className="nishan-accent">QR Generator</span></h1>
                            <p className="nishan-subtitle">
                                The most elegant and powerful QR code generator for Windows.
                                Simple, fast, and designed for professionals.
                            </p>

                            <div className="nishan-cta-group">
                                <a
                                    href="https://apps.microsoft.com/store/detail/nishan-qr-code-generator/9NBLGGH4N9W2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-nishan-primary"
                                >
                                    <FaWindows /> Get it on Microsoft Store
                                </a>
                                <span className="nishan-price-info">Free Trial Available</span>
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
                                <div className="app-content">
                                    <div className="qr-preview">
                                        <FaQrcode />
                                    </div>
                                    <div className="app-controls">
                                        <div className="control-line"></div>
                                        <div className="control-line short"></div>
                                        <div className="control-btn"></div>
                                    </div>
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

                {/* Pricing Section */}
                <section className="nishan-pricing" id="pricing">
                    <div className="nishan-container">
                        <motion.div
                            className="pricing-card-wrapper"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="pricing-card">
                                <h2>Simple Pricing</h2>
                                <p>Choose the plan that fits your needs</p>

                                <div className="plans-container">
                                    <div className="plan free-plan">
                                        <h3>Free Starter</h3>
                                        <div className="price">Free</div>
                                        <ul className="plan-features">
                                            <li><FaCheck /> 1 QR Code per day</li>
                                            <li><FaCheck /> Basic Customization</li>
                                            <li><FaCheck /> Standard Quality</li>
                                        </ul>
                                    </div>

                                    <div className="plan pro-plan">
                                        <div className="popular-tag">Best Value</div>
                                        <h3>Lifetime Pro</h3>
                                        <div className="price">$5 <span className="period">/ lifetime</span></div>
                                        <ul className="plan-features">
                                            <li><FaCheck /> <strong>Unlimited</strong> QR Codes</li>
                                            <li><FaCheck /> High Resolution Export</li>
                                            <li><FaCheck /> Advanced Customization</li>
                                            <li><FaCheck /> Priority Support</li>
                                        </ul>
                                        <a href="https://apps.microsoft.com/detail/9njf5mhwhhps?hl=en-US&gl=PK" target="_blank" rel="noopener noreferrer" className="btn-nishan-buy">Upgrade to Pro</a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Custom Footer for Nishan Product */}
                <footer className="nishan-footer">
                    <div className="nishan-container">
                        <div className="nishan-footer-content">
                            <div className="nishan-footer-left">
                                <span className="nishan-logo-sm">Nishan QR</span>
                                <p>&copy; {new Date().getFullYear()} Minderfly. All rights reserved.</p>
                            </div>
                            <div className="nishan-footer-links">
                                <Link to="/store">Store</Link>
                                <Link to="/">Minderfly Home</Link>
                                <a href="mailto:support@minderfly.com">Support</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default NishanProduct;
