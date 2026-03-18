import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';

const GraphicsDesign = () => {
    const features = [
        {
            title: 'Brand Identity Design',
            desc: 'Logos, colour palettes, typography systems, and brand guidelines that define a distinct visual identity — built to scale across every touchpoint.',
        },
        {
            title: 'UI / UX Design',
            desc: 'User-centric interface design for web and mobile. We create wireframes, high-fidelity mockups, and interactive prototypes that convert and delight.',
        },
        {
            title: 'Social Media Assets',
            desc: 'On-brand, scroll-stopping posts, banners, stories, and ad creatives tailored to your platform requirements and audience.',
        },
        {
            title: 'Marketing Collateral',
            desc: 'Pitch decks, brochures, one-pagers, and presentation templates that communicate your message clearly and leave a lasting impression.',
        },
        {
            title: 'Custom Illustration',
            desc: 'Bespoke vector illustrations and icon sets that add personality and uniqueness to your digital product or brand campaign.',
        },
        {
            title: 'Design Systems',
            desc: 'Comprehensive component libraries and style guides — colours, typography, spacing, components — that keep every designer and developer aligned.',
        },
    ];

    const processSteps = [
        { title: 'Discovery',    desc: 'Brand audit, competitor review, and audience analysis to inform every design decision.' },
        { title: 'Concept',      desc: 'Mood boards and initial directions. You choose the path before we go deep.' },
        { title: 'Design',       desc: 'High-fidelity deliverables in Figma, reviewed in collaborative sessions.' },
        { title: 'Refinement',   desc: 'Two rounds of structured feedback and revisions included in every project.' },
        { title: 'Handoff',      desc: 'Export packages for web, print, and development — in every format you need.' },
    ];

    const faqs = [
        {
            q: 'What tools do you design in?',
            a: "Primarily Figma for UI/UX and brand work. For print and illustration, we use Adobe Illustrator and Photoshop. All source files are delivered with your project.",
        },
        {
            q: 'How many revision rounds are included?',
            a: 'Every project includes two structured revision rounds. Additional revisions are available at a fixed hourly rate. We define revision scope clearly in the brief to avoid ambiguity.',
        },
        {
            q: 'Do you work with existing brand guidelines?',
            a: 'Yes. We can extend, refresh, or strictly adhere to existing guidelines. If you have a brand book or component library, send it over during discovery and we design within your system.',
        },
        {
            q: 'Can you design and develop?',
            a: "Yes — we're a full-service studio. Designs can be handed off directly to our development team for implementation in React, Flutter, or any other platform. No translation gap.",
        },
        {
            q: 'What file formats do you deliver?',
            a: 'SVG, PNG (2x/3x), PDF (print-ready and screen), Figma source, AI/EPS for illustrations, and packaged fonts. Format requirements are discussed at project start.',
        },
    ];

    return (
        <ServicePageLayout
            title="Premium Graphics Design"
            subtitle="Visual storytelling that captivates."
            description="Design is how it looks and how it works. Our design team crafts compelling visual identities, UI/UX systems, and marketing assets that communicate your message clearly, convert your audience, and scale across every medium."
            features={features}
            processSteps={processSteps}
            faqs={faqs}
            image="https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=1200"
            badgeText="Brand & UI Design"
            ctaText="Request a Design Brief"
            ctaLink="/contact"
            seoTitle="Graphics Design Services — Branding, UI/UX & Illustration | Minderfly"
            seoDescription="Professional graphics design services including brand identity, UI/UX design, logo design, social media assets, custom illustration, and design systems. Figma-based design with full source file delivery."
            seoKeywords="graphics design services, brand identity design, UI UX design, logo design, Figma design, social media design, marketing design, illustration services, design system, visual identity design"
            canonicalUrl="/services/graphics-design"
        />
    );
};

export default GraphicsDesign;