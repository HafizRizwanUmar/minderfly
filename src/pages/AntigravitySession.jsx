import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaMoneyBillWave, FaCode, FaCheckCircle, FaLaptopCode, FaServer, FaAd, FaChevronDown, FaChevronUp, FaUsers, FaClock, FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AntigravitySession.css';

// Countdown Timer Component
const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Set date to 7 days from now for demo purposes, or a fixed date
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 5);

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="countdown-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
        >
            <div className="time-box">
                <span className="time-value">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="time-label">Days</span>
            </div>
            <div className="time-box"><span className="time-value">:</span></div>
            <div className="time-box">
                <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="time-label">Hrs</span>
            </div>
            <div className="time-box"><span className="time-value">:</span></div>
            <div className="time-box">
                <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="time-label">Mins</span>
            </div>
            <div className="time-box"><span className="time-value">:</span></div>
            <div className="time-box">
                <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="time-label">Secs</span>
            </div>
        </motion.div>
    );
};

// FAQ Item Component
const FAQItem = ({ question, answer, isOpen, toggle }) => (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
        <div className="faq-question" onClick={toggle}>
            {question}
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {answer}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const AntigravitySession = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [openFAQ, setOpenFAQ] = useState(0);

    const faqData = [
        { q: "Do I need prior coding experience?", a: "Basic knowledge of HTML/CSS is helpful, but we start from the fundamentals of the Antigravity framework." },
        { q: "Is the hosting really free forever?", a: "Yes. We teach you how to use free-tier services from top providers like Vercel and Netlify that are sufficient for scaling up to thousands of users." },
        { q: "How do I get paid from ads?", a: "We guide you through setting up AdSense and alternative networks, ensuring you have the right policy pages and placement for approval." },
        { q: "Will the session be recorded?", a: "Yes, all registered attendees will receive a high-quality recording and the source code after the session." }
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="antigravity-session-page">
            <Helmet>
                <title>Antigravity Masterclass | Build, Publish, Earn</title>
                <meta name="description" content="Master the art of building, publishing, and monetizing web apps with Antigravity." />
            </Helmet>

            <Navbar />

            {/* Hero Section */}
            <section className="session-hero">
                <div className="spotlight"></div>
                <div className="aurora-bg"></div>

                <motion.div
                    className="session-hero-content"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div className="session-badge" variants={fadeInUp}>
                        <div className="pulsing-dot"></div>
                        <span>Live Masterclass Series</span>
                    </motion.div>

                    <motion.h1 className="session-title" variants={fadeInUp}>
                        Build. Publish. <br /><span className="gradient-text">Monetize.</span>
                    </motion.h1>

                    <motion.p className="session-subtitle" variants={fadeInUp}>
                        The ultimate guide to launching your own profitable web applications without spending a dime on infrastructure.
                    </motion.p>

                    <CountdownTimer />

                    <motion.div variants={fadeInUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <a href="#register" className="btn btn-primary">
                            Reserve Your Free Spot <FaRocket style={{ marginLeft: '10px' }} />
                        </a>

                        <div className="hero-stats">
                            <div className="stat-item"><FaUsers /> <span>500+ Registered</span></div>
                            <div className="stat-item"><FaClock /> <span>2.5 Hours</span></div>
                            <div className="stat-item"><FaCalendarAlt /> <span>Sunday, 8:00 PM</span></div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Curriculum - Bento Grid */}
            <section className="session-curriculum container">
                <motion.div
                    className="section-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>The <span className="highlight-accent">Blueprint</span></h2>
                    <p className="muted" style={{ maxWidth: '600px', marginTop: '1rem' }}>
                        We've condensed years of experience into a single, high-impact session.
                    </p>
                </motion.div>

                <div className="bento-grid">
                    {/* Item 1: The Build */}
                    <motion.div
                        className="bento-item large"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bento-content">
                            <div className="bento-icon-wrapper"><FaLaptopCode /></div>
                            <h3 className="bento-title">Full-Stack Engineering</h3>
                            <p className="bento-desc">
                                Master the Antigravity framework. We'll build a complete production-grade application live.
                                You'll learn state management, component architecture, and responsive design patterns that scale.
                            </p>
                        </div>
                        <FaCode className="bento-bg-icon" />
                    </motion.div>

                    {/* Item 2: Zero Cost Deployment */}
                    <motion.div
                        className="bento-item medium"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="bento-content">
                            <div className="bento-icon-wrapper"><FaServer /></div>
                            <h3 className="bento-title">Free Hosting</h3>
                            <p className="bento-desc">
                                Forget AWS bills. Learn the serverless architecture that allows you to host, scale, and secure your app for $0/month.
                            </p>
                        </div>
                        <FaCheckCircle className="bento-bg-icon" />
                    </motion.div>

                    {/* Item 3: Monetization */}
                    <motion.div
                        className="bento-item medium"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="bento-content">
                            <div className="bento-icon-wrapper"><FaAd /></div>
                            <h3 className="bento-title">Ad Revenue</h3>
                            <p className="bento-desc">
                                Strategic ad placement without ruining UX. We'll implement Google AdSense and show you how to optimize CPM.
                            </p>
                        </div>
                        <FaMoneyBillWave className="bento-bg-icon" />
                    </motion.div>

                    {/* Item 4: Ecosystem */}
                    <motion.div
                        className="bento-item large"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="bento-content">
                            <div className="bento-icon-wrapper"><FaRocket /></div>
                            <h3 className="bento-title">Launch Strategy</h3>
                            <p className="bento-desc">
                                Building is only half the battle. We'll share our "0 to 1000 users" marketing checklist
                                that leverages organic traffic, SEO best practices, and community launches.
                            </p>
                        </div>
                        <FaUsers className="bento-bg-icon" />
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="session-faq container">
                <motion.div
                    className="section-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2>Common <span className="highlight-accent">Questions</span></h2>
                </motion.div>

                <div className="faq-grid">
                    {faqData.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={item.q}
                            answer={item.a}
                            isOpen={openFAQ === index}
                            toggle={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                        />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="session-cta-section" id="register">
                <div className="container">
                    <motion.div
                        className="cta-box"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2>Your Journey Starts Here</h2>
                        <p className="muted" style={{ maxWidth: '600px', margin: '1.5rem auto' }}>
                            Stop watching others build the future. Join us and ship your first profitable product.
                        </p>

                        <a href="https://wa.me/923449233424?text=Hi%2C%20I%20want%20to%20register%20for%20the%20Antigravity%20Masterclass" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Claim Your Free Ticket
                        </a>
                        <p className="time-label" style={{ marginTop: '1rem' }}>Limited spots available</p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AntigravitySession;
