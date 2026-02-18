import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBox, FaRocket, FaBuilding, FaCheck, FaTimes, FaInfoCircle, FaGlobe, FaMobileAlt, FaPalette, FaPuzzlePiece, FaPaintBrush } from 'react-icons/fa';
import './PricingSection.css';

const categories = [
    { key: 'web', label: 'Web Development', icon: <FaGlobe /> },
    { key: 'mobile', label: 'Mobile Apps', icon: <FaMobileAlt /> },
    { key: 'themes', label: 'Themes & Digital Assets', icon: <FaPalette /> },
    { key: 'graphic', label: 'Graphic Design', icon: <FaPaintBrush /> },
    { key: 'extensions', label: 'Extensions', icon: <FaPuzzlePiece /> },
];

const allPlans = {
    web: [
        {
            title: "Starter",
            price: "Free",
            period: "",
            description: "Perfect for startups launching their first website. Get online fast with zero upfront cost.",
            icon: <FaBox />,
            badge: "🚀 Startup Offer",
            features: [
                { text: "Single-page responsive website", included: true },
                { text: "Mobile-friendly design", included: true },
                { text: "Contact form integration", included: true },
                { text: "Basic SEO setup (meta tags & sitemap)", included: true },
                { text: "Social media links integration", included: true },
                { text: "1 round of revisions", included: true },
                { text: "Deployment on free hosting (Vercel/Netlify)", included: true },
                { text: "Delivery in 5–7 business days", included: true },
                { text: "Custom domain setup (domain cost on you)", info: true },
                { text: "CMS / Admin panel", included: false },
                { text: "Priority support", included: false },
            ],
            recommended: false,
            buttonText: "Get Started Free",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20Web%20Starter%20(Free)%20plan."
        },
        {
            title: "Standard",
            price: "$39",
            period: "/ project",
            description: "A professional multi-page website with CMS, blog, and advanced SEO to grow your business.",
            icon: <FaRocket />,
            badge: null,
            features: [
                { text: "Up to 5-page responsive website", included: true },
                { text: "Premium UI/UX design", included: true },
                { text: "Mobile & tablet optimized", included: true },
                { text: "Contact form + email notifications", included: true },
                { text: "Blog / CMS integration", included: true },
                { text: "Advanced SEO (schema, Open Graph, analytics)", included: true },
                { text: "Social media integration", included: true },
                { text: "Google Maps integration", included: true },
                { text: "WhatsApp chat widget", included: true },
                { text: "3 rounds of revisions", included: true },
                { text: "Free hosting + custom domain setup", included: true },
                { text: "Delivery in 7–10 business days", included: true },
                { text: "Priority email support (48h response)", included: true },
            ],
            recommended: true,
            buttonText: "Choose Standard",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20Web%20Standard%20($39)%20plan."
        },
        {
            title: "Premium",
            price: "$99",
            period: "/ project",
            description: "Full-stack web solution with admin dashboard, payments, e-commerce, and dedicated support.",
            icon: <FaBuilding />,
            badge: "⭐ Best Value",
            features: [
                { text: "Unlimited pages & custom design", included: true },
                { text: "Advanced animations & interactions", included: true },
                { text: "Full MERN stack / Next.js development", included: true },
                { text: "Admin dashboard / CMS panel", included: true },
                { text: "User authentication & accounts", included: true },
                { text: "Payment gateway integration", included: true },
                { text: "E-commerce functionality", included: true },
                { text: "Full SEO + Google Analytics + Search Console", included: true },
                { text: "Performance optimization (Lighthouse 90+)", included: true },
                { text: "Blog system with categories & tags", included: true },
                { text: "Email marketing integration", included: true },
                { text: "Free hosting, domain + SSL setup", included: true },
                { text: "Unlimited revisions", included: true },
                { text: "Delivery in 10–14 business days", included: true },
                { text: "Dedicated support (24h response) for 30 days", included: true },
                { text: "Source code ownership", included: true },
            ],
            recommended: false,
            buttonText: "Go Premium",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20Web%20Premium%20($99)%20plan."
        }
    ],

    mobile: [
        {
            title: "Starter",
            price: "Free",
            period: "",
            description: "Launch your MVP mobile app for free. Ideal for startups validating their idea.",
            icon: <FaBox />,
            badge: "🚀 Startup Offer",
            features: [
                { text: "Single-screen Flutter app (Android)", included: true },
                { text: "Clean, modern UI design", included: true },
                { text: "Basic navigation & layout", included: true },
                { text: "App icon & splash screen", included: true },
                { text: "1 round of revisions", included: true },
                { text: "APK build ready for testing", included: true },
                { text: "Delivery in 5–7 business days", included: true },
                { text: "Play Store publishing (developer account cost on you)", info: true },
                { text: "Backend / API integration", included: false },
                { text: "Push notifications", included: false },
                { text: "Priority support", included: false },
            ],
            recommended: false,
            buttonText: "Get Started Free",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20Mobile%20Starter%20(Free)%20plan."
        },
        {
            title: "Standard",
            price: "$39",
            period: "/ project",
            description: "A polished multi-screen mobile app with backend integration and Play Store publishing.",
            icon: <FaRocket />,
            badge: null,
            features: [
                { text: "Up to 5 screens (Flutter – Android & iOS)", included: true },
                { text: "Premium UI/UX with animations", included: true },
                { text: "REST API / Firebase integration", included: true },
                { text: "User authentication (login/signup)", included: true },
                { text: "Push notifications setup", included: true },
                { text: "App icon, splash screen & branding", included: true },
                { text: "Local storage & caching", included: true },
                { text: "3 rounds of revisions", included: true },
                { text: "Play Store / App Store publishing", included: true },
                { text: "Delivery in 10–14 business days", included: true },
                { text: "Priority email support (48h response)", included: true },
            ],
            recommended: true,
            buttonText: "Choose Standard",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20Mobile%20Standard%20($39)%20plan."
        },
        {
            title: "Premium",
            price: "$99",
            period: "/ project",
            description: "Full-featured mobile app with payments, real-time data, admin panel, and dedicated support.",
            icon: <FaBuilding />,
            badge: "⭐ Best Value",
            features: [
                { text: "Unlimited screens & custom design", included: true },
                { text: "Advanced animations & custom widgets", included: true },
                { text: "Full backend (Node.js / Firebase)", included: true },
                { text: "Admin dashboard (web-based)", included: true },
                { text: "In-app purchases / payment integration", included: true },
                { text: "Real-time chat or notifications", included: true },
                { text: "Social login (Google, Apple, Facebook)", included: true },
                { text: "Offline mode with sync", included: true },
                { text: "Analytics & crash reporting setup", included: true },
                { text: "Play Store + App Store publishing", included: true },
                { text: "Unlimited revisions", included: true },
                { text: "Delivery in 14–21 business days", included: true },
                { text: "Dedicated support (24h response) for 30 days", included: true },
                { text: "Full source code ownership", included: true },
            ],
            recommended: false,
            buttonText: "Go Premium",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20Mobile%20Premium%20($99)%20plan."
        }
    ],

    themes: [
        {
            title: "Starter",
            price: "Free",
            period: "",
            description: "Free digital assets for startups. Get a custom Chrome theme or social media kit to kickstart your brand.",
            icon: <FaPalette />,
            badge: "🎨 Free for Startups",
            features: [
                { text: "1 custom Chrome browser theme", included: true },
                { text: "Color palette & brand mood board", included: true },
                { text: "Social media profile kit (3 platforms)", included: true },
                { text: "Favicon & app icon set", included: true },
                { text: "Brand color guide document", included: true },
                { text: "1 round of revisions", included: true },
                { text: "All source files included", included: true },
                { text: "Delivery in 3–5 business days", included: true },
                { text: "Commercial license included", included: true },
            ],
            recommended: false,
            buttonText: "Get Free Assets",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20free%20Themes%20%26%20Digital%20Assets%20startup%20offer."
        }
    ],

    graphic: [
        {
            title: "Basic",
            price: "$15",
            period: "/ project",
            description: "Essential branding starter for small businesses and individuals on a budget.",
            icon: <FaBox />,
            badge: null,
            features: [
                { text: "Logo design (2 concepts + final)", included: true },
                { text: "Business card design", included: true },
                { text: "Social media templates (2 platforms)", included: true },
                { text: "Basic color palette selection", included: true },
                { text: "Source files (PNG, PDF)", included: true },
                { text: "1 round of revisions", included: true },
                { text: "Delivery in 3–5 business days", included: true },
                { text: "Full brand identity", included: false },
                { text: "Marketing materials", included: false },
            ],
            recommended: false,
            buttonText: "Get Basic",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20Graphic%20Design%20Basic%20($15)%20plan."
        },
        {
            title: "Standard",
            price: "$39",
            period: "/ project",
            description: "Professional graphic design package for businesses that need polished visuals and branding.",
            icon: <FaRocket />,
            badge: null,
            features: [
                { text: "Logo design (3 concepts + final)", included: true },
                { text: "Business card design", included: true },
                { text: "Social media kit (5 templates)", included: true },
                { text: "Brand style guide (colors, fonts, usage)", included: true },
                { text: "Letterhead & email signature", included: true },
                { text: "Flyer / poster design (1 piece)", included: true },
                { text: "3 rounds of revisions", included: true },
                { text: "Source files (AI, PSD, PDF, PNG)", included: true },
                { text: "Delivery in 5–7 business days", included: true },
                { text: "Priority email support", included: true },
            ],
            recommended: true,
            buttonText: "Choose Standard",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20Graphic%20Design%20Standard%20($39)%20plan."
        },
        {
            title: "Premium",
            price: "$99",
            period: "/ project",
            description: "Complete brand identity and marketing materials suite for serious businesses.",
            icon: <FaBuilding />,
            badge: "⭐ Best Value",
            features: [
                { text: "Logo design (5 concepts + final)", included: true },
                { text: "Full brand identity system", included: true },
                { text: "Business card + letterhead + envelope", included: true },
                { text: "Social media kit (10+ templates)", included: true },
                { text: "Pitch deck / presentation design", included: true },
                { text: "Marketing materials (brochure, banner, flyer)", included: true },
                { text: "Product packaging design", included: true },
                { text: "Brand guidelines document (comprehensive)", included: true },
                { text: "Animated logo version", included: true },
                { text: "Unlimited revisions", included: true },
                { text: "All source files + commercial license", included: true },
                { text: "Delivery in 7–10 business days", included: true },
                { text: "Dedicated support for 14 days", included: true },
            ],
            recommended: false,
            buttonText: "Go Premium",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20Graphic%20Design%20Premium%20($99)%20plan."
        }
    ],

    extensions: [
        {
            title: "Basic",
            price: "$15",
            period: "/ project",
            description: "A simple, focused extension to get your idea live on the Chrome Web Store or VS Marketplace.",
            icon: <FaBox />,
            badge: null,
            features: [
                { text: "Chrome or VS Code extension (basic)", included: true },
                { text: "Single core feature", included: true },
                { text: "Simple popup UI", included: true },
                { text: "Extension icon & branding", included: true },
                { text: "Manifest V3 compliant (Chrome)", included: true },
                { text: "1 round of revisions", included: true },
                { text: "Store publishing assistance", included: true },
                { text: "Delivery in 3–5 business days", included: true },
                { text: "API integration", included: false },
                { text: "Settings panel", included: false },
            ],
            recommended: false,
            buttonText: "Get Basic",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20Extension%20Basic%20($15)%20plan."
        },
        {
            title: "Standard",
            price: "$39",
            period: "/ project",
            description: "A functional Chrome or VS Code extension to solve a specific problem or boost productivity.",
            icon: <FaRocket />,
            badge: null,
            features: [
                { text: "Chrome or VS Code extension", included: true },
                { text: "Core feature implementation", included: true },
                { text: "Clean, intuitive popup/sidebar UI", included: true },
                { text: "Local storage for user preferences", included: true },
                { text: "Manifest V3 compliant (Chrome)", included: true },
                { text: "Extension icons & branding", included: true },
                { text: "3 rounds of revisions", included: true },
                { text: "Chrome Web Store / VS Marketplace publishing", included: true },
                { text: "Delivery in 5–7 business days", included: true },
                { text: "Priority email support", included: true },
            ],
            recommended: true,
            buttonText: "Choose Standard",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20Extension%20Standard%20($39)%20plan."
        },
        {
            title: "Premium",
            price: "$99",
            period: "/ project",
            description: "A full-featured extension with API integration, premium UI, and monetization-ready.",
            icon: <FaBuilding />,
            badge: "⭐ Best Value",
            features: [
                { text: "Chrome or VS Code extension (advanced)", included: true },
                { text: "Multiple features & settings panel", included: true },
                { text: "API / backend integration", included: true },
                { text: "User authentication & sync", included: true },
                { text: "Premium UI with dark/light themes", included: true },
                { text: "Content script injection (Chrome)", included: true },
                { text: "Context menu integrations", included: true },
                { text: "Keyboard shortcuts support", included: true },
                { text: "Monetization setup (freemium/paid)", included: true },
                { text: "Store listing with screenshots & description", included: true },
                { text: "Unlimited revisions", included: true },
                { text: "Delivery in 7–10 business days", included: true },
                { text: "Dedicated support for 14 days", included: true },
                { text: "Full source code ownership", included: true },
            ],
            recommended: false,
            buttonText: "Go Premium",
            buttonLink: "https://wa.me/923194765320?text=Hi!%20I'm%20interested%20in%20the%20Extension%20Premium%20($99)%20plan."
        }
    ]
};

