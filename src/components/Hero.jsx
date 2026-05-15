import MagneticButton from './MagneticButton';
import './Hero.css';

const Hero = ({ onStartProject }) => {
    const stats = [
        { value: '7K+',  label: 'Active Users' },
        { value: '50+',  label: 'Projects Built' },
        { value: '80+',  label: 'Countries Served' },
        { value: '2+',   label: 'Years Operating' },
    ];

    const services = [
        'MERN Stack', 'Flutter', 'Chrome Extensions',
        'VS Code Extensions', 'AI Automation', 'Graphics Design',
    ];

    return (
        <section className="hero" id="home" aria-label="Minderfly — Software Development Agency">

            {/* ── Subtle background grid ── */}
            <div className="hero__bg" aria-hidden="true">
                <div className="hero__grid" />
                <div className="hero__glow" />
            </div>

            {/* ── Main content ── */}
            <div className="hero__container">

                {/* Left column */}
                <div className="hero__left">

                    {/* Eyebrow */}
                    <div className="hero__eyebrow">
                        <span className="hero__eyebrow-dot" aria-hidden="true" />
                        <span>Software Development Agency — Lahore, Pakistan</span>
                    </div>

                    {/* H1 Headline — full text visible for SEO */}
                    <h1 className="hero__headline">
                        We Build<br />
                        <span className="hero__headline-accent">Digital Products</span><br />
                        That Scale.
                    </h1>

                    {/* Description */}
                    <p className="hero__desc">
                        Minderfly is a full-cycle software studio specialising in
                        <strong> MERN Stack</strong>, <strong>Flutter mobile apps</strong>,
                        and <strong>Chrome Extensions</strong>. We turn complex ideas into
                        high-performance software — delivered on time, every time.
                    </p>

                    {/* CTAs */}
                    <div className="hero__actions">
                        <MagneticButton
                            className="hero__btn hero__btn--primary"
                            onClick={onStartProject}
                            aria-label="Start a new project with Minderfly"
                        >
                            <span>Start a Project</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </MagneticButton>
                        <a href="/work" className="hero__btn hero__btn--ghost">
                            View Our Work
                        </a>
                    </div>

                    {/* Services pills */}
                    <div className="hero__services" aria-label="Services offered">
                        {services.map((s) => (
                            <span key={s} className="hero__pill">{s}</span>
                        ))}
                    </div>

                </div>

                {/* Right column */}
                <div className="hero__right" aria-label="Company statistics">

                    {/* Stats grid */}
                    <div className="hero__stats">
                        {stats.map(({ value, label }) => (
                            <div key={label} className="hero__stat">
                                <span className="hero__stat-value">{value}</span>
                                <span className="hero__stat-label">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Featured card */}
                    <div className="hero__card">
                        <div className="hero__card-header">
                            <span className="hero__card-badge">Currently Available</span>
                        </div>
                        <p className="hero__card-title">Ready to build your next product?</p>
                        <p className="hero__card-desc">
                            Free consultation &amp; estimate within 24 hours.
                            No commitment required.
                        </p>
                        <div className="hero__card-footer">
                            <span className="hero__card-contact">hello@minderfly.com</span>
                            <span className="hero__card-location">🇵🇰 Lahore · Worldwide</span>
                        </div>
                    </div>

                </div>

            </div>

            {/* ── Bottom divider with trust text ── */}
            <div className="hero__footer">
                <span className="hero__footer-label">Trusted by users from</span>
                <div className="hero__footer-regions">
                    <span className="hero__region">
                        <img src="https://flagcdn.com/24x18/us.png" width="20" height="15" alt="USA flag" loading="lazy" />
                        USA
                    </span>
                    <span className="hero__region">
                        <img src="https://flagcdn.com/24x18/gb.png" width="20" height="15" alt="UK flag" loading="lazy" />
                        UK
                    </span>
                    <span className="hero__region">
                        <img src="https://flagcdn.com/24x18/ae.png" width="20" height="15" alt="UAE flag" loading="lazy" />
                        UAE
                    </span>
                    <span className="hero__region">
                        <img src="https://flagcdn.com/24x18/sa.png" width="20" height="15" alt="Saudi Arabia flag" loading="lazy" />
                        Saudi Arabia
                    </span>
                    <span className="hero__region">
                        <img src="https://flagcdn.com/24x18/pk.png" width="20" height="15" alt="Pakistan flag" loading="lazy" />
                        Pakistan
                    </span>
                    <span className="hero__region hero__region--more">+ 75 more countries</span>
                </div>
            </div>

        </section>
    );
};

export default Hero;