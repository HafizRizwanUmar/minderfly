import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { useModal } from '../../context/ModalContext';
import './StoreHub.css';

/* ═══════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════ */
const AC   = '#c8f23a';   // acid green
const BG   = '#050505';
const WIRE = 'rgba(255,255,255,0.07)';
const MW   = '1280px';

/* ═══════════════════════════════════════
   PRODUCT DATA
═══════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 'debt-settler',
    name: 'Debt Settler',
    tagline: 'Split expenses. Settle debts. Stay friends.',
    desc: 'The free app for managing shared costs between friends, roommates, and travel groups — zero friction, no sign-up, no hidden fees.',
    price: 'Free',
    priceLabel: 'Free',
    link: '/store/debt-settler',
    category: 'Finance',
    platform: 'Android',
    featured: true,
    badge: "Editor's Choice",
    rating: 4.9,
    reviews: 312,
    downloads: '10,000+',
    accent: '#c8f23a',
    accentBg: 'rgba(200,242,58,0.1)',
    accentBorder: 'rgba(200,242,58,0.22)',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
      </svg>
    ),
  },
  {
    id: 'nishan-qr',
    name: 'Nishan QR Generator',
    tagline: 'Professional QR codes, offline and private.',
    desc: 'Unlimited custom QR codes for URLs, WiFi, text, and email. Colour control and instant PNG download. No account required.',
    price: 'Free',
    priceLabel: 'Free · $5 Pro',
    link: '/store/nishan-qr-generator',
    category: 'Utilities',
    platform: 'Windows',
    featured: false,
    badge: null,
    rating: 4.8,
    reviews: 187,
    downloads: '5,000+',
    accent: '#3b82f6',
    accentBg: 'rgba(59,130,246,0.1)',
    accentBorder: 'rgba(59,130,246,0.22)',
    image: 'https://images.unsplash.com/photo-1550482781-48d477e61c72?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><path d="M14 14h.01M18 14h.01M14 18h.01M18 18h.01M21 14v4M14 21h7"/>
      </svg>
    ),
  },
  {
    id: 'flutter-web-emulator',
    name: 'Flutter Web Emulator',
    tagline: 'Run Flutter apps inside VS Code.',
    desc: 'An embedded browser panel for VS Code to run, debug, and test Flutter Web apps without tab-switching. Hot reload ready.',
    price: 'Free',
    priceLabel: 'Free',
    link: '/store/flutter-web-emulator',
    category: 'Development',
    platform: 'VS Code',
    featured: false,
    badge: null,
    rating: 4.7,
    reviews: 94,
    downloads: '2,000+',
    accent: '#06b6d4',
    accentBg: 'rgba(6,182,212,0.1)',
    accentBorder: 'rgba(6,182,212,0.22)',
    image: 'https://images.unsplash.com/photo-1628277613967-6abca504d0ac?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    id: 'cinemafly',
    name: 'Cinemafly',
    tagline: 'Every video format. No codec hunting.',
    desc: 'A next-gen Windows media player. HEVC, MKV, 4K HDR, 30+ formats — GPU accelerated, fully offline, immersive dark UI.',
    price: 'Free',
    priceLabel: 'Free',
    link: '/store/cinemafly',
    category: 'Utilities',
    platform: 'Windows',
    featured: false,
    badge: null,
    rating: 4.8,
    reviews: 156,
    downloads: '1,000+',
    accent: '#a855f7',
    accentBg: 'rgba(168,85,247,0.1)',
    accentBorder: 'rgba(168,85,247,0.22)',
    image: 'https://images.unsplash.com/photo-1480694313141-fce5e697ee25?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
  },
  {
    id: 'sanad-pdf',
    name: 'Sanad PDF Editor',
    tagline: 'Edit, merge, sign PDFs — fully offline.',
    desc: 'Privacy-first Windows PDF editor. Merge, split, annotate, and sign documents locally. No uploads, no subscriptions.',
    price: 'Free',
    priceLabel: 'Free · Pro',
    link: '/store/sanad-pdf-editor',
    category: 'Productivity',
    platform: 'Windows',
    featured: false,
    badge: null,
    rating: 4.6,
    reviews: 73,
    downloads: '3,000+',
    accent: '#f97316',
    accentBg: 'rgba(249,115,22,0.1)',
    accentBorder: 'rgba(249,115,22,0.22)',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    id: 'doc-signer',
    name: 'Doc Signer',
    tagline: 'Sign documents instantly — no cloud, no fuss.',
    desc: 'A lightweight Windows app for digitally signing documents with ease. Add signatures, initials, and stamps to any document — fully offline and privacy-first.',
    price: 'Free',
    priceLabel: 'Free',
    link: 'https://apps.microsoft.com/detail/9p4n2c9vj8qb?hl=en-US&gl=PK',
    category: 'Productivity',
    platform: 'Windows',
    featured: false,
    badge: 'New',
    rating: 4.7,
    reviews: 38,
    downloads: '500+',
    accent: '#10b981',
    accentBg: 'rgba(16,185,129,0.1)',
    accentBorder: 'rgba(16,185,129,0.22)',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    isExternal: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
];

const CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))];

const PLATFORM_ICONS = {
  Windows: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
    </svg>
  ),
  'VS Code': (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
    </svg>
  ),
  Android: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.523 15.34c-.384 0-.696-.31-.696-.695s.312-.695.696-.695.695.31.695.695-.31.696-.695.696zm-11.046 0c-.384 0-.695-.31-.695-.695s.311-.695.695-.695.696.31.696.695-.312.696-.696.696zM17.808 7.43l1.742-3.016a.361.361 0 1 0-.627-.362l-1.764 3.053A10.646 10.646 0 0 0 12 6.2c-1.854 0-3.6.477-5.159 1.305L5.077 4.052a.362.362 0 0 0-.627.362L6.191 7.43C3.62 8.97 1.908 11.69 1.908 14.8h20.184c0-3.11-1.712-5.83-4.284-7.37z"/>
    </svg>
  ),
};

/* ═══════════════════════════════════════
   SCHEMAS
═══════════════════════════════════════ */
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Minderfly Software Products',
  description: 'Free and premium productivity tools, developer utilities, and Windows apps built by Minderfly',
  url: 'https://minderfly.com/store',
  numberOfItems: PRODUCTS.length,
  itemListElement: PRODUCTS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareApplication',
      name: p.name,
      description: p.desc,
      url: `https://minderfly.com${p.link}`,
      applicationCategory: p.category,
      operatingSystem: p.platform,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviews },
    },
  })),
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Minderfly',
  url: 'https://minderfly.com',
  description: 'Minderfly builds free and premium software tools for Windows, Android, and VS Code.',
  sameAs: ['https://minderfly.com/store'],
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://minderfly.com/' },
    { '@type': 'ListItem', position: 2, name: 'Store', item: 'https://minderfly.com/store' },
  ],
};

