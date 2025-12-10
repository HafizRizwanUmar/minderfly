import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaMobileAlt, FaChrome, FaPalette, FaCheck, FaArrowRight } from 'react-icons/fa';
import './OffersSection.css';

const OffersSection = () => {
    const [hoveredId, setHoveredId] = useState(null);

    const offers = [
        {
            id: 1,
            title: 'Professional Website',
            price: '$100',
            description: 'Perfect for individuals and small businesses ready to go online.',
            icon: <FaGlobe />,
            features: [
                '5 Page Responsive Website',
                'Modern & Clean Design',
                'Basic SEO Optimization',
                'Contact Form Integration',
                'Social Media Links',
                '1 Month Support'
            ],
            link: 'https://wa.me/923449233424?text=Hi%2C%20I%20am%20interested%20in%20the%20Professional%20Website%20offer%20for%20%24100.',
            isPopular: false
        },
        {
            id: 2,
            title: 'Mobile Application',
            price: '$100',
            description: 'For startups looking to launch a native mobile experience.',
            icon: <FaMobileAlt />,
            features: [
                'Flutter App (iOS & Android)',
                'Up to 5 Screens',
                'API Integration',
                'Source Code Included',
                'Splash Screen & Icon',
                'App Store Submission Guide'
            ],
            link: 'https://wa.me/923449233424?text=Hi%2C%20I%20am%20interested%20in%20the%20Mobile%20Application%20offer%20for%20%24100.',
            isPopular: true
        },
        {
            id: 3,
            title: 'Chrome Extension',
            price: '$50',
            description: 'automate tasks and enhance your browser experience.',
            icon: <FaChrome />,
            features: [
                'Custom Popup & Options',
                'Background Scripts',
                'API Integration',
                'Modern UI/UX Design',
                'Source Code Included',
                'Web Store Publishing Guide'
            ],
            link: 'https://wa.me/923449233424?text=Hi%2C%20I%20am%20interested%20in%20the%20Chrome%20Extension%20offer%20for%20%2450.',
            isPopular: false
        },
        {
            id: 4,
            title: 'Chrome Theme',
            price: '$10',
            description: 'Personalize your browser with a custom branded theme.',
            icon: <FaPalette />,
            features: [
                'Custom Color Palette',
                'HD Background Image',
                'Toolbar & Frame Styling',
                'Branded Design',
                'Lifetime Updates',
                'Instant Delivery'
            ],
            link: 'https://wa.me/923449233424?text=Hi%2C%20I%20am%20interested%20in%20the%20Chrome%20Theme%20offer%20for%20%2410.',
            isPopular: false
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section className="offers-section">
            <div className="container">
                <motion.div
                    className="offers-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Executive <span className="gradient-text">Offers</span></h2>
                    <p className="section-subtitle">Premium solutions tailored to your needs.</p>
                </motion.div>

                <motion.div
                    className="offers-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {offers.map((offer) => (
                        <motion.div
                            key={offer.id}
                            className={`offer-card ${offer.isPopular ? 'popular' : ''}`}
                            variants={itemVariants}
                            onMouseEnter={() => setHoveredId(offer.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className="card-content">
                                <div className="card-header">
                                    <h3 className="offer-title">{offer.title}</h3>
                                    {offer.isPopular && <span className="popular-badge">Best Value</span>}
                                </div>
                                <div className="offer-price-wrapper">
                                    <span className="currency">$</span>
                                    <span className="amount">{offer.price.replace('$', '')}</span>
                                    <span className="period">/Project</span>
                                </div>
                                <p className="offer-description">{offer.description}</p>

                                <div className="divider"></div>

                                <ul className="offer-features">
                                    {offer.features.map((feature, index) => (
                                        <li key={index}>
                                            <div className="check-icon">
                                                <FaCheck />
                                            </div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a href={offer.link} className={`btn btn-offer ${offer.isPopular ? 'btn-primary' : 'btn-outline'}`}>
                                    Get Started
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default OffersSection;
