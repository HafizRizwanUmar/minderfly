import { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ─── tokens ─── */
const ACCENT = '#c8f23a';
const BG     = '#050505';

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

const FEATURES = [
  { icon: '÷',  title: 'Instant Expense Splitting',      desc: 'Split any expense equally or by custom percentages. Add participants, set amounts, and Debt Settler calculates who owes what instantly.' },
  { icon: '⟳',  title: 'Real-Time Debt Tracking',        desc: 'Running balance per person, always up to date. No spreadsheets, no mental arithmetic — the app keeps the score.' },
  { icon: '✓',  title: 'One-Tap Settlement',             desc: 'Mark individual debts or entire balances as settled with a single tap. Clean history, no awkward conversations required.' },
  { icon: '∞',  title: 'Completely Free, Forever',       desc: 'No premium tier, no "Pro" features behind a paywall, no ads. Debt Settler is and will remain free for all users, always.' },
  { icon: '🔒', title: 'Private by Design',              desc: 'Your financial data stays on your device. No account sign-up, no cloud sync to our servers, no data sold to third parties.' },
  { icon: '↗',  title: 'Export Reports',                 desc: 'Export a clean PDF or CSV summary of any group\'s expenses and settlements. Perfect for shared projects and trip reconciliation.' },
];

const PLATFORMS = [
  { label: 'Mobile — Itch.io',        sub: 'Android APK',         color: '#fa5c5c', href: 'https://hafizrizwanumar.itch.io/debtsettler',        icon: '📱' },
  { label: 'Desktop — Microsoft Store', sub: 'Windows 10 / 11',  color: '#3b82f6', href: 'https://apps.microsoft.com/detail/9N4Z8J2S0SFL?hl=en-us&gl=PK&ocid=pdpshare', icon: '⊞' },
  { label: 'Tablet — Amazon Store',   sub: 'Fire OS / Android',   color: '#f59e0b', href: 'https://www.amazon.com/dp/B0GJNKLHXZ/',               icon: '📲' },
];

const STATS = [
  { value: '10,000+', label: 'Active Users'       },
  { value: '4.9 ★',  label: 'Average Rating'      },
  { value: 'Free',    label: 'Always & Forever'    },
  { value: '3',       label: 'Platforms Supported' },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Debt Settler',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Android, Windows',
  description: 'Debt Settler is a free expense splitting and debt tracking app for Android, Windows, and Fire OS. Split bills, track shared costs, and settle debts with friends and roommates instantly.',
  url: 'https://minderfly.com/store/debt-settler',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '312' },
  author: { '@type': 'Organization', name: 'Minderfly', url: 'https://minderfly.com' },
};

