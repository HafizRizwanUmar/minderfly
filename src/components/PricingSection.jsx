import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaRocket, FaBuilding, FaCheck } from 'react-icons/fa';
import './PricingSection.css';

const PricingSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(1); // Default hover on middle card

    const plans = [
        {
            title: "Personal",
            price: "20€",
            description: "All the basic features to boost your freelance career",
            icon: <FaBox />,
            features: [
                "+130 Code blocks.",
                "Best for Developers, Freelancers.",
                "Made with Bootstrap"
            ],
            recommended: false
        },
        {
            title: "Professional",
            price: "49€",
            description: "All the basic features to boost your freelance career",
            icon: <FaRocket />,
            features: [
                "+130 Code blocks.",
                "Best for Developers, Freelancers.",
                "Made with Bootstrap",
                "Made with Tailwind",
                "Premium Support",
                "Future updates"
            ],
            recommended: true
        },
        {
            title: "Business",
            price: "99€",
            description: "All the basic features to boost your freelance career",
            icon: <FaBuilding />,
            features: [
                "+130 Code blocks.",
                "Best for Developers, Freelancers.",
                "Made with Bootstrap",
                "Made with Tailwind",
                "Future updates"
            ],
            recommended: false
        }
    ];

    return (
        <section className="pricing-section">
            <div className="container">
                <motion.div
                    className="pricing-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Choose Your Plan</h2>
                    <p className="section-subtitle">Flexible pricing for everyone.</p>
                </motion.div>

                <div className="pricing-grid">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`pricing-card ${plan.recommended ? 'recommended' : ''} ${hoveredIndex === index ? 'active' : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                        >
                            {plan.recommended && (
                                <div className="recommended-badge">
                                    <span>• Recommended</span>
                                </div>
                            )}

                            <div className="card-icon-wrapper">
                                {plan.icon}
                            </div>

                            <h3 className="plan-title">{plan.title}</h3>

                            <div className="plan-price">
                                <span className="amount">{plan.price}</span>
                                <span className="period">/ month</span>
                            </div>

                            <p className="plan-description">{plan.description}</p>

                            <div className="divider"></div>

                            <div className="features-list">
                                <p className="features-title">Whats included:</p>
                                <ul>
                                    {plan.features.map((feature, i) => (
                                        <li key={i}>
                                            <span className="feature-text">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="btn btn-pricing">
                                Get started
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
