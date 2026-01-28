import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './ServicesHub.css';

const ServicesHub = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const services = [
        {
            id: '01',
            title: 'Web Development',
            description: 'Scalable, modern web applications built with the MERN stack or Next.js. We build performant solutions that grow with your business.',
            link: '/services/web-development',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: '02',
            title: 'Mobile App Development',
            description: 'Native-quality cross-platform applications using Flutter. Deploy to iOS and Android from a single codebase.',
            link: '/services/mobile-app-development',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: '03',
            title: 'Graphics Design',
            description: 'Stunning visual identities, UI/UX design, and branding assets that captivate your audience.',
            link: '/services/graphics-design',
            image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: '04',
            title: 'Chrome Extensions',
            description: 'Custom browser tools to automate workflows and enhance productivity for thousands of users.',
            link: '/services/chrome-extension-development',
            image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: '05',
            title: 'Chrome Themes',
            description: 'Personalized browser aesthetics. Stand out with a custom look for your team or personal brand.',
            link: '/services/chrome-theme-development',
            image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Minderfly Services - Web, Mobile, Graphics & Extension Dev</title>
                <meta name="description" content="Professional services for Web Development, Flutter Apps, Graphics Design, Chrome Extensions, and branded Chrome Themes." />
            </Helmet>

            <Navbar />

            <div className="services-hub-section">
                <div className="container">
                    <div className="services-hub-header">
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            We craft <br />
                            digital <em>excellence.</em>
                        </motion.h2>
                    </div>

                    <div className="services-list-container">
                        {services.map((service, index) => (
                            <Link
                                to={service.link}
                                key={service.id}
                                className="service-hub-item"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="service-hub-content">
                                    <div className="service-info">
                                        <span className="service-number">{service.id}</span>
                                        <div>
                                            <h3 className="service-title">{service.title}</h3>
                                            <p className="service-description">{service.description}</p>
                                        </div>
                                    </div>
                                    <div className="service-arrow">
                                        <FaArrowRight />
                                    </div>
                                </div>

                                {/* Floating Image Preview on Hover */}
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.div
                                            className="service-preview-image"
                                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <img src={service.image} alt={service.title} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ServicesHub;
