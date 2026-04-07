import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useModal } from '../context/ModalContext';
import './TeamPage.css';

/* ─────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────── */
const ACCENT  = '#c8f23a';
const BG      = '#050505';
const WIRE    = 'rgba(255,255,255,0.07)';
const MAX_W   = '1280px';
const PAD     = { padding: '0 3rem' };

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const TEAM = [
  {
    name: 'Hafiz Rizwan Umar',
    role: 'Founder & Lead Engineer',
    bio: 'Full-stack architect and the technical mind behind Minderfly. Rizwan specialises in scalable MERN platforms, Chrome extension ecosystems, and Flutter cross-platform apps. He has shipped products used by tens of thousands of users globally.',
    skills: ['MERN Stack', 'Flutter', 'Chrome APIs', 'Node.js', 'TypeScript'],
    avatar: 'HR',
    // Replace with your actual photo URL or local import path
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    color: 'rgba(200,242,58,0.12)',
    border: 'rgba(200,242,58,0.25)',
    text: '#c8f23a',
    linkedin: 'https://linkedin.com/in/',
    github: 'https://github.com/',
    location: 'Lahore, Pakistan',
  },
  {
    name: 'Ammara Lohani',
    role: 'UI/UX Designer & Frontend Engineer',
    bio: 'Ammara bridges the gap between how software looks and how it works. She designs and implements interfaces for web and mobile products — with a focus on accessibility, performance, and visual craft that makes Minderfly projects stand apart.',
    skills: ['Figma', 'React', 'CSS Systems', 'UX Research', 'Design Systems'],
    avatar: 'AL',
    // Replace with your actual photo URL or local import path
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    color: 'rgba(100,180,255,0.1)',
    border: 'rgba(100,180,255,0.22)',
    text: '#64b4ff',
    linkedin: 'https://linkedin.com/in/',
    github: 'https://github.com/',
    location: 'Lahore, Pakistan',
  },
];

const VALUES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 2L13.09 8.26L20 9.27L15 14.14L16.18 21.02L11 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L11 2Z"/>
      </svg>
    ),
    title: 'Quality Without Compromise',
    desc: 'We treat every project as a product — architecture, design, and delivery are held to the same standard whether it is an MVP or an enterprise platform.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="9"/><path d="M11 6v5l3 3"/>
      </svg>
    ),
    title: 'On Time, Every Time',
    desc: 'Missed deadlines cost clients money and erode trust. We scope carefully, communicate early when blockers arise, and deliver on agreed milestones.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Clients as Partners',
    desc: "We are invested in your product's success beyond the invoice. Your launch milestones feel like ours — because a client's success is the agency's best marketing.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Honest Engineering',
    desc: 'We recommend what is right for your project, not what maximises billable hours. If a simpler solution exists, we say so.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Global Perspective',
    desc: 'Based in Pakistan, serving clients across the US, UK, UAE, and Australia. We understand different markets and communicate across time zones without friction.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Continuous Improvement',
    desc: 'We invest in tooling, process, and skills because yesterday\'s best practice is tomorrow\'s legacy debt. Learning is not optional here.',
  },
];

const STATS = [
  { value: '120+', label: 'Projects Delivered',   sub: 'Across 12 countries' },
  { value: '5+',   label: 'Years of Experience',  sub: 'In digital product development' },
  { value: '98%',  label: 'Client Satisfaction',  sub: 'Verified post-project surveys' },
  { value: '40+',  label: 'Happy Clients',         sub: 'From startups to enterprises' },
];

const ROLES_OPEN = [
  { title: 'Senior React Developer',   type: 'Remote', desc: 'We are looking for a React engineer with 3+ years building production SaaS products. TypeScript, testing discipline, and an eye for performance are required.' },
  { title: 'Flutter Developer',        type: 'Remote', desc: 'Join our mobile team building cross-platform apps for global clients. Riverpod / Bloc experience and at least one published App Store application required.' },
  { title: 'UI/UX Designer',          type: 'Remote', desc: 'A Figma-first designer who can move from research to high-fidelity mockups. Experience with design systems and developer handoff is essential.' },
];

const STACK = [
  'React', 'Next.js', 'Node.js', 'MongoDB', 'Flutter', 'Dart',
  'TypeScript', 'Express', 'Figma', 'AWS', 'Vercel', 'GraphQL',
];

