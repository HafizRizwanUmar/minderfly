import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheck, FaWindows } from 'react-icons/fa';
import './NishanProduct.css';

const ACCENT = '#06b6d4';

const useReveal = (t = 0.1) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
};

const rv = (v, d = 0) => ({
  opacity: v ? 1 : 0,
  transform: v ? 'none' : 'translateY(22px)',
  transition: `opacity .7s ease ${d}ms, transform .7s cubic-bezier(.22,1,.36,1) ${d}ms`,
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Flutter Web Emulator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'VS Code (Windows, macOS, Linux)',
  description: 'Flutter Web Emulator is a free VS Code extension that lets Flutter developers run, debug, and test Flutter Web apps directly inside VS Code — eliminating context switching to the browser.',
  url: 'https://minderfly.com/store/flutter-web-emulator',
  downloadUrl: 'https://marketplace.visualstudio.com/items?itemName=HafizRizwanUmar.flutter-web-emulator',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', reviewCount: '94' },
  author: { '@type': 'Organization', name: 'Minderfly', url: 'https://minderfly.com' },
};

const FEATURES = [
  { icon: '⧉', title: 'Run Inside VS Code',    desc: 'An embedded browser panel renders your Flutter Web app right next to your editor. No Alt-Tab, no context switching, no lost focus.' },
  { icon: '◱', title: 'Device Simulation',     desc: 'Test on iPhone, iPad, Pixel, and custom dimensions without leaving the editor. Catch responsive breakpoint issues during development.' },
  { icon: '⚡', title: 'Hot Reload Ready',      desc: 'Works seamlessly with Flutter\'s stateful Hot Reload. Save a file and the emulator updates instantly — the loop is instant.' },
  { icon: '◇', title: 'Zero Configuration',    desc: 'Launch the emulator in under 30 seconds. No config file, no settings to tune. Run your app, open the panel, enter the port. Done.' },
  { icon: '≡', title: 'Side-by-Side Layout',   desc: 'Dock the panel to the right split pane for a code-left, app-right layout. Every UI change is visible without moving your mouse.' },
  { icon: '∞', title: 'Unlimited, Free',        desc: 'No usage caps, no paywalled features. The extension is free, open-source, and will remain that way.' },
];

const FlutterWebEmulator = () => {
  const [heroRef, heroV] = useReveal(0.05);
  const [featRef, featV] = useReveal(0.08);
  const [dlRef,   dlV]   = useReveal(0.1);

  return (
    <>


      {/* ── Navbar ── */}
      <nav className="nishan-nav">
        <div className="nishan-container nav-container">
          <Link to="/store" className="nishan-back-link">← Back to Store</Link>
          <div className="nishan-logo">
            Flutter <span style={{ color: ACCENT }}>Web Emulator</span>
          </div>
          <a
            href="https://marketplace.visualstudio.com/items?itemName=HafizRizwanUmar.flutter-web-emulator"
            target="_blank" rel="noopener noreferrer"
            className="btn-nishan-sm"
            style={{ '--hover-bg': ACCENT }}
          >
            ↓ Install Extension
          </a>
        </div>
      </nav>

      <div className="nishan-page">

        {/* ── HERO ── */}
        <section className="nishan-hero" aria-label="Flutter Web Emulator hero">
          <div className="nishan-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <motion.div
              className="nishan-hero-content"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }}
            >
              {/* breadcrumb */}
              <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'rgba(255,255,255,.3)', marginBottom: '1.5rem' }}>
                <Link to="/" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Home</Link><span>›</span>
                <Link to="/store" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Store</Link><span>›</span>
                <span aria-current="page" style={{ color: 'rgba(255,255,255,.55)' }}>Flutter Web Emulator</span>
              </nav>

              <span className="nishan-badge" style={{ background: `rgba(6,182,212,.1)`, borderColor: `rgba(6,182,212,.25)`, color: ACCENT }}>
                VS Code Extension · Free · Open Source
              </span>

              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem,4vw,3.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.035em', color: '#fff', marginBottom: '1rem' }}>
                Flutter <span style={{ color: ACCENT }}>Web Emulator</span>
              </h1>

              <p className="nishan-subtitle">
                The missing piece for Flutter Web development. Run, debug, and test your app inside VS Code — without ever switching to a browser tab.
              </p>

              <div className="nishan-cta-group">
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=HafizRizwanUmar.flutter-web-emulator"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-nishan-primary"
                  style={{ background: ACCENT, color: '#000' }}
                >
                  ↓ Install on VS Code Marketplace
                </a>
                <span className="nishan-price-info">Free · Open Source</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,.3)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ color: '#fbbf24' }}>★ 4.7</span> · 94 reviews
                </span>
                <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,.1)', display: 'block' }}/>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,.3)' }}>2,000+ installs</span>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              className="nishan-hero-visual"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22,1,0.36,1] }}
            >
              <div style={{ position: 'relative', width: '100%', maxWidth: 440 }}>
                <div aria-hidden="true" style={{ position: 'absolute', inset: -20, background: `radial-gradient(ellipse at center, rgba(6,182,212,.1) 0%, transparent 65%)`, borderRadius: '50%', pointerEvents: 'none' }}/>
                {/* VS Code split pane mockup */}
                <div className="app-mockup" style={{ maxWidth: '100%' }}>
                  <div className="app-window-bar">
                    <div className="window-dots">
                      <span/><span/><span/>
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,.3)', fontFamily: 'monospace', marginLeft: 'auto', marginRight: 'auto' }}>VS Code</span>
                  </div>
                  {/* Split pane */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 320, background: '#1e1e1e' }}>
                    {/* Code side */}
                    <div style={{ borderRight: '1px solid rgba(255,255,255,.08)', padding: '14px 10px', fontSize: '0.62rem', fontFamily: 'monospace', color: 'rgba(255,255,255,.35)', lineHeight: 1.7, overflow: 'hidden' }}>
                      {['class _HomeState extends State<Home> {',
                        '  @override',
                        '  Widget build(BuildContext context) {',
                        '    return Scaffold(',
                        '      appBar: AppBar(',
                        "        title: Text('My App'),",
                        '      ),',
                        '      body: Center(',
                        "        child: Text('Hello!'),",
                        '      ),',
                        '    );',
                        '  }',
                        '}',
                      ].map((line, i) => (
                        <div key={i} style={{ color: i === 5 ? ACCENT : i === 8 ? '#c8f23a' : 'rgba(255,255,255,.3)' }}>{line}</div>
                      ))}
                    </div>
                    {/* Emulator side */}
                    <div style={{ background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 28, background: '#f3f3f3', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 8 }}>
                        <div style={{ width: 60, height: 14, borderRadius: 3, background: '#ddd' }}/>
                        <div style={{ width: 40, height: 14, borderRadius: 3, background: '#e8e8e8' }}/>
                      </div>
                      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%', background: '#fff' }}>
                        <div style={{ width: '80%', height: 40, background: '#e3f2fd', borderRadius: 8, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ fontSize: '0.7rem', color: '#1565c0', fontWeight: 600 }}>My App</div>
                        </div>
                        <div style={{ fontSize: '1rem', color: '#333', fontWeight: 500 }}>Hello!</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="nishan-features" ref={featRef} aria-label="Extension features">
          <div className="nishan-container">
            <div className="features-header" style={{ ...rv(featV) }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }}/>
                Why Developers Use It
              </div>
              <h2 style={{ color: '#fff' }}>Built to eliminate friction.</h2>
              <p>Every feature targets a specific pain point in the Flutter Web development loop.</p>
            </div>
            <div className="features-grid">
              {FEATURES.map((f, i) => (
                <div key={f.title} className="feature-box" style={{ ...rv(featV, i * 60) }}>
                  <span className="f-icon" style={{ color: ACCENT }}>{f.icon}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SETUP STEPS ── */}
        <section style={{ padding: '80px 0', background: 'rgba(255,255,255,.015)', borderTop: '1px solid rgba(255,255,255,.07)' }} aria-label="How to install">
          <div className="nishan-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
              <div ref={dlRef} style={rv(dlV)}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                  <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }}/>
                  Setup in 30 Seconds
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff', marginBottom: '1.25rem' }}>
                  Three steps.<br/><span style={{ color: 'rgba(255,255,255,.28)' }}>Then just build.</span>
                </h2>
                <p style={{ fontSize: '0.95rem', fontWeight: 300, color: 'rgba(255,255,255,.42)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  No configuration files, no settings panels, no documentation to read. Install, launch, develop.
                </p>
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=HafizRizwanUmar.flutter-web-emulator"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-nishan-primary"
                  style={{ background: ACCENT, color: '#000' }}
                >
                  ↓ Install Free on VS Code Marketplace
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { step: '01', title: 'Install the Extension', body: 'Search "Flutter Web Emulator" in the VS Code Extensions panel and install the extension by Hafiz Rizwan Umar.' },
                  { step: '02', title: 'Start Your Flutter App', body: 'Run your app on web-server as usual: flutter run -d web-server --web-port 8080' },
                  { step: '03', title: 'Open the Emulator', body: 'Open the Command Palette (Ctrl+Shift+P), type "Flutter Web Emulator: Launch", and enter your localhost URL.' },
                ].map((s, i) => (
                  <div key={s.step} style={{ ...rv(dlV, i * 80), display: 'flex', gap: 18, alignItems: 'flex-start', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: '22px 24px' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: `rgba(6,182,212,.1)`, border: `1px solid rgba(6,182,212,.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 700, color: ACCENT, flexShrink: 0 }}>
                      {s.step}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>{s.title}</h3>
                      <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'rgba(255,255,255,.42)', lineHeight: 1.65, margin: 0 }}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className="nishan-pricing" id="download" aria-label="Download Flutter Web Emulator">
          <div className="nishan-container">
            <div className="pricing-card-wrapper">
              <div className="pricing-card">
                <h2>Free for Everyone</h2>
                <p>Open source. No restrictions.</p>
                <div className="plans-container">
                  <div className="plan pro-plan" style={{ borderColor: `rgba(6,182,212,.25)`, background: `rgba(6,182,212,.04)` }}>
                    <div className="popular-tag" style={{ background: ACCENT, color: '#000' }}>Recommended</div>
                    <h3>VS Code Extension</h3>
                    <div className="price" style={{ color: ACCENT }}>Free</div>
                    <ul className="plan-features">
                      {['Unlimited usage', 'Device simulation (iPhone, iPad, Pixel)', 'Works with Hot Reload', 'Side-by-side layout support', 'Regular updates'].map(f => (
                        <li key={f}><FaCheck style={{ color: ACCENT }} /> {f}</li>
                      ))}
                    </ul>
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=HafizRizwanUmar.flutter-web-emulator"
                      target="_blank" rel="noopener noreferrer"
                      className="btn-nishan-buy"
                      style={{ background: ACCENT, color: '#000' }}
                    >
                      Install Now — VS Code Marketplace
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="nishan-footer" aria-label="Footer">
          <div className="nishan-container">
            <div className="nishan-footer-content">
              <div className="nishan-footer-left">
                <span className="nishan-logo-sm">Flutter Web Emulator</span>
                <p>© {new Date().getFullYear()} Hafiz Rizwan Umar · Minderfly. All rights reserved.</p>
              </div>
              <div className="nishan-footer-links">
                <Link to="/store">Store</Link>
                <Link to="/">Minderfly</Link>
                <Link to="/services/vscode-extension-development">VS Code Dev Services</Link>
                <a href="https://marketplace.visualstudio.com/items?itemName=HafizRizwanUmar.flutter-web-emulator" target="_blank" rel="noopener noreferrer">Marketplace</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default FlutterWebEmulator;