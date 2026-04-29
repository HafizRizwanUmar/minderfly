import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';
import { articlesData } from '../../data/articles';

const ChromeExtensionDev = () => {
    const features = [
        {
            title: 'Manifest V3 Development',
            desc: 'All extensions built to the latest Chrome MV3 standard — fully compliant with Google\'s 2024-2025 migration requirements, ensuring your extension stays in the Chrome Web Store.',
        },
        {
            title: 'Content Script Automation',
            desc: 'Inject scripts into any website to automate workflows, scrape data, modify page content, or add UI overlays. Ideal for internal tools and productivity extensions.',
        },
        {
            title: 'Browser Action & Popup UI',
            desc: 'Beautiful, responsive popup UIs built with React or vanilla JS. Modern design that feels native to Chrome — not like an afterthought bolted onto a toolbar icon.',
        },
        {
            title: 'Background Service Workers',
            desc: 'Persistent background logic using MV3 service workers: alarm scheduling, OAuth flows, cross-tab communication, and API polling — all without draining battery.',
        },
        {
            title: 'Firefox & Edge Compatibility',
            desc: 'Extensions built for Chrome can be adapted for Firefox (WebExtensions API) and Microsoft Edge with minimal additional work — broadening your reach significantly.',
        },
        {
            title: 'Chrome Web Store Publishing',
            desc: 'Full submission management: store listing, screenshots, privacy policy, review correspondence, and updating through the Chrome Web Store Developer Dashboard.',
        },
    ];

    const problems = [
        {
            icon: '🚫',
            problem: "Your Chrome extension got removed from the Web Store for policy violations. You've lost thousands of users overnight with no clear path back.",
            solution: "We build MV3-compliant extensions from day one, audit against Chrome Web Store policies before submission, and handle review correspondence if issues arise.",
        },
        {
            icon: '⏰',
            problem: "Your team is wasting 3–4 hours per day on repetitive browser tasks — copying data between tabs, formatting reports, filling identical forms.",
            solution: "We build automation extensions that eliminate repetitive browser work entirely. What takes your team 3 hours can become a one-click action.",
        },
        {
            icon: '🔧',
            problem: "You found a developer who built your extension but now it's broken on Manifest V3 and they've stopped responding to messages.",
            solution: "We rescue MV3 migration projects daily. Send us your extension's source code and we'll audit it, fix the issues, and future-proof it within 1 week.",
        },
        {
            icon: '📦',
            problem: "You've got a great idea for a Chrome extension SaaS but have no idea how to monetise it, gate features, or handle subscriptions inside the browser.",
            solution: "We've built subscription-gated extensions with Stripe integration, licence key validation, and usage-based feature unlocking. We've solved these problems before.",
        },
    ];

    const stats = [
        { value: '20+', label: 'Extensions shipped' },
        { value: 'MV3', label: 'Fully compliant' },
        { value: '5', label: 'Browsers supported' },
        { value: '100%', label: 'Store approval rate' },
    ];

    const whyUs = [
        { title: 'MV3 compliance',    us: 'Built-in from day one',      them: 'Migrate after the fact' },
        { title: 'Store submission',  us: 'Full listing management',     them: 'Submission only, no support' },
        { title: 'Browser coverage',  us: 'Chrome, Firefox, Edge, Brave', them: 'Chrome only' },
        { title: 'UI quality',        us: 'React-powered modern UI',     them: 'Basic HTML popups' },
        { title: 'Security review',   us: 'Included with every build',   them: 'On request, extra charge' },
        { title: 'Monetisation',      us: 'Stripe/licence integration',  them: 'Front-end only' },
    ];

    const seoArticle = {
        heading: 'Chrome extensions as a business: the most underrated SaaS distribution channel.',
        paragraphs: [
            { h3: 'Why Chrome extensions are an untapped growth channel' },
            'There are over 3.2 billion Chrome users worldwide. The Chrome Web Store gets millions of daily visitors actively searching for tools to solve specific problems. Unlike the App Store or Google Play, it\'s dramatically less competitive — most categories are dominated by extensions built in 2016 that haven\'t been updated since.',
            'A well-built, MV3-compliant Chrome extension in a specific niche can acquire thousands of users organically from Web Store search alone. Zero ad spend. Just SEO-optimised store listing and a product that solves a real problem.',
            { h3: 'What Manifest V3 actually means for your extension' },
            'Google has sunset Manifest V2. Any extension still using MV2 will be disabled in Chrome by June 2025. MV3 brings significant changes: background pages become service workers (no persistent state), remote code execution is banned, and the webRequest API is replaced by declarativeNetRequest. If your existing extension is on MV2, migration is not optional — it\'s urgent.',
            { h3: 'The architecture of a modern Chrome extension' },
            'A production Chrome extension has five key components: a manifest.json defining permissions and entry points, a background service worker for persistent logic, content scripts for page interaction, a popup UI for user interaction, and an options page for settings. Getting the permissions right is critical — over-requesting permissions triggers Web Store rejection and user distrust.',
            { h3: 'How to monetise a Chrome extension in 2024' },
            'The most reliable monetisation models are: a freemium model with feature-gated premium tiers, a Stripe-powered subscription validated server-side, a one-time licence key model for B2B tools, and enterprise site licences for internal tools. We\'ve implemented all four patterns and can advise on which fits your specific use case.',
        ],
    };

    const processSteps = [
        { title: 'Spec & Design',  desc: 'Extension architecture, permissions audit, popup/options UI wireframes, and policy compliance review before any code.' },
        { title: 'Development',    desc: 'MV3-compliant build with React popup, service worker, content scripts, and storage layer. Weekly builds for review.' },
        { title: 'Security Audit', desc: 'CSP validation, permission minimisation, and data handling review to pass Chrome Web Store security checks.' },
        { title: 'Store Listing',  desc: 'Optimised title, description, screenshots, and promotional tiles to maximise Web Store discovery.' },
        { title: 'Submission',     desc: 'Full Chrome Web Store submission and review management. Average review time: 1–3 business days.' },
    ];

    const faqs = [
        {
            q: 'Does my extension need to be updated for Manifest V3?',
            a: 'If it\'s currently on MV2, yes — urgently. Google has begun disabling MV2 extensions in Chrome. We offer a full MV3 migration service: code audit, rewrite of incompatible components, and re-submission.',
        },
        {
            q: 'Can you build extensions for Firefox and Edge too?',
            a: 'Yes. Firefox uses the WebExtensions API (very similar to Chrome), and Edge is Chromium-based so Chrome extensions work with minimal adaptation. We can package your extension for all three with the same codebase.',
        },
        {
            q: 'How do I charge users for a Chrome extension?',
            a: 'The most reliable approach is server-side subscription validation with Stripe. Users pay on your website, get a licence key or account, and the extension validates their subscription status on each use. We build this full stack.',
        },
        {
            q: 'How long does Chrome Web Store review take?',
            a: 'Typically 1–3 business days for new submissions, 1–7 days for updates. New publisher accounts without a history can take up to 2 weeks. We\'ve optimised store listings to pass review on the first attempt.',
        },
    ];

    const relatedArticles = articlesData
        ? articlesData.filter(a => a.category === 'Chrome' || a.category === 'Extensions').slice(0, 2)
        : [];

    return (
        <ServicePageLayout
            title="Chrome Extension Development"
            subtitle="Turn browser workflows into one-click superpowers."
            description="We are the leading Chrome extension development agency in Pakistan, building Manifest V3-compliant extensions for global SaaS tools and local business automation. Based in Lahore, we handle everything from concept to the Chrome Web Store."
            features={features}
            problems={problems}
            stats={stats}
            whyUs={whyUs}
            seoArticle={seoArticle}
            processSteps={processSteps}
            faqs={faqs}
            relatedArticles={relatedArticles}
            image="https://images.unsplash.com/photo-1480694313141-fce5e697ee25?auto=format&fit=crop&q=80&w=1200"
            badgeText="MV3 · React · Web Store"
            ctaText="Build My Extension"
            ctaLink="/contact"
            seoTitle="Chrome Extension Development Agency in Pakistan | Manifest V3 | Minderfly"
            seoDescription="Hire the best Chrome extension developers in Pakistan. Specialists in Manifest V3 (MV3), React-powered browser UI, and Web Store automation. Based in Lahore, serving international SaaS companies and local businesses."
            seoKeywords="chrome extension development Pakistan, chrome extension developer Lahore, manifest v3 developer Pakistan, browser extension agency Lahore, hire extension developers Pakistan, custom chrome extensions Lahore, software house for browser tools Pakistan"
            canonicalUrl="/services/chrome-extension-development"
        />
    );
};

export default ChromeExtensionDev;