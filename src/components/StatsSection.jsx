import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { FaRocket, FaUsers, FaLightbulb } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import './StatsSection.css';

const StatsSection = () => {
    const categories = [
        "STRATEGY",
        "DEVELOPMENT",
        "MARKETING",
        "DESIGN"
    ];

    const stats = [
        {
            subtitle: "SUCCESS STORIES",
            title: "PROJECTS\nCOMPLETED",
            value: "150+",
            type: "blue",
            icon: <FaRocket />
        },
        {
            subtitle: "GLOBAL IMPACT",
            title: "HAPPY CLIENTS\nWORLDWIDE",
            value: "50+",
            type: "white",
            icon: <FaUsers />
        },
        {
            subtitle: "INNOVATION HUB",
            title: "YEARS OF\nEXPERIENCE",
            value: "5+",
            type: "yellow",
            icon: <FaLightbulb />
        }
    ];

    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-container">
                    {/* Left Side - Categories */}
                    <div className="stats-categories">
                        <Reveal>
                            <h2 className="stats-title">OUR IMPACT<br /><span>IN NUMBERS</span></h2>
                        </Reveal>
                        <div className="categories-list">
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
                    </div>

                    {/* Right Side - Cards */}
                    <div className="stats-cards-grid">
                        {stats.map((stat, index) => (
                            <Reveal key={index} delay={0.1 * (index + 1)} className={`folder-card ${stat.type}`}>
                                <div className="card-header">
                                    <span className="card-subtitle" dangerouslySetInnerHTML={{ __html: stat.subtitle.replace('\n', '<br/>') }}></span>
                                    <GoArrowUpRight className="card-icon-arrow" />
                                </div>
                                <div className="card-body">
                                    <h3 dangerouslySetInnerHTML={{ __html: stat.title.replace('\n', '<br/>') }}></h3>
                                    <div className="card-footer">
                                        <span className="big-number">{stat.value}</span>
                                        <div className="card-mini-icon">{stat.icon}</div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
