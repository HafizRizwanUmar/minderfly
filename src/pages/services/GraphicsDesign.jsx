import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';
import { articlesData } from '../../data/articles';

const GraphicsDesign = () => {
    const features = [
        {
            title: 'Brand Identity Design',
            desc: 'Logo, color palette, typography, and brand guidelines delivered as a complete system — not just a logo file. Everything your team needs to stay consistent across every medium.',
        },
        {
            title: 'UI/UX Design',
            desc: 'High-fidelity Figma designs for web and mobile apps. User flows, wireframes, interactive prototypes, and component libraries ready for handoff to developers.',
        },
        {
            title: 'Social Media Design',
            desc: 'Scroll-stopping posts, story templates, ad creatives, and reels thumbnails. Designed in your brand system so every piece of content feels like it belongs together.',
        },
        {
            title: 'Pitch Deck & Presentations',
            desc: 'Investor decks, sales presentations, and internal reports that actually get read. Data visualisation, storytelling structure, and visual design that commands attention.',
        },
        {
            title: 'Marketing Materials',
            desc: 'Brochures, flyers, business cards, banners, and email templates. Print-ready CMYK files and web-optimised versions delivered together.',
        },
        {
            title: 'Packaging & Product Design',
            desc: 'Product labels, packaging dielines, and mockup presentations. Designs that look premium on shelf and in product photography.',
        },
    ];

    const problems = [
        {
            icon: '🎨',
            problem: "Your brand looks like it was designed by three different people on three different days — no consistency, no identity, no trust.",
            solution: "We build a complete brand system: logo, colors, type, tone, and usage rules. One style guide your whole team follows forever.",
        },
        {
            icon: '📉',
            problem: "You're spending money on paid ads but the creatives look amateur. Low CTR, low conversions, high burn rate.",
            solution: "Our ad creatives are A/B tested and designed with persuasion psychology — hooks, hierarchy, and CTAs that have been proven to convert.",
        },
        {
            icon: '🐢',
            problem: "Your last designer took 3 weeks to deliver a logo, then disappeared when you needed revisions. You're still waiting.",
            solution: "First concepts within 48 hours. Revisions within 24 hours. A dedicated designer who responds on the same day — every time.",
        },
        {
            icon: '🤷',
            problem: "You got a logo on Fiverr for $5 but can't use it — it's low-res, has no vector file, and looks identical to 500 other brands.",
            solution: "We deliver source files (AI, SVG, EPS), high-res exports in every format, and a brand style guide. You own everything, completely.",
        },
    ];

    const stats = [
        { value: '200+', label: 'Designs delivered' },
        { value: '48h', label: 'First concept' },
        { value: '∞', label: 'Revisions included' },
        { value: '100%', label: 'Source files provided' },
    ];

    const whyUs = [
        { title: 'First concept',    us: 'Within 48 hours',         them: '1–3 week turnaround' },
        { title: 'Revisions',        us: 'Unlimited until satisfied', them: '2–3 rounds then charged' },
        { title: 'File formats',     us: 'All source + export files', them: 'PNG only, source extra' },
        { title: 'Brand strategy',   us: 'Included in brand work',   them: 'Separate service/charge' },
        { title: 'Communication',    us: 'Same-day responses',       them: 'Email only, days delay' },
        { title: 'Ownership',        us: '100% IP transfer',         them: 'License fees apply' },
    ];

    const seoArticle = {
        heading: 'Why good design is the highest-ROI investment your business can make.',
        paragraphs: [
            { h3: 'Design is not decoration — it\'s communication' },
            'Every element of your visual identity sends a signal to potential customers. An inconsistent logo says "small startup". A generic stock-photo website says "we don\'t care". A premium, cohesive brand design says "we\'re worth your trust and your money".',
            'Studies consistently show that 75% of consumers judge a company\'s credibility based on its website design. That\'s before they read a word of copy. Design is your first sales conversation — and it\'s happening whether you control it or not.',
            { h3: 'The hidden cost of cheap design' },
            'A $5 Fiverr logo seems like a bargain until you realise it\'s a raster file at 72 DPI that can\'t be used on anything larger than a social media post. Or until you discover three other businesses have the exact same logo. The real cost of bad design is the customers you lose every day because you look untrustworthy.',
            { h3: 'What goes into a complete brand identity?' },
            'A real brand identity is not just a logo. It\'s a logo system (primary, secondary, icon), a color palette with exact hex, RGB, and CMYK values, a type system (heading and body fonts with precise weights and sizes), a tone-of-voice guide, and usage rules for how everything works together. Without all of these, your team will create inconsistency the moment you try to scale.',
            { h3: 'How we approach UI/UX design for apps and websites' },
            'We always start with user research: what does your user need to accomplish, and what\'s the shortest path to that goal? Every design decision is grounded in user psychology — F-pattern reading, visual hierarchy, Fitts\'s law for button sizing, and color theory for emotional response. Beautiful design that doesn\'t convert is just expensive art.',
        ],
    };

    const processSteps = [
        { title: 'Discovery',   desc: 'Brand audit, competitor analysis, audience research, and creative brief before any concept work begins.' },
        { title: 'Concepts',    desc: '3 distinct design directions delivered within 48 hours. Each with rationale explaining the strategic thinking.' },
        { title: 'Refinement',  desc: 'Unlimited revisions on your chosen direction until every detail is exactly right — no invoice surprises.' },
        { title: 'Production',  desc: 'All files prepared: source files (AI/Figma), exports in every required format, and print-ready CMYK where needed.' },
        { title: 'Handoff',     desc: 'Brand style guide, file organisation, and a walkthrough call so your team can apply the system confidently.' },
    ];

    const faqs = [
        {
            q: 'What file formats do you deliver?',
            a: 'Every project includes source files (AI, PSD, or Figma), vector exports (SVG, EPS), high-res raster exports (PNG, JPEG at 300 DPI), and web-optimised versions. Print projects include CMYK PDF files. You get everything you could ever need.',
        },
        {
            q: 'How many revisions do I get?',
            a: 'Unlimited. We work until you\'re completely satisfied with the result. We\'ve never had a project close without a happy client — and that\'s not an accident.',
        },
        {
            q: 'Do you do one-off projects or ongoing work?',
            a: 'Both. Many clients start with a brand identity project and then retain us for ongoing social media, campaign, and marketing material design. Monthly retainer rates are available.',
        },
        {
            q: 'Can you work with our internal team?',
            a: 'Yes. We\'re comfortable working within existing brand guidelines and alongside internal marketing teams. Just share your brand guide and we\'ll design within it.',
        },
    ];

    const relatedArticles = articlesData
        ? articlesData.filter(a => a.category === 'Design' || a.category === 'Branding').slice(0, 2)
        : [];

    return (
        <ServicePageLayout
            title="Graphics Design"
            subtitle="Design that makes people stop scrolling and start trusting."
            description="From brand identities and UI/UX design to social media creatives and pitch decks — we create visual work that communicates, converts, and leaves a lasting impression. Premium design delivered fast."
            features={features}
            problems={problems}
            stats={stats}
            whyUs={whyUs}
            seoArticle={seoArticle}
            processSteps={processSteps}
            faqs={faqs}
            relatedArticles={relatedArticles}
            image="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200"
            badgeText="Logo · UI · Branding"
            ctaText="Start a Design Project"
            ctaLink="/contact"
            seoTitle="Graphic Design Agency Pakistan | Logo, Brand Identity & UI Design | Minderfly"
            seoDescription="Professional graphic design services in Pakistan: logo design, brand identity, UI/UX design, social media creatives, and pitch decks. Based in Lahore, serving global clients. Fast turnaround, unlimited revisions. Get your first concept in 48 hours."
            seoKeywords="graphic design agency Pakistan, logo design agency Lahore, brand identity designer Pakistan, UI UX design service Pakistan, social media design agency Lahore, pitch deck design Pakistan, professional graphic designer Pakistan, branding agency Lahore, custom logo design Pakistan, Figma UI design Pakistan, brand design for startups Pakistan, graphic designer for hire Lahore, affordable design agency Pakistan"
            canonicalUrl="/services/graphics-design"
        />
    );
};

export default GraphicsDesign;