/* ═══════════════════════════════════════
   HOOKS
═══════════════════════════════════════ */
const useReveal = (t = 0.1) => {
  const ref = useRef(null);
  const [v, sv] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { sv(true); obs.disconnect(); } },
      { threshold: t }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
};

const fade = (v, d = 0) => ({
  opacity: v ? 1 : 0,
  transform: v ? 'none' : 'translateY(22px)',
  transition: `opacity .7s ease ${d}ms, transform .7s cubic-bezier(.22,1,.36,1) ${d}ms`,
});

/* ═══════════════════════════════════════
   FEATURED HERO CARD
═══════════════════════════════════════ */
const FeaturedHero = ({ product }) => {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const ref = useRef(null);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .9, ease: [.22, 1, .36, 1] }}
      className="store-featured-hero"
    >
      {/* BG image */}
      <img src={product.image} alt={product.name} loading="eager"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.38) saturate(1.1)', pointerEvents: 'none' }} />

      {/* Mouse-follow glow */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 500px at ${mouse.x}% ${mouse.y}%, rgba(200,242,58,.1) 0%, transparent 65%)`, pointerEvents: 'none', transition: 'background .15s ease' }}/>

      {/* Dark gradient overlay */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(5,5,5,.85) 40%, rgba(5,5,5,.45) 100%)', pointerEvents: 'none' }}/>
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(5,5,5,.95), transparent)', pointerEvents: 'none' }}/>

      {/* Content */}
      <div className="store-featured-content">
        {/* Badges top */}
        <div className="store-featured-badges">
          <span style={{ padding: '5px 14px', borderRadius: 100, background: AC, color: '#000', fontSize: '.62rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>
            ★ Editor's Choice
          </span>
          <span style={{ padding: '5px 14px', borderRadius: 100, background: 'rgba(5,5,5,.7)', border: '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,.6)', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>
            {product.category}
          </span>
        </div>

        {/* Bottom content */}
        <div className="store-featured-bottom">
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.4rem)', fontWeight: 800, lineHeight: .95, letterSpacing: '-.04em', color: '#fff', marginBottom: '.75rem' }}>
              {product.name}
            </h2>
            <p style={{ fontSize: '1rem', fontWeight: 300, color: 'rgba(255,255,255,.6)', lineHeight: 1.6, maxWidth: 540, marginBottom: '1.5rem' }}>
              {product.desc}
            </p>
            {/* Stats row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: '.78rem', color: 'rgba(255,255,255,.45)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ color: '#fbbf24' }}>★ {product.rating}</span>
                <span style={{ opacity: .5 }}>({product.reviews} reviews)</span>
              </span>
              <span style={{ opacity: .3 }}>·</span>
              <span>{product.downloads} downloads</span>
              <span style={{ opacity: .3 }}>·</span>
              <span style={{ color: AC, fontWeight: 600 }}>{product.priceLabel}</span>
            </div>
          </div>

          {/* CTA */}
          <Link to={product.link}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', borderRadius: 12, background: AC, color: '#000', fontSize: '.88rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '.02em', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = AC; e.currentTarget.style.transform = 'none'; }}
          >
            View App
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 6.5h9M6.5 2l4.5 4.5L6.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════
   PRODUCT CARD
═══════════════════════════════════════ */
const ProductCard = ({ product, index }) => {
  const [hov, setHov] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8, scale: .97 }}
      transition={{ duration: .42, delay: index * .06, ease: [.22, 1, .36, 1] }}
      itemScope itemType="https://schema.org/SoftwareApplication"
      style={{
        background: hov ? 'rgba(255,255,255,.048)' : 'rgba(255,255,255,.026)',
        border: `1px solid ${hov ? product.accentBorder : WIRE}`,
        borderRadius: 18,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transform: hov ? 'translateY(-5px)' : 'none',
        transition: 'background .25s, border-color .25s, transform .32s cubic-bezier(.22,1,.36,1)',
        cursor: 'default',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 175, overflow: 'hidden', flexShrink: 0 }}>
        <img src={product.image} alt={`${product.name} screenshot`} loading="lazy"
          itemProp="screenshot"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.6) saturate(1.1)', transform: hov ? 'scale(1.07)' : 'scale(1)', transition: 'transform .7s cubic-bezier(.22,1,.36,1)', display: 'block' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,.08) 0%, rgba(5,5,5,.72) 100%)' }}/>

        {/* Category badge */}
        <span style={{ position: 'absolute', top: 11, left: 11, padding: '3px 9px', borderRadius: 100, background: 'rgba(5,5,5,.78)', border: '1px solid rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', fontSize: '.6rem', fontWeight: 600, color: 'rgba(255,255,255,.55)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
          {product.category}
        </span>

        {/* Platform badge */}
        {PLATFORM_ICONS[product.platform] && (
          <span style={{ position: 'absolute', top: 11, right: 11, display: 'flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 100, background: 'rgba(5,5,5,.78)', border: '1px solid rgba(255,255,255,.09)', backdropFilter: 'blur(8px)', fontSize: '.6rem', color: 'rgba(255,255,255,.45)' }}>
            <span style={{ color: product.accent }}>{PLATFORM_ICONS[product.platform]}</span>
            {product.platform}
          </span>
        )}

        {product.badge && (
          <span style={{ position: 'absolute', bottom: 11, right: 11, padding: '3px 10px', borderRadius: 100, background: AC, color: '#000', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '20px 20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Icon + name */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: '.75rem' }}>
          <div style={{ width: 42, height: 42, borderRadius: 11, background: product.accentBg, border: `1px solid ${product.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: product.accent, flexShrink: 0 }}>
            {product.icon}
          </div>
          <div style={{ flex: 1 }}>
            <h3 itemProp="name" style={{ fontFamily: 'var(--font-heading)', fontSize: '.98rem', fontWeight: 700, color: hov ? '#fff' : 'rgba(255,255,255,.85)', letterSpacing: '-.015em', lineHeight: 1.2, marginBottom: '.18rem', transition: 'color .2s' }}>
              {product.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '.68rem', color: 'rgba(255,255,255,.3)' }}>
              <span style={{ color: '#fbbf24', fontWeight: 600 }}>★ {product.rating}</span>
              <span style={{ opacity: .5 }}>·</span>
              <span>{product.downloads} downloads</span>
            </div>
            <meta itemProp="applicationCategory" content={product.category} />
            <meta itemProp="operatingSystem"     content={product.platform} />
          </div>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: '.74rem', fontWeight: 600, color: product.accent, marginBottom: '.55rem', letterSpacing: '.01em' }}>
          {product.tagline}
        </p>

        {/* Description */}
        <p itemProp="description" style={{ fontSize: '.8rem', fontWeight: 300, color: 'rgba(255,255,255,.38)', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.desc}
        </p>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '.9rem', borderTop: '1px solid rgba(255,255,255,.055)' }}>
          <span itemProp="offers" itemScope itemType="https://schema.org/Offer"
            style={{ fontSize: '.82rem', fontWeight: 700, color: hov ? '#fff' : 'rgba(255,255,255,.55)', transition: 'color .2s' }}>
            <meta itemProp="price" content="0" />
            <meta itemProp="priceCurrency" content="USD" />
            {product.priceLabel}
          </span>
          {product.isExternal ? (
            <a href={product.link} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, background: hov ? product.accent : 'rgba(255,255,255,.07)', color: hov ? '#000' : 'rgba(255,255,255,.6)', fontSize: '.76rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '.02em', transition: 'all .22s' }}>
              Get App
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M1.5 5.5h8M5.5 1.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          ) : (
            <Link to={product.link}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, background: hov ? product.accent : 'rgba(255,255,255,.07)', color: hov ? '#000' : 'rgba(255,255,255,.6)', fontSize: '.76rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '.02em', transition: 'all .22s' }}>
              View
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M1.5 5.5h8M5.5 1.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/* ═══════════════════════════════════════
   STATS BAR
═══════════════════════════════════════ */
const STATS = [
  { value: '5',      suffix: '+',      label: 'Free Apps'         },
  { value: '21,000', suffix: '+',      label: 'Total Downloads'   },
  { value: '4.8',    suffix: ' ★',     label: 'Average Rating'    },
  { value: '100%',   suffix: '',       label: 'Privacy-First'     },
];

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
const StoreHub = () => {
    const { openModal } = useModal();
    const [activeCategory, setActiveCategory] = useState('All');

  const [headerRef, headerV] = useReveal(0.05);
  const [statsRef,  statsV]  = useReveal(0.2);
  const [gridRef,   gridV]   = useReveal(0.04);
  const [ctaRef,    ctaV]    = useReveal(0.15);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const featured = PRODUCTS.find(p => p.featured);
  const filtered  = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <>
      <SEOHead 
        title="Minderfly Store — Free Productivity Apps & Developer Tools"
        description="Free and premium productivity tools, developer utilities, and Windows apps built by Minderfly. All products are privacy-first and work offline."
        keywords="productivity tools, developer utilities, windows apps, free software, bill splitter app, qr code generator, pdf editor, media player hevc, flutter web emulator"
        canonical="https://minderfly.com/store"
        ogType="website"
        schema={[itemListSchema, orgSchema, breadcrumb]}
      />

      <Navbar />

      <main style={{ background: BG, color: '#fff', fontFamily: 'var(--font-body)', minHeight: '100vh' }}>

        {/* ── dot grid atmosphere ── */}
        <div aria-hidden="true" style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none', zIndex: 0, maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)' }}/>

        <div className="store-page-wrapper">

          {/* ── Breadcrumb ── */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.76rem', color: 'rgba(255,255,255,.28)', marginBottom: '2.5rem' }}>
            <Link to="/"    style={{ color: 'rgba(255,255,255,.32)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,.65)'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.32)'}>Home</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page" style={{ color: 'rgba(255,255,255,.52)' }}>Store</span>
          </nav>

          {/* ── Page header ── */}
          <div ref={headerRef} style={{ marginBottom: '3rem' }}>
            <div style={{ ...fade(headerV), display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '.62rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: AC, marginBottom: '1rem' }}>
              <span style={{ width: 20, height: 1, background: AC, display: 'block' }}/>
              Our Products
            </div>
            <h1 style={{ ...fade(headerV, 55), fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 800, lineHeight: .95, letterSpacing: '-.05em', color: '#fff', marginBottom: '.9rem' }}>
              Tools we built.<br/>
              <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,.2)', color: 'transparent' }}>Yours to use.</span>
            </h1>
            <p style={{ ...fade(headerV, 105), fontSize: '1rem', fontWeight: 300, color: 'rgba(255,255,255,.4)', maxWidth: 520, lineHeight: 1.7 }}>
              Minderfly builds software for problems we couldn't find good solutions to. Every app here is free to start — because useful tools shouldn't have a paywall.
            </p>
          </div>

          {/* ── Stats bar ── */}
          <div ref={statsRef} className="store-stats-grid">
            {STATS.map((s, i) => (
              <div key={s.label} className="store-stat-item" style={{ ...fade(statsV, i * 80) }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,2.5vw,2.2rem)', fontWeight: 800, letterSpacing: '-.04em', color: '#fff', lineHeight: 1, marginBottom: '.3rem' }}>
                  {s.value}<span style={{ color: AC }}>{s.suffix}</span>
                </div>
                <div style={{ fontSize: '.68rem', fontWeight: 500, color: 'rgba(255,255,255,.35)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Featured hero card ── */}
          {featured && <FeaturedHero product={featured} />}

          {/* ── Category filter ── */}
          <div className="store-filter-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#fff', letterSpacing: '-.025em' }}>
                All Apps
              </h2>
              <AnimatePresence mode="wait">
                <motion.span
                  key={filtered.length}
                  initial={{ opacity: 0, scale: .8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: .2 }}
                  style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(255,255,255,.06)', border: `1px solid ${WIRE}`, fontSize: '.7rem', color: 'rgba(255,255,255,.42)', fontWeight: 500 }}>
                  {filtered.length}
                </motion.span>
              </AnimatePresence>
            </div>

            <div role="tablist" aria-label="Filter apps by category" className="store-filter-tabs">
              {CATEGORIES.map(cat => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '7px 18px', borderRadius: 8, border: 'none',
                      background: active ? AC : 'rgba(255,255,255,.05)',
                      color: active ? '#000' : 'rgba(255,255,255,.48)',
                      fontSize: '.78rem', fontWeight: active ? 700 : 400,
                      fontFamily: 'var(--font-body)', cursor: 'pointer',
                      letterSpacing: '.02em', transition: 'all .2s', outline: 'none',
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,.09)'; e.currentTarget.style.color = '#fff'; } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.color = 'rgba(255,255,255,.48)'; } }}
                  >{cat}</button>
                );
              })}
            </div>
          </div>

          {/* ── Products grid ── */}
          <div ref={gridRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .22 }}
                className="store-products-grid"
              >
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '5rem 0', color: 'rgba(255,255,255,.28)', fontSize: '.9rem' }}>
                No apps in this category yet.
              </div>
            )}
          </div>

          {/* ── Divider ── */}
          <div style={{ height: 1, background: WIRE, margin: '80px 0' }}/>

          {/* ── Why Minderfly strip ── */}
          <section aria-label="Why Minderfly" style={{ marginBottom: '80px' }}>
            <div className="store-why-grid">
              {[
                { icon: '🔒', title: 'Privacy-first always',    desc: 'Every product in this store works offline. Your data never leaves your device unless you explicitly share it.' },
                { icon: '∞',  title: 'Free to start, forever',  desc: 'We believe useful tools shouldn\'t be gated. Every app here has a free tier with no time limit.' },
                { icon: '⚡', title: 'Built by a real team',    desc: 'Minderfly is a product studio, not a content farm. Every app is actively maintained and improved.' },
              ].map(item => (
                <div key={item.title} style={{ background: 'rgba(255,255,255,.026)', border: `1px solid ${WIRE}`, borderRadius: 16, padding: '28px 24px', transition: 'background .25s, border-color .25s, transform .3s cubic-bezier(.22,1,.36,1)', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,.048)'; e.currentTarget.style.borderColor='rgba(200,242,58,.2)'; e.currentTarget.style.transform='translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,.026)'; e.currentTarget.style.borderColor=WIRE; e.currentTarget.style.transform='none'; }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '.98rem', fontWeight: 700, color: '#fff', marginBottom: '.5rem', letterSpacing: '-.01em' }}>{item.title}</h3>
                  <p style={{ fontSize: '.82rem', fontWeight: 300, color: 'rgba(255,255,255,.38)', lineHeight: 1.68, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Platform badges ── */}
          <div style={{ marginBottom: '80px', textAlign: 'center' }}>
            <p style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginBottom: '1.25rem' }}>Available on</p>
            <div className="store-platforms">
              {[
                { label: 'Microsoft Store',     icon: '⊞', href: 'https://apps.microsoft.com' },
                { label: 'VS Code Marketplace', icon: '⌨', href: 'https://marketplace.visualstudio.com' },
                { label: 'Itch.io',             icon: '🎮', href: 'https://itch.io' },
                { label: 'Amazon Appstore',     icon: '📦', href: 'https://amazon.com' },
              ].map(pl => (
                <a key={pl.label} href={pl.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 20px', borderRadius: 10, background: 'rgba(255,255,255,.04)', border: `1px solid ${WIRE}`, color: 'rgba(255,255,255,.48)', fontSize: '.78rem', fontWeight: 500, textDecoration: 'none', letterSpacing: '.02em', transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,.08)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='rgba(255,255,255,.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,.04)'; e.currentTarget.style.color='rgba(255,255,255,.48)'; e.currentTarget.style.borderColor=WIRE; }}>
                  <span>{pl.icon}</span> {pl.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── CTA banner ── */}
          <div ref={ctaRef}>
            <div style={{ ...fade(ctaV), position: 'relative', borderRadius: 22, overflow: 'hidden', padding: '72px', background: AC }}>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 80% at 88% 50%, rgba(255,255,255,.16) 0%, transparent 60%)', pointerEvents: 'none' }}/>
              <div className="store-cta-inner">
                <div>
                  <div style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,.45)', marginBottom: '1rem' }}>
                    Custom Development
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, lineHeight: .97, letterSpacing: '-.04em', color: '#000', marginBottom: '.75rem' }}>
                    Need a custom tool<br/>built for your workflow?
                  </h2>
                  <p style={{ fontSize: '.95rem', fontWeight: 300, color: 'rgba(0,0,0,.55)', lineHeight: 1.7, maxWidth: 500 }}>
                    Minderfly builds Chrome extensions, VS Code tools, Windows apps, and mobile applications for teams worldwide. Everything in this store started as a custom build.
                  </p>
                </div>
                <div className="store-cta-actions">
                  <button
                    onClick={() => openModal('New Project Inquiry')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 28px', borderRadius: 10, background: '#000', border: 'none', color: '#fff', fontSize: '.88rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '.02em', transition: 'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='#1a1a1a'; e.currentTarget.style.transform='translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='#000'; e.currentTarget.style.transform='none'; }}>
                    Request a Build
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 6.5h9M6.5 2l4.5 4.5L6.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <Link to="/services"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 28px', borderRadius: 10, background: 'none', border: '1px solid rgba(0,0,0,.2)', color: 'rgba(0,0,0,.65)', fontSize: '.86rem', textDecoration: 'none', letterSpacing: '.02em', transition: 'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(0,0,0,.5)'; e.currentTarget.style.color='#000'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,0,0,.2)'; e.currentTarget.style.color='rgba(0,0,0,.65)'; }}>
                    View Services
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer onContactClick={() => openModal('General Inquiry')} />
    </>
  );
};

export default StoreHub;