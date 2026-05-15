import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import './WorkShowcase.css';

/* ────────────────────────────────────────────────────────────
   SEO structured data
──────────────────────────────────────────────────────────── */
const buildSchema = (projects) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Minderfly Portfolio',
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
    },
  })),
});

/* ────────────────────────────────────────────────────────────
   Category accent colours
──────────────────────────────────────────────────────────── */
const ACCENT = {
  'MERN Website':         '#b8d63a',
  'Professional Website': '#3b82f6',
  'AI SaaS Platform':     '#a855f7',
};
const accent = (cat) => ACCENT[cat] || '#b8d63a';

/* ────────────────────────────────────────────────────────────
   Single Project Card
──────────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const [hov, setHov] = useState(false);
  const ac = accent(project.category);

  const CardTag = project.isExternal ? 'a' : Link;
  const cardProps = project.isExternal
    ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
    : { to: project.link };

  return (
    <motion.div
      className="wc-card-wrap"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <CardTag
        {...cardProps}
        className={`wc-card${hov ? ' wc-card--hov' : ''}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ '--ac': ac, '--ac-dim': ac + '18' }}
        draggable={false}
        aria-label={`${project.title} — ${project.category} case study`}
      >
        {/* ── Top label row ── */}
        <div className="wc-card__top">
          <span className="wc-card__cat">
            <span className="wc-card__dot" aria-hidden="true" />
            {project.category}
          </span>
          {project.year && (
            <span className="wc-card__year">{project.year}</span>
          )}
        </div>

        {/* ── Thumbnail ── */}
        <div className="wc-card__img-wrap">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${project.title} preview`}
              className="wc-card__img"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="wc-card__img-placeholder" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
          )}

          {/* Hover overlay arrow */}
          <div className="wc-card__overlay" aria-hidden="true">
            <div className="wc-card__arrow-circle">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9h10M9.5 4.5L14 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="wc-card__overlay-text">
              {project.isExternal ? 'View Live' : 'Case Study'}
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="wc-card__body">
          <h3 className="wc-card__title">{project.title}</h3>
          <p className="wc-card__desc">{project.description}</p>

          <div className="wc-card__footer">
            {project.stats && (
              <span className="wc-card__stat">{project.stats}</span>
            )}
            <span className="wc-card__cta" aria-hidden="true">
              {project.isExternal ? 'View live ↗' : 'Read case study →'}
            </span>
          </div>
        </div>
      </CardTag>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────────── */
const WorkShowcase = () => {
  const schema = buildSchema(projectsData);

  return (
    <section
      className="wc-section"
      id="work"
      aria-label={`Selected work — ${projectsData.length} projects by Minderfly`}
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
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
              transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              Projects that<br />
              <em className="wc-title__em">made impact.</em>
            </motion.h2>

            <motion.p
              className="wc-subtitle"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              A curated selection of client work and internal products —
              from AI platforms to professional websites. Click any project to read the full case study.
            </motion.p>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="wc-grid">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="wc-bottom"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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