import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import './Team.css';

// Import your actual team member images
import teamMemberImg  from '../assets/team-member.png';
import teamMemberImg1 from '../assets/team-member1.png';

/* ═══════════════════════════════════════════════
   Team Section — Minderfly
   Full-bleed editorial portrait carousel
   Analog-inspired · amber accent
   Full SEO structured data
═══════════════════════════════════════════════ */

/* ── Team data ── */
const TEAM = [
  {
    id: 1,
    firstName: 'HAFIZ',
    lastName:  'RIZWAN',
    name:      'Hafiz Rizwan Umar',
    role:      'Full Stack Developer',
    location:  'Lahore, Pakistan',
    bio:       'Builds Chrome extensions, VS Code tools, Windows apps, and full-stack web platforms. 5+ years shipping production software.',
    image:     teamMemberImg,
    skills:    ['React', 'Node.js', 'Flutter', 'VS Code API', 'Chrome Extensions'],
    social: {
      linkedin: 'https://www.linkedin.com/in/hafizrizwanumar',
      github:   'https://github.com/hafizrizwanumar',
    },
  },
  {
    id: 2,
    firstName: 'AMMARA',
    lastName:  'LOHANI',
    name:      'Ammara Lohani',
    role:      'UI/UX Designer',
    location:  'Karachi, Pakistan',
    bio:       'Crafts intuitive, visually striking interfaces from wireframe to pixel-perfect handoff. Specialises in design systems and product identity.',
    image:     teamMemberImg1,
    skills:    ['Figma', 'Design Systems', 'Prototyping', 'Brand Identity', 'Motion Design'],
    social: {
      linkedin: null,
      github:   null,
    },
  },
];

/* ── SEO schema ── */
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Minderfly',
  url: 'https://minderfly.com',
  member: TEAM.map(m => ({
    '@type': 'Person',
    name: m.name,
    jobTitle: m.role,
    worksFor: { '@type': 'Organization', name: 'Minderfly' },
    sameAs: [m.social.linkedin, m.social.github].filter(Boolean),
  })),
};

/* ── Motion variants ── */
const slideVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ?  60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -60 :  60 }),
};

const bgVariants = {
  enter:  { opacity: 0 },
  center: { opacity: 1 },
  exit:   { opacity: 0 },
};

/* ═══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */
const Team = () => {
  const [index,  setIndex]  = useState(0);
  const [dir,    setDir]    = useState(1);

  const goTo = (next) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };
  const next = () => goTo((index + 1) % TEAM.length);
  const prev = () => goTo((index - 1 + TEAM.length) % TEAM.length);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  const member = TEAM[index];

  return (
    <section id="team" className="team-section" aria-label="Meet the Minderfly team">
      {/* SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Grain */}
      <div className="team-grain" aria-hidden="true"/>

      {/* Eyebrow */}
      <div className="team-eyebrow" aria-hidden="true">
        <span className="team-eyebrow-line"/>
        The Team
      </div>

      <div className="team-container">

        {/* Side nav */}
        <nav className="team-side-nav" aria-label="Section links">
          <a href="#services" className="side-nav-link">Services</a>
          <a href="#work"     className="side-nav-link">Work</a>
          <a href="#contact"  className="side-nav-link">Contact</a>
        </nav>

        {/* Ghost background text */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={member.id + '-bg'}
            className="team-bg-text"
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: .35 }}
            aria-hidden="true"
          >
            {member.firstName}
            <br/>
            {member.lastName}
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <button className="team-nav-btn team-nav-prev" onClick={prev} aria-label="Previous team member">
          <FaChevronLeft aria-hidden="true"/>
        </button>
        <button className="team-nav-btn team-nav-next" onClick={next} aria-label="Next team member">
          <FaChevronRight aria-hidden="true"/>
        </button>

        {/* Main content */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={member.id}
            className="team-content"
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: .52, ease: [.22,1,.36,1] }}
            itemScope
            itemType="https://schema.org/Person"
          >
            <meta itemProp="name"     content={member.name}  />
            <meta itemProp="jobTitle" content={member.role}  />

            {/* Role + location */}
            <div className="team-role-col" aria-label="Role and location">
              <div className="team-role-text">
                <span itemProp="jobTitle">{member.role}</span>
                <br/>
                <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="addressLocality">{member.location}</span>
                </span>
              </div>
              {/* Bio */}
              <p style={{
                fontFamily: 'inherit',
                fontSize: '.82rem',
                fontWeight: 300,
                color: 'rgba(237,232,222,.38)',
                lineHeight: 1.72,
                maxWidth: 200,
                marginTop: '1rem',
                textAlign: 'right',
              }} itemProp="description">{member.bio}</p>
            </div>

            {/* Portrait */}
            <div className="team-portrait-col">
              <figure className="team-image-wrapper" style={{ margin: 0 }}>
                <img
                  src={member.image}
                  alt={`${member.name} — ${member.role} at Minderfly`}
                  className="team-image"
                  loading="lazy"
                  itemProp="image"
                />
              </figure>
            </div>

            {/* Name */}
            <div className="team-name-col">
              <h2 className="team-name" aria-label={member.name}>
                <span className="team-name-first">{member.firstName}</span>
                <span className="team-name-last">{member.lastName}</span>
              </h2>
              {/* Skills */}
              <div className="team-skills" role="list" aria-label="Skills">
                {member.skills.map(s => (
                  <span key={s} className="skill-tag" role="listitem">{s}</span>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="team-social-col">
              <nav aria-label={`${member.name} social links`}>
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    itemProp="sameAs"
                  >
                    <FaLinkedin aria-hidden="true"/> LinkedIn
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on GitHub`}
                    itemProp="sameAs"
                  >
                    <FaGithub aria-hidden="true"/> GitHub
                  </a>
                )}
              </nav>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Footer — counter + dots */}
        <div className="team-footer" aria-label="Team navigation">
          <div className="team-counter" aria-live="polite" aria-label={`Member ${index + 1} of ${TEAM.length}`}>
            <span className="counter-current">{String(index + 1).padStart(2,'0')}</span>
            <span className="counter-divider" aria-hidden="true">/</span>
            <span className="counter-total">{String(TEAM.length).padStart(2,'0')}</span>
          </div>

          <div className="team-pagination" role="tablist" aria-label="Select team member">
            {TEAM.map((m, i) => (
              <button
                key={m.id}
                role="tab"
                aria-selected={i === index}
                aria-label={`View ${m.name}`}
                className={`pagination-dot${i === index ? ' active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Team;