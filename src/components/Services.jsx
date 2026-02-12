import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { FaArrowRight } from 'react-icons/fa';
import './Services.css';

const Services = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const services = [
        {
            id: '01',
            title: 'Chrome Theme Building',
            description: 'Custom aesthetics and personalized browser experiences.',
            image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600',
            link: '/services/chrome-theme-development'
        },
        {
            id: '02',
            title: 'Chrome Extension Building',
            description: 'Powerful tools to enhance browser productivity and functionality.',
            image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600',
            link: '/services/chrome-extension-development'
        },
        {
            id: '03',
            title: 'Flutter Desktop Apps',
            description: 'Cross-platform native performance for desktop environments.',
            image: 'https://images.unsplash.com/photo-1628277613967-6abca504d0ac?auto=format&fit=crop&q=80&w=600',
            link: '/services/mobile-app-development'
        },
        {
            id: '04',
            title: 'VS Code Extensions',
            description: 'Custom developer tools to boost your coding workflow.',
            image: '/vscode_preview.png',
            link: '/services/web-development'
        },
        {
            id: '05',
            title: 'MERN Stack Development',
            description: 'Full-stack web solutions for scalable modern businesses.',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600',
            link: '/services/web-development'
        }
    ];

    return (
        <section className="services-section-list" id="services">
            <div className="container">
                <div className="services-header-list">
                    <Reveal><h2>What we do <em>best.</em></h2></Reveal>
                </div>

                <div className="services-list-container">
                    {services.map((service, index) => (
                        <Link
                            to={service.link}
                            key={service.id}
                            className={`service-item ${hoveredIndex === index ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="service-info">
                                <span className="service-number">{service.id}</span>
                                <Reveal width="100%"><h3 className="service-title">{service.title}</h3></Reveal>
                            </div>

                            <div className="service-content-wrapper">
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.div
                                            className="service-preview-image"
                                            initial={{ opacity: 0, scale: 0.9, x: -20 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <img src={service.image} alt={service.title} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <Reveal delay={0.1}><p className="service-description">{service.description}</p></Reveal>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
