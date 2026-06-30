import { useEffect } from 'react';
import Lenis from 'lenis';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AffiliatePage.css';

const AFFILIATE_LINK = 'https://rizwanumar.gumroad.com/affiliates';

const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Minderfly Affiliate Program',
    description: 'Join the Minderfly Affiliate Program and earn up to 40% commission by referring clients for web and mobile development services.',
    publisher: { '@type': 'Organization', name: 'Minderfly', logo: 'https://www.minderfly.com/logo.png' }
};

const features = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
        ),
        title: 'Up to 40% Commission',
        desc: 'Earn industry-leading commissions for every successful project referral. No earnings cap — the more you refer, the more you make.'
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
        ),
        title: 'Global Reach',
        desc: 'Refer clients from anywhere in the world. We serve businesses across 80+ countries with no regional restrictions.'
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
        ),
        title: 'Fast, Reliable Payouts',
        desc: 'Get paid via Gumroad\'s secure platform. Track your earnings in real-time with full transparency — no hidden delays.'
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        ),
        title: 'Dedicated Support',
        desc: 'Get a partner dashboard, marketing materials, and direct access to our team whenever you need help closing a deal.'
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
        ),
        title: 'All Service Categories',
        desc: 'Earn on any referral — MERN Stack, Flutter, Chrome Extensions, AI Automation, and more. Any project qualifies.'
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
        ),
        title: 'Zero Upfront Cost',
        desc: 'Joining is completely free. No monthly fees, no approval waiting period. Sign up and share your link immediately.'
    },
];

const steps = [
    { num: '01', title: 'Sign Up Free', desc: 'Join our affiliate program on Gumroad in just a few clicks. No approval required, no fees.' },
    { num: '02', title: 'Share Your Link', desc: 'Promote Minderfly\'s services to your network, audience, or clients using your unique referral link.' },
    { num: '03', title: 'Earn Commission', desc: 'Get paid up to 40% for every client who starts a project with us through your referral.' },
];

const services = [
    { name: 'MERN Stack Development', range: 'High commission' },
    { name: 'Flutter Mobile Apps', range: 'High commission' },
    { name: 'Chrome Extensions', range: 'Standard commission' },
    { name: 'AI Automation', range: 'High commission' },
    { name: 'Graphics Design', range: 'Standard commission' },
    { name: 'VS Code Extensions', range: 'Standard commission' },
];

