import React from 'react';
import { motion } from 'framer-motion';
import { FaChrome, FaWindows, FaApple, FaGoogle } from 'react-icons/fa';
import './TrustBadges.css';

const TrustBadges = () => {
    return (
        <section className="trust-badges-section">
            <div className="container">
                <p className="trust-label">Trusted by innovative teams & available on</p>

                <div className="logos-ticker">
                    <div className="logos-track">
                        {/* First Set */}
                        <div className="logo-item">
                            <FaChrome /> <span>Chrome Web Store</span>
                        </div>
                        <div className="logo-item">
                            <FaWindows /> <span>Microsoft Store</span>
                        </div>
                        <div className="logo-item">
                            <FaGoogle /> <span>Google Play</span>
                        </div>
                        <div className="logo-item">
                            <FaApple /> <span>App Store</span>
                        </div>

                        {/* Duplicate Set for Infinite Scroll Effect if needed later, 
                            for now static flex layout is cleaner for small number of items */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
