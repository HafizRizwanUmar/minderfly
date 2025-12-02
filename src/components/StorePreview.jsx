import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWindows, FaArrowRight } from 'react-icons/fa';
import './StorePreview.css';

const StorePreview = () => {
    return (
        <section className="store-preview-section">
            <div className="container">
                <div className="store-preview-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Minderfly <span className="text-gradient">Store</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Premium tools and applications built for performance.
                    </motion.p>
                </div>

                <motion.div
                    className="store-featured-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="featured-content">
                        <div className="featured-badge">Featured Product</div>
                        <h3>Nishan QR Generator</h3>
                        <p>The ultimate QR code solution for Windows. Create unlimited, high-quality QR codes with a sleek native interface.</p>
                        <div className="featured-actions">
                            <Link to="/store/nishan-qr-generator" className="btn btn-primary">
                                View Product
                            </Link>
                            <Link to="/store" className="btn btn-ghost">
                                Visit Store <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                    <div className="featured-visual">
                        <div className="visual-icon">
                            <FaWindows />
                        </div>
                        <div className="visual-bg"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StorePreview;
