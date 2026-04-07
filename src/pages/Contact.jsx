import { useState, useRef, useEffect } from 'react';
import './Contact.css';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaStore, FaGraduationCap, FaHospital, FaHotel,
  FaUtensils, FaCar, FaBriefcase, FaCode,
  FaChrome, FaMobileAlt, FaGlobe, FaPuzzlePiece,
  FaArrowRight, FaEnvelope, FaWhatsapp, FaClock,
  FaCheckCircle,
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SpecialOfferModal from '../components/SpecialOfferModal';

/* ── Design tokens ── */
const AC   = '#c8f23a';
const BG   = '#050505';
const WIRE = 'rgba(255,255,255,0.07)';
const MW   = '1280px';

const useReveal = (t = 0.1) => {
  const ref = useRef(null);
  const [v, sv] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { sv(true); obs.disconnect(); } },
      { threshold: t }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
};
const fade = (v, d = 0) => ({
  opacity: v ? 1 : 0,
  transform: v ? 'none' : 'translateY(22px)',
  transition: `opacity .7s ease ${d}ms, transform .7s cubic-bezier(.22,1,.36,1) ${d}ms`,
});

/* ════════════════════════════════════
   PROBLEM → SOLUTION DATA
   Each card describes a real-world scenario
   and maps to a Minderfly service.
════════════════════════════════════ */
const PROBLEMS = [
  {
    Icon: FaStore,
    emoji: '🏪',
    problem: 'Starting a business and need a POS or inventory system?',
    detail: 'You\'re opening a shop, cafe, or retail store and need a point-of-sale system, inventory tracking, or an online shop to go with it.',
    solution: 'We build custom POS web apps, inventory dashboards, and e-commerce stores tailored to your business — no off-the-shelf template.',
    service: 'Web Development — Premium ($99)',
    tag: 'Business / Retail',
  },
  {
    Icon: FaGraduationCap,
    emoji: '📚',
    problem: 'Starting an online academy and need a website or LMS?',
    detail: 'You\'re launching an e-learning platform, tutoring service, or training academy and need a website where students can enrol, pay, and access courses.',
    solution: 'We build learning management systems, course landing pages, student portals, and payment-integrated academy websites from scratch.',
    service: 'Web Development — Premium ($99)',
    tag: 'Education / EdTech',
  },
  {
    Icon: FaHospital,
    emoji: '🏥',
    problem: 'Running a clinic or healthcare service needing a booking system?',
    detail: 'You need a professional website where patients can book appointments, view services, and trust your credentials before they arrive.',
    solution: 'We build healthcare websites with appointment booking, staff profiles, SEO-optimised service pages, and contact forms that convert.',
    service: 'Web Development — Standard ($39)',
    tag: 'Healthcare / Clinics',
  },
  {
    Icon: FaHotel,
    emoji: '🏨',
    problem: 'Own a hotel, guesthouse, or property and need a booking site?',
    detail: 'Your property deserves more than a listing on a third-party platform. A direct booking site saves you commission fees and builds your brand.',
    solution: 'We create hotel websites with room galleries, availability widgets, direct booking flows, and Google Hotel Search integration.',
    service: 'Web Development — Standard ($39)',
    tag: 'Hospitality / Travel',
  },
  {
    Icon: FaUtensils,
    emoji: '🍽️',
    problem: 'Running a restaurant and need an online menu or food ordering?',
    detail: 'You want customers to browse your menu, order online for delivery or pickup, and make reservations — all from your own branded website.',
    solution: 'We build restaurant websites with digital menus, online order systems, reservation forms, and WhatsApp ordering integration.',
    service: 'Web Development — Standard ($39)',
    tag: 'Food & Beverage',
  },
  {
    Icon: FaCar,
    emoji: '🚗',
    problem: 'Running a car dealership or rental service?',
    detail: 'You need a vehicle listing platform where customers can browse stock, filter by model or price, and submit enquiries or rental requests.',
    solution: 'We build automotive listing sites and rental platforms with search filters, vehicle detail pages, enquiry forms, and admin stock management.',
    service: 'Web Development — Premium ($99)',
    tag: 'Automotive / Rental',
  },
  {
    Icon: FaBriefcase,
    emoji: '💼',
    problem: 'Freelancer or agency needing a portfolio and lead-gen site?',
    detail: 'You\'re a designer, developer, photographer, or marketing agency that needs a website that showcases your work and converts visitors into clients.',
    solution: 'We build conversion-focused portfolio and agency sites with case study pages, testimonials, contact forms, and SEO built in from day one.',
    service: 'Web Development — Standard ($39)',
    tag: 'Portfolio / Agency',
  },
  {
    Icon: FaMobileAlt,
    emoji: '📱',
    problem: 'Need a mobile app for your business or startup idea?',
    detail: 'You have a concept for an app — a delivery service, marketplace, social platform, or utility — and need it built and published on Android or iOS.',
    solution: 'We build Flutter mobile apps for both Android and iOS with backend integration, push notifications, and Play Store / App Store publishing.',
    service: 'Mobile App — Standard ($39)',
    tag: 'Mobile Apps',
  },
  {
    Icon: FaChrome,
    emoji: '🧩',
    problem: 'Need a Chrome extension to automate your workflow?',
    detail: 'You want to automate repetitive browser tasks, scrape data, integrate with tools you already use, or build a productivity extension for your team or customers.',
    solution: 'We build Manifest V3 Chrome extensions — from simple popup tools to complex content-script automation with API integration and store publishing.',
    service: 'Chrome Extension — Standard ($39)',
    tag: 'Chrome Extensions',
  },
  {
    Icon: FaCode,
    emoji: '⌨️',
    problem: 'Developer needing a VS Code extension for your team?',
    detail: 'Your dev team uses a specific internal tool, code snippet manager, or workflow that would save hours per week if it lived inside VS Code.',
    solution: 'We build custom VS Code extensions with sidebar panels, language support, command palette integrations, and VS Marketplace publishing.',
    service: 'VS Code Extension — Standard ($39)',
    tag: 'Dev Tools',
  },
  {
    Icon: FaGlobe,
    emoji: '🌐',
    problem: 'Have a local business that no one can find online?',
    detail: 'Your competitors are showing up in Google and you\'re not. You need a website that\'s fast, mobile-friendly, and optimised to rank for local searches.',
    solution: 'We build SEO-first websites with schema markup, local business structured data, Google Business Profile integration, and PageSpeed scores above 90.',
    service: 'Web Development — Standard ($39)',
    tag: 'Local SEO / Business',
  },
  {
    Icon: FaPuzzlePiece,
    emoji: '🎨',
    problem: 'Starting a brand and need a logo, identity, or marketing kit?',
    detail: 'You\'re launching a business and need everything designed: logo, brand colours, business cards, social media templates, and a brand guidelines document.',
    solution: 'We deliver complete brand identity packages — logo concepts, brand style guide, business card design, and all social media assets in one project.',
    service: 'Graphic Design — Standard ($39)',
    tag: 'Branding / Design',
  },
];

