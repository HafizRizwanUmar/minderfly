import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWindows, FaMobileAlt, FaStar, FaDownload,
  FaArrowRight, FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';
import './StorePreview.css';

// Local product preview images
import debtSettlerImg from '../assets/debtsettler_preview.svg';
import nishanImg      from '../assets/nishan_preview.svg';
import flutterImg     from '../assets/flutter_preview.png';

/* ═══════════════════════════════════════
   StorePreview — Homepage product carousel
   No GSAP dependency · Framer Motion + CSS
   Full SEO structured data inline
═══════════════════════════════════════ */

/* ── Product data ── */
const PRODUCTS = [
  {
    id:          'debt-settler',
    name:        'Debt Settler',
    tagline:     'Finance',
    desc:        'The free app for managing shared expenses and settling debts with friends, roommates, and travel groups. Zero sign-up, zero fees.',
    price:       'Free',
    platform:    'Android',
    PlatformIcon: FaMobileAlt,
    link:        '/store/debt-settler',
    accent:      '#c8f23a',
    rating:      4.9,
    downloads:   '10k+',
    image:       debtSettlerImg,
  },
  {
    id:          'nishan-qr',
    name:        'Nishan QR Generator',
    tagline:     'Utilities',
    desc:        'Generate unlimited custom QR codes for URLs, WiFi, text, and email. Privacy-first — works fully offline in your browser.',
    price:       'Free',
    platform:    'Windows',
    PlatformIcon: FaWindows,
    link:        '/store/nishan-qr-generator',
    accent:      '#3b82f6',
    rating:      4.8,
    downloads:   '5k+',
    image:       nishanImg,
  },
  {
    id:          'flutter-web-emulator',
    name:        'Flutter Emulator',
    tagline:     'Development',
    desc:        'Run, debug, and test Flutter Web apps directly inside VS Code without switching tabs. Hot reload ready, zero configuration.',
    price:       'Free',
    platform:    'VS Code',
    PlatformIcon: FaWindows,
    link:        '/store/flutter-web-emulator',
    accent:      '#06b6d4',
    rating:      4.7,
    downloads:   '2k+',
    image:       flutterImg,
  },
];

/* ── Structured data ── */
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Featured Minderfly Apps',
  description: 'A selection of free productivity and developer tools built by Minderfly — available for Windows, Android, and VS Code.',
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
      applicationCategory: p.tagline,
      operatingSystem: p.platform,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: 100 },
    },
  })),
};

/* ── Card position state ──
   diff = index - activeIndex (wrapped)
   0 = center, -1 = left, +1 = right, else hidden
*/
const cardStyle = (diff) => {
  if (diff === 0) return {
    x: '-50%', scale: 1.05, opacity: 1, zIndex: 10,
    rotateY: 0,
    transition: { duration: .6, ease: [.22,1,.36,1] },
  };
  if (diff === -1) return {
    x: '-135%', scale: .82, opacity: .45, zIndex: 5,
    rotateY: 22,
    transition: { duration: .6, ease: [.22,1,.36,1] },
  };
  if (diff === 1) return {
    x: '35%', scale: .82, opacity: .45, zIndex: 5,
    rotateY: -22,
    transition: { duration: .6, ease: [.22,1,.36,1] },
  };
  return {
    x: '-50%', scale: .5, opacity: 0, zIndex: 0,
    rotateY: 0,
    transition: { duration: .4 },
  };
};

const getDiff = (index, active, total) => {
  let d = index - active;
  if (d < -Math.floor(total / 2)) d += total;
  if (d >  Math.floor(total / 2)) d -= total;
  return d;
};

