import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';

const ChromeThemeDev = () => {
    const features = [
        {
            title: 'Brand Identity Integration',
            desc: 'Bring your brand colours, logo, and visual language directly into the Chrome UI — frames, toolbars, tab strips, and the New Tab page, all on-brand.',
        },
        {
            title: 'Employee & Team Themes',
            desc: 'Create a unified, professional browser experience across all company devices. A great choice for internal tools, onboarding, or brand campaigns.',
        },
        {
            title: 'Dark & Light Mode Variants',
            desc: 'We design two-mode theme pairs that look stunning in any lighting — consistent with your palette in both dark and light Chrome settings.',
        },
        {
            title: 'High-Resolution Backgrounds',
            desc: 'Stunning 4K and Retina-ready New Tab backgrounds that inspire. Custom artwork, photography, or AI-generated scenes — your choice.',
        },
        {
            title: 'Custom Frame & Toolbar Design',
            desc: 'Unique window chrome: frame colour, toolbar tints, button colours, and tab shapes that make your browser instantly recognisable.',
        },
        {
            title: 'Creator & Merch Themes',
            desc: 'Monetise your audience with branded themes published to the Chrome Web Store as free or paid digital downloads — no code required from you.',
        },
    ];

    const processSteps = [
        { title: 'Brand Audit',   desc: 'We analyse your existing brand assets — colours, typography, imagery — to inform the design direction.' },
        { title: 'Concept',       desc: 'Flat mockups of the full Chrome UI with your theme applied, presented for feedback before any production work.' },
        { title: 'Production',    desc: 'Theme files built to Chrome spec: correct resolutions, colour profiles, and manifest configuration.' },
        { title: 'Testing',       desc: 'Tested across Windows, macOS, and Linux at multiple display densities.' },
        { title: 'Store Publish', desc: 'Packaged and published to the Chrome Web Store with optimised listing copy and screenshots.' },
    ];

    const faqs = [
        {
            q: 'What file formats do you deliver?',
            a: 'We deliver the complete Chrome theme package: a .crx extension file, unpacked source folder, Chrome Web Store assets (screenshots, promotional tiles), and all source artwork in vector and raster formats.',
        },
        {
            q: 'Can I sell my theme on the Chrome Web Store?',
            a: "Yes. Chrome themes can be published as free or paid items. We handle the full listing — title, description, screenshots, and pricing setup. You own all assets and revenue.",
        },
        {
            q: 'Will it work on all Chromium browsers?',
            a: 'Chrome themes work on all Chromium-based browsers: Chrome, Edge, Brave, Arc, Vivaldi, and others. We verify compatibility as part of our QA process.',
        },
        {
            q: 'How long does theme design take?',
            a: 'A standard brand theme takes 1–2 weeks from brief to published. Complex custom artwork or multi-variant themes may take up to 3 weeks.',
        },
        {
            q: 'Can you update an existing theme?',
            a: 'Yes. We can refresh an existing theme file, update artwork, adjust colours, or create a new version while retaining your existing store listing and reviews.',
        },
    ];

    return (
        <ServicePageLayout
            title="Chrome Theme Development"
            subtitle="Make the internet yours."
            description="Transform Google Chrome into a branded experience. We design and publish custom Chrome themes for companies, creators, and communities — from brand-consistent internal tools to commercial digital downloads on the Chrome Web Store."
            features={features}
            processSteps={processSteps}
            faqs={faqs}
            image="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200"
            badgeText="Chrome Web Store Ready"
            ctaText="Start Your Theme"
            ctaLink="/contact"
            seoTitle="Chrome Theme Development & Design Services | Minderfly"
            seoDescription="Custom Chrome theme design and development for brands, creators, and businesses. High-resolution New Tab backgrounds, branded toolbars, and Chrome Web Store publishing. Get a free quote today."
            seoKeywords="Chrome theme development, custom Chrome theme, branded browser theme, Chrome Web Store theme, Google Chrome theme design, browser branding, New Tab page design, Chrome extension theme, creator browser theme"
            canonicalUrl="/services/chrome-theme-development"
        />
    );
};

export default ChromeThemeDev;