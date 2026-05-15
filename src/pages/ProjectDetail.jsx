import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import {
  FaArrowLeft, FaExternalLinkAlt, FaCheckCircle,
  FaCode, FaRocket, FaArrowRight,
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projectsData } from '../data/projects';
import './ProjectDetail.css';

/* ═══════════════════════════════════════════════
   ProjectDetail — Minderfly Case Study
   Bold editorial dark design · no Tailwind
   Full SEO: SoftwareApplication + BreadcrumbList
   Dynamic accent colour per project
═══════════════════════════════════════════════ */

/* ── Default per-category accent colours ── */
const CATEGORY_ACCENT = {
  'Chrome Extension':    '#f97316',
  'VS Code Extension':   '#06b6d4',
  'Desktop App':         '#a855f7',
  'Mobile App':          '#c8f23a',
  'MERN Stack':          '#3b82f6',
  'React':               '#3b82f6',
  'Website':             '#c8f23a',
  default:               '#c8f23a',
};

const getAccent = (category = '') => {
  const key = Object.keys(CATEGORY_ACCENT).find(k => category.includes(k));
  return key ? CATEGORY_ACCENT[key] : CATEGORY_ACCENT.default;
};

const hexToRgba = (hex, a) => {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
};

/* ── Reveal helper ── */
const Fade = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity:0, y:20 }}
    whileInView={{ opacity:1, y:0 }}
    viewport={{ once:true, margin:'-50px' }}
    transition={{ duration:.6, delay, ease:[.22,1,.36,1] }}
  >
    {children}
  </motion.div>
);

