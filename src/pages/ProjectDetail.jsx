import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projectsData } from '../data/projects';
import './ProjectDetail.css';

/* ── accent per category ── */
const CAT_ACCENT = {
  'MERN Website':         '#b8d63a',
  'Professional Website': '#3b82f6',
  'AI SaaS Platform':     '#a855f7',
};
const getAccent = (cat = '') =>
  CAT_ACCENT[cat] || '#b8d63a';

/* ── simple reveal wrapper ── */
const Fade = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="pd2-notfound">
          <h1>Project Not Found</h1>
          <p>We couldn't find a project matching that URL.</p>
          <Link to="/work" className="pd2-btn-primary" style={{ background: '#b8d63a', color: '#000' }}>
            ← Back to Portfolio
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const accent = getAccent(project.category);
  const features = project.features || [];
  const technologies = project.technologies || [];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.title} — Case Study`,
    description: project.details || project.description,
    author: { '@type': 'Organization', name: 'Minderfly', url: 'https://www.minderfly.com' },
    publisher: { '@type': 'Organization', name: 'Minderfly' },
    url: `https://www.minderfly.com/work/${id}`,
    ...(project.thumbnail ? { image: project.thumbnail } : {}),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.minderfly.com/' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://www.minderfly.com/work' },
      { '@type': 'ListItem', position: 3, name: project.title, item: `https://www.minderfly.com/work/${id}` },
    ],
  };

  return (
    <>
      <SEOHead
        title={`${project.title} Case Study | Minderfly`}
        description={`${project.title}: ${project.description} Read the full case study — challenge, solution, and results.`}
        keywords={`${project.title}, ${project.category}, Minderfly portfolio, case study, ${technologies.slice(0, 4).join(', ')}`}
        canonical={`https://www.minderfly.com/work/${id}`}
        ogImage={project.thumbnail}
        ogType="article"
        schema={[schema, breadcrumb]}
      />

      <style>{`.pd2-page { --ac: ${accent}; }`}</style>

      <Navbar />

      <div className="pd2-page">

        {/* ── HERO ── */}
        <header className="pd2-hero">
          {/* bg glow */}
          <div className="pd2-hero__glow" aria-hidden="true" />

          <div className="pd2-container">
            {/* Breadcrumb */}
            <nav className="pd2-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link to="/work">Work</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{project.title}</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Top row: category + year */}
              <div className="pd2-hero__meta">
                <span className="pd2-cat-badge">
                  <span className="pd2-cat-badge__dot" aria-hidden="true" />
                  {project.category}
                </span>
                {project.year && (
                  <span className="pd2-year">{project.year}</span>
                )}
              </div>

              <h1 className="pd2-title">{project.title}</h1>

              <p className="pd2-lead">{project.details || project.description}</p>

              {/* Action buttons */}
              <div className="pd2-hero__actions">
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd2-btn-primary"
                  >
                    View Live Site
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
                <Link to="/work" className="pd2-btn-ghost">← Back to Work</Link>
              </div>
            </motion.div>

            {/* Thumbnail */}
            {project.thumbnail && (
              <motion.div
                className="pd2-thumbnail"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={project.thumbnail}
                  alt={`${project.title} preview`}
                  loading="eager"
                />
              </motion.div>
            )}
          </div>
        </header>

        {/* ── BODY ── */}
        <div className="pd2-container pd2-body">

          {/* Stats strip */}
          {project.stats && (
            <Fade>
              <div className="pd2-stats-strip">
                <div className="pd2-stat">
                  <span className="pd2-stat__val">{project.year || '—'}</span>
                  <span className="pd2-stat__lbl">Year</span>
                </div>
                <div className="pd2-stat-div" aria-hidden="true" />
                <div className="pd2-stat">
                  <span className="pd2-stat__val">{project.category}</span>
                  <span className="pd2-stat__lbl">Category</span>
                </div>
                <div className="pd2-stat-div" aria-hidden="true" />
                <div className="pd2-stat">
                  <span className="pd2-stat__val">{project.stats}</span>
                  <span className="pd2-stat__lbl">Status</span>
                </div>
                <div className="pd2-stat-div" aria-hidden="true" />
                <div className="pd2-stat">
                  <span className="pd2-stat__val">{technologies.length}</span>
                  <span className="pd2-stat__lbl">Technologies</span>
                </div>
              </div>
            </Fade>
          )}

          {/* ── Challenge / Solution / Result ── */}
          {(project.problem || project.solution || project.result) && (
            <section className="pd2-section" aria-label="Case study breakdown">
              <Fade>
                <h2 className="pd2-section-title">
                  <span className="pd2-section-title__line" aria-hidden="true" />
                  Case Study
                </h2>
              </Fade>
              <div className="pd2-psr-grid">
                {project.problem && (
                  <Fade delay={0}>
                    <div className="pd2-psr-card">
                      <div className="pd2-psr-card__num" aria-hidden="true">01</div>
                      <div className="pd2-psr-card__label">The Challenge</div>
                      <p className="pd2-psr-card__text">{project.problem}</p>
                    </div>
                  </Fade>
                )}
                {project.solution && (
                  <Fade delay={0.08}>
                    <div className="pd2-psr-card">
                      <div className="pd2-psr-card__num" aria-hidden="true">02</div>
                      <div className="pd2-psr-card__label">Our Approach</div>
                      <p className="pd2-psr-card__text">{project.solution}</p>
                    </div>
                  </Fade>
                )}
                {project.result && (
                  <Fade delay={0.16}>
                    <div className="pd2-psr-card pd2-psr-card--result">
                      <div className="pd2-psr-card__num" aria-hidden="true">03</div>
                      <div className="pd2-psr-card__label">The Result</div>
                      <p className="pd2-psr-card__text">{project.result}</p>
                    </div>
                  </Fade>
                )}
              </div>
            </section>
          )}

          {/* ── Features + Tech ── */}
          {(features.length > 0 || technologies.length > 0) && (
            <section className="pd2-section pd2-ft-grid" aria-label="Features and technologies">
              {features.length > 0 && (
                <Fade>
                  <div className="pd2-card">
                    <h2 className="pd2-card__title">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path d="M9 2L11 7H16L12 10.5L13.5 16L9 13L4.5 16L6 10.5L2 7H7L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                      </svg>
                      Key Features
                    </h2>
                    <ul className="pd2-feature-list">
                      {features.map((f, i) => (
                        <li key={i} className="pd2-feature-item">
                          <span className="pd2-feature-check" aria-hidden="true">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Fade>
              )}
              {technologies.length > 0 && (
                <Fade delay={0.08}>
                  <div className="pd2-card">
                    <h2 className="pd2-card__title">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <polyline points="5 9 2 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        <polyline points="16 9 13 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        <path d="M7 5l-2 4 2 4M11 5l2 4-2 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Tech Stack
                    </h2>
                    <div className="pd2-tech-wrap">
                      {technologies.map((t, i) => (
                        <span key={i} className="pd2-tech-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </Fade>
              )}
            </section>
          )}

          {/* ── Service link banner ── */}
          {project.serviceLink && (
            <Fade>
              <div className="pd2-service-banner">
                <div className="pd2-service-banner__left">
                  <div className="pd2-service-banner__tag">Built Under</div>
                  <h3 className="pd2-service-banner__name">{project.serviceName}</h3>
                  <p className="pd2-service-banner__desc">
                    Want something similar? Explore our full {project.serviceName} service offering.
                  </p>
                </div>
                <Link to={project.serviceLink} className="pd2-service-banner__btn">
                  Explore Service
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7h9M7.5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </Fade>
          )}

          {/* ── CTA ── */}
          <Fade>
            <div className="pd2-cta">
              <h2 className="pd2-cta__title">Ready to build something like this?</h2>
              <p className="pd2-cta__sub">
                Tell us your idea and we'll send a fixed-price proposal within 24 hours.
              </p>
              <div className="pd2-cta__actions">
                <Link to="/contact" className="pd2-btn-primary">
                  Start Your Project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7h9M7.5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/work" className="pd2-btn-ghost">View More Work</Link>
              </div>
            </div>
          </Fade>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProjectDetail;