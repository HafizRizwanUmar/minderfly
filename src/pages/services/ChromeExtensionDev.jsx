import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';

const ChromeExtensionDev = () => {
    const features = [
        {
            title: 'Workflow Automation',
            desc: 'Eliminate repetitive browser tasks with intelligent automation scripts, background workers, and DOM interaction — saving your team hours every week.',
        },
        {
            title: 'Data Extraction & Scraping',
            desc: 'Build robust tools to capture, structure, and export web data. From lead generation to competitive analysis, we engineer scrapers that work reliably at scale.',
        },
        {
            title: 'Custom Popups & Sidebars',
            desc: 'Design rich, React-powered popups and persistent sidebar panels that integrate seamlessly into the Chrome UI without friction.',
        },
        {
            title: 'Context Menu Integration',
            desc: 'Add intelligent right-click actions that let users interact with selected content, trigger workflows, or pull in third-party data in one click.',
        },
        {
            title: 'Cross-Browser Compatibility',
            desc: 'Built on Manifest v3 standards, your extension works across Chrome, Edge, Brave, Arc, and all Chromium-based browsers out of the box.',
        },
        {
            title: 'Chrome Web Store Publishing',
            desc: 'End-to-end help preparing store listings, writing compelling descriptions, handling review submissions, and optimising for discoverability.',
        },
    ];

    const processSteps = [
        { title: 'Discovery',    desc: 'We map your workflow problem and scope the extension architecture before writing a line of code.' },
        { title: 'Design',       desc: 'Wireframes and UI prototypes for every popup, sidebar, and options page.' },
        { title: 'Development',  desc: 'Manifest v3 development with TypeScript and React — clean, auditable code.' },
        { title: 'QA & Review',  desc: 'Cross-browser testing plus a guided Chrome Web Store review submission.' },
        { title: 'Launch',       desc: 'Live on the store with analytics, version control, and update documentation.' },
    ];

    const faqs = [
        {
            q: 'How long does Chrome extension development take?',
            a: 'Most extensions ship in 3–6 weeks depending on complexity. Simple popup tools are faster; extensions with backend integrations or complex content scripts take longer. We give a fixed timeline after scoping.',
        },
        {
            q: 'Do you use Manifest v3?',
            a: 'Yes. All our extensions are built on Manifest v3 — the current Chrome standard. MV2 is deprecated by Google and will stop working in 2025, so we never build on it for new projects.',
        },
        {
            q: 'Can you add AI features to a Chrome extension?',
            a: 'Absolutely. We regularly integrate OpenAI, Anthropic, and other LLM APIs directly into extensions — for summarisation, writing assistance, data analysis, and more.',
        },
        {
            q: 'Will the extension pass Chrome Web Store review?',
            a: "Yes — we follow Google's developer policies closely and prepare your store listing to meet all requirements. We handle any review rejections at no extra cost.",
        },
        {
            q: 'Can you maintain the extension after launch?',
            a: 'Yes. We offer monthly maintenance retainers covering Chrome API changes, dependency updates, bug fixes, and new feature additions.',
        },
    ];

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Chrome Extension Development',
        serviceType: 'Custom Browser Extension Development',
        description: 'Professional Chrome extension development services using Manifest v3. We build productivity tools, automation extensions, data scrapers, and AI-powered browser tools published to the Chrome Web Store.',
        provider: {
            '@type': 'Organization',
            name: 'Minderfly',
            url: 'https://minderfly.com',
        },
        areaServed: 'Worldwide',
        url: 'https://minderfly.com/services/chrome-extension-development',
    };

    return (
        <ServicePageLayout
            title="Chrome Extension Development"
            subtitle="Supercharge every tab."
            description="We build production-grade Chrome extensions that users actually keep installed. From workflow automation tools to AI-powered browser companions, our extensions are fast, secure, Manifest v3 compliant, and ready for the Chrome Web Store."
            features={features}
            processSteps={processSteps}
            faqs={faqs}
            image="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200"
            badgeText="Manifest v3 Certified"
            ctaText="Get a Free Estimate"
            ctaLink="/contact"
            seoTitle="Chrome Extension Development Services — Manifest v3 Experts | Minderfly"
            seoDescription="Professional Chrome extension development using Manifest v3. We build workflow automation tools, data scrapers, AI browser extensions, and productivity tools — published to the Chrome Web Store. Get a free project estimate."
            seoKeywords="Chrome extension development, Manifest v3 extension, custom Chrome extension, browser automation extension, Chrome Web Store development, productivity Chrome extension, AI Chrome extension, JavaScript browser extension, TypeScript Chrome extension"
            canonicalUrl="/services/chrome-extension-development"
            extraSchema={structuredData}
        />
    );
};

export default ChromeExtensionDev;