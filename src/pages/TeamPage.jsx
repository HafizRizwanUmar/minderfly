import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useModal } from '../context/ModalContext';
import { TEAM } from '../data/team';
import './TeamPage.css';

/* ── Design tokens ── */
const ACCENT = '#b8d63a';

/* ── Reveal helper ── */
const Fade = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-48px' }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ── VALUES ── */
const VALUES = [
  { icon: '★', title: 'Quality Without Compromise',  desc: 'We treat every project as a product — architecture, design, and delivery held to the same standard whether MVP or enterprise.' },
  { icon: '◷', title: 'On Time, Every Time',          desc: 'Missed deadlines cost clients money and erode trust. We scope carefully, communicate early on blockers, and deliver on milestones.' },
  { icon: '◎', title: 'Clients as Partners',           desc: "We are invested in your product's success beyond the invoice. A client's win is the studio's best marketing." },
  { icon: '</>', title: 'Honest Engineering',           desc: 'We recommend what is right for your project, not what maximises hours. If a simpler solution exists, we say so.' },
  { icon: '⊕', title: 'Global Perspective',            desc: 'Based in Pakistan, serving clients across the US, UK, UAE, and Australia. We communicate across time zones without friction.' },
  { icon: '⊛', title: 'Continuous Improvement',        desc: "Yesterday's best practice is tomorrow's legacy debt. Learning isn't optional here." },
];

const STATS = [
  { value: '120+', label: 'Projects Delivered',  sub: 'Across 12 countries' },
  { value: '5+',   label: 'Years of Experience', sub: 'In digital product development' },
  { value: '98%',  label: 'Client Satisfaction', sub: 'Verified post-project surveys' },
  { value: '40+',  label: 'Happy Clients',        sub: 'From startups to enterprises' },
];

const ROLES_OPEN = [
  { title: 'Senior React Developer', type: 'Remote', desc: 'We are looking for a React engineer with 3+ years building production SaaS products. TypeScript, testing discipline, and performance focus required.' },
  { title: 'Flutter Developer',      type: 'Remote', desc: 'Join our mobile team building cross-platform apps for global clients. Riverpod/Bloc experience and at least one published App Store app required.' },
  { title: 'UI/UX Designer',        type: 'Remote', desc: 'A Figma-first designer who can move from research to high-fidelity mockups. Design system experience and dev handoff skills essential.' },
];

const STACK = ['React', 'Next.js', 'Node.js', 'MongoDB', 'Flutter', 'Dart', 'TypeScript', 'Express', 'Figma', 'AWS', 'Vercel', 'GraphQL'];

