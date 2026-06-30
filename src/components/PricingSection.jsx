import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBox, FaRocket, FaBuilding, FaCheck, FaTimes, FaInfoCircle,
  FaGlobe, FaMobileAlt, FaPalette, FaPuzzlePiece, FaPaintBrush,
} from 'react-icons/fa';
import './PricingSection.css';

/* ═══════════════════════════════════════════════
   PricingSection — Minderfly
   Bold editorial dark pricing cards
   Full SEO: Offer + Service schemas
   Opens SpecialOfferModal on CTA click
═══════════════════════════════════════════════ */

const CATEGORIES = [
  { key: 'web',        label: 'Web Development',        Icon: FaGlobe       },
  { key: 'mobile',     label: 'Mobile Apps',             Icon: FaMobileAlt   },
  { key: 'themes',     label: 'Themes & Assets',         Icon: FaPalette     },
  { key: 'graphic',    label: 'Graphic Design',          Icon: FaPaintBrush  },
  { key: 'extensions', label: 'Extensions',              Icon: FaPuzzlePiece },
];

/* Full plan data — kept intact from original */
const ALL_PLANS = {
  web: [
    {
      title:'Starter', price:'Free', period:'',
      desc:'Perfect for startups launching their first website. Get online fast with zero upfront cost.',
      Icon:FaBox, badge:null, recommended:false, btnText:'Get Started Free',
      features:[
        {text:'Single-page responsive website',included:true},
        {text:'Mobile-friendly design',included:true},
        {text:'Contact form integration',included:true},
        {text:'Basic SEO setup (meta tags & sitemap)',included:true},
        {text:'Social media links integration',included:true},
        {text:'1 round of revisions',included:true},
        {text:'Deployment on free hosting (Vercel/Netlify)',included:true},
        {text:'Delivery in 5–7 business days',included:true},
        {text:'Custom domain setup (domain cost on you)',info:true},
        {text:'CMS / Admin panel',included:false},
        {text:'Priority support',included:false},
      ],
    },
    {
      title:'Standard', price:'$39', period:'/ project',
      desc:'A professional multi-page website with CMS, blog, and advanced SEO to grow your business.',
      Icon:FaRocket, badge:'🔥 Most Popular', recommended:true, btnText:'Choose Standard',
      features:[
        {text:'Up to 5-page responsive website',included:true},
        {text:'Premium UI/UX design',included:true},
        {text:'Mobile & tablet optimized',included:true},
        {text:'Contact form + email notifications',included:true},
        {text:'Blog / CMS integration',included:true},
        {text:'Advanced SEO (schema, Open Graph, analytics)',included:true},
        {text:'Social media integration',included:true},
        {text:'Google Maps integration',included:true},
        {text:'WhatsApp chat widget',included:true},
        {text:'3 rounds of revisions',included:true},
        {text:'Free hosting + custom domain setup',included:true},
        {text:'Delivery in 7–10 business days',included:true},
        {text:'Priority email support (48h response)',included:true},
      ],
    },
    {
      title:'Premium', price:'$99', period:'/ project',
      desc:'Full-stack web solution with admin dashboard, payments, e-commerce, and dedicated support.',
      Icon:FaBuilding, badge:'⭐ Best Value', recommended:false, btnText:'Go Premium',
      features:[
        {text:'Unlimited pages & custom design',included:true},
        {text:'Advanced animations & interactions',included:true},
        {text:'Full MERN stack / Next.js development',included:true},
        {text:'Admin dashboard / CMS panel',included:true},
        {text:'User authentication & accounts',included:true},
        {text:'Payment gateway integration',included:true},
        {text:'E-commerce functionality',included:true},
        {text:'Full SEO + Google Analytics + Search Console',included:true},
        {text:'Performance optimization (Lighthouse 90+)',included:true},
        {text:'Email marketing integration',included:true},
        {text:'Free hosting, domain + SSL setup',included:true},
        {text:'Unlimited revisions',included:true},
        {text:'Delivery in 10–14 business days',included:true},
        {text:'Dedicated support (24h response) for 30 days',included:true},
        {text:'Source code ownership',included:true},
      ],
    },
  ],
  mobile:[
    {title:'Starter',price:'Free',period:'',desc:'Launch your MVP mobile app for free. Ideal for startups validating their idea.',Icon:FaBox,badge:null,recommended:false,btnText:'Get Started Free',features:[{text:'Single-screen Flutter app (Android)',included:true},{text:'Clean, modern UI design',included:true},{text:'Basic navigation & layout',included:true},{text:'App icon & splash screen',included:true},{text:'1 round of revisions',included:true},{text:'APK build ready for testing',included:true},{text:'Delivery in 5–7 business days',included:true},{text:'Play Store publishing (developer account cost on you)',info:true},{text:'Backend / API integration',included:false},{text:'Push notifications',included:false},{text:'Priority support',included:false}]},
    {title:'Standard',price:'$39',period:'/ project',desc:'A polished multi-screen mobile app with backend integration and Play Store publishing.',Icon:FaRocket,badge:'🔥 Most Popular',recommended:true,btnText:'Choose Standard',features:[{text:'Up to 5 screens (Flutter – Android & iOS)',included:true},{text:'Premium UI/UX with animations',included:true},{text:'REST API / Firebase integration',included:true},{text:'User authentication (login/signup)',included:true},{text:'Push notifications setup',included:true},{text:'App icon, splash screen & branding',included:true},{text:'Local storage & caching',included:true},{text:'3 rounds of revisions',included:true},{text:'Play Store / App Store publishing',included:true},{text:'Delivery in 10–14 business days',included:true},{text:'Priority email support (48h response)',included:true}]},
    {title:'Premium',price:'$99',period:'/ project',desc:'Full-featured mobile app with payments, real-time data, admin panel, and dedicated support.',Icon:FaBuilding,badge:'⭐ Best Value',recommended:false,btnText:'Go Premium',features:[{text:'Unlimited screens & custom design',included:true},{text:'Advanced animations & custom widgets',included:true},{text:'Full backend (Node.js / Firebase)',included:true},{text:'Admin dashboard (web-based)',included:true},{text:'In-app purchases / payment integration',included:true},{text:'Real-time chat or notifications',included:true},{text:'Social login (Google, Apple, Facebook)',included:true},{text:'Offline mode with sync',included:true},{text:'Analytics & crash reporting setup',included:true},{text:'Play Store + App Store publishing',included:true},{text:'Unlimited revisions',included:true},{text:'Delivery in 14–21 business days',included:true},{text:'Dedicated support (24h response) for 30 days',included:true},{text:'Full source code ownership',included:true}]},
  ],
  themes:[
    {title:'Starter',price:'Free',period:'',desc:'Free digital assets for startups. Get a custom Chrome theme or social media kit to kickstart your brand.',Icon:FaPalette,badge:'🎨 Free for Startups',recommended:false,btnText:'Get Free Assets',features:[{text:'1 custom Chrome browser theme',included:true},{text:'Color palette & brand mood board',included:true},{text:'Social media profile kit (3 platforms)',included:true},{text:'Favicon & app icon set',included:true},{text:'Brand color guide document',included:true},{text:'1 round of revisions',included:true},{text:'All source files included',included:true},{text:'Delivery in 3–5 business days',included:true},{text:'Commercial license included',included:true}]},
  ],
  graphic:[
    {title:'Basic',price:'$15',period:'/ project',desc:'Essential branding starter for small businesses and individuals.',Icon:FaBox,badge:null,recommended:false,btnText:'Get Basic',features:[{text:'Logo design (2 concepts + final)',included:true},{text:'Business card design',included:true},{text:'Social media templates (2 platforms)',included:true},{text:'Basic color palette selection',included:true},{text:'Source files (PNG, PDF)',included:true},{text:'1 round of revisions',included:true},{text:'Delivery in 3–5 business days',included:true},{text:'Full brand identity',included:false},{text:'Marketing materials',included:false}]},
    {title:'Standard',price:'$39',period:'/ project',desc:'Professional graphic design package for polished visuals and branding.',Icon:FaRocket,badge:'🔥 Most Popular',recommended:true,btnText:'Choose Standard',features:[{text:'Logo design (3 concepts + final)',included:true},{text:'Business card design',included:true},{text:'Social media kit (5 templates)',included:true},{text:'Brand style guide',included:true},{text:'Letterhead & email signature',included:true},{text:'Flyer / poster design (1 piece)',included:true},{text:'3 rounds of revisions',included:true},{text:'Source files (AI, PSD, PDF, PNG)',included:true},{text:'Delivery in 5–7 business days',included:true},{text:'Priority email support',included:true}]},
    {title:'Premium',price:'$99',period:'/ project',desc:'Complete brand identity and marketing materials suite for serious businesses.',Icon:FaBuilding,badge:'⭐ Best Value',recommended:false,btnText:'Go Premium',features:[{text:'Logo design (5 concepts + final)',included:true},{text:'Full brand identity system',included:true},{text:'Business card + letterhead + envelope',included:true},{text:'Social media kit (10+ templates)',included:true},{text:'Pitch deck / presentation design',included:true},{text:'Marketing materials (brochure, banner, flyer)',included:true},{text:'Product packaging design',included:true},{text:'Brand guidelines document',included:true},{text:'Animated logo version',included:true},{text:'Unlimited revisions',included:true},{text:'All source files + commercial license',included:true},{text:'Delivery in 7–10 business days',included:true},{text:'Dedicated support for 14 days',included:true}]},
  ],
  extensions:[
    {title:'Basic',price:'$15',period:'/ project',desc:'A simple, focused extension to get your idea live on the Chrome Web Store or VS Marketplace.',Icon:FaBox,badge:null,recommended:false,btnText:'Get Basic',features:[{text:'Chrome or VS Code extension (basic)',included:true},{text:'Single core feature',included:true},{text:'Simple popup UI',included:true},{text:'Extension icon & branding',included:true},{text:'Manifest V3 compliant (Chrome)',included:true},{text:'1 round of revisions',included:true},{text:'Store publishing assistance',included:true},{text:'Delivery in 3–5 business days',included:true},{text:'API integration',included:false},{text:'Settings panel',included:false}]},
    {title:'Standard',price:'$39',period:'/ project',desc:'A functional Chrome or VS Code extension to solve a specific problem or boost productivity.',Icon:FaRocket,badge:'🔥 Most Popular',recommended:true,btnText:'Choose Standard',features:[{text:'Chrome or VS Code extension',included:true},{text:'Core feature implementation',included:true},{text:'Clean, intuitive popup/sidebar UI',included:true},{text:'Local storage for user preferences',included:true},{text:'Manifest V3 compliant (Chrome)',included:true},{text:'Extension icons & branding',included:true},{text:'3 rounds of revisions',included:true},{text:'Chrome Web Store / VS Marketplace publishing',included:true},{text:'Delivery in 5–7 business days',included:true},{text:'Priority email support',included:true}]},
    {title:'Premium',price:'$99',period:'/ project',desc:'A full-featured extension with API integration, premium UI, and monetization-ready.',Icon:FaBuilding,badge:'⭐ Best Value',recommended:false,btnText:'Go Premium',features:[{text:'Chrome or VS Code extension (advanced)',included:true},{text:'Multiple features & settings panel',included:true},{text:'API / backend integration',included:true},{text:'User authentication & sync',included:true},{text:'Premium UI with dark/light themes',included:true},{text:'Content script injection (Chrome)',included:true},{text:'Context menu integrations',included:true},{text:'Keyboard shortcuts support',included:true},{text:'Monetization setup (freemium/paid)',included:true},{text:'Store listing with screenshots & description',included:true},{text:'Unlimited revisions',included:true},{text:'Delivery in 7–10 business days',included:true},{text:'Dedicated support for 14 days',included:true},{text:'Full source code ownership',included:true}]},
  ],
};

