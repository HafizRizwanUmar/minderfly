import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { FaArrowRight, FaRocket } from 'react-icons/fa';
import './Services.css';

const Services = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const services = [
        {
            id: '01',
            title: 'Chrome Theme Building',
            description: 'Custom aesthetics and personalized browser experiences. We create themes that make your browser uniquely yours.',
            image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
            link: '/services/chrome-theme-development',
            tag: 'UI/UX'
        },
        {
            id: '02',
            title: 'Chrome Extension Building',
            description: 'Powerful tools to enhance browser productivity and functionality. From automation to deep integrations.',
            image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200',
            link: '/services/chrome-extension-development',
            tag: 'Extension'
        },
        {
            id: '03',
            title: 'Flutter Desktop Apps',
            description: 'Cross-platform native performance for desktop environments. High-performance apps for Windows and Mac.',
            image: 'https://images.unsplash.com/photo-1628277613967-6abca504d0ac?auto=format&fit=crop&q=80&w=1200',
            link: '/services/mobile-app-development',
            tag: 'Desktop'
        },
        {
            id: '04',
            title: 'VS Code Extensions',
            description: 'Custom developer tools to boost your coding workflow. We build extensions that developers love.',
            image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200',
            link: '/services/web-development',
            tag: 'Tools'
        },
        {
            id: '05',
            title: 'MERN Stack Development',
            description: 'Full-stack web solutions for scalable modern businesses. Responsive, fast, and feature-rich applications.',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200',
            link: '/services/web-development',
            tag: 'Web 2.0'
        }
    ];

    const nextService = () => {
        setActiveIndex((prev) => (prev + 1) % services.length);
    };

    const prevService = () => {
        setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
    };

    return (
        <section className="services-showcase-section" id="services">
            <div className="container">
                <div className="services-intro">
                    <Reveal>
                        <h2 className="showcase-title">Our Services</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="showcase-subtitle">Choose the services you <span>want to explore</span></p>
                    </Reveal>
                </div>

                <div className="main-showcase-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            className="showcase-card"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <div className="showcase-bg">
                                <img src={services[activeIndex].image} alt={services[activeIndex].title} />
                                <div className="showcase-overlay"></div>
                            </div>

                            <div className="showcase-content">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="content-inner"
                                >
                                    <h3 className="service-tag">{services[activeIndex].tag}</h3>
                                    <p className="service-desc">{services[activeIndex].description}</p>

                                    <Link to={services[activeIndex].link} className="service-detail-btn">
                                        View Details <FaArrowRight />
                                    </Link>
                                </motion.div>

                                <div className="showcase-controls">
                                    <button onClick={prevService} className="control-btn" aria-label="Previous">
                                        <FaArrowRight className="rotate-180" />
                                    </button>
                                    <button onClick={nextService} className="control-btn accent" aria-label="Next">
                                        <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Thumbnail Navigation */}
                    <div className="thumbnail-track">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`thumbnail-item ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                <div className="thumb-bg">
                                    <img src={service.image} alt="" />
                                    <div className="thumb-overlay"></div>
                                </div>
                                <div className="thumb-content">
                                    <span className="thumb-icon"><FaRocket /></span>
                                    <span className="thumb-title">{service.tag}</span>
                                </div>
                                {activeIndex === index && (
                                    <motion.div
                                        layoutId="active-border"
                                        className="active-border"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
