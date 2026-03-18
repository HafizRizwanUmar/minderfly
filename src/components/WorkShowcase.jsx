import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import './WorkShowcase.css';

/* ════════════════════════════════════════════════════════════
   WorkShowcase — "The Archive"
   35mm filmstrip drag-to-scroll portfolio section
   ─ All projectsData entries rendered
   ─ Robust momentum drag (no library beyond Framer Motion)
   ─ Full SEO: ItemList + CreativeWork schemas inline
   ════════════════════════════════════════════════════════════ */

/* ── SEO schemas ─────────────────────────────────────────── */
const buildSchemas = (projects) => ({
  itemList: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Minderfly Portfolio — The Archive',
    description: `${projects.length} selected digital projects by Minderfly spanning Chrome extensions, VS Code tools, mobile apps, and full-stack web platforms.`,
    url: 'https://minderfly.com/#work',
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.title,
        description: p.description,
        url: p.isExternal ? p.link : `https://minderfly.com${p.link}`,
        genre: p.category,
      },
    })),
  },
});

/* ── Drag-to-scroll strip ────────────────────────────────── */
const DragStrip = ({ children }) => {
  const viewportRef = useRef(null);
  const trackRef    = useRef(null);
  const x           = useMotionValue(0);

  /* Track pointer state */
  const pointerRef  = useRef({ active: false, startX: 0, startVal: 0, velX: 0, lastX: 0, lastT: 0 });

  /* Clamp x to valid range */
  const clamp = useCallback(() => {
    const vp = viewportRef.current;
    const tr = trackRef.current;
    if (!vp || !tr) return 0;
    const max = 0;
    const min = -(tr.scrollWidth - vp.offsetWidth);
    return { min, max };
  }, []);

  const onPointerDown = useCallback((e) => {
    /* Ignore right-click */
    if (e.button !== 0) return;
    const p = pointerRef.current;
    p.active   = true;
    p.startX   = e.clientX;
    p.startVal = x.get();
    p.velX     = 0;
    p.lastX    = e.clientX;
    p.lastT    = performance.now();
    /* Stop any running animation */
    x.stop?.();
    e.preventDefault();
  }, [x]);

  const onPointerMove = useCallback((e) => {
    const p = pointerRef.current;
    if (!p.active) return;
    const now = performance.now();
    const dt  = now - p.lastT;
    p.velX    = dt > 0 ? (e.clientX - p.lastX) / dt : 0;
    p.lastX   = e.clientX;
    p.lastT   = now;

    const delta  = e.clientX - p.startX;
    const bounds = clamp();
    const raw    = p.startVal + delta;
    /* Rubber-band beyond bounds */
    const clamped = raw < bounds.min
      ? bounds.min + (raw - bounds.min) * .12
      : raw > bounds.max
        ? bounds.max + (raw - bounds.max) * .12
        : raw;

    x.set(clamped);
  }, [x, clamp]);

  const onPointerUp = useCallback(() => {
    const p = pointerRef.current;
    if (!p.active) return;
    p.active = false;

    const bounds = clamp();
    const cur    = x.get();

    /* Momentum: project forward by velocity */
    const momentum = p.velX * 280; /* ms look-ahead */
    let target = cur + momentum;

    /* Snap back into bounds */
    if (target < bounds.min) target = bounds.min;
    if (target > bounds.max) target = bounds.max;

    animate(x, target, {
      type: 'spring',
      stiffness: 90,
      damping: 22,
      mass: .9,
    });
  }, [x, clamp]);

  /* Touch events */
  const touchRef = useRef({ startX: 0, startVal: 0 });

  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    touchRef.current = { startX: t.clientX, startVal: x.get() };
    x.stop?.();
  }, [x]);

  const onTouchMove = useCallback((e) => {
    const t = e.touches[0];
    const delta = t.clientX - touchRef.current.startX;
    const bounds = clamp();
    const raw = touchRef.current.startVal + delta;
    const clamped = Math.max(bounds.min, Math.min(bounds.max, raw));
    x.set(clamped);
    e.preventDefault();
  }, [x, clamp]);

  const onTouchEnd = useCallback(() => {
    const bounds = clamp();
    const cur = x.get();
    if (cur < bounds.min || cur > bounds.max) {
      animate(x, Math.max(bounds.min, Math.min(bounds.max, cur)), {
        type: 'spring', stiffness: 100, damping: 24,
      });
    }
  }, [x, clamp]);

  /* Keyboard navigation */
  const onKeyDown = useCallback((e) => {
    const STEP = 320;
    const bounds = clamp();
    const cur = x.get();
    if (e.key === 'ArrowRight') {
      animate(x, Math.max(bounds.min, cur - STEP), { type: 'spring', stiffness: 120, damping: 26 });
    }
    if (e.key === 'ArrowLeft') {
      animate(x, Math.min(bounds.max, cur + STEP), { type: 'spring', stiffness: 120, damping: 26 });
    }
  }, [x, clamp]);

  return (
    <div
      ref={viewportRef}
      className="strip-viewport"
      tabIndex={0}
      aria-label="Drag or use arrow keys to browse projects"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
      style={{ touchAction: 'pan-y' }}
    >
      <motion.div
        ref={trackRef}
        className="strip-track"
        style={{ x }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ── Single film frame card ──────────────────────────────── */
const FrameCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const isExternal = project.isExternal;
  const paddedNum  = String(index + 1).padStart(2, '0');

  const cardProps = isExternal
    ? { href: project.link, target: '_blank', rel: 'noopener noreferrer', role: 'link' }
    : { to: project.link };

  const CardTag = isExternal ? 'a' : Link;

  return (
    <motion.div
      className="frame-wrap"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: .6, delay: Math.min(index * .055, .5), ease: [.22,1,.36,1] }}
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/ListItem"
    >
      <meta itemProp="position" content={String(index + 1)} />

      <CardTag
        {...cardProps}
        className={`frame-card${hovered ? ' is-hovered' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        draggable={false}
        aria-label={`${project.title} — ${project.category}${isExternal ? ' (opens in new tab)' : ''}`}
        itemScope
        itemType="https://schema.org/CreativeWork"
        itemProp="item"
      >
        <meta itemProp="name"        content={project.title}       />
        <meta itemProp="description" content={project.description} />
        <meta itemProp="genre"       content={project.category}    />

        {/* ── Top sprockets ── */}
        <div className="sprockets top" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => <span key={i} className="hole"/>)}
        </div>

        {/* ── Exposure number ── */}
        <div className="frame-number" aria-hidden="true">
          <span className="fn-label">EXP</span>
          <span className="fn-num">{paddedNum}</span>
        </div>

        {/* ── Image box ── */}
        <div className="frame-image-box">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${project.title} — project preview`}
              className="frame-img"
              loading="lazy"
              draggable={false}
              itemProp="image"
            />
          ) : (
            <div className="frame-img-placeholder" aria-hidden="true"/>
          )}

          <div className="grain"    aria-hidden="true"/>
          <div className="vignette" aria-hidden="true"/>

          {/* Hover CTA */}
          <div className="frame-hover-cta" aria-hidden="true">
            <div className="cta-circle">↗</div>
            <span className="cta-text">View Project</span>
          </div>

          {/* Category badge */}
          <span className="frame-badge">{project.category}</span>

          {/* External flag */}
          {isExternal && (
            <span className="frame-ext-flag" aria-label="External project">
              ↗ ext
            </span>
          )}
        </div>

        {/* ── Caption ── */}
        <div className="frame-caption">
          <div className="caption-main">
            <h3 className="caption-title" itemProp="name">{project.title}</h3>
            <p className="caption-desc" itemProp="description">{project.description}</p>
          </div>
          {project.stats && (
            <span className="caption-stat">{project.stats}</span>
          )}
        </div>

        {/* ── Bottom sprockets ── */}
        <div className="sprockets bottom" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => <span key={i} className="hole"/>)}
        </div>
      </CardTag>
    </motion.div>
  );
};