/* ── PROCESS STEPS ── */
const STEPS = [
  { num: '01', title: 'Tell us your problem', desc: 'Fill in the contact form describing what you need. Takes 2 minutes. No commitment required.' },
  { num: '02', title: 'We send a proposal',   desc: 'Within one business day we\'ll reply with a scope, timeline, and fixed price — no surprises.' },
  { num: '03', title: 'We build it',          desc: 'You review progress at every milestone. We don\'t disappear after signing — you\'re in the loop.' },
  { num: '04', title: 'We deliver it live',   desc: 'Fully deployed, tested, and handed over with all source files and documentation.' },
];

/* ── SCHEMAS ── */
const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Minderfly — Get a Free Quote',
    url: 'https://minderfly.com/contact',
    description: 'Contact Minderfly for custom website development, mobile app development, Chrome extensions, VS Code extensions, and graphic design. We serve businesses in retail, education, healthcare, hospitality, and more.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Minderfly',
      email: 'hello@minderfly.com',
      url: 'https://minderfly.com',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Sales',
        email: 'hello@minderfly.com',
        availableLanguage: 'English',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens: '09:00',
          closes: '22:00',
        },
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PROBLEMS.map(p => ({
      '@type': 'Question',
      name: p.problem,
      acceptedAnswer: {
        '@type': 'Answer',
        text: p.solution,
      },
    })),
  },
];

