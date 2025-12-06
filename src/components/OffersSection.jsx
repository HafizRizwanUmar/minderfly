import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaMobileAlt, FaChrome, FaPalette, FaCheck, FaArrowRight } from 'react-icons/fa';
import './OffersSection.css';

const OffersSection = () => {
    const offers = [
        {
            id: 1,
            title: 'Professional Website',
            price: '$100',
            icon: <FaGlobe />,
            features: [
                '5 Page Responsive Website',
                'Modern & Clean Design',
                'Basic SEO Optimization',
                'Contact Form Integration',
                'Social Media Links',
                '1 Month Support'
            ],
            link: 'https://wa.me/923449233424?text=Hi%2C%20I%20am%20interested%20in%20the%20Professional%20Website%20offer%20for%20%24100.'
        },
        {
            id: 2,
            title: 'Mobile Application',
            price: '$100',
            icon: <FaMobileAlt />,
            features: [
                'Flutter App (iOS & Android)',
                'Up to 5 Screens',
                'API Integration',
                'Source Code Included',
                'Splash Screen & Icon',
                'App Store Submission Guide'
            ],
            link: 'https://wa.me/923449233424?text=Hi%2C%20I%20am%20interested%20in%20the%20Mobile%20Application%20offer%20for%20%24100.'
        },
        {
            id: 3,
            title: 'Chrome Extension',
            price: '$50',
            icon: <FaChrome />,
            features: [
                'Custom Popup & Options',
                'Background Scripts',
                'API Integration',
                'Modern UI/UX Design',
                'Source Code Included',
                'Web Store Publishing Guide'
            ],
            link: 'https://wa.me/923449233424?text=Hi%2C%20I%20am%20interested%20in%20the%20Chrome%20Extension%20offer%20for%20%2450.'
        },
        {
            id: 4,
            title: 'Chrome Theme',
            price: '$10',
            icon: <FaPalette />,
            features: [
                'Custom Color Palette',
                'HD Background Image',
                'Toolbar & Frame Styling',
                'Branded Design',
                'Lifetime Updates',
                'Instant Delivery'
            ],
            link: 'https://wa.me/923449233424?text=Hi%2C%20I%20am%20interested%20in%20the%20Chrome%20Theme%20offer%20for%20%2410.'
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
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="offers-section">
            <div className="offers-bg-glow"></div>
            <div className="container">
                <motion.div
                    className="offers-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Exclusive <span className="gradient-text">Offers</span></h2>
                    <p className="section-subtitle">Premium services at unbeatable prices. Limited time only.</p>
                </motion.div>

                <motion.div
                    className="offers-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {offers.map((offer) => (
                        <motion.div key={offer.id} className="offer-card" variants={itemVariants}>
                            <div className="offer-icon-wrapper">
                                {offer.icon}
                            </div>
                            <h3 className="offer-title">{offer.title}</h3>
                            <div className="offer-price">
                                {offer.price} <span>/ project</span>
                            </div>
                            <ul className="offer-features">
                                {offer.features.map((feature, index) => (
                                    <li key={index}>
                                        <FaCheck className="feature-icon" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <a href={offer.link} className="btn-offer">
                                Get Started <FaArrowRight />
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default OffersSection;