const AffiliatePage = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    return (
        <>
            <SEOHead
                title="Affiliate Program | Earn with Minderfly Partner Program"
                description="Join Minderfly's affiliate program and earn up to 40% commission by referring clients for web development, mobile apps, and digital services."
                keywords="affiliate program, earn money, minderfly partner, web development referral, mobile app affiliate, gumroad affiliates, passive income"
                canonical="https://www.minderfly.com/affiliates"
                schema={structuredData}
            />

            <div className="aff-page">
                <Navbar />

                <main>
                    {/* ── Hero ── */}
                    <section className="aff-hero">
                        <div className="aff-bg" aria-hidden="true">
                            <div className="aff-grid" />
                            <div className="aff-glow" />
                        </div>

                        <div className="aff-hero__inner">
                            <div className="aff-eyebrow">
                                <span className="aff-eyebrow__dot" aria-hidden="true" />
                                Partnership Program
                            </div>

                            <h1 className="aff-hero__title">
                                Earn by Referring<br />
                                <span className="aff-hero__accent">Great Software.</span>
                            </h1>

                            <p className="aff-hero__desc">
                                Join Minderfly's affiliate program and earn up to <strong>40% commission</strong> on every
                                successful project referral. Free to join. No cap on earnings.
                            </p>

                            <div className="aff-hero__actions">
                                <a
                                    href={AFFILIATE_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="aff-btn aff-btn--primary"
                                >
                                    Become a Partner
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                        <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                                <a href="#how-it-works" className="aff-btn aff-btn--ghost">How It Works</a>
                            </div>

                            {/* Stats strip */}
                            <div className="aff-hero__stats">
                                <div className="aff-stat">
                                    <span className="aff-stat__val">40%</span>
                                    <span className="aff-stat__lbl">Max Commission</span>
                                </div>
                                <div className="aff-stat-divider" aria-hidden="true" />
                                <div className="aff-stat">
                                    <span className="aff-stat__val">Free</span>
                                    <span className="aff-stat__lbl">To Join</span>
                                </div>
                                <div className="aff-stat-divider" aria-hidden="true" />
                                <div className="aff-stat">
                                    <span className="aff-stat__val">80+</span>
                                    <span className="aff-stat__lbl">Countries Served</span>
                                </div>
                                <div className="aff-stat-divider" aria-hidden="true" />
                                <div className="aff-stat">
                                    <span className="aff-stat__val">Real-time</span>
                                    <span className="aff-stat__lbl">Earnings Tracking</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── Features grid ── */}
                    <section className="aff-features">
                        <div className="aff-container">
                            <div className="aff-section-header">
                                <div className="aff-eyebrow">Why Partner With Us</div>
                                <h2 className="aff-section-title">Everything you need<br /><span className="aff-hero__accent">to earn confidently.</span></h2>
                            </div>

                            <div className="aff-features__grid">
                                {features.map((f) => (
                                    <div key={f.title} className="aff-feature-card">
                                        <div className="aff-feature-card__icon" aria-hidden="true">{f.icon}</div>
                                        <h3 className="aff-feature-card__title">{f.title}</h3>
                                        <p className="aff-feature-card__desc">{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── How it works ── */}
                    <section className="aff-process" id="how-it-works">
                        <div className="aff-container">
                            <div className="aff-section-header">
                                <div className="aff-eyebrow">Simple Process</div>
                                <h2 className="aff-section-title">How it works</h2>
                            </div>

                            <div className="aff-steps">
                                {steps.map((s, i) => (
                                    <div key={s.num} className="aff-step">
                                        <div className="aff-step__num" aria-hidden="true">{s.num}</div>
                                        <div className="aff-step__body">
                                            <h3 className="aff-step__title">{s.title}</h3>
                                            <p className="aff-step__desc">{s.desc}</p>
                                        </div>
                                        {i < steps.length - 1 && (
                                            <div className="aff-step__connector" aria-hidden="true" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── Services you can refer ── */}
                    <section className="aff-services">
                        <div className="aff-container">
                            <div className="aff-section-header">
                                <div className="aff-eyebrow">What You Can Refer</div>
                                <h2 className="aff-section-title">Every service earns.</h2>
                            </div>

                            <div className="aff-services__grid">
                                {services.map((s) => (
                                    <div key={s.name} className="aff-service-row">
                                        <span className="aff-service-row__name">{s.name}</span>
                                        <span className="aff-service-row__badge">{s.range}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="aff-services__note">
                                Commission percentages are agreed per project. Contact us after signing up to discuss specific rates.
                            </p>
                        </div>
                    </section>

                    {/* ── Commission CTA card ── */}
                    <section className="aff-commission">
                        <div className="aff-container">
                            <div className="aff-commission__card">
                                <div className="aff-commission__left">
                                    <div className="aff-eyebrow">Commission Rate</div>
                                    <div className="aff-commission__rate">Up to 40%</div>
                                    <p className="aff-commission__desc">
                                        One of the most competitive commission structures in the digital services industry.
                                        Refer a single mid-size project and earn significantly.
                                    </p>
                                </div>
                                <div className="aff-commission__right">
                                    <a
                                        href={AFFILIATE_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="aff-btn aff-btn--primary"
                                    >
                                        Start Earning Today
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                            <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                    <Link to="/contact" className="aff-btn aff-btn--ghost">Talk to Us First</Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── Final CTA ── */}
                    <section className="aff-final-cta">
                        <div className="aff-container">
                            <h2 className="aff-final-cta__title">Ready to grow with us?</h2>
                            <p className="aff-final-cta__desc">
                                Join our partner network today — it takes under 2 minutes and costs nothing.
                            </p>
                            <a
                                href={AFFILIATE_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="aff-btn aff-btn--primary aff-btn--lg"
                            >
                                Join Program Now
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default AffiliatePage;
