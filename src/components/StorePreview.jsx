import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWindows, FaArrowRight, FaMobileAlt, FaStar, FaChevronLeft, FaChevronRight, FaDownload } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StorePreview.css';

// Import local assets from src/assets
import debtSettlerImg from '../assets/debtsettler_preview.svg';
import nishanImg from '../assets/nishan_preview.svg';
import flutterImg from '../assets/flutter_preview.png';

gsap.registerPlugin(ScrollTrigger);

const StorePreview = () => {
    const [activeIndex, setActiveIndex] = useState(1); // Start with middle product
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const actionsRef = useRef(null);

    const products = [
        {
            id: 'debt-settler',
            name: 'Debt Settler',
            tagline: 'Financial Harmony',
            description: 'The ultimate free application to manage shared expenses and settle debts with friends.',
            price: 'Free',
            icon: <FaMobileAlt />,
            link: '/store/debt-settler',
            color: '#8B5CF6',
            image: debtSettlerImg,
            rating: 4.9,
            downloads: '10k+'
        },
        {
            id: 'nishan-qr',
            name: 'Nishan QR',
            tagline: 'Professional Generator',
            description: 'Generate unlimited custom QR codes with a sleek, modern interface for Windows.',
            price: 'Free',
            icon: <FaWindows />,
            link: '/store/nishan-qr-generator',
            color: '#0078D7',
            image: nishanImg,
            rating: 4.8,
            downloads: '5k+'
        },
        {
            id: 'flutter-web-emulator',
            name: 'Flutter Emulator',
            tagline: 'Dev Productivity',
            description: 'Run, debug, and test Flutter Web apps directly inside VS Code.',
            price: 'Free',
            icon: <FaWindows />,
            link: '/store/flutter-web-emulator',
            color: '#007ACC',
            image: flutterImg,
            rating: 4.7,
            downloads: '2k+'
        }
    ];

    const nextProduct = () => {
        setActiveIndex((prev) => (prev + 1) % products.length);
    };

    const prevProduct = () => {
        setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    // Tilt Effect Logic
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;

            // Only tilt the active card
            const activeCard = cardsRef.current[activeIndex];
            if (!activeCard) return;

            const inner = activeCard.querySelector('.card-tilt-inner');
            if (!inner) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate percentage from center (-1 to 1)
            const xPos = (clientX / innerWidth - 0.5) * 2;
            const yPos = (clientY / innerHeight - 0.5) * 2;

            // Tilt intensity
            const intensity = 15;

            gsap.to(inner, {
                rotationY: xPos * intensity,
                rotationX: -yPos * intensity,
                ease: "power2.out",
                duration: 1
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [activeIndex]);

    // GSAP Layout Logic
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Header Animations
            const headerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });

            headerTl.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            )
                .fromTo(subtitleRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.6"
                )
                .fromTo(actionsRef.current,
                    { y: 20, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
                    "-=0.4"
                );

            // Card Animations based on activeIndex
            products.forEach((_, i) => {
                const card = cardsRef.current[i];
                if (!card) return;
                const inner = card.querySelector('.card-tilt-inner');

                let diff = i - activeIndex;
                if (diff === -2) diff = 1;
                if (diff === 2) diff = -1;

                // Animation State
                let state = {};

                // Reset tilt on non-active cards or when switching
                if (inner) {
                    if (diff !== 0) {
                        gsap.to(inner, { rotationY: 0, rotationX: 0, duration: 0.5 });
                    }
                }

                if (diff === 0) {
                    // Active Center
                    state = {
                        xPercent: -50,
                        scale: 1.1,
                        zIndex: 10,
                        opacity: 1,
                        filter: "blur(0px)",
                        rotationY: 0, // Reset carousel rotation, tilt handles inner
                        duration: 0.8,
                        ease: "power3.out"
                    };

                    // Reveal details
                    gsap.to(card.querySelector('.active-details'), {
                        height: 'auto',
                        opacity: 1,
                        duration: 0.6,
                        delay: 0.2,
                        ease: "power2.out"
                    });

                } else if (diff === -1) {
                    // Left Side
                    state = {
                        xPercent: -130, // Slightly less spacing for 3D look
                        scale: 0.85,
                        zIndex: 5,
                        opacity: 0.5,
                        filter: "blur(2px)",
                        rotationY: 25, // Rotate inwards
                        duration: 0.8,
                        ease: "power3.out"
                    };

                    gsap.to(card.querySelector('.active-details'), { height: 0, opacity: 0, duration: 0.4 });

                } else if (diff === 1) {
                    // Right Side
                    state = {
                        xPercent: 30, // Slightly less spacing
                        scale: 0.85,
                        zIndex: 5,
                        opacity: 0.5,
                        filter: "blur(2px)",
                        rotationY: -25, // Rotate inwards
                        duration: 0.8,
                        ease: "power3.out"
                    };

                    gsap.to(card.querySelector('.active-details'), { height: 0, opacity: 0, duration: 0.4 });

                } else {
                    // Hidden
                    state = {
                        scale: 0.5,
                        opacity: 0,
                        zIndex: 0,
                        filter: "blur(10px)",
                        rotationY: 0,
                        duration: 0.6
                    };
                }

                gsap.to(card, state);
            });

        }, containerRef);

        return () => ctx.revert();
    }, [activeIndex]);

    return (
        <section className="store-preview-section" id="products" ref={containerRef}>
            <div className="container">
                <div className="store-header">
                    <h2 className="store-title font-display" ref={titleRef}>
                        Discover the Digital <span className="highlight">Excellence</span> <br />
                        Experience with <span className="brand-name">Minderfly</span>
                    </h2>
                    <p className="store-subtitle" ref={subtitleRef}>
                        Our expert developers prepare amazing and trending tools for you to use online and priceless.
                    </p>

                    <div className="header-actions" ref={actionsRef}>
                        <Link to="/store" className="btn btn-primary btn-glow">
                            Get Started
                        </Link>
                        <button className="btn btn-icon-only">
                            <FaArrowRight />
                        </button>
                    </div>
                </div>

                <div className="carousel-container">
                    <button className="nav-btn prev" onClick={prevProduct}>
                        <FaChevronLeft />
                    </button>

                    <div className="carousel-track">
                        {products.map((product, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <div
                                    key={product.id}
                                    className={`carousel-card ${isActive ? 'active' : ''}`}
                                    ref={el => cardsRef.current[index] = el}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    {/* Tilt Wrapper */}
                                    <div className="card-tilt-inner">
                                        <div className="card-background">
                                            <img src={product.image} alt={product.name} className="product-image" />
                                            <div className="card-overlay" />

                                            {product.id === 'nishan-qr' && (
                                                <div className="brand-logo-overlay">
                                                    <FaWindows />
                                                </div>
                                            )}
                                        </div>

                                        <div className="card-content">
                                            <div className="card-header-row">
                                                <h3>{product.name}</h3>

                                                <div className="meta-badges">
                                                    <div className="meta-badge">
                                                        <FaStar className="star-icon" /> {product.rating}
                                                    </div>
                                                    <div className="meta-badge">
                                                        <FaDownload className="download-icon" /> {product.downloads}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="active-details">
                                                <p>{product.description}</p>
                                                <Link to={product.link} className="btn-view-details">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button className="nav-btn next" onClick={nextProduct}>
                        <FaChevronRight />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="carousel-dots">
                    {products.map((_, idx) => (
                        <button
                            key={idx}
                            className={`dot ${idx === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StorePreview;
