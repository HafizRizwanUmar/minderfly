import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import './Services.css';

const ArrowRight = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowLeft = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const services = [
    {
        id: '01',
        tag: 'UI/UX',
        title: 'Chrome Theme Building',
        description: 'Custom aesthetics and personalized browser experiences. We create themes that make your browser uniquely yours.',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1400',
        link: '/services/chrome-theme-development',
    },
    {
        id: '02',
        tag: 'Extension',
        title: 'Chrome Extension Building',
        description: 'Powerful tools to enhance browser productivity and functionality. From automation to deep integrations.',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1400',
        link: '/services/chrome-extension-development',
    },
    {
        id: '03',
        tag: 'Desktop',
        title: 'Flutter Desktop Apps',
        description: 'Cross-platform native performance for desktop environments. High-performance apps for Windows and Mac.',
        image: 'https://images.unsplash.com/photo-1628277613967-6abca504d0ac?auto=format&fit=crop&q=80&w=1400',
        link: '/services/mobile-app-development',
    },
    {
        id: '04',
        tag: 'Dev Tools',
        title: 'VS Code Extensions',
        description: 'Custom developer tools to boost your coding workflow. We build extensions that developers love.',
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1400',
        link: '/services/web-development',
    },
    {
        id: '05',
        tag: 'Web 2.0',
        title: 'MERN Stack Development',
        description: 'Full-stack web solutions for scalable modern businesses. Responsive, fast, and feature-rich applications.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1400',
        link: '/services/web-development',
    },
];

const Services = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const timerRef = useRef(null);

    const goTo = (index) => {
        if (index === activeIndex) return;
        setAnimating(true);
        setActiveIndex(index);
        setTimeout(() => setAnimating(false), 600);
    };

    const next = () => goTo((activeIndex + 1) % services.length);
    const prev = () => goTo((activeIndex - 1 + services.length) % services.length);

    // Auto-advance
    const startTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(next, 5000);
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [activeIndex]);

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [activeIndex]);

    const active = services[activeIndex];
    const progressPct = ((activeIndex + 1) / services.length) * 100;

    return (
        <section className="services-showcase-section" id="services">
            <div className="container">

                {/* Header */}
                <div className="services-intro">
                    <div>
                        <Reveal>
                            <div className="services-label">What We Do</div>
                            <h2 className="showcase-title">
                                Our <span>Services</span>
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={0.1}>
                        <p className="showcase-subtitle">
                            Choose the service you <span>want to explore</span>
                        </p>
                    </Reveal>
                </div>

                <div className="main-showcase-container">

                    {/* Progress bar */}
                    <div className="services-progress">
                        <div
                            className="services-progress-fill"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>

                    {/* Main card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            className="showcase-card"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            onMouseEnter={() => clearInterval(timerRef.current)}
                            onMouseLeave={startTimer}
                        >
                            {/* Background image */}
                            <div className="showcase-bg">
                                <motion.img
                                    key={active.image}
                                    src={active.image}
                                    alt={active.title}
                                    initial={{ scale: 1.08 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                />
                                <div className="showcase-overlay" />
                            </div>

                            {/* Content */}
                            <div className="showcase-content">
                                <div className={`content-inner${animating ? ' animating' : ''}`}>
                                    {/* Meta row */}
                                    <div className="service-meta">
                                        <span className="service-index">
                                            {active.id} / 0{services.length}
                                        </span>
                                        <span className="service-tag">{active.tag}</span>
                                    </div>

                                    <h3 className="service-name">{active.title}</h3>
                                    <p className="service-desc">{active.description}</p>

                                    <div className="card-footer">
                                        <Link to={active.link} className="service-detail-btn">
                                            View Details <ArrowRight />
                                        </Link>
                                        <div className="showcase-controls">
                                            <button
                                                onClick={prev}
                                                className="control-btn"
                                                aria-label="Previous service"
                                            >
                                                <ArrowLeft />
                                            </button>
                                            <button
                                                onClick={next}
                                                className="control-btn accent"
                                                aria-label="Next service"
                                            >
                                                <ArrowRight />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Thumbnail rail */}
                    <div className="thumbnail-track">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`thumbnail-item${activeIndex === index ? ' active' : ''}`}
                                onClick={() => goTo(index)}
                                role="button"
                                aria-label={`View ${service.title}`}
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && goTo(index)}
                            >
                                <div className="thumb-bg">
                                    <img src={service.image} alt={`${service.title} — ${service.tag} service`} loading="lazy" />
                                    <div className="thumb-overlay" />
                                </div>
                                <div className="thumb-content">
                                    <span className="thumb-title">{service.tag}</span>
                                    <span className="thumb-dot" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Services;