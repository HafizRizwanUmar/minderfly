import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useModal } from '../context/ModalContext';
import { TEAM } from '../data/team';
import './TeamMemberPage.css';

/* ── Fade helper ── */
const Fade = ({ children, delay = 0, y = 20 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ── Social icons ── */
const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const TeamMemberPage = () => {
  const { id } = useParams();
  const { openModal } = useModal();
  const member = TEAM.find(m => m.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!member) {
    return (
      <>
        <Navbar />
        <div className="tmp-notfound">
          <h1>Member Not Found</h1>
          <p>We couldn't find a team member with that profile.</p>
          <Link to="/team" className="tmp-btn-primary" style={{ background: '#b8d63a', color: '#07090a' }}>
            ← Back to Team
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const ac = member.accentColor;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: `https://minderfly.com${member.photo}`,
    url: `https://minderfly.com/team/${member.id}`,
    worksFor: { '@type': 'Organization', name: 'Minderfly', url: 'https://minderfly.com' },
    address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' },
    sameAs: [member.linkedin, member.github].filter(Boolean),
    knowsAbout: member.skills,
  };

  return (
    <>
      <SEOHead
        title={`${member.name} — ${member.role} | Minderfly Team`}
        description={`${member.bio} Based in ${member.location}. Part of the Minderfly software development studio.`}
        keywords={`${member.name}, ${member.role}, Minderfly team, ${member.skills.slice(0, 4).join(', ')}, software developer Pakistan`}
        canonical={`https://minderfly.com/team/${member.id}`}
        ogImage={`https://minderfly.com${member.photo}`}
        schema={[schema]}
      />

      <Navbar />

      <div className="tmp-page" style={{ '--tmp-ac': ac }}>

        {/* ── HERO ── */}
        <header className="tmp-hero">
          <div className="tmp-hero__bg" aria-hidden="true" />
          <div className="tmp-container">

            {/* Breadcrumb */}
            <nav className="tmp-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link to="/team">Team</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{member.name}</span>
            </nav>

            <div className="tmp-hero__layout">
              {/* ── Photo ── */}
              <motion.div
                className="tmp-photo-wrap"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="tmp-photo-glow" aria-hidden="true" />
                <div className="tmp-photo-frame">
                  <img
                    src={member.photo}
                    alt={`${member.name}, ${member.role} at Minderfly`}
                    className="tmp-photo"
                    loading="eager"
                    itemProp="image"
                  />
                </div>
                {/* Social badge */}
                <div className="tmp-social-row">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      className="tmp-social-btn" aria-label={`${member.name} on LinkedIn`}>
                      <LinkedInIcon />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer"
                      className="tmp-social-btn" aria-label={`${member.name} on GitHub`}>
                      <GithubIcon />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* ── Copy ── */}
              <div className="tmp-hero__copy">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Role badge */}
                  <div className="tmp-role-badge">
                    <span className="tmp-role-badge__dot" aria-hidden="true" />
                    {member.role}
                  </div>

                  <h1 className="tmp-name" itemProp="name">{member.name}</h1>

                  <div className="tmp-location">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7 6 11 6 11S2.5 7 2.5 4.5A3.5 3.5 0 0 1 6 1Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                      <circle cx="6" cy="4.5" r="1.2" fill="currentColor"/>
                    </svg>
                    {member.location}
                  </div>

                  <p className="tmp-bio" itemProp="description">{member.bio}</p>

                  {/* Skills */}
                  <div className="tmp-skills-wrap">
                    {member.skills.map(s => (
                      <span key={s} className="tmp-skill-pill">{s}</span>
                    ))}
                  </div>

                  {/* Profiles */}
                  {member.profiles && member.profiles.length > 0 && (
                    <div className="tmp-profiles-wrap" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
                      {member.profiles.map(p => (
                        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="tmp-btn-ghost" style={{ padding: '8px 16px', fontSize: '0.8rem', gap: '6px' }}>
                          <span style={{ fontWeight: 700, opacity: 0.7 }}>{p.icon}</span> {p.name}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="tmp-hero__actions">
                    <button className="tmp-btn-primary" onClick={() => openModal(`Project Inquiry — ${member.name}`)}>
                      Work Together
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2.5 7h9M7.5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <Link to="/team" className="tmp-btn-ghost">← All Team</Link>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </header>

        <div className="tmp-container tmp-body">

          {/* ── Stats strip ── */}
          {member.highlights?.length > 0 && (
            <Fade>
              <div className="tmp-stats-strip">
                {member.highlights.map((h, i) => (
                  <div key={h.label} className="tmp-stat">
                    <strong className="tmp-stat__val">{h.value}</strong>
                    <span className="tmp-stat__lbl">{h.label}</span>
                  </div>
                ))}
              </div>
            </Fade>
          )}

          {/* ── Long Bio ── */}
          <section className="tmp-section" aria-label="About">
            <Fade>
              <h2 className="tmp-section-title">
                <span className="tmp-section-title__line" aria-hidden="true" />
                About {member.name.split(' ')[0]}
              </h2>
            </Fade>
            <Fade delay={0.06}>
              <div className="tmp-longbio">
                {member.longBio?.split('\n\n').map((para, i) => (
                  <p key={i} className="tmp-longbio__para">{para}</p>
                ))}
              </div>
            </Fade>
          </section>

          {/* ── Expertise cards ── */}
          {member.expertise?.length > 0 && (
            <section className="tmp-section" aria-label="Areas of expertise">
              <Fade>
                <h2 className="tmp-section-title">
                  <span className="tmp-section-title__line" aria-hidden="true" />
                  Areas of Expertise
                </h2>
              </Fade>
              <div className="tmp-expertise-grid">
                {member.expertise.map((e, i) => (
                  <Fade key={e.title} delay={i * 0.08}>
                    <div className="tmp-expertise-card">
                      <h3 className="tmp-expertise-card__title">{e.title}</h3>
                      <p className="tmp-expertise-card__desc">{e.desc}</p>
                    </div>
                  </Fade>
                ))}
              </div>
            </section>
          )}

          {/* ── Other team members ── */}
          <section className="tmp-section" aria-label="Other team members">
            <Fade>
              <h2 className="tmp-section-title">
                <span className="tmp-section-title__line" aria-hidden="true" />
                Also on the Team
              </h2>
            </Fade>
            <div className="tmp-others-grid">
              {TEAM.filter(m => m.id !== member.id).map((m, i) => (
                <Fade key={m.id} delay={i * 0.09}>
                  <Link
                    to={`/team/${m.id}`}
                    className="tmp-other-card"
                    style={{ '--oc': m.accentColor }}
                  >
                    <div className="tmp-other-card__img-wrap">
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="tmp-other-card__img"
                        loading="lazy"
                      />
                    </div>
                    <div className="tmp-other-card__body">
                      <div className="tmp-other-card__role">{m.role}</div>
                      <h3 className="tmp-other-card__name">{m.name}</h3>
                    </div>
                    <div className="tmp-other-card__arrow" aria-hidden="true">→</div>
                  </Link>
                </Fade>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <Fade>
            <div className="tmp-cta">
              <h2 className="tmp-cta__title">
                Want to work with {member.name.split(' ')[0]}?
              </h2>
              <p className="tmp-cta__sub">
                Tell us about your project and we'll match you with the right team members and send a fixed-price proposal within 24 hours.
              </p>
              <div className="tmp-cta__actions">
                <button className="tmp-btn-primary" onClick={() => openModal('Project Inquiry')}>
                  Start a Project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7h9M7.5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <Link to="/team" className="tmp-btn-ghost">View Full Team</Link>
              </div>
            </div>
          </Fade>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default TeamMemberPage;
