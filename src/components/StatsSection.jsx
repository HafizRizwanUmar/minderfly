import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaRocket, FaUsers, FaLightbulb, FaArrowTrendUp,
} from 'react-icons/fa6';
import './StatsSection.css';

/* ═══════════════════════════════════════
   StatsSection — Homepage
   Sticky left column · coloured folder cards
   No GSAP · Framer Motion viewport reveals
   Full SEO structured data
═══════════════════════════════════════ */

/* ── Structured data ── */
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Minderfly',
  url: 'https://www.minderfly.com',
  description: 'Minderfly is a digital agency and product studio specialising in Chrome extensions, VS Code tools, mobile apps, and full-stack web development. 150+ projects completed, 50+ happy clients worldwide.',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
  foundingDate: '2020',
  areaServed: 'Worldwide',
  knowsAbout: [
    'Chrome Extension Development',
    'VS Code Extension Development',
    'Mobile App Development',
    'Web Development',
    'Digital Marketing',
  ],
};

/* ── Data ── */
const CATEGORIES = ['STRATEGY', 'DEVELOPMENT', 'MARKETING', 'DESIGN'];

const STATS = [
  {
    id: 'projects',
    subtitle: 'Success Stories',
    title: 'Projects\nCompleted',
    value: '150',
    suffix: '+',
    type: 'card-blue',
    Icon: FaRocket,
    link: '/work',
  },
  {
    id: 'clients',
    subtitle: 'Global Impact',
    title: 'Happy Clients\nWorldwide',
    value: '50',
    suffix: '+',
    type: 'card-acid',
    Icon: FaUsers,
    link: '/work',
  },
  {
    id: 'years',
    subtitle: 'Innovation Hub',
    title: 'Years of\nExperience',
    value: '5',
    suffix: '+',
    type: 'card-dark',
    Icon: FaLightbulb,
    link: '/services',
  },
];

/* ── Variants ── */
const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: .65, delay: d, ease: [.22,1,.36,1] },
  }),
};

const pillVariant = {
  hidden:  { opacity: 0, x: -16 },
  visible: (d) => ({
    opacity: 1, x: 0,
    transition: { duration: .5, delay: d, ease: [.22,1,.36,1] },
  }),
};

/* ═══════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */
const StatsSection = () => (
  <section
    className="stats-section"
    aria-label="Minderfly agency impact and statistics"
    itemScope
    itemType="https://schema.org/ProfessionalService"
  >
    {/* Structured data */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
    />

    <meta itemProp="name" content="Minderfly" />
    <meta itemProp="url"  content="https://www.minderfly.com" />

    <div className="stats-inner">
      <div className="stats-container">

        {/* ── Left sticky column ── */}
        <aside className="stats-categories" aria-label="Service areas">
          {/* Eyebrow */}
          <div className="stats-eyebrow" aria-hidden="true">
            <span className="stats-eyebrow-num">01 /</span>
            <span className="stats-eyebrow-line"/>
            <span className="stats-eyebrow-label">Our Impact</span>
          </div>

          {/* Title */}
          <motion.h2
            className="stats-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
          >
            OUR IMPACT<br/><span>IN NUMBERS</span>
          </motion.h2>

          {/* Category pills */}
          <div
            className="categories-list"
            role="list"
            aria-label="Service categories"
          >
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat}
                className="category-pill"
                role="listitem"
                custom={i * .08}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={pillVariant}
              >
                <span className="category-pill-dot" aria-hidden="true"/>
                {cat}
              </motion.div>
            ))}
          </div>

          <motion.p
            className="stats-desc"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={.25}
          >
            From first-line code to final deployment — we build software that ships and scales. Five years, 150+ projects, clients on six continents.
          </motion.p>
        </aside>

        {/* ── Cards grid ── */}
        <div
          className="stats-cards-grid"
          role="list"
          aria-label="Agency statistics"
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              className={`folder-card ${stat.type}`}
              role="listitem"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={index * .1}
              variants={fadeUp}
              itemProp="aggregateRating"
              itemScope
              itemType="https://schema.org/QuantitativeValue"
            >
              <meta itemProp="value"    content={stat.value} />
              <meta itemProp="unitText" content={stat.subtitle} />

              {/* Card header */}
              <div className="card-header">
                <span className="card-subtitle">{stat.subtitle}</span>
                <FaArrowTrendUp className="card-arrow" aria-hidden="true"/>
              </div>

              {/* Card body */}
              <div className="card-body">
                <h3>
                  {stat.title.split('\n').map((line, i) => (
                    <span key={i} style={{ display: 'block' }}>{line}</span>
                  ))}
                </h3>

                <div className="card-footer">
                  <span className="big-number" aria-label={`${stat.value}${stat.suffix}`}>
                    {stat.value}<span className="big-number-ac">{stat.suffix}</span>
                  </span>
                  <stat.Icon className="card-icon" aria-hidden="true"/>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default StatsSection;