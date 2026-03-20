import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ── constants ── */
const ACCENT = '#c8f23a';

const StoreHero = ({ product }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  // Placeholder friends avatars
  const friends = [
    'https://i.pravatar.cc/80?u=a',
    'https://i.pravatar.cc/80?u=b',
    'https://i.pravatar.cc/80?u=c',
    'https://i.pravatar.cc/80?u=d',
  ];

  // Track mouse for subtle parallax glow
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    });
  };

  const defaultProduct = product || {
    name: 'Debt Settler',
    tagline: 'Split expenses. Settle debts. Stay friends.',
    description: 'The free app for managing shared costs between friends, teams, and partners — with zero friction and no hidden fees.',
    price: 'Free',
    rating: 4.9,
    downloads: '10,000+',
    category: 'Finance',
    link: '/store/debt-settler',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1600',
    accentColor: '#c8f23a',
    badge: "Editor's Choice",
  };

  return (
    <section aria-label={`Featured product: ${defaultProduct.name}`} style={{ paddingBottom: '3rem' }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', width: '100%', height: 560, borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', cursor: 'default' }}
      >
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, transition: 'transform 10s ease' }}>
          <img
            src={defaultProduct.image}
            alt={`${defaultProduct.name} preview`}
            onLoad={() => setImgLoaded(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', filter: 'brightness(.55) saturate(1.1)', transition: 'transform .8s cubic-bezier(.22,1,.36,1)' }}
          />
        </div>

        {/* Primary gradient — left-weighted for text legibility */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(5,5,5,.96) 0%, rgba(5,5,5,.65) 48%, rgba(5,5,5,.1) 100%)' }} />

        {/* Dynamic mouse-follow glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(200,242,58,.06) 0%, transparent 55%)`,
            transition: 'background .15s ease',
          }}
        />

        {/* Content */}
        <div style={{ position: 'absolute', inset: 0, padding: '52px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>

          {/* Top row — badges */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <span style={{ padding: '5px 14px', borderRadius: 100, background: ACCENT, color: '#000', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Spotlight
            </span>
            {defaultProduct.badge && (
              <span style={{ padding: '5px 14px', borderRadius: 100, background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.75)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em' }}>
                {defaultProduct.badge}
              </span>
            )}
            <span style={{ padding: '5px 14px', borderRadius: 100, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.5)', fontSize: '0.7rem', letterSpacing: '0.06em' }}>
              {defaultProduct.category}
            </span>
          </motion.div>

          {/* Middle — title block */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.6rem,4.5vw,4.5rem)', fontWeight: 800, lineHeight: 0.96, letterSpacing: '-0.04em', color: '#fff', marginBottom: '1.1rem' }}
            >
              {defaultProduct.name}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: '1.15rem', fontWeight: 300, color: 'rgba(255,255,255,.52)', lineHeight: 1.6, maxWidth: 500 }}
            >
              {defaultProduct.tagline}
            </motion.p>
          </div>

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}
          >
            {/* Social proof pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '8px 18px 8px 8px', borderRadius: 100, background: 'rgba(10,10,10,.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.1)' }}>
              {/* Avatar stack */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {friends.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${defaultProduct.name} user avatar ${i + 1}`}
                    loading="lazy"
                    style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid rgba(10,10,10,.9)', marginLeft: i === 0 ? 0 : -10, objectFit: 'cover' }}
                  />
                ))}
              </div>
              <div style={{ lineHeight: 1.15 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>{defaultProduct.downloads}</div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,.4)' }}>active users</div>
              </div>
              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 12, borderLeft: '1px solid rgba(255,255,255,.1)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="#fbbf24" aria-hidden="true">
                  <path d="M6 1l1.28 3.09L11 4.57l-2.5 2.44.59 3.44L6 8.77l-3.09 1.68.59-3.44L1 4.57l3.72-.48L6 1z"/>
                </svg>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fbbf24' }}>{defaultProduct.rating}</span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Link
                to={defaultProduct.link}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 100, background: ACCENT, color: '#000', fontSize: '0.92rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.01em', transition: 'all .22s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(200,242,58,.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1v9M3 7l4 4 4-4M1 13h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Get it Free
              </Link>
              <Link
                to={defaultProduct.link}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 100, background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.7)', fontSize: '0.9rem', textDecoration: 'none', transition: 'all .22s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.14)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; e.currentTarget.style.color = 'rgba(255,255,255,.7)'; }}
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default StoreHero;