/* ── Problem card component ── */
const ProblemCard = ({ item, index, onContact }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.article
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-50px' }}
      transition={{ duration:.55, delay: (index % 3) * .07, ease:[.22,1,.36,1] }}
      style={{
        background: hov ? 'rgba(255,255,255,.048)' : 'rgba(255,255,255,.026)',
        border: `1px solid ${hov ? 'rgba(200,242,58,.25)' : WIRE}`,
        borderRadius: 18,
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        transition: 'background .25s, border-color .25s, transform .35s cubic-bezier(.22,1,.36,1)',
        transform: hov ? 'translateY(-4px)' : 'none',
        cursor: 'default',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      itemScope
      itemType="https://schema.org/Question"
    >
      {/* Tag pill */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.1rem' }}>
        <span style={{ padding:'3px 10px', borderRadius:100, background:'rgba(200,242,58,.08)', border:'1px solid rgba(200,242,58,.18)', fontSize:'.6rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:AC }}>
          {item.tag}
        </span>
        <span style={{ fontSize:'1.5rem' }} aria-hidden="true">{item.emoji}</span>
      </div>

      {/* Problem question */}
      <h3 itemProp="name" style={{ fontFamily:'var(--font-heading, "Syne", sans-serif)', fontSize:'1rem', fontWeight:700, color:'#fff', letterSpacing:'-.015em', lineHeight:1.25, marginBottom:'.7rem' }}>
        {item.problem}
      </h3>

      {/* Detail */}
      <p style={{ fontSize:'.8rem', fontWeight:300, color:'rgba(255,255,255,.4)', lineHeight:1.68, marginBottom:'1rem', flex:1 }}>
        {item.detail}
      </p>

      {/* Divider */}
      <div style={{ height:1, background:'rgba(255,255,255,.07)', margin:'0 0 1rem' }} aria-hidden="true"/>

      {/* Solution */}
      <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
        <p itemProp="text" style={{ fontSize:'.78rem', fontWeight:300, color:'rgba(255,255,255,.55)', lineHeight:1.65, marginBottom:'1.25rem' }}>
          <span style={{ color:AC, fontWeight:600 }}>Our solution: </span>
          {item.solution}
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={() => onContact(item.service)}
        style={{
          display:'inline-flex', alignItems:'center', gap:7,
          padding:'9px 18px', borderRadius:8,
          background: hov ? AC : 'rgba(255,255,255,.07)',
          color: hov ? '#000' : 'rgba(255,255,255,.65)',
          border: `1px solid ${hov ? AC : 'rgba(255,255,255,.1)'}`,
          fontSize:'.76rem', fontWeight:700, letterSpacing:'.02em',
          fontFamily:'var(--font-body)',
          cursor:'pointer', transition:'all .22s',
          width:'fit-content',
        }}
        aria-label={`Get a quote for ${item.tag}`}
      >
        Get a quote
        <FaArrowRight style={{ fontSize:'.7rem' }} aria-hidden="true"/>
      </button>
    </motion.article>
  );
};

/* ════════════════════════════════════
   PAGE COMPONENT
════════════════════════════════════ */
const ContactPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('General Inquiry');

  const openModal = (type = 'General Inquiry') => {
    setModalType(type);
    setModalOpen(true);
  };

  const [heroRef, heroV] = useReveal(0.05);
  const [probRef, probV] = useReveal(0.05);
  const [stepRef, stepV] = useReveal(0.1);
  const [ctaRef,  ctaV]  = useReveal(0.15);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Contact Minderfly — Custom Websites, Apps & Extensions | Get a Free Quote</title>
        <meta name="description" content="Need a website, mobile app, Chrome extension, or VS Code tool built? Contact Minderfly. We help businesses in retail, education, healthcare, hospitality, restaurants, and more. Fixed prices, real deliverables." />
        <meta name="keywords" content="contact Minderfly, custom website development, mobile app development Pakistan, Chrome extension developer, VS Code extension development, web development free quote, online academy website, POS system development, e-commerce website Pakistan" />
        <link rel="canonical" href="https://minderfly.com/contact" />
        <meta property="og:title"       content="Contact Minderfly — Get a Free Quote" />
        <meta property="og:description" content="We solve real business problems with custom software. Tell us your problem, get a fixed-price proposal in 24 hours." />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://minderfly.com/contact" />
        <meta name="twitter:card"       content="summary_large_image" />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <Navbar/>

      <main style={{ background:BG, color:'#fff', fontFamily:'var(--font-body)', minHeight:'100vh' }}>

        {/* Dot grid */}
        <div aria-hidden="true" style={{ position:'fixed', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize:'36px 36px', pointerEvents:'none', zIndex:0, maskImage:'radial-gradient(ellipse 80% 60% at 50% 0%,black,transparent)' }}/>

        <div className="contact-page-wrapper">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display:'flex', alignItems:'center', gap:8, fontSize:'.75rem', color:'rgba(255,255,255,.28)', marginBottom:'2.5rem' }}>
            <Link to="/" style={{ color:'rgba(255,255,255,.32)', textDecoration:'none' }}>Home</Link>
            <span>›</span>
            <span aria-current="page" style={{ color:'rgba(255,255,255,.55)' }}>Contact</span>
          </nav>

          {/* ── HERO ── */}
          <div ref={heroRef} className="contact-hero-grid-inline">
            <div>
              <div style={{ ...fade(heroV), display:'inline-flex', alignItems:'center', gap:10, fontSize:'.6rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:AC, marginBottom:'1.1rem' }}>
                <span style={{ width:20, height:1, background:AC, display:'block' }}/>
                We solve real problems
              </div>
              <h1 style={{ ...fade(heroV, 60), fontFamily:'var(--font-heading,"Syne",sans-serif)', fontSize:'clamp(2.4rem,5vw,4.5rem)', fontWeight:800, lineHeight:.95, letterSpacing:'-.05em', color:'#fff', marginBottom:'1rem' }}>
                Tell us your problem.<br/>
                <span style={{ WebkitTextStroke:'1.5px rgba(255,255,255,.2)', color:'transparent' }}>We'll build the solution.</span>
              </h1>
              <p style={{ ...fade(heroV, 110), fontSize:'1.05rem', fontWeight:300, color:'rgba(255,255,255,.44)', maxWidth:540, lineHeight:1.72 }}>
                Browse the situations below. If yours is on the list — or isn't — tell us about it. We respond with a fixed-price proposal within one business day.
              </p>
            </div>

            {/* Contact info card */}
            <div style={{ ...fade(heroV, 80), background:'rgba(255,255,255,.03)', border:`1px solid ${WIRE}`, borderRadius:18, padding:'28px 28px 24px', flexShrink:0, minWidth:260 }}>
              <div style={{ fontSize:'.6rem', fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(255,255,255,.25)', marginBottom:'1.25rem' }}>Reach us directly</div>
              {[
                { Icon:FaEnvelope, label:'Email', val:'hello@minderfly.com', href:'mailto:hello@minderfly.com' },
                { Icon:FaWhatsapp, label:'WhatsApp', val:'+92 319 4765320', href:'https://wa.me/923194765320' },
                { Icon:FaClock,    label:'Response',  val:'Within 24 hours', href:null },
              ].map(({ Icon, label, val, href }) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:'1rem' }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:'rgba(200,242,58,.08)', border:'1px solid rgba(200,242,58,.18)', display:'flex', alignItems:'center', justifyContent:'center', color:AC, fontSize:'.85rem', flexShrink:0 }}>
                    <Icon aria-hidden="true"/>
                  </div>
                  <div>
                    <div style={{ fontSize:'.6rem', fontWeight:600, color:'rgba(255,255,255,.25)', letterSpacing:'.1em', textTransform:'uppercase' }}>{label}</div>
                    {href ? (
                      <a href={href} style={{ fontSize:'.82rem', color:'rgba(255,255,255,.65)', textDecoration:'none', fontWeight:500 }}
                        onMouseEnter={e => e.currentTarget.style.color='#fff'}
                        onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.65)'}>
                        {val}
                      </a>
                    ) : (
                      <span style={{ fontSize:'.82rem', color:'rgba(255,255,255,.65)', fontWeight:500 }}>{val}</span>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={() => openModal()}
                style={{ width:'100%', marginTop:'.5rem', padding:'12px', borderRadius:10, background:AC, color:'#000', border:'none', fontSize:'.84rem', fontWeight:700, cursor:'pointer', fontFamily:'var(--font-heading,"Syne",sans-serif)', letterSpacing:'.02em', transition:'background .2s, transform .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background='#d4ff3d'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background=AC; e.currentTarget.style.transform='none'; }}
              >
                Send a Request
              </button>
            </div>
          </div>

          {/* ── PROBLEM CARDS GRID ── */}
          <section ref={probRef} aria-label="Business problems we solve">
            <div style={{ ...fade(probV), display:'flex', alignItems:'center', gap:12, marginBottom:'2rem' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, fontSize:'.6rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:AC }}>
                <span style={{ width:20, height:1, background:AC, display:'block' }}/>
                Problems we solve
              </div>
              <span style={{ padding:'3px 10px', borderRadius:100, background:'rgba(255,255,255,.05)', border:`1px solid ${WIRE}`, fontSize:'.68rem', color:'rgba(255,255,255,.38)' }}>
                {PROBLEMS.length} use cases
              </span>
            </div>

            <div className="contact-problems-grid"
              itemScope itemType="https://schema.org/FAQPage">
              {PROBLEMS.map((item, i) => (
                <ProblemCard
                  key={item.tag}
                  item={item}
                  index={i}
                  onContact={openModal}
                />
              ))}
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section ref={stepRef} style={{ margin:'80px 0' }} aria-label="How our process works">
            <div style={{ ...fade(stepV), display:'inline-flex', alignItems:'center', gap:10, fontSize:'.6rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:AC, marginBottom:'2.5rem' }}>
              <span style={{ width:20, height:1, background:AC, display:'block' }}/>
              How it works
            </div>
            <div className="contact-steps-grid">
              {/* Connector line */}
              <div aria-hidden="true" style={{ position:'absolute', top:24, left:'12%', right:'12%', height:1, background:WIRE }}/>
              {STEPS.map((s, i) => (
                <div key={s.num} style={{ padding:'0 20px', paddingTop:52, position:'relative', textAlign:'center', ...fade(stepV, i*80) }}>
                  <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:48, height:48, borderRadius:'50%', background:BG, border:'1px solid rgba(255,255,255,.12)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontSize:'.72rem', fontWeight:700, color:AC, zIndex:1, transition:'all .2s', cursor:'default' }}
                    onMouseEnter={e => { e.currentTarget.style.background=AC; e.currentTarget.style.color='#000'; e.currentTarget.style.borderColor=AC; }}
                    onMouseLeave={e => { e.currentTarget.style.background=BG; e.currentTarget.style.color=AC; e.currentTarget.style.borderColor='rgba(255,255,255,.12)'; }}>
                    {s.num}
                  </div>
                  <h3 style={{ fontFamily:'var(--font-heading,"Syne",sans-serif)', fontSize:'.92rem', fontWeight:700, color:'#fff', marginBottom:'.5rem', letterSpacing:'-.01em' }}>{s.title}</h3>
                  <p style={{ fontSize:'.78rem', fontWeight:300, color:'rgba(255,255,255,.38)', lineHeight:1.65, margin:0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── BOTTOM CTA ── */}
          <div ref={ctaRef}>
            <div style={{ ...fade(ctaV), position:'relative', borderRadius:22, overflow:'hidden', padding:'80px 72px', background:AC }}>
              <div aria-hidden="true" style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 55% 80% at 88% 50%,rgba(255,255,255,.16) 0%,transparent 60%)', pointerEvents:'none' }}/>
              <div className="contact-cta-inner">
                <div>
                  <div style={{ fontSize:'.6rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(0,0,0,.4)', marginBottom:'1rem' }}>
                    Ready to start?
                  </div>
                  <h2 style={{ fontFamily:'var(--font-heading,"Syne",sans-serif)', fontSize:'clamp(1.8rem,3.5vw,3rem)', fontWeight:800, lineHeight:.97, letterSpacing:'-.04em', color:'#000', marginBottom:'.85rem' }}>
                    Don't see your problem listed?<br/>Tell us anyway.
                  </h2>
                  <p style={{ fontSize:'.95rem', fontWeight:300, color:'rgba(0,0,0,.55)', lineHeight:1.72, maxWidth:480 }}>
                    We build custom software for any business problem. If it can be built, we can build it. Send us a message and we'll figure out the best solution together.
                  </p>
                </div>
                <div className="contact-cta-actions">
                  <button
                    onClick={() => openModal('General Inquiry')}
                    style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 32px', borderRadius:10, background:'#000', color:'#fff', fontSize:'.9rem', fontWeight:700, border:'none', cursor:'pointer', whiteSpace:'nowrap', letterSpacing:'.02em', fontFamily:'var(--font-heading,"Syne",sans-serif)', transition:'background .2s, transform .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='#1a1a1a'; e.currentTarget.style.transform='translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='#000'; e.currentTarget.style.transform='none'; }}
                  >
                    Send a Request
                    <FaArrowRight aria-hidden="true"/>
                  </button>
                  <a
                    href="https://wa.me/923194765320?text=Hi%20Minderfly!%20I%20have%20a%20project%20for%20you."
                    target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, padding:'14px 32px', borderRadius:10, background:'none', border:'1px solid rgba(0,0,0,.2)', color:'rgba(0,0,0,.65)', fontSize:'.88rem', textDecoration:'none', letterSpacing:'.02em', transition:'all .2s', whiteSpace:'nowrap' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(0,0,0,.5)'; e.currentTarget.style.color='#000'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,0,0,.2)'; e.currentTarget.style.color='rgba(0,0,0,.65)'; }}
                  >
                    <FaWhatsapp aria-hidden="true"/> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer/>

      {/* Primary contact modal */}
      <SpecialOfferModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialProjectType={modalType}
      />
    </>
  );
};

export default ContactPage;