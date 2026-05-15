import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import './ProductPage.css';

/**
 * ProductPageTemplate — unified layout for all Minderfly store products.
 *
 * Props:
 *  product: {
 *    id, name, tagline, desc, longDesc,
 *    category, platforms: [{ label, sub, href, icon }],
 *    stats: [{ value, label }],
 *    features: [{ icon, title, desc }],
 *    accent, badge,
 *    schema (ld+json object),
 *    seo: { title, description, keywords, canonical },
 *  }
 */

const useReveal = (threshold = 0.08) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const rv = (visible, delay = 0) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'none' : 'translateY(24px)',
  transition: `opacity .65s ease ${delay}ms, transform .65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
});

export default function ProductPageTemplate({ product }) {
  const [heroRef,  heroV]  = useReveal(0.04);
  const [statsRef, statsV] = useReveal(0.15);
  const [featRef,  featV]  = useReveal(0.06);
  const [dlRef,    dlV]    = useReveal(0.08);
  const [ctaRef,   ctaV]   = useReveal(0.1);

  const ac = product.accent || '#b8d63a';
  const primary = product.platforms?.[0];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEOHead
        title={product.seo?.title}
        description={product.seo?.description}
        keywords={product.seo?.keywords}
        canonical={product.seo?.canonical}
        ogType="website"
        schema={product.schema ? [product.schema] : undefined}
      />

      <style>{`
        .pp-page { --pp-ac: ${ac}; --pp-ac-dim: ${ac}18; }
        .pp-btn-primary { background: ${ac}; }
        .pp-btn-primary:hover { filter: brightness(1.12); }
        .pp-cat-badge { color: ${ac}; border-color: ${ac}30; background: ${ac}12; }
        .pp-cat-badge__dot { background: ${ac}; }
        .pp-feat-icon { color: ${ac}; background: ${ac}14; border-color: ${ac}28; }
        .pp-stat__val { color: ${ac}; }
        .pp-platform-card:hover { border-color: ${ac}44; }
        .pp-platform-cta { color: ${ac}; }
        .pp-cta-banner { background: ${ac}; }
      `}</style>

      <Navbar />

      <div className="pp-page">

        {/* ─────────────────────── HERO ─────────────────────── */}
        <section className="pp-hero" aria-label={`${product.name} overview`}>
          <div className="pp-hero__bg" aria-hidden="true" />

          <div className="pp-container">
            {/* Breadcrumb */}
            <nav className="pp-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link to="/store">Store</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{product.name}</span>
            </nav>

            <div className="pp-hero__inner" ref={heroRef}>
              <div className="pp-hero__copy">
                {/* Badges */}
                <div className="pp-hero__badges">
                  <span className="pp-cat-badge">
                    <span className="pp-cat-badge__dot" aria-hidden="true" />
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="pp-new-badge">{product.badge}</span>
                  )}
                </div>

                <h1 className="pp-title" style={{ ...rv(heroV) }}>{product.name}</h1>
                <p className="pp-tagline" style={{ ...rv(heroV, 60) }}>{product.tagline}</p>
                <p className="pp-desc" style={{ ...rv(heroV, 100) }}>{product.desc}</p>

                {/* Platform download buttons */}
                <div className="pp-hero__platforms" style={{ ...rv(heroV, 140) }}>
                  {product.platforms?.map((p, i) => (
                    <a
                      key={i}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`pp-platform-btn${i === 0 ? ' pp-platform-btn--primary' : ''}`}
                    >
                      <span className="pp-platform-btn__icon" aria-hidden="true">{p.icon}</span>
                      <span className="pp-platform-btn__text">
                        <span className="pp-platform-btn__sub">{p.sub}</span>
                        <span className="pp-platform-btn__label">{p.label}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Hero visual / phone mockup or gradient card */}
              <div className="pp-hero__visual" aria-hidden="true">
                <div className="pp-hero__card">
                  <div className="pp-hero__card-glow" />
                  <div className="pp-hero__card-icon">
                    {product.heroIcon || (
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                      </svg>
                    )}
                  </div>
                  <div className="pp-hero__card-name">{product.name}</div>
                  <div className="pp-hero__card-cat">{product.category}</div>
                  {product.stats?.[0] && (
                    <div className="pp-hero__card-stat">
                      <span>{product.stats[0].value}</span>
                      <span>{product.stats[0].label}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────── STATS ────────────────────── */}
        {product.stats?.length > 0 && (
          <div className="pp-stats" ref={statsRef}>
            <div className="pp-container">
              <div className="pp-stats__grid">
                {product.stats.map((s, i) => (
                  <div key={s.label} className="pp-stat" style={{ ...rv(statsV, i * 70) }}>
                    <strong className="pp-stat__val">{s.value}</strong>
                    <span className="pp-stat__lbl">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────── FEATURES ──────────────────── */}
        {product.features?.length > 0 && (
          <section className="pp-features" ref={featRef} aria-label="Features">
            <div className="pp-container">
              <div className="pp-section-header" style={{ ...rv(featV) }}>
                <div className="pp-eyebrow">What it does</div>
                <h2 className="pp-section-title">
                  Everything you need.<br />
                  <span className="pp-section-title__muted">Nothing you don't.</span>
                </h2>
              </div>
              <div className="pp-features__grid">
                {product.features.map((f, i) => (
                  <article
                    key={f.title}
                    className="pp-feat-card"
                    style={{ ...rv(featV, i * 55) }}
                  >
                    <div className="pp-feat-icon" aria-hidden="true">{f.icon}</div>
                    <h3 className="pp-feat-title">{f.title}</h3>
                    <p className="pp-feat-desc">{f.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─────────────────── PLATFORMS ────────────────────── */}
        {product.platforms?.length > 1 && (
          <section className="pp-platforms-section" ref={dlRef} aria-label="Download platforms">
            <div className="pp-container">
              <div className="pp-section-header" style={{ ...rv(dlV) }}>
                <div className="pp-eyebrow">Available On</div>
                <h2 className="pp-section-title">
                  Your device.<br />
                  <span className="pp-section-title__muted">Your platform.</span>
                </h2>
              </div>
              <div className="pp-platform-grid">
                {product.platforms.map((p, i) => (
                  <a
                    key={i}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pp-platform-card"
                    style={{ ...rv(dlV, i * 80) }}
                  >
                    <div className="pp-platform-card__icon">{p.icon}</div>
                    <div className="pp-platform-card__sub">{p.sub}</div>
                    <h3 className="pp-platform-card__label">{p.label}</h3>
                    <span className="pp-platform-cta">Download Free →</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─────────────────── WHY MINDERFLY ────────────────── */}
        <section className="pp-why" aria-label="Why trust Minderfly">
          <div className="pp-container">
            <div className="pp-why__grid">
              {[
                { icon: '🔒', title: 'Privacy-first', desc: 'Your data stays on your device. No cloud sync, no account required, no data sold.' },
                { icon: '∞', title: 'Free to start, forever', desc: 'Every product has a genuinely useful free tier with no time limit or hidden paywall.' },
                { icon: '⚡', title: 'Actively maintained', desc: 'Built and supported by a real team. Updates ship regularly based on user feedback.' },
              ].map(item => (
                <div key={item.title} className="pp-why__card">
                  <div className="pp-why__icon" aria-hidden="true">{item.icon}</div>
                  <h3 className="pp-why__title">{item.title}</h3>
                  <p className="pp-why__desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────── CTA ──────────────────────── */}
        <section className="pp-cta-section" ref={ctaRef} aria-label="Get started">
          <div className="pp-container">
            <div className="pp-cta-banner" style={{ ...rv(ctaV) }}>
              <div className="pp-cta-banner__bg" aria-hidden="true" />
              <div className="pp-cta-banner__content">
                <div className="pp-cta-banner__eyebrow">Ready to get started?</div>
                <h2 className="pp-cta-banner__title">
                  {product.name} is free.<br />Always will be.
                </h2>
                <p className="pp-cta-banner__desc">
                  Download {product.name} now and get started in under 60 seconds.
                </p>
              </div>
              <div className="pp-cta-banner__actions">
                {primary && (
                  <a
                    href={primary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pp-cta-dl-btn"
                  >
                    📥 Download Free
                  </a>
                )}
                <Link to="/store" className="pp-cta-back-btn">
                  ← Back to Store
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}