const DebtSettler = () => {
  const [heroRef,  heroV]  = useReveal(0.05);
  const [statsRef, statsV] = useReveal(0.2);
  const [featRef,  featV]  = useReveal(0.08);
  const [dlRef,    dlV]    = useReveal(0.1);
  const [ctaRef,   ctaV]   = useReveal(0.15);

  return (
    <>
      <Helmet>
        <title>Debt Settler — Free Expense Splitting & Debt Tracking App | Minderfly</title>
        <meta name="description" content="Download Debt Settler free for Android, Windows, and Fire OS. Split bills, track shared expenses, and settle debts with friends, roommates, and travel groups. No sign-up, no ads, completely free." />
        <meta name="keywords" content="Debt Settler, free debt tracking app, expense splitter app, split bills friends, shared expense tracker, debt management app free, roommate expense split, travel expense app, Minderfly debt settler" />
        <link rel="canonical" href="https://minderfly.com/store/debt-settler" />
        <meta property="og:title"       content="Debt Settler — Free Expense Splitting App" />
        <meta property="og:description" content="Split bills, track debts, and settle expenses with friends. Free on Android, Windows, and Amazon Fire." />
        <meta property="og:type"        content="website" />
        <meta name="twitter:card"       content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* ── Navbar ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 64, background: 'rgba(5,5,5,0.88)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', zIndex: 1000 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/store" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.38)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.38)'}
          >← Back to Store</Link>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em' }}>
            Debt <span style={{ color: ACCENT }}>Settler</span>
          </span>
          <a href="https://hafizrizwanumar.itch.io/debtsettler" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 100, background: ACCENT, color: '#000', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = ACCENT; }}
          >📥 Download Free</a>
        </div>
      </nav>

      <main style={{ background: BG, color: '#fff', fontFamily: 'var(--font-body)', paddingTop: 64 }}>

        {/* ══ HERO ════════════════════════════════════ */}
        <section style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }} aria-label="Debt Settler hero">
          <div aria-hidden="true" style={{ position: 'absolute', top: '-10%', right: '-5%', width: '50%', height: '80%', background: 'radial-gradient(ellipse at 70% 30%,rgba(200,242,58,.07) 0%,transparent 65%)', pointerEvents: 'none' }}/>
          <div aria-hidden="true" style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '40%', height: '60%', background: 'radial-gradient(ellipse at 30% 70%,rgba(99,102,241,.06) 0%,transparent 65%)', pointerEvents: 'none' }}/>

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'rgba(255,255,255,.3)', marginBottom: '2.5rem' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Home</Link><span>›</span>
              <Link to="/store" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Store</Link><span>›</span>
              <span aria-current="page" style={{ color: 'rgba(255,255,255,.55)' }}>Debt Settler</span>
            </nav>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
              {/* Left copy */}
              <div ref={heroRef}>
                <div style={{ ...rv(heroV), display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, background: 'rgba(200,242,58,.1)', border: '1px solid rgba(200,242,58,.25)', color: ACCENT, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                  ✦ Finance · Free · Android + Windows
                </div>
                <h1 style={{ ...rv(heroV, 60), fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem,4.5vw,4rem)', fontWeight: 800, lineHeight: 0.97, letterSpacing: '-0.03em', color: '#fff', marginBottom: '1.25rem' }}>
                  Settle Debt.<br/>
                  <span style={{ WebkitTextStroke: '1px rgba(255,255,255,.22)', color: 'transparent' }}>Absolutely Free.</span>
                </h1>
                <p style={{ ...rv(heroV, 110), fontSize: '1.05rem', fontWeight: 300, color: 'rgba(255,255,255,.48)', lineHeight: 1.68, maxWidth: 480, marginBottom: '2.5rem' }}>
                  The free app for splitting bills, tracking shared expenses, and settling debts with friends, roommates, and travel groups. No sign-up, no ads, no fees — ever.
                </p>
                <div style={{ ...rv(heroV, 160), display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {PLATFORMS.map(p => (
                    <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 14, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#fff', textDecoration: 'none', transition: 'all .2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'; e.currentTarget.style.transform = 'none'; }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{p.icon}</span>
                      <div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'rgba(255,255,255,.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{p.sub}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{p.label.split('—')[0].trim()}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right — phone mockup */}
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 3 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, ease: [0.22,1,0.36,1], delay: 0.2 }}
                style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div aria-hidden="true" style={{ position: 'absolute', inset: -30, background: 'radial-gradient(ellipse at center,rgba(200,242,58,.1) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }}/>
                {/* Phone frame */}
                <div style={{ position: 'relative', width: 280, background: '#111', border: '1px solid rgba(255,255,255,.12)', borderRadius: 36, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,.6)' }}>
                  {/* notch */}
                  <div style={{ height: 12, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 60, height: 6, borderRadius: 3, background: '#1a1a1a' }}/>
                  </div>
                  {/* screen */}
                  <div style={{ background: '#0d0d0d', padding: '20px 18px 24px', minHeight: 480 }}>
                    {/* App header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Debt Settler</span>
                      <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(200,242,58,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>+</span>
                    </div>
                    {/* Balance card */}
                    <div style={{ background: 'linear-gradient(135deg,rgba(200,242,58,.12),rgba(200,242,58,.04))', border: '1px solid rgba(200,242,58,.2)', borderRadius: 16, padding: '18px 16px', marginBottom: 16 }}>
                      <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Your Balance</div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: ACCENT }}>$127.50</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,.4)', marginTop: 4 }}>owed to you across 3 groups</div>
                    </div>
                    {/* People rows */}
                    {[
                      { name: 'Ahmed',  amount: '+$45.00', color: ACCENT },
                      { name: 'Sarah',  amount: '+$52.50', color: ACCENT },
                      { name: 'Farrukh', amount: '-$18.00', color: '#f87171' },
                    ].map(p => (
                      <div key={p.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>{p.name[0]}</div>
                          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,.7)' }}>{p.name}</span>
                        </div>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: p.color }}>{p.amount}</span>
                      </div>
                    ))}
                    <button style={{ width: '100%', marginTop: 16, padding: '12px', borderRadius: 12, background: ACCENT, border: 'none', color: '#000', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                      Settle All
                    </button>
                  </div>
                  {/* home bar */}
                  <div style={{ height: 20, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 80, height: 4, borderRadius: 2, background: 'rgba(255,255,255,.15)' }}/>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ STATS ═══════════════════════════════════ */}
        <div ref={statsRef} style={{ borderTop: '1px solid rgba(255,255,255,.07)', borderBottom: '1px solid rgba(255,255,255,.07)', background: 'rgba(255,255,255,.02)', padding: '2.5rem 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderLeft: '1px solid rgba(255,255,255,.07)' }}>
              {STATS.map((s, i) => (
                <div key={s.label} style={{ padding: '1.5rem 2rem', borderRight: '1px solid rgba(255,255,255,.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, ...rv(statsV, i * 80) }}>
                  <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>{s.value}</strong>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,.38)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ FEATURES ════════════════════════════════ */}
        <section ref={featRef} style={{ padding: '100px 0' }} aria-label="Features">
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
            <div style={{ marginBottom: '4rem', ...rv(featV) }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }}/>
                Features That Matter
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
                Everything you need.<br/><span style={{ color: 'rgba(255,255,255,.28)' }}>Nothing you don't.</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
              {FEATURES.map((f, i) => (
                <article key={f.title} style={{ ...rv(featV, i * 60), background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '28px', transition: 'background .25s,border-color .25s,transform .3s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.055)'; e.currentTarget.style.borderColor = 'rgba(200,242,58,.2)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(200,242,58,.08)', border: '1px solid rgba(200,242,58,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: ACCENT, marginBottom: '1.1rem' }}>{f.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'rgba(255,255,255,.42)', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DOWNLOAD PLATFORMS ══════════════════════ */}
        <section ref={dlRef} style={{ padding: '80px 0 100px', background: 'rgba(255,255,255,.015)', borderTop: '1px solid rgba(255,255,255,.07)', borderBottom: '1px solid rgba(255,255,255,.07)' }} aria-label="Download platforms">
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem', ...rv(dlV) }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }}/>
                Available On
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
                Your device.<br/><span style={{ color: 'rgba(255,255,255,.28)' }}>Your platform.</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {PLATFORMS.map((p, i) => (
                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                  style={{ ...rv(dlV, i * 80), display: 'flex', flexDirection: 'column', gap: 0, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 18, padding: '36px 32px', textDecoration: 'none', transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.055)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>{p.icon}</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '0.4rem' }}>{p.sub}</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{p.label}</h3>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: ACCENT, marginTop: 'auto', paddingTop: '0.75rem' }}>Download Free →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══════════════════════════════════════ */}
        <section ref={ctaRef} style={{ padding: '80px 0 110px' }} aria-label="Start using Debt Settler">
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
            <div style={{ ...rv(ctaV), position: 'relative', borderRadius: 24, overflow: 'hidden', padding: '80px', background: ACCENT }}>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 80% at 88% 50%,rgba(255,255,255,.15) 0%,transparent 60%)', pointerEvents: 'none' }}/>
              <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,.45)', marginBottom: '1rem' }}>
                    Ready to settle up?
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#000', marginBottom: '0.85rem' }}>
                    Join 10,000+ users<br/>keeping friendships debt-free.
                  </h2>
                  <p style={{ fontSize: '1rem', fontWeight: 300, color: 'rgba(0,0,0,.55)', lineHeight: 1.65, maxWidth: 460 }}>
                    Debt Settler is free, always will be. Download it now and settle your first expense in under 30 seconds.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
                  <a href="https://hafizrizwanumar.itch.io/debtsettler" target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 100, background: '#000', color: '#fff', fontSize: '0.92rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'background .2s,transform .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.transform = 'none'; }}
                  >📥 Get Started for Free</a>
                  <Link to="/store"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 32px', borderRadius: 100, background: 'none', border: '1px solid rgba(0,0,0,.2)', color: 'rgba(0,0,0,.65)', fontSize: '0.9rem', textDecoration: 'none', transition: 'border-color .2s,color .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,.5)'; e.currentTarget.style.color = '#000'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,.2)'; e.currentTarget.style.color = 'rgba(0,0,0,.65)'; }}
                  >← Back to Store</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default DebtSettler;