/* ─────────────────────────────────────────
   HOOK + HELPERS
───────────────────────────────────────── */
const useReveal = (threshold = 0.1) => {
  const ref  = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
};

const reveal = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(22px)',
  transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
});

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7 6 11 6 11S2.5 7 2.5 4.5A3.5 3.5 0 0 1 6 1Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <circle cx="6" cy="4.5" r="1.2" fill="currentColor"/>
  </svg>
);

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
const TeamPage = () => {
  const { openModal } = useModal();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [heroRef,   heroVis]   = useReveal(0.05);
  const [statsRef,  statsVis]  = useReveal(0.2);
  const [teamRef,   teamVis]   = useReveal(0.05);
  const [stackRef,  stackVis]  = useReveal(0.1);
  const [valRef,    valVis]    = useReveal(0.05);
  const [jobsRef,   jobsVis]   = useReveal(0.05);
  const [ctaRef,    ctaVis]    = useReveal(0.15);

  /* ── Structured data ── */
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Minderfly',
    url: 'https://minderfly.com',
    logo: 'https://minderfly.com/logo.png',
    description: 'Minderfly is a specialist software development studio building MERN stack platforms, Flutter apps, Chrome extensions, and VS Code tools for clients worldwide.',
    foundingLocation: { '@type': 'Place', addressLocality: 'Lahore', addressCountry: 'PK' },
    areaServed: 'Worldwide',
    member: TEAM.map(m => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.role,
      description: m.bio,
      worksFor: { '@type': 'Organization', name: 'Minderfly' },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://minderfly.com/' },
      { '@type': 'ListItem', position: 2, name: 'Team',  item: 'https://minderfly.com/team' },
    ],
  };

  return (
    <>
      <SEOHead
        title="Our Team — Software Engineers & Designers | Minderfly"
        description="Meet the team behind Minderfly — a specialist software studio building MERN web platforms, Flutter mobile apps, Chrome extensions, and VS Code tools for clients across the US, UK, UAE, and Australia."
        keywords="software development team, MERN stack developers Pakistan, Flutter developer for hire, Chrome extension developer, VS Code extension developer, software agency team, web development agency team, remote software engineers"
        canonical="https://minderfly.com/team"
        schema={[orgSchema, breadcrumbSchema]}
      />

      <Navbar />

      <main style={{ background: BG, color: '#fff', fontFamily: 'var(--font-body)' }}>

        {/* ════════════════════════════════
            HERO
        ════════════════════════════════ */}
        <section
          style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', padding: '140px 0 90px', overflow: 'hidden' }}
          aria-label="Team overview"
          className="team-hero-section"
        >
          {/* grid */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 80% 70% at 30% 50%,black,transparent)', pointerEvents: 'none' }}/>
          {/* glow */}
          <div aria-hidden="true" style={{ position: 'absolute', right: '-5%', top: '10%', width: '55%', height: '75%', background: 'radial-gradient(ellipse at 70% 40%,rgba(200,242,58,.055) 0%,transparent 65%)', pointerEvents: 'none' }}/>
          {/* large decorative number */}
          <div aria-hidden="true" style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-heading)', fontSize: 'clamp(160px,18vw,260px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: 'rgba(255,255,255,.025)', userSelect: 'none', pointerEvents: 'none' }}>02</div>

          <div style={{ maxWidth: MAX_W, margin: '0 auto', width: '100%' }} className="team-page-wrapper">
            {/* breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'rgba(255,255,255,.3)', marginBottom: '2.5rem' }}>
              <Link to="/"     style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Home</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page" style={{ color: 'rgba(255,255,255,.55)' }}>Team</span>
            </nav>

            <div ref={heroRef} style={{ maxWidth: 700 }}>
              {/* eyebrow */}
              <div style={{ ...reveal(heroVis), display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginBottom: '1.6rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'block' }}/>
                The People
              </div>

              <h1 style={{ ...reveal(heroVis, 60), fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem,6vw,5.5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.035em', color: '#fff', marginBottom: '1.5rem' }}>
                Small team.<br/>
                <span style={{ WebkitTextStroke: '1px rgba(255,255,255,.22)', color: 'transparent' }}>Outsized output.</span>
              </h1>

              <p style={{ ...reveal(heroVis, 120), fontSize: '1.1rem', fontWeight: 300, color: 'rgba(255,255,255,.45)', maxWidth: 540, lineHeight: 1.65, marginBottom: '2.5rem' }}>
                Minderfly is a specialist software studio based in Lahore, Pakistan. We are a lean, focused team with a global client base — building web platforms, mobile apps, and developer tools that people actually use.
              </p>

              <div style={{ ...reveal(heroVis, 180) }} className="team-hero-btns">
                <button
                  onClick={() => openModal('General Inquiry')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 28px', borderRadius: 100, background: ACCENT, border: 'none', color: '#000', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'background .2s,transform .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = 'none'; }}
                >
                  Work With Us <ArrowIcon/>
                </button>
                <Link
                  to="/work"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 100, background: 'none', border: `1px solid rgba(255,255,255,.15)`, color: 'rgba(255,255,255,.6)', fontSize: '0.9rem', textDecoration: 'none', transition: 'border-color .2s,color .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.4)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'; e.currentTarget.style.color = 'rgba(255,255,255,.6)'; }}
                >
                  See Our Work
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            STATS BAR
        ════════════════════════════════ */}
        <div ref={statsRef} aria-label="Agency statistics" style={{ borderTop: `1px solid ${WIRE}`, borderBottom: `1px solid ${WIRE}`, background: 'rgba(255,255,255,.02)' }}>
          <div style={{ maxWidth: MAX_W, margin: '0 auto' }} className="team-page-wrapper">
            <div className="team-stats-grid">
              {STATS.map((s, i) => (
                <div key={s.label} className="team-stat-item" style={{ ...reveal(statsVis, i * 80) }}>
                  <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>{s.value}</strong>
                  <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'rgba(255,255,255,.55)' }}>{s.label}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 300, color: 'rgba(255,255,255,.28)', textAlign: 'center' }}>{s.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════
            TEAM MEMBERS
        ════════════════════════════════ */}
        <section ref={teamRef} style={{ padding: '110px 0' }} aria-label="Team members">
          <div style={{ maxWidth: MAX_W, margin: '0 auto' }} className="team-page-wrapper">
            <div style={{ marginBottom: '4rem', ...reveal(teamVis) }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }}/>
                Who We Are
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
                Meet the team<br/>
                <span style={{ color: 'rgba(255,255,255,.28)' }}>behind the work.</span>
              </h2>
            </div>

            <div className="team-members-grid">
              {TEAM.map((member, i) => (
                <article
                  key={member.name}
                  itemScope itemType="https://schema.org/Person"
                  style={{ background: 'rgba(255,255,255,.03)', border: `1px solid rgba(255,255,255,.08)`, borderRadius: 20, overflow: 'hidden', transition: 'border-color .3s,transform .35s cubic-bezier(.22,1,.36,1)', display: 'flex', flexDirection: 'column', ...reveal(teamVis, i * 100) }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = member.border; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'; e.currentTarget.style.transform = 'none'; }}
                >
                  {/* ── Photo panel ── */}
                  <div style={{ position: 'relative', height: 300, overflow: 'hidden', flexShrink: 0 }}>
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={`${member.name}, ${member.role} at Minderfly`}
                        itemProp="image"
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', filter: 'brightness(.82) saturate(1.05)', transition: 'transform .7s cubic-bezier(.22,1,.36,1)' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    ) : (
                      /* Fallback if no photo provided */
                      <div style={{ width: '100%', height: '100%', background: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '5rem', fontWeight: 800, color: member.text, opacity: 0.5 }}>
                        {member.avatar}
                      </div>
                    )}

                    {/* gradient overlay — fades photo into card body */}
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 35%, rgba(5,5,5,.85) 100%)` }}/>

                    {/* role badge — floats top-left */}
                    <div style={{ position: 'absolute', top: 16, left: 16, padding: '5px 14px', borderRadius: 100, background: 'rgba(5,5,5,.75)', border: `1px solid ${member.border}`, backdropFilter: 'blur(8px)', fontSize: '0.7rem', fontWeight: 600, color: member.text, letterSpacing: '0.06em' }}>
                      {member.role}
                    </div>

                    {/* social links — float top-right */}
                    <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
                      {[
                        { href: member.linkedin, icon: <LinkedInIcon/>, label: 'LinkedIn' },
                        { href: member.github,   icon: <GithubIcon/>,   label: 'GitHub'   },
                      ].map(s => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                          aria-label={`${member.name} on ${s.label}`}
                          style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(5,5,5,.7)', border: '1px solid rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'all .2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = member.color; e.currentTarget.style.color = member.text; e.currentTarget.style.borderColor = member.border; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(5,5,5,.7)'; e.currentTarget.style.color = 'rgba(255,255,255,.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'; }}
                        >{s.icon}</a>
                      ))}
                    </div>

                    {/* Name overlaid on photo bottom — uses gradient */}
                    <div style={{ position: 'absolute', bottom: 20, left: 24 }}>
                      <h3 itemProp="name" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '0.2rem', textShadow: '0 2px 12px rgba(0,0,0,.5)' }}>
                        {member.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem', color: 'rgba(255,255,255,.5)' }}>
                        <PinIcon/> {member.location}
                      </div>
                    </div>
                  </div>

                  {/* ── Content panel ── */}
                  <div style={{ padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', flex: 1 }}>

                    {/* Accent line */}
                    <div style={{ height: 2, width: 36, background: member.text, borderRadius: 2, marginBottom: '1.1rem', opacity: 0.7 }}/>
                    {/* Hidden schema prop for jobTitle */}
                    <meta itemProp="jobTitle" content={member.role} />

                    {/* Bio */}
                    <p itemProp="description" style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(255,255,255,.5)', lineHeight: 1.72, marginBottom: '1.5rem', flex: 1 }}>{member.bio}</p>

                    {/* Divider */}
                    <div style={{ height: 1, background: 'rgba(255,255,255,.06)', marginBottom: '1.25rem' }}/>

                    {/* Skills */}
                    <div>
                      <p style={{ fontSize: '0.63rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.22)', marginBottom: '0.65rem' }}>Core Skills</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                        {member.skills.map(skill => (
                          <span key={skill} style={{ padding: '4px 12px', borderRadius: 100, background: member.color, border: `1px solid ${member.border}`, fontSize: '0.75rem', fontWeight: 500, color: member.text, letterSpacing: '0.01em' }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            TECH STACK
        ════════════════════════════════ */}
        <div ref={stackRef} style={{ borderTop: `1px solid ${WIRE}`, borderBottom: `1px solid ${WIRE}`, padding: '56px 0', background: 'rgba(255,255,255,.015)', overflow: 'hidden' }} aria-label="Technologies we use">
          <div style={{ maxWidth: MAX_W, margin: '0 auto', ...PAD }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ ...reveal(stackRef, 0), flexShrink: 0 }}>
                <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '0.3rem' }}>Our Stack</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, flex: 1, justifyContent: 'center' }}>
                {STACK.map((t, i) => (
                  <span key={t} style={{ padding: '6px 16px', borderRadius: 100, background: 'rgba(255,255,255,.04)', border: `1px solid rgba(255,255,255,.08)`, fontSize: '0.82rem', color: 'rgba(255,255,255,.5)', letterSpacing: '0.02em', transition: 'background .2s,color .2s,border-color .2s', ...reveal(stackVis, i * 30), cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,242,58,.07)'; e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = 'rgba(200,242,58,.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.04)'; e.currentTarget.style.color = 'rgba(255,255,255,.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'; }}
                  >{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════
            VALUES
        ════════════════════════════════ */}
        <section ref={valRef} style={{ padding: '110px 0' }} aria-label="Our values">
          <div style={{ maxWidth: MAX_W, margin: '0 auto' }} className="team-page-wrapper">
            <div style={{ marginBottom: '4rem', ...reveal(valVis) }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }}/>
                How We Operate
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff' }}>
                The principles we<br/>
                <span style={{ color: 'rgba(255,255,255,.28)' }}>work by.</span>
              </h2>
            </div>

            <div className="team-values-grid">
              {VALUES.map((v, i) => (
                <article
                  key={v.title}
                  style={{ background: 'rgba(255,255,255,.03)', border: `1px solid rgba(255,255,255,.07)`, borderRadius: 16, padding: '28px 28px 32px', transition: 'background .25s,border-color .25s,transform .3s', ...reveal(valVis, i * 55) }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.055)'; e.currentTarget.style.borderColor = 'rgba(200,242,58,.2)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(200,242,58,.08)', border: '1px solid rgba(200,242,58,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, marginBottom: '1.25rem' }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,.42)', lineHeight: 1.65 }}>{v.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            OPEN ROLES
        ════════════════════════════════ */}
        <section
          ref={jobsRef}
          style={{ padding: '110px 0', borderTop: `1px solid ${WIRE}`, borderBottom: `1px solid ${WIRE}`, background: 'rgba(255,255,255,.018)' }}
          aria-label="Open positions"
        >
          <div style={{ maxWidth: MAX_W, margin: '0 auto' }} className="team-page-wrapper">
            <div className="team-jobs-grid">
              {/* Left copy */}
              <div style={reveal(jobsVis)}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                  <span style={{ width: 18, height: 1, background: ACCENT, display: 'block' }}/>
                  We're Hiring
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff', marginBottom: '1rem' }}>
                  Join the<br/>
                  <span style={{ color: 'rgba(255,255,255,.28)' }}>team.</span>
                </h2>
                <p style={{ fontSize: '0.95rem', fontWeight: 300, color: 'rgba(255,255,255,.38)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  We are a remote-first studio. If you are a precise, curious engineer or designer who wants to work on a variety of interesting products for global clients, we want to hear from you.
                </p>
                <a
                  href="mailto:careers@minderfly.com"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 600, color: ACCENT, textDecoration: 'none', borderBottom: `1px solid rgba(200,242,58,.35)`, paddingBottom: 2, transition: 'border-color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = ACCENT}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(200,242,58,.35)'}
                >
                  careers@minderfly.com <ArrowIcon/>
                </a>
              </div>

              {/* Right — job cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, ...reveal(jobsVis, 100) }}>
                {ROLES_OPEN.map((job, i) => (
                  <div
                    key={job.title}
                    style={{ background: 'rgba(255,255,255,.03)', border: `1px solid rgba(255,255,255,.07)`, borderRadius: 14, padding: '22px 26px', transition: 'background .25s,border-color .25s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.055)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.14)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem', gap: 12 }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{job.title}</h3>
                      <span style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(200,242,58,.1)', border: '1px solid rgba(200,242,58,.2)', fontSize: '0.68rem', fontWeight: 600, color: ACCENT, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>{job.type}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'rgba(255,255,255,.4)', lineHeight: 1.6, marginBottom: '0.9rem' }}>{job.desc}</p>
                    <a
                      href={`mailto:careers@minderfly.com?subject=Application: ${encodeURIComponent(job.title)}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'color .2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = ACCENT}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.5)'}
                    >
                      Apply for this role <ArrowIcon/>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            CTA BANNER
        ════════════════════════════════ */}
        <section ref={ctaRef} style={{ padding: '80px 0 110px' }} aria-label="Start a project">
          <div style={{ maxWidth: MAX_W, margin: '0 auto' }} className="team-page-wrapper">
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', padding: '80px', background: ACCENT, ...reveal(ctaVis) }}>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 80% at 90% 50%,rgba(255,255,255,.15) 0%,transparent 60%),radial-gradient(30% 50% at 5% 80%,rgba(0,0,0,.07) 0%,transparent 50%)', pointerEvents: 'none' }}/>

              <div style={{ position: 'relative', zIndex: 1 }} className="team-cta-content">
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,.4)', marginBottom: '1rem' }}>
                    <span style={{ width: 18, height: 1, background: 'rgba(0,0,0,.4)', display: 'block' }}/>
                    Let's Build Together
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#000', marginBottom: '0.75rem' }}>
                    Ready to work with a team that ships?
                  </h2>
                  <p style={{ fontSize: '1rem', fontWeight: 300, color: 'rgba(0,0,0,.55)', lineHeight: 1.6, maxWidth: 480 }}>
                    Tell us what you are building. We will scope it, price it fairly, and start within the week.
                  </p>
                </div>
                <div className="team-cta-actions">
                  <button
                    onClick={() => openModal('New Project Inquiry')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 100, background: '#000', border: 'none', color: '#fff', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background .2s,transform .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.transform = 'none'; }}
                  >
                    Start a Project <ArrowIcon/>
                  </button>
                  <a
                    href="mailto:hello@minderfly.com"
                    style={{ border: '1px solid rgba(0,0,0,.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 32px', borderRadius: 100, background: 'none', color: 'rgba(0,0,0,.65)', fontSize: '0.9rem', textDecoration: 'none', transition: 'border-color .2s,color .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,.5)'; e.currentTarget.style.color = '#000'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,.2)'; e.currentTarget.style.color = 'rgba(0,0,0,.65)'; }}
                  >
                    hello@minderfly.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer onContactClick={() => openModal('General Inquiry')} />
    </>
  );
};

export default TeamPage;