const PricingSection = ({ onOrder }) => {
    const [activeCategory, setActiveCategory] = useState('web');
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const plans = allPlans[activeCategory] || [];
    const currentCategoryLabel = categories.find(cat => cat.key === activeCategory)?.label;

    // Auto-select recommended plan on category switch
    const recommendedIdx = plans.findIndex(p => p.recommended);

    return (
        <section className="pricing-section" id="pricing">
            <div className="container">
                <motion.div
                    className="pricing-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Choose Your Plan</h2>
                    <p className="section-subtitle">Transparent pricing for every service. No hidden fees.</p>
                </motion.div>

                {/* Category Tabs */}
                <div className="pricing-tabs">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            className={`pricing-tab ${activeCategory === cat.key ? 'active' : ''}`}
                            onClick={() => { setActiveCategory(cat.key); setHoveredIndex(null); }}
                        >
                            <span className="tab-icon">{cat.icon}</span>
                            <span className="tab-label">{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* Plans Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        className={`pricing-grid ${plans.length === 1 ? 'single-plan' : plans.length === 2 ? 'two-plans' : ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {plans.map((plan, index) => (
                            <motion.div
                                key={index}
                                className={`pricing-card ${plan.recommended ? 'recommended' : ''} ${(hoveredIndex ?? recommendedIdx) === index ? 'active' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {plan.recommended && (
                                    <div className="recommended-badge">
                                        <span>🔥 Most Popular</span>
                                    </div>
                                )}

                                {plan.badge && !plan.recommended && (
                                    <div className="plan-badge">
                                        <span>{plan.badge}</span>
                                    </div>
                                )}

                                <div className="card-icon-wrapper">
                                    {plan.icon}
                                </div>

                                <h3 className="plan-title">{plan.title}</h3>

                                <div className="plan-price">
                                    <span className="amount">{plan.price}</span>
                                    {plan.period && <span className="period">{plan.period}</span>}
                                </div>

                                <p className="plan-description">{plan.description}</p>

                                <div className="divider"></div>

                                <div className="features-list">
                                    <p className="features-title">What's included:</p>
                                    <ul>
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className={feature.included === false ? 'not-included' : feature.info ? 'info-item' : ''}>
                                                <span className="feature-icon">
                                                    {feature.included === false ? (
                                                        <FaTimes className="icon-cross" />
                                                    ) : feature.info ? (
                                                        <FaInfoCircle className="icon-info" />
                                                    ) : (
                                                        <FaCheck className="icon-check" />
                                                    )}
                                                </span>
                                                <span className="feature-text">{feature.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => onOrder && onOrder(`${currentCategoryLabel} - ${plan.title} Plan`)}
                                    className="btn btn-pricing"
                                >
                                    {plan.buttonText}
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default PricingSection;
