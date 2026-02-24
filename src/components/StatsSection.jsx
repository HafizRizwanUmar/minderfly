import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { FaAsterisk } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import './StatsSection.css';

const StatsSection = () => {
    const categories = [
        "DESIGN",
        "WEB DEVELOPMENT",
        "UI/UX"
    ];

    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-container">
                    {/* Left Side - Categories */}
                    <div className="stats-categories">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={index}
                                className="category-pill"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {cat}
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Side - Cards */}
                    <div className="stats-cards-grid">
                        {/* Card 1 - Blue */}
                        <Reveal delay={0.1} className="folder-card blue">
                            <div className="card-header">
                                <span className="card-subtitle">ALUMNI 21 PROGRAM</span>
                            </div>
                            <div className="card-body">
                                <h3>EMPLOYMENT<br />ASSISTANCE</h3>
                            </div>
                        </Reveal>

                        {/* Card 2 - White/Grey */}
                        <Reveal delay={0.2} className="folder-card white">
                            <div className="card-header">
                                <span className="card-subtitle">LEARNING PLATFORM<br />WALKTHROUGH</span>
                                <GoArrowUpRight className="card-icon-arrow" />
                            </div>
                            <div className="card-body centered-icon">
                                <FaAsterisk className="card-main-icon" />
                            </div>
                        </Reveal>

                        {/* Card 3 - Yellow */}
                        <Reveal delay={0.3} className="folder-card yellow">
                            <div className="card-header">
                                <span className="card-subtitle">LEARNING PLATFORM<br />WALKTHROUGH</span>
                                <GoArrowUpRight className="card-icon-arrow" />
                            </div>
                            <div className="card-body">
                                <h3 className="big-number">700</h3>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
