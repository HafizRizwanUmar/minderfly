import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import './TestimonialsSection.css';

/* ═══════════════════════════════════════
   TestimonialsSection — Homepage
   Dual-row CSS marquee (no JS scroll)
   Editorial header · acid-green accent
   Full SEO structured data
═══════════════════════════════════════ */

const TESTIMONIALS = [
  {
    id: 1,
    name:    'James Wilson',
    role:    'Founder, Nexus AI',
    content: 'We needed a complex Chrome extension to handle proprietary data analysis. Minderfly understood the assignment immediately. The delivery was flawless and secure.',
    rating:  5,
    image:   'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name:    'Sarah Chen',
    role:    'Product Lead, FlowSync',
    content: "Minderfly's Flutter team is world-class. They ported our React web app to mobile in record time without compromising performance. Truly pixel-perfect.",
    rating:  5,
    image:   'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    name:    'Marcus Thorne',
    role:    'CTO, Vertex Global',
    content: "I've worked with many agencies, but few have the technical depth to build custom VS Code extensions. Minderfly built a tool that saved our dev team 20 hours a week.",
    rating:  5,
    image:   'https://randomuser.me/api/portraits/men/85.jpg',
  },
  {
    id: 4,
    name:    'Elena Rodriguez',
    role:    'Director of Marketing, OmniBrand',
    content: 'Our new website is a lead-generation machine. The SEO optimisation they included out-of-the-box was a game changer. Organic traffic is up 180% in three months.',
    rating:  5,
    image:   'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 5,
    name:    'David Kim',
    role:    'Indie Developer',
    content: "The custom Chrome theme they designed for my personal brand is stunning. It's the small details that matter, and Minderfly nailed every single one.",
    rating:  5,
    image:   'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: 6,
    name:    'Olivia Sterling',
    role:    'CEO, Sterling & Co.',
    content: "Professional, transparent, and incredibly skilled. They didn't just write code — they acted as true partners in refining our entire product strategy.",
    rating:  5,
    image:   'https://randomuser.me/api/portraits/women/90.jpg',
  },
];

/* Split testimonials across two rows for the dual-marquee effect */
const ROW_1 = TESTIMONIALS;
const ROW_2 = [...TESTIMONIALS].reverse();

/* ── Structured data ── */
const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Minderfly',
  url: 'https://www.minderfly.com',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: String(TESTIMONIALS.length),
    bestRating: '5',
    worstRating: '5',
  },
  review: TESTIMONIALS.map(t => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    reviewBody: t.content,
    reviewRating: { '@type': 'Rating', ratingValue: String(t.rating), bestRating: '5', worstRating: '1' },
  })),
};

/* ── Single review card ── */
const ReviewCard = ({ review }) => (
  <article
    className="testi-card"
    itemScope
    itemType="https://schema.org/Review"
    aria-label={`Review by ${review.name}`}
  >
    <meta itemProp="reviewBody" content={review.content} />

    <FaQuoteLeft className="testi-card-quote-icon" aria-hidden="true"/>

    <div className="testi-card-head">
      <div className="testi-avatar">
        <img
          src={review.image}
          alt={`${review.name} — ${review.role}`}
          loading="lazy"
          width="46"
          height="46"
          itemProp="image"
        />
      </div>
      <div className="testi-card-info" itemProp="author" itemScope itemType="https://schema.org/Person">
        <span className="testi-card-name" itemProp="name">{review.name}</span>
        <span className="testi-card-role">{review.role}</span>
      </div>
      <div
        className="testi-card-stars"
        aria-label={`${review.rating} out of 5 stars`}
        itemProp="reviewRating"
        itemScope
        itemType="https://schema.org/Rating"
      >
        <meta itemProp="ratingValue" content={String(review.rating)} />
        <meta itemProp="bestRating"  content="5" />
        {Array.from({ length: review.rating }).map((_, i) => (
          <FaStar key={i} aria-hidden="true"/>
        ))}
      </div>
    </div>

    <p className="testi-card-text">"{review.content}"</p>
  </article>
);

/* ── Marquee row ── */
const MarqueeRow = ({ reviews, direction }) => (
  <div className={`testi-track row-${direction}`} aria-hidden="true">
    {/* First set */}
    {reviews.map(r => <ReviewCard key={r.id}     review={r} />)}
    {/* Duplicate for seamless loop */}
    {reviews.map(r => <ReviewCard key={`dup-${r.id}`} review={r} />)}
  </div>
);

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
const TestimonialsSection = () => (
  <section
    className="testi-section"
    aria-label="Client testimonials and reviews"
    itemScope
    itemType="https://schema.org/Organization"
  >
    {/* Structured data */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
    />

    <meta itemProp="name" content="Minderfly" />

    <div className="testi-inner">
      {/* ── Header ── */}
      <motion.header
        className="testi-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: .75, ease: [.22,1,.36,1] }}
      >
        <div className="testi-header-left">
          <div className="testi-eyebrow" aria-hidden="true">
            <span className="testi-eyebrow-num">04 /</span>
            <span className="testi-eyebrow-line"/>
            <span className="testi-eyebrow-label">Testimonials</span>
          </div>
          <h2 className="testi-title">
            Trusted by<br/>
            <span className="testi-title-ac">Innovators.</span><br/>
            <span className="testi-title-stroke">Worldwide.</span>
          </h2>
        </div>

        <div className="testi-header-right">
          <p className="testi-sub">
            Don't take our word for it. Hear from the founders, CTOs, and developers who trusted us with their most ambitious projects.
          </p>
          <div className="testi-stars-pill" aria-label="Average rating: 5 out of 5 stars across all reviews">
            <div className="testi-stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => <FaStar key={i}/>)}
            </div>
            <span>5.0 · {TESTIMONIALS.length} reviews</span>
          </div>
        </div>
      </motion.header>
    </div>

    {/* ── Dual marquee rows ── */}
    <div className="testi-marquee-area" role="region" aria-label="Scrolling testimonials">
      <MarqueeRow reviews={ROW_1} direction="1"/>
      <MarqueeRow reviews={ROW_2} direction="2"/>
    </div>

  </section>
);

export default TestimonialsSection;