/* ═══════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */
const StorePreview = () => {
  const [active, setActive] = useState(1);
  const [mouse,  setMouse]  = useState({ x: 0.5, y: 0.5 });
  const trackRef = useRef(null);

  const next = useCallback(() => setActive(v => (v + 1) % PRODUCTS.length), []);
  const prev = useCallback(() => setActive(v => (v - 1 + PRODUCTS.length) % PRODUCTS.length), []);

  /* Mouse parallax for active card */
  useEffect(() => {
    const onMove = (e) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  /* Derived tilt from mouse */
  const tiltX = ((mouse.x - .5) * 2) * 10;
  const tiltY = ((mouse.y - .5) * 2) * -10;

  return (
    <section
      className="store-preview-section"
      id="products"
      aria-label="Featured Minderfly products"
    >
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="sp-inner">

        {/* ── Header ── */}
        <motion.div
          className="sp-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: .75, ease: [.22,1,.36,1] }}
        >
          <div className="sp-header-left">
            <div className="sp-eyebrow" aria-hidden="true">
              <span className="sp-eyebrow-num">02 /</span>
              <span className="sp-eyebrow-line"/>
              <span className="sp-eyebrow-label">Our Products</span>
            </div>
            <h2 className="sp-title">
              Digital tools.<br/>
              <span className="sp-title-stroke">Built to last.</span>
            </h2>
            <p className="sp-sub">
              Every app in the Minderfly store is free to start, privacy-first, and built to solve a real problem we couldn't find a good solution to.
            </p>
          </div>

          <div className="sp-header-right">
            <Link to="/store" className="sp-cta-link" aria-label="Browse all Minderfly apps">
              Browse all apps
              <FaArrowRight aria-hidden="true"/>
            </Link>
            <span className="sp-cta-count">{PRODUCTS.length} free apps available</span>
          </div>
        </motion.div>

        {/* ── Carousel ── */}
        <div className="sp-carousel-wrap">
          <button
            className="sp-nav prev"
            onClick={prev}
            aria-label="Previous product"
          >
            <FaChevronLeft aria-hidden="true"/>
          </button>

          <div
            ref={trackRef}
            className="sp-track"
            role="region"
            aria-label="Product carousel"
            aria-live="polite"
          >
            {PRODUCTS.map((product, index) => {
              const diff    = getDiff(index, active, PRODUCTS.length);
              const isActive = diff === 0;
              const style   = cardStyle(diff);
              const { PlatformIcon } = product;

              /* Only apply mouse tilt to active card */
              const rotateY = isActive ? tiltX  : style.rotateY;
              const rotateX = isActive ? tiltY  : 0;

              return (
                <motion.article
                  key={product.id}
                  className={`sp-card${isActive ? ' is-active' : ''}`}
                  style={{ left: '50%' }}
                  animate={{
                    x:       style.x,
                    scale:   style.scale,
                    opacity: style.opacity,
                    zIndex:  style.zIndex,
                    filter:  style.filter,
                    rotateY,
                    rotateX,
                  }}
                  transition={style.transition}
                  onClick={() => !isActive && setActive(index)}
                  tabIndex={0}
                  role="button"
                  aria-label={isActive ? `${product.name} — ${product.tagline}` : `Switch to ${product.name}`}
                  aria-pressed={isActive}
                  onKeyDown={e => e.key === 'Enter' && setActive(index)}
                  itemScope
                  itemType="https://schema.org/SoftwareApplication"
                >
                  <meta itemProp="name"              content={product.name}     />
                  <meta itemProp="description"       content={product.desc}     />
                  <meta itemProp="operatingSystem"   content={product.platform} />
                  <meta itemProp="applicationCategory" content={product.tagline}/>

                  <div className="sp-card-inner">
                    {/* Background image */}
                    <div className="sp-card-img-wrap" aria-hidden="true">
                      <img
                        src={product.image}
                        alt={`${product.name} preview screenshot`}
                        loading={isActive ? 'eager' : 'lazy'}
                        itemProp="screenshot"
                      />
                      <div className="sp-card-overlay"/>
                    </div>

                    {/* Top badges */}
                    <div className="sp-card-badges">
                      <span className="sp-badge">{product.tagline}</span>
                      <span className="sp-badge" style={{ display:'flex', alignItems:'center', gap:5 }}>
                        <PlatformIcon aria-hidden="true" style={{ fontSize:'.65rem' }}/>
                        {product.platform}
                      </span>
                      <span className="sp-badge sp-badge-ac">{product.price}</span>
                    </div>

                    {/* Content */}
                    <div className="sp-card-body">
                      <h3 className="sp-card-name">{product.name}</h3>

                      <div className="sp-card-meta">
                        <span className="sp-card-meta-item">
                          <FaStar aria-hidden="true"/>
                          <span className="sp-card-rating">{product.rating}</span>
                        </span>
                        <span aria-hidden="true" style={{ opacity:.3 }}>·</span>
                        <span className="sp-card-meta-item">
                          <FaDownload aria-hidden="true"/>
                          {product.downloads}
                        </span>
                      </div>

                      {/* Expanded details — only visible when active */}
                      <div className={`sp-card-details${isActive ? ' is-visible' : ''}`}>
                        <p>{product.desc}</p>
                        <Link
                          to={product.link}
                          className="sp-view-btn"
                          aria-label={`View ${product.name} details`}
                          tabIndex={isActive ? 0 : -1}
                        >
                          View App
                          <FaArrowRight aria-hidden="true" style={{ fontSize:'.72rem' }}/>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <button
            className="sp-nav next"
            onClick={next}
            aria-label="Next product"
          >
            <FaChevronRight aria-hidden="true"/>
          </button>
        </div>

        {/* ── Dots ── */}
        <div className="sp-dots" role="tablist" aria-label="Product navigation">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={i === active}
              aria-label={`Select ${p.name}`}
              className={`sp-dot${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default StorePreview;