/* ── Animated hint arrows ────────────────────────────────── */
const HintArrows = () => (
  <div className="ws-hint" aria-hidden="true">
    <motion.span
      className="hint-arrow"
      animate={{ x: [-3,0,-3] }}
      transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
    >←</motion.span>
    <span className="hint-label">drag to explore</span>
    <motion.span
      className="hint-arrow"
      animate={{ x: [0,3,0] }}
      transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
    >→</motion.span>
  </div>
);

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════ */
const WorkShowcase = () => {
  const schemas = buildSchemas(projectsData);

  return (
    <section
      className="work-section"
      id="work"
      aria-label={`Work showcase — ${projectsData.length} projects by Minderfly`}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.itemList) }}
      />

      <meta itemProp="name"         content="Minderfly Portfolio — The Archive" />
      <meta itemProp="numberOfItems" content={String(projectsData.length)} />

      {/* Global film-grain noise overlay */}
      <div className="noise-layer" aria-hidden="true"/>

      <div className="ws-container">

        {/* ── Header ── */}
        <motion.div
          className="ws-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: .6 }}
        >
          <motion.div
            className="ws-eyebrow"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6, ease: [.22,1,.36,1] }}
          >
            <span className="ey-tag">Selected Works</span>
            <span className="ey-rule" aria-hidden="true"/>
            <span className="ey-count">{projectsData.length} Projects</span>
          </motion.div>

          <motion.h2
            className="ws-title"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .75, delay: .08, ease: [.22,1,.36,1] }}
          >
            The<br/>
            <em className="ws-title-em">Archive</em>
          </motion.h2>

          <motion.p
            className="ws-sub"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .65, delay: .18, ease: [.22,1,.36,1] }}
          >
            A curated collection of digital work spanning Chrome extensions,
            VS Code tools, mobile apps, and full-stack web platforms.
            Drag to browse.
          </motion.p>
        </motion.div>

        {/* ── Filmstrip ── */}
        <div className="filmstrip-wrapper">
          <div className="edge-fade left"  aria-hidden="true"/>
          <div className="edge-fade right" aria-hidden="true"/>

          <DragStrip>
            {/* Leading gap */}
            <div className="strip-spacer" aria-hidden="true"/>

            {/* All projects */}
            {projectsData.map((project, i) => (
              <FrameCard key={project.id ?? i} project={project} index={i} />
            ))}

            {/* Closing "fin." */}
            <div className="strip-end" aria-hidden="true">
              <span>fin.</span>
            </div>
          </DragStrip>
        </div>

        {/* ── Drag hint ── */}
        <HintArrows/>

        {/* ── Bottom CTA row ── */}
        <motion.div
          className="ws-cta-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6, ease: [.22,1,.36,1] }}
        >
          <span className="ws-cta-count">
            {projectsData.length} projects — all disciplines
          </span>
          <Link
            to="/work"
            className="ws-cta-link"
            aria-label="Browse the complete Minderfly project archive"
          >
            Full Archive
            <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default WorkShowcase;