/* SEO schema */
const buildSchema = (catLabel, plans) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: `Minderfly — ${catLabel}`,
  provider: { '@type': 'Organization', name: 'Minderfly', url: 'https://www.minderfly.com' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${catLabel} Pricing Plans`,
    itemListElement: plans.map(p => ({
      '@type': 'Offer',
      name: `${p.title} Plan`,
      description: p.desc,
      price: p.price === 'Free' ? '0' : p.price.replace('$',''),
      priceCurrency: 'USD',
    })),
  },
});

/* ── Plan Card ── */
const PlanCard = ({ plan, catLabel, onOrder, index }) => {
  const isRec = plan.recommended;
  const isFree = plan.price === 'Free';

  return (
    <motion.article
      className={`plan-card${isRec ? ' is-recommended' : ''}`}
      initial={{ opacity:0, y:22 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:.45, delay: index*.08, ease:[.22,1,.36,1] }}
      itemScope
      itemType="https://schema.org/Offer"
    >
      <meta itemProp="price"         content={isFree ? '0' : plan.price.replace('$','')} />
      <meta itemProp="priceCurrency" content="USD" />
      <meta itemProp="description"   content={plan.desc} />

      {/* Badge */}
      {isRec && (
        <span className="plan-badge plan-badge-popular">{plan.badge}</span>
      )}
      {!isRec && plan.badge && (
        <span className="plan-badge plan-badge-value">{plan.badge}</span>
      )}

      {/* Icon */}
      <div className="plan-icon-wrap" aria-hidden="true">
        <plan.Icon/>
      </div>

      {/* Title */}
      <h3 className="plan-title" itemProp="name">{catLabel} — {plan.title}</h3>

      {/* Price */}
      <div className="plan-price-row">
        <span className={`plan-amount${isFree ? ' plan-amount-free' : ''}`}>
          {plan.price}
        </span>
        {plan.period && <span className="plan-period">{plan.period}</span>}
      </div>

      <p className="plan-desc">{plan.desc}</p>

      <div className="plan-divider" aria-hidden="true"/>

      <span className="plan-features-label">What's included</span>

      <ul className="plan-features">
        {plan.features.map((f, i) => (
          <li
            key={i}
            className={`plan-feature-item${f.included === false ? ' feat-no' : f.info ? ' feat-info' : ''}`}
          >
            <span className="feat-icon">
              {f.included === false ? <FaTimes className="feat-cross" aria-label="Not included"/>
               : f.info              ? <FaInfoCircle className="feat-info-ic" aria-label="Info"/>
               :                       <FaCheck className="feat-check" aria-label="Included"/>}
            </span>
            {f.text}
          </li>
        ))}
      </ul>

      <button
        className={`plan-btn ${isRec ? 'plan-btn-recommended' : 'plan-btn-default'}`}
        onClick={() => onOrder?.(`${catLabel} — ${plan.title} Plan`)}
        aria-label={`${plan.btnText} for ${catLabel} ${plan.title} plan`}
      >
        {plan.btnText}
      </button>
    </motion.article>
  );
};

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
const PricingSection = ({ onOrder }) => {
  const [activeCat, setActiveCat] = useState('web');
  const plans    = ALL_PLANS[activeCat] || [];
  const catLabel = CATEGORIES.find(c => c.key === activeCat)?.label ?? '';

  return (
    <section
      className="pricing-section"
      id="pricing"
      aria-label="Minderfly service pricing plans"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(catLabel, plans)) }}
      />

      <div className="pricing-inner">

        {/* ── Header ── */}
        <motion.div
          className="pricing-header"
          initial={{ opacity:0, y:18 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-60px' }}
          transition={{ duration:.7, ease:[.22,1,.36,1] }}
        >
          <div>
            <div className="pricing-eyebrow">
              <span className="pricing-eyebrow-num">05 /</span>
              <span className="pricing-eyebrow-line"/>
              <span className="pricing-eyebrow-label">Pricing</span>
            </div>
            <h2 className="pricing-title">
              Transparent pricing.<br/>
              <span className="pricing-title-stroke">Zero surprises.</span>
            </h2>
          </div>
          <p className="pricing-sub">
            Every plan includes real deliverables, clear timelines, and direct communication. No hidden fees.
          </p>
        </motion.div>

        {/* ── Category tabs ── */}
        <div className="pricing-tabs" role="tablist" aria-label="Service categories">
          {CATEGORIES.map(({ key, label, Icon }) => (
            <button
              key={key}
              role="tab"
              aria-selected={activeCat === key}
              className={`pricing-tab${activeCat === key ? ' is-active' : ''}`}
              onClick={() => setActiveCat(key)}
            >
              <span className="tab-icon-wrap"><Icon aria-hidden="true"/></span>
              <span className="tab-label">{label}</span>
            </button>
          ))}
        </div>

        {/* ── Plans ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat}
            className={`pricing-grid grid-${plans.length === 1 ? 1 : plans.length === 2 ? 2 : 3}`}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            transition={{ duration:.2 }}
            role="tabpanel"
            aria-label={`${catLabel} plans`}
          >
            {plans.map((plan, i) => (
              <PlanCard
                key={plan.title}
                plan={plan}
                catLabel={catLabel}
                onOrder={onOrder}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default PricingSection;