import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { FaUsers, FaProjectDiagram, FaStar, FaGlobe } from 'react-icons/fa';
import './StatsSection.css';

const StatsSection = () => {
    const stats = [
        {
            id: 1,
            label: "Active Users",
            value: "25k+",
            icon: <FaUsers />,
            color: "#00f2ea"
        },
        {
            id: 2,
            label: "Projects Delivered",
            value: "150+",
            icon: <FaProjectDiagram />,
            color: "#ff0050"
        },
        {
            id: 3,
            label: "Client Rating",
            value: "4.9/5",
            icon: <FaStar />,
            color: "#FFD700"
        },
        {
            id: 4,
            label: "Countries Served",
            value: "80+",
            icon: <FaGlobe />,
            color: "#00ff80"
        }
    ];

    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <Reveal
                            key={stat.id}
                            className="stat-card"
                            delay={index * 0.1}
                            width="100%"
                        >
                            <div className="stat-icon" style={{ color: stat.color }}>
                                {stat.icon}
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-value">{stat.value}</h3>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