/* ═══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */
const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);
  const [imgError, setImgError] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  /* ── Not found state ── */
  if (!project) {
    return (
      <>
        <Navbar/>
        <div className="pd-not-found">
          <h1>Project Not Found</h1>
          <p>We couldn't find a project matching that URL.</p>
          <Link
            to="/work"
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 28px', borderRadius:10, background:'#c8f23a', color:'#000', textDecoration:'none', fontFamily:'var(--font-heading,"Syne",sans-serif)', fontWeight:700, fontSize:'.88rem', letterSpacing:'.03em' }}
          >
            <FaArrowLeft aria-hidden="true"/> Back to Portfolio
          </Link>
        </div>
        <Footer/>
      </>
    );
  }

  const accent    = getAccent(project.category);
  const glowColor = hexToRgba(accent, .14);

  /* ── Default values for optional fields ── */
  const features     = project.features     || ['Custom UI/UX', 'Mobile Responsive', 'SEO Optimised', 'High Performance', 'Cross-browser Compatible'];
  const technologies = project.technologies || ['React', 'Framer Motion', 'CSS Modules', 'Vite'];
  const screenshots  = project.screenshots  || [];

  /* ── Structured data ── */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.details || project.description,
    applicationCategory: project.category,
    url: project.isExternal ? project.link : `https://minderfly.com/work/${id}`,
    creator: { '@type': 'Organization', name: 'Minderfly', url: 'https://minderfly.com' },
    ...(project.thumbnail ? { screenshot: project.thumbnail } : {}),
    ...(technologies?.length ? { runtimePlatform: technologies.join(', ') } : {}),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position:1, name:'Home',      item:'https://minderfly.com/' },
      { '@type': 'ListItem', position:2, name:'Portfolio', item:'https://minderfly.com/work' },
      { '@type': 'ListItem', position:3, name:project.title, item:`https://minderfly.com/work/${id}` },
    ],
  };

  return (
    <>
      <SEOHead
        title={`${project.title} — Case Study | Minderfly`}
        description={`${project.title}: ${project.description} Built by Minderfly — ${project.category} specialists.`}
        keywords={`${project.title}, ${project.category}, Minderfly portfolio, ${technologies.slice(0,5).join(', ')}, case study`}
        canonical={`https://minderfly.com/work/${id}`}
        ogImage={project.thumbnail}
        ogType="article"
        schema={[schema, breadcrumb]}
      />

      <Navbar/>

      {/* CSS custom property for accent throughout */}
      <style>{`
        .pd-page { --pd-accent: ${accent}; --pd-glow: ${glowColor}; }
      `}</style>

      <div className="pd-page">
        <div className="pd-container">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="pd-breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link to="/work">Portfolio</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{project.title}</span>
          </nav>

          {/* Back link */}
          <motion.div
            initial={{ opacity:0, x:-16 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:.5, ease:[.22,1,.36,1] }}
          >
            <Link to="/work" className="pd-back" aria-label="Back to portfolio">
              <FaArrowLeft aria-hidden="true"/> Back to Portfolio
            </Link>
          </motion.div>

          {/* ── HERO ── */}
          <section className="pd-hero" aria-label={`${project.title} overview`}>

            {/* Copy */}
            <motion.div
              className="pd-hero-copy"
              initial={{ opacity:0, y:24 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:.7, ease:[.22,1,.36,1] }}
              itemScope
              itemType="https://schema.org/SoftwareApplication"
            >
              <meta itemProp="name"        content={project.title} />
              <meta itemProp="description" content={project.description} />

              <div className="pd-eyebrow">
                <span className="pd-eyebrow-line" aria-hidden="true"/>
                <span className="pd-category-tag" itemProp="applicationCategory">{project.category}</span>
              </div>

              <h1 className="pd-title" itemProp="name">{project.title}</h1>

              <p className="pd-description" itemProp="description">
                {project.details || project.description}
              </p>

              {project.stats && (
                <div className="pd-stats-badge">
                  <span className="pd-stats-badge-dot" aria-hidden="true"/>
                  {project.stats}
                </div>
              )}

              <div className="pd-hero-actions">
                {project.isExternal ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-btn-primary"
                    aria-label={`View ${project.title} live project`}
                    itemProp="url"
                  >
                    Live Preview <FaExternalLinkAlt style={{ fontSize:'.7rem' }} aria-hidden="true"/>
                  </a>
                ) : (
                  <span className="pd-btn-ghost" aria-label="Internal project — no public link">
                    Internal Project
                  </span>
                )}
              </div>
            </motion.div>

            {/* Thumbnail */}
            <motion.div
              className="pd-hero-visual"
              initial={{ opacity:0, scale:.96 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ duration:.85, delay:.15, ease:[.22,1,.36,1] }}
            >
              <div className="pd-thumbnail-glow" aria-hidden="true"/>
              <div className="pd-thumbnail-frame">
                {project.thumbnail && !imgError ? (
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} — project screenshot`}
                    loading="eager"
                    onError={() => setImgError(true)}
                    itemProp="screenshot"
                  />
                ) : (
                  /* Fallback pattern */
                  <div style={{ width:'100%', height:'100%', background:'repeating-linear-gradient(45deg, #111 0px, #111 12px, #0d0c0a 12px, #0d0c0a 24px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontFamily:'var(--font-heading,"Syne",sans-serif)', fontSize:'1.5rem', fontWeight:800, color:'rgba(255,255,255,.08)', letterSpacing:'-.02em' }}>{project.title}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </section>

          {/* ── FEATURES + TECH STACK ── */}
          <section
            className="pd-info-grid"
            aria-label="Features and technology stack"
          >
            {/* Features */}
            <Fade>
              <div className="pd-card">
                <div className="pd-card-header">
                  <div className="pd-card-icon" aria-hidden="true"><FaRocket/></div>
                  <h2 className="pd-card-title">Key Features</h2>
                </div>
                <ul className="pd-feature-list">
                  {features.map((f, i) => (
                    <li key={i} className="pd-feature-item">
                      <FaCheckCircle className="pd-feature-check" aria-hidden="true"/>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Fade>

            {/* Technologies */}
            <Fade delay={.08}>
              <div className="pd-card">
                <div className="pd-card-header">
                  <div className="pd-card-icon" aria-hidden="true"><FaCode/></div>
                  <h2 className="pd-card-title">Technologies Used</h2>
                </div>
                <div className="pd-tech-grid">
                  {technologies.map((t, i) => (
                    <span key={i} className="pd-tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            </Fade>
          </section>

          {/* ── SCREENSHOTS GALLERY ── */}
          {screenshots.length > 0 && (
            <section className="pd-gallery-section" aria-label="Project screenshots">
              <Fade>
                <div className="pd-gallery-header">
                  <span style={{ width:24, height:1, background:accent, display:'block' }} aria-hidden="true"/>
                  <h2 className="pd-gallery-title">Visual Showcase</h2>
                </div>
              </Fade>
              <div className="pd-gallery-grid">
                {screenshots.map((src, i) => (
                  <motion.div
                    key={i}
                    className="pd-screenshot"
                    initial={{ opacity:0, y:18 }}
                    whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true, margin:'-40px' }}
                    transition={{ duration:.55, delay:i*.08, ease:[.22,1,.36,1] }}
                  >
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* ── BOTTOM CTA ── */}
          <Fade>
            <div className="pd-cta-banner" aria-label="Start a project">
              <h2 className="pd-cta-title">Ready to build something like this?</h2>
              <p className="pd-cta-sub">
                Let's collaborate to build an exceptional digital product for your business. Tell us your problem and we'll send a fixed-price proposal within 24 hours.
              </p>
              <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                <Link
                  to="/contact"
                  style={{ display:'inline-flex', alignItems:'center', gap:9, padding:'13px 30px', borderRadius:10, background:accent, color:'#000', textDecoration:'none', fontFamily:'var(--font-heading,"Syne",sans-serif)', fontWeight:700, fontSize:'.88rem', letterSpacing:'.02em', transition:'transform .2s, background .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; }}
                >
                  Start Your Project
                  <FaArrowRight style={{ fontSize:'.75rem' }} aria-hidden="true"/>
                </Link>
                <Link
                  to="/work"
                  style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 26px', borderRadius:10, background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', color:'rgba(237,232,222,.6)', textDecoration:'none', fontSize:'.86rem', letterSpacing:'.02em', transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,.1)'; e.currentTarget.style.color='#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,.06)'; e.currentTarget.style.color='rgba(237,232,222,.6)'; }}
                >
                  View More Work
                </Link>
              </div>
            </div>
          </Fade>

        </div>
      </div>

      <Footer/>
    </>
  );
};

export default ProjectDetail;