import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaChrome, FaCode, FaMobileAlt, FaFileCode,
  FaExternalLinkAlt, FaArrowRight, FaWindows,
  FaQrcode, FaFilePdf, FaPlay,
} from 'react-icons/fa';
import { projectsData } from '../data/projects';
import './BentoGrid.css';

/* ═══════════════════════════════════════
   BentoGrid — Minderfly Work Showcase
   Editorial numbered-card layout
   Bold dark aesthetic · acid-green accent
═══════════════════════════════════════ */

/* ── Icon resolver ── */
const resolveIcon = (category = '') => {
  if (category.includes('Extension') || category.includes('Chrome')) return <FaChrome />;
  if (category.includes('Desktop') || category.includes('Windows'))  return <FaWindows />;
  if (category.includes('Mobile'))                                    return <FaMobileAlt />;
  if (category.includes('PDF'))                                       return <FaFilePdf />;
  if (category.includes('QR'))                                        return <FaQrcode />;
  if (category.includes('Media') || category.includes('Video'))       return <FaPlay />;
  return <FaCode />;
};

/* ── Structured data for the work section ── */
const workSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Minderfly Portfolio — Work Showcase',
  description: 'A curated selection of digital products and client projects built by Minderfly: Chrome extensions, VS Code tools, mobile apps, and web platforms.',
  url: 'https://www.minderfly.com/#work',
};

/* ── Layout config ──
   Cards alternate between span-1 and span-2.
   First card, 4th card = span-2; rest = span-1.
   This creates a visually interesting editorial rhythm.
*/
const getSpan = (index) => {
  const pattern = [2, 1, 1, 2, 1, 1, 2, 1, 1]; // repeating pattern
  return pattern[index % pattern.length] === 2;
};

/* ═══════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════ */
const ProjectCard = ({ project, index, isCtaCard = false }) => {
  const isExternal = project.isExternal;
  const isSpan2    = getSpan(index);
  const paddedNum  = String(index + 1).padStart(2, '0');

  const cardClasses = [
    'bento-card',
    isSpan2     ? 'span-2'       : '',
    project.thumbnail ? 'card-image' : 'card-glass',
    isCtaCard   ? 'card-cta'     : '',
  ].filter(Boolean).join(' ');

  const inner = (
    <>
      {/* Decorative number */}
      <span className="card-num" aria-hidden="true">{paddedNum}</span>

      {/* Background image (if thumbnail) */}
      {project.thumbnail && !isCtaCard && (
        <div className="bento-card-img-wrap" aria-hidden="true">
          <img src={project.thumbnail} alt={`${project.title} — ${project.category} project preview`} loading="lazy" />
          <div className="bento-card-overlay"/>
        </div>
      )}

      {/* Content */}
      <div className="bento-card-content">
        <div className="card-top">
          <span className="card-category">
            <span className="card-category-dot" aria-hidden="true"/>
            {project.category}
          </span>
          <div className="card-icon-wrap" aria-hidden="true">
            {resolveIcon(project.category)}
          </div>
          <h3 className="card-title">{project.title}</h3>
          <p className="card-desc">{project.description}</p>
        </div>

        <div className="card-foot">
          <span className="card-stats-tag">{project.stats}</span>
          <div className="card-arrow" aria-hidden="true">
            <FaExternalLinkAlt />
          </div>
        </div>
      </div>
    </>
  );

  const sharedProps = {
    className: cardClasses,
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: .55, delay: (index % 3) * .08, ease: [.22,1,.36,1] },
    itemProp: 'itemListElement',
    itemScope: true,
    itemType: 'https://schema.org/CreativeWork',
  };

  if (isExternal) {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} — ${project.category} (opens in new tab)`}
        {...sharedProps}
      >
        <meta itemProp="name" content={project.title} />
        <meta itemProp="description" content={project.description} />
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div
      role="link"
      tabIndex={0}
      aria-label={`View project: ${project.title}`}
      onKeyDown={e => e.key === 'Enter' && (window.location.href = project.link)}
      {...sharedProps}
      style={{ cursor: 'pointer' }}
      onClick={() => window.location.href = project.link}
    >
      <meta itemProp="name" content={project.title} />
      <meta itemProp="description" content={project.description} />
      {inner}
    </motion.div>
  );
};

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
const BentoGrid = () => {
  const sectionRef = useRef(null);

  /* Stats derived from projectsData */
  const totalProjects = projectsData?.length ?? 0;

  return (
    <section
      className="bento-section"
      id="work"
      ref={sectionRef}
      aria-label="Work showcase — Minderfly projects"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
      />

      <meta itemProp="name" content="Minderfly Work Showcase" />

      <div className="bento-inner">

        {/* ── Section header ── */}
        <motion.header
          className="bento-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, ease: [.22,1,.36,1] }}
        >
          <div className="bento-header-left">
            <div className="bento-eyebrow" aria-hidden="true">
              <span className="bento-eyebrow-num">03 /</span>
              <span className="bento-eyebrow-line"/>
              <span className="bento-eyebrow-label">Work</span>
            </div>
            <h2 className="bento-title">
              Work
              <br/>
              <span className="bento-title-stroke">Showcase</span>
            </h2>
          </div>

          <div className="bento-header-right">
            <p className="bento-desc">
              A curated selection of our most impactful digital solutions — from Chrome extensions and developer tools to full-stack enterprise platforms. Built with precision and shipped with care.
            </p>

            {/* Stat pills */}
            <div className="bento-stats" aria-label="Agency statistics">
              {[
                { val: totalProjects || 12, suffix: '+', label: 'Projects Shipped' },
                { val: 98,  suffix: '%', label: 'Client Satisfaction' },
                { val: 4,   suffix: 'yr', label: 'In Business' },
              ].map(s => (
                <div key={s.label} className="bento-stat-pill">
                  <span className="bento-stat-val">
                    {s.val}<span className="bento-stat-ac">{s.suffix}</span>
                  </span>
                  <span className="bento-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.header>

        {/* ── Project grid ── */}
        <div
          className="bento-grid"
          role="list"
          aria-label="Project cards"
        >
          {projectsData.map((project, index) => (
            <div role="listitem" key={project.id}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}

          {/* ── CTA card (always last) ── */}
          <div role="listitem">
            <motion.div
              className="bento-card span-2 card-cta"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: .55, delay: .12, ease: [.22,1,.36,1] }}
              role="link"
              tabIndex={0}
              aria-label="Start a project with Minderfly"
              onKeyDown={e => e.key === 'Enter' && (window.location.href = '/contact')}
              onClick={() => window.location.href = '/contact'}
              style={{ cursor: 'pointer' }}
            >
              <span className="card-num" aria-hidden="true">→</span>

              <div className="bento-card-content">
                <div className="card-top">
                  <span className="card-category">
                    <span className="card-category-dot" aria-hidden="true"/>
                    Start a project
                  </span>
                  <div className="card-icon-wrap" aria-hidden="true">
                    <FaArrowRight />
                  </div>
                  <h3 className="card-title">
                    Have a project<br/>in mind?
                  </h3>
                  <p className="card-desc">
                    We turn ambitious ideas into polished digital products. From concept to deployment — let's build something exceptional together.
                  </p>
                </div>

                <div className="card-foot">
                  <span className="card-stats-tag">hello@minderfly.com</span>
                  <div className="card-arrow" aria-hidden="true">
                    <FaArrowRight />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── View all link ── */}
        <div className="bento-view-all">
          <Link to="/work" className="bento-view-all-link" aria-label="View all Minderfly projects">
            View all projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;