import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagneticButton from '../components/MagneticButton';
import './AffiliatePage.css';

const AffiliatePage = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Minderfly Affiliate Program",
        "description": "Join the Minderfly Affiliate Program and earn high commissions by referring clients for web and mobile development services.",
        "publisher": {
            "@type": "Organization",
            "name": "Minderfly",
            "logo": "https://minderfly.com/logo.png"
        }
    };

    const AFFILIATE_LINK = "https://rizwanumar.gumroad.com/affiliates";

    return (
        <>
            <SEOHead
                title="Affiliate Program | Earn with Minderfly Partner Program"
                description="Join Minderfly's affiliate program and earn up to 40% commission by referring clients for web development, mobile apps, and digital services. Start earning today!"
                keywords="affiliate program, earn money, minderfly partner, web development referral, mobile app affiliate, gumroad affiliates, passive income"
                canonical="https://minderfly.com/affiliates"
                schema={structuredData}
            />

            <div className="affiliate-page">
                <Navbar />

                <main>
                    {/* Hero Section */}
                    <section className="affiliate-hero">
                        <motion.div 
                            className="hero-content"
                            initial="initial"
                            animate="animate"
                            variants={stagger}
                        >
                            <motion.span variants={fadeInUp} className="affiliate-eyebrow">Partnership Opportunity</motion.span>
                            <motion.h1 variants={fadeInUp}>
                                <span>Earn with</span>
                                <span>Minderfly</span>
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="hero-description">
                                Join our global network of partners and earn significant commissions by connecting businesses with our world-class digital services.
                            </motion.p>
                            <motion.div variants={fadeInUp} className="hero-cta">
                                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" className="affiliate-btn">
                                    Become a Partner
                                </a>
                                <a href="#how-it-works" className="affiliate-btn outline">
                                    Learn More
                                </a>
                            </motion.div>
                        </motion.div>
                    </section>

                    {/* Features Section */}
                    <section className="affiliate-features">
                        <motion.div 
                            className="features-grid"
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeInUp} className="feature-card">
                                <span className="feature-icon">💰</span>
                                <h3>High Commissions</h3>
                                <p>Earn industry-leading commissions for every successful project referral. No earning caps.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="feature-card">
                                <span className="feature-icon">🌍</span>
                                <h3>Global Reach</h3>
                                <p>Refer clients from anywhere in the world. We serve businesses across all time zones and industries.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="feature-card">
                                <span className="feature-icon">⚡</span>
                                <h3>Quick Payouts</h3>
                                <p>Reliable and fast payouts via Gumroad's secure platform. Track your earnings in real-time.</p>
                            </motion.div>
                        </motion.div>
                    </section>

                    {/* How It Works Section */}
                    <section className="affiliate-process" id="how-it-works">
                        <div className="process-header">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                How it Works
                            </motion.h2>
                        </div>
                        <div className="process-steps">
                            <motion.div 
                                className="step"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="step-num">01</span>
                                <div className="step-content">
                                    <h4>Sign Up</h4>
                                    <p>Join our affiliate program on Gumroad in just a few clicks. It's completely free.</p>
                                </div>
                            </motion.div>
                            <motion.div 
                                className="step"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <span className="step-num">02</span>
                                <div className="step-content">
                                    <h4>Promote</h4>
                                    <p>Share your unique referral link with your network or on your platforms.</p>
                                </div>
                            </motion.div>
                            <motion.div 
                                className="step"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                            >
                                <span className="step-num">03</span>
                                <div className="step-content">
                                    <h4>Earn</h4>
                                    <p>Get paid for every client who starts a project with us through your link.</p>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Earnings Section */}
                    <section className="affiliate-earnings">
                        <motion.div 
                            className="earnings-container"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2>Commission Rate</h2>
                            <span className="commission">Up to 40%</span>
                            <p>We value our partners. That's why we offer one of the most competitive commission structures in the industry.</p>
                            <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" className="affiliate-btn">
                                Start Earning Today
                            </a>
                        </motion.div>
                    </section>

                    {/* Final CTA */}
                    <section className="affiliate-cta-footer">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Ready to grow with us?
                        </motion.h2>
                        <MagneticButton onClick={() => window.open(AFFILIATE_LINK, '_blank')}>
                            Join Program Now
                        </MagneticButton>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default AffiliatePage;
