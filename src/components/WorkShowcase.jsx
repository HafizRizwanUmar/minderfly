import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import './WorkShowcase.css';

/* ── Accent per category ── */
const CAT_ACCENT = {
  'MERN Website':         { color: '#b8d63a', label: 'MERN · Website' },
  'Professional Website': { color: '#3b82f6', label: 'Professional Website' },
  'AI SaaS Platform':     { color: '#a855f7', label: 'AI · SaaS Platform' },
};
const accentOf = (cat) => CAT_ACCENT[cat] || { color: '#b8d63a', label: cat };

/* ── SEO schema ── */
const buildSchema = (projects) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Minderfly Portfolio',
  url: 'https://minderfly.com/#work',
  numberOfItems: projects.length,
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: { '@type': 'CreativeWork', name: p.title, description: p.description, url: `https://minderfly.com${p.link}` },
  })),
});

/* ── FEATURED card (first project, wide) ── */
const FeaturedCard = ({ project }) => {
  const [hov, setHov] = useState(false);
  const { color } = accentOf(project.category);

  return (
    <motion.div
      className={`wc-featured${hov ? ' wc-card--hov' : ''}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ '--ac': color }}
    >
      <Link
        to={project.link}
        className="wc-featured__inner"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        draggable={false}
        aria-label={`${project.title} — ${project.category} case study`}
      >
        {/* Background image */}
        {project.thumbnail && (
          <div className="wc-featured__bg-wrap" aria-hidden="true">
            <img
              src={project.thumbnail}
              alt=""
              className={`wc-featured__bg-img${hov ? ' is-hov' : ''}`}
              loading="lazy"
              draggable={false}
            />
            <div className="wc-featured__bg-overlay" />
          </div>
        )}

        {/* Content */}
        <div className="wc-featured__content">
          <div className="wc-featured__top">
            <span className="wc-cat-badge">
              <span className="wc-cat-dot" aria-hidden="true" />
              {project.category}
            </span>
            {project.year && <span className="wc-year">{project.year}</span>}
          </div>

          <div className="wc-featured__bottom">
            <div className="wc-featured__text">
              <h3 className="wc-featured__title">{project.title}</h3>
              <p className="wc-featured__desc">{project.description}</p>
            </div>
            <div className={`wc-featured__cta${hov ? ' is-hov' : ''}`}>
              <div className="wc-arrow-circle">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12M10.5 4.5L16 10l-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="wc-cta-text">Case Study</span>
            </div>
          </div>

          {project.stats && (
            <div className="wc-featured__stat-pill">{project.stats}</div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

/* ── Regular card ── */
const RegularCard = ({ project, index }) => {
  const [hov, setHov] = useState(false);
  const { color } = accentOf(project.category);

  return (
    <motion.div
      className={`wc-card${hov ? ' wc-card--hov' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ '--ac': color }}
    >
      <Link
        to={project.link}
        className="wc-card__inner"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        draggable={false}
        aria-label={`${project.title} — ${project.category} case study`}
      >
        {/* Image */}
        <div className="wc-card__img-wrap">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${project.title} preview`}
              className={`wc-card__img${hov ? ' is-hov' : ''}`}
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="wc-card__img-placeholder" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
          )}
          {/* Overlay */}
          <div className={`wc-card__overlay${hov ? ' is-hov' : ''}`} aria-hidden="true">
            <div className="wc-arrow-circle">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9h10M9.5 4.5L14 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="wc-cta-text">Read Case Study</span>
          </div>
        </div>

        {/* Top meta */}
        <div className="wc-card__top">
          <span className="wc-cat-badge">
            <span className="wc-cat-dot" aria-hidden="true" />
            {project.category}
          </span>
          {project.year && <span className="wc-year">{project.year}</span>}
        </div>

        {/* Body */}
        <div className="wc-card__body">
          <h3 className="wc-card__title">{project.title}</h3>
          <p className="wc-card__desc">{project.description}</p>
        </div>

        {/* Footer */}
        <div className="wc-card__footer">
          {project.stats && <span className="wc-card__stat">{project.stats}</span>}
          <span className={`wc-card__cta-label${hov ? ' is-hov' : ''}`}>Case study →</span>
        </div>
      </Link>
    </motion.div>
  );
};

/* ── MAIN COMPONENT ── */
const WorkShowcase = () => {
  const [featured, ...rest] = projectsData;
  const schema = buildSchema(projectsData);

  return (
    <section
      className="wc-section"
      id="work"
      aria-label={`Selected work — ${projectsData.length} projects`}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="wc-container">

        {/* ── Header ── */}
        <div className="wc-header">
          <motion.div
            className="wc-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="wc-eyebrow__dot" aria-hidden="true" />
            Selected Work
          </motion.div>

          <div className="wc-header__row">
            <motion.h2
              className="wc-title"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.06 }}
            >
              Projects that<br />
              <em className="wc-title__em">made impact.</em>
            </motion.h2>

            <motion.p
              className="wc-subtitle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.14 }}
            >
              From AI-powered platforms to professional websites — every project starts with a problem and ends with measurable results.
            </motion.p>
          </div>
        </div>

        {/* ── Featured card ── */}
        {featured && <FeaturedCard project={featured} />}

        {/* ── Regular cards grid ── */}
        {rest.length > 0 && (
          <div className="wc-grid">
            {rest.map((project, i) => (
              <RegularCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {/* ── Bottom row ── */}
        <motion.div
          className="wc-bottom"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="wc-bottom__count">
            {projectsData.length} projects — all disciplines
          </span>
          <Link to="/contact" className="wc-bottom__cta">
            Start a Project
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 6.5h9M6.5 2l4.5 4.5L6.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default WorkShowcase;