/* ── TEAM MEMBER CARD ── */
const MemberCard = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    style={{ '--mc': member.accentColor }}
  >
    <Link
      to={`/team/${member.id}`}
      className="tc-card"
      itemScope
      itemType="https://schema.org/Person"
      aria-label={`${member.name} — ${member.role} profile`}
    >
      {/* ── Photo ── */}
      <div className="tc-photo-wrap">
        <img
          src={member.photo}
          alt={`${member.name}, ${member.role} at Minderfly`}
          className="tc-photo"
          itemProp="image"
          loading="lazy"
        />
        {/* Bottom gradient */}
        <div className="tc-photo-overlay" aria-hidden="true" />

        {/* Role pill — top left */}
        <div className="tc-role-badge" style={{ color: member.accentColor, borderColor: member.accentBorder, background: member.accentBg }}>
          {member.role}
        </div>

        {/* Name block — bottom */}
        <div className="tc-photo-footer">
          <h3 className="tc-name" itemProp="name">{member.name}</h3>
          <div className="tc-location">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7 6 11 6 11S2.5 7 2.5 4.5A3.5 3.5 0 0 1 6 1Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <circle cx="6" cy="4.5" r="1.2" fill="currentColor"/>
            </svg>
            {member.location}
          </div>
        </div>

        {/* Hover CTA */}
        <div className="tc-hover-cta" aria-hidden="true">
          <span className="tc-hover-cta__text">View Profile</span>
          <span className="tc-hover-cta__arrow">→</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="tc-body">
        <div className="tc-accent-line" aria-hidden="true" />
        <meta itemProp="jobTitle" content={member.role} />
        <p className="tc-bio" itemProp="description">{member.bio}</p>
        <div className="tc-divider" aria-hidden="true" />
        <div className="tc-skills">
          <p className="tc-skills__label">Core Skills</p>
          <div className="tc-skills__pills">
            {member.skills.slice(0, 4).map(skill => (
              <span key={skill} className="tc-skill-pill" style={{ background: member.accentBg, borderColor: member.accentBorder, color: member.accentColor }}>
                {skill}
              </span>
            ))}
            {member.skills.length > 4 && (
              <span className="tc-skill-pill tc-skill-pill--more">+{member.skills.length - 4}</span>
            )}
          </div>
        </div>
        <div className="tc-card__footer">
          <span className="tc-view-link">
            Read Full Profile
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
const TeamPage = () => {
  const { openModal } = useModal();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Minderfly',
    url: 'https://www.minderfly.com',
    logo: 'https://www.minderfly.com/logo.png',
    description: 'Minderfly is a specialist software development studio building MERN stack platforms, Flutter apps, Chrome extensions, and VS Code tools for clients worldwide.',
    foundingLocation: { '@type': 'Place', addressLocality: 'Lahore', addressCountry: 'PK' },
    areaServed: 'Worldwide',
    member: TEAM.map(m => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.role,
      description: m.bio,
      image: `https://www.minderfly.com${m.photo}`,
      url: `https://www.minderfly.com/team/${m.id}`,
      worksFor: { '@type': 'Organization', name: 'Minderfly' },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.minderfly.com/' },
      { '@type': 'ListItem', position: 2, name: 'Team', item: 'https://www.minderfly.com/team' },
    ],
  };

  return (
    <>
      <SEOHead
        title="Our Team — Software Engineers & Designers | Minderfly"
        description="Meet the team behind Minderfly — a specialist software studio building MERN web platforms, Flutter mobile apps, Chrome extensions, and VS Code tools for clients across the US, UK, UAE, and Australia."
        keywords="software development team, MERN stack developers Pakistan, Flutter developer, Chrome extension developer, web development agency, remote software engineers"
        canonical="https://www.minderfly.com/team"
        schema={[orgSchema, breadcrumb]}
      />

      <Navbar />

      <div className="tp-page">

        {/* ── HERO ── */}
        <section className="tp-hero" aria-label="Team overview">
          <div className="tp-hero__bg" aria-hidden="true" />
          <div className="tp-container">
            {/* Breadcrumb */}
            <nav className="tp-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">Team</span>
            </nav>

            <Fade>
              <div className="tp-eyebrow">
                <span className="tp-eyebrow__dot" aria-hidden="true" />
                The People
              </div>
            </Fade>

            <motion.h1
              className="tp-hero__title"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Small team.<br />
              <em className="tp-hero__title-em">Outsized output.</em>
            </motion.h1>

            <motion.p
              className="tp-hero__sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.18 }}
            >
              Minderfly is a specialist software studio based in Lahore, Pakistan. A lean, focused team with a global client base — building web platforms, mobile apps, and developer tools that people actually use.
            </motion.p>

            <motion.div
              className="tp-hero__actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
            >
              <button
                className="tp-btn-primary"
                onClick={() => openModal('General Inquiry')}
              >
                Work With Us
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2 6.5h9M6.5 2l4.5 4.5L6.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <Link to="/work" className="tp-btn-ghost">See Our Work</Link>
            </motion.div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="tp-stats-bar" aria-label="Agency statistics">
          <div className="tp-container">
            <div className="tp-stats-grid">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="tp-stat"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <strong className="tp-stat__val">{s.value}</strong>
                  <span className="tp-stat__label">{s.label}</span>
                  <span className="tp-stat__sub">{s.sub}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TEAM CARDS ── */}
        <section className="tp-team-section" aria-label="Team members">
          <div className="tp-container">
            <Fade>
              <div className="tp-section-header">
                <div className="tp-section-eyebrow">Who We Are</div>
                <h2 className="tp-section-title">
                  Meet the team<br />
                  <span className="tp-section-title__muted">behind the work.</span>
                </h2>
              </div>
            </Fade>
            <div className="tp-team-grid">
              {TEAM.map((member, i) => (
                <MemberCard key={member.id} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <div className="tp-stack-bar" aria-label="Technologies we use">
          <div className="tp-container tp-stack-inner">
            <span className="tp-stack-label">Our Stack</span>
            <div className="tp-stack-pills">
              {STACK.map((t, i) => (
                <motion.span
                  key={t}
                  className="tp-stack-pill"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* ── VALUES ── */}
        <section className="tp-values-section" aria-label="Our values">
          <div className="tp-container">
            <Fade>
              <div className="tp-section-header">
                <div className="tp-section-eyebrow">How We Operate</div>
                <h2 className="tp-section-title">
                  The principles we<br />
                  <span className="tp-section-title__muted">work by.</span>
                </h2>
              </div>
            </Fade>
            <div className="tp-values-grid">
              {VALUES.map((v, i) => (
                <Fade key={v.title} delay={i * 0.06}>
                  <article className="tp-value-card">
                    <div className="tp-value-card__icon">{v.icon}</div>
                    <h3 className="tp-value-card__title">{v.title}</h3>
                    <p className="tp-value-card__desc">{v.desc}</p>
                  </article>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* ── OPEN ROLES ── */}
        <section className="tp-jobs-section" aria-label="Open positions">
          <div className="tp-container">
            <div className="tp-jobs-grid">
              <Fade>
                <div className="tp-jobs-copy">
                  <div className="tp-section-eyebrow">We're Hiring</div>
                  <h2 className="tp-section-title">
                    Join the<br />
                    <span className="tp-section-title__muted">team.</span>
                  </h2>
                  <p className="tp-jobs-desc">
                    Remote-first studio. If you are a precise, curious engineer or designer who wants to work on interesting products for global clients, we want to hear from you.
                  </p>
                  <a
                    href="mailto:careers@minderfly.com"
                    className="tp-email-link"
                  >
                    careers@minderfly.com →
                  </a>
                </div>
              </Fade>
              <Fade delay={0.1}>
                <div className="tp-job-cards">
                  {ROLES_OPEN.map(job => (
                    <div key={job.title} className="tp-job-card">
                      <div className="tp-job-card__header">
                        <h3 className="tp-job-card__title">{job.title}</h3>
                        <span className="tp-job-card__type">{job.type}</span>
                      </div>
                      <p className="tp-job-card__desc">{job.desc}</p>
                      <a
                        href={`mailto:careers@minderfly.com?subject=Application: ${encodeURIComponent(job.title)}`}
                        className="tp-job-card__apply"
                      >
                        Apply for this role →
                      </a>
                    </div>
                  ))}
                </div>
              </Fade>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="tp-cta-section" aria-label="Start a project">
          <div className="tp-container">
            <Fade>
              <div className="tp-cta-banner">
                <div className="tp-cta-banner__bg" aria-hidden="true" />
                <div className="tp-cta-banner__content">
                  <div className="tp-cta-banner__eyebrow">Let's Build Together</div>
                  <h2 className="tp-cta-banner__title">Ready to work with a team that ships?</h2>
                  <p className="tp-cta-banner__desc">
                    Tell us what you are building. We will scope it, price it fairly, and start within the week.
                  </p>
                </div>
                <div className="tp-cta-banner__actions">
                  <button className="tp-btn-dark" onClick={() => openModal('New Project Inquiry')}>
                    Start a Project →
                  </button>
                  <a href="mailto:hello@minderfly.com" className="tp-btn-outline-dark">
                    hello@minderfly.com
                  </a>
                </div>
              </div>
            </Fade>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
};

export default TeamPage;