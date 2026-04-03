import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';
import { articlesData } from '../../data/articles';

const ChromeThemeDev = () => {
    const features = [
        {
            title: 'Custom Brand Themes',
            desc: 'Chrome themes perfectly matched to your brand palette — toolbar, tab strip, new tab page, and NTP background all cohesive. Your browser becomes an extension of your visual identity.',
        },
        {
            title: 'Corporate & Enterprise Themes',
            desc: 'Branded themes deployed across entire organisations via the Chrome Web Store or policy management. Perfect for enterprise internal tools and branded customer portals.',
        },
        {
            title: 'New Tab Page Design',
            desc: 'Custom new tab page extensions with branded backgrounds, quick links, productivity widgets, weather, and clocks — turning a dead browser tab into a branded experience.',
        },
        {
            title: 'Colour System Design',
            desc: 'Precise color mapping across all 30+ Chrome theme properties: toolbar, bookmark bar, tab foreground, background tab, NTP background, and more. Pixel-perfect execution.',
        },
        {
            title: 'Chrome Web Store Publishing',
            desc: 'We handle the complete submission: theme packaging (.crx), store listing optimisation, promotional screenshots, and policy compliance review for approval.',
        },
        {
            title: 'Theme + Extension Bundles',
            desc: 'Combine a custom theme with a functional extension for a fully branded browser experience — a premium offering for enterprises and SaaS companies building browser-first products.',
        },
    ];

    const problems = [
        {
            icon: '🎨',
            problem: "You want to brand your company's browser experience for employees or customers but don't know where to start — theme files look like black magic.",
            solution: "We handle everything: color system design, theme JSON generation, packaging, and Chrome Web Store submission. You just review and approve the design.",
        },
        {
            icon: '🏢',
            problem: "Your enterprise has 500 employees using Chrome with ugly default themes that don't reflect your brand at all. IT is too busy to deal with it.",
            solution: "We create, package, and publish enterprise Chrome themes that can be deployed org-wide via Google Workspace admin or Chrome policy with zero user action required.",
        },
        {
            icon: '🖥️',
            problem: "Your SaaS product lives in the browser but stops at the tab. Competitors are building fully branded browser experiences and you're still using the default grey toolbar.",
            solution: "We build custom Chrome themes + new tab page extensions that make your SaaS product feel native to the browser — a premium touch that increases perceived value.",
        },
        {
            icon: '📐',
            problem: "You tried building a Chrome theme yourself using online tools but the colors look washed out, the bookmark bar clashes, and it looks nothing like your brand.",
            solution: "Chrome theme colors require precise mapping across 30+ properties with specific gamma corrections. We have a tested system that gets it pixel-perfect every time.",
        },
    ];

    const stats = [
        { value: '30+', label: 'Theme properties mastered' },
        { value: '48h', label: 'First mockup delivery' },
        { value: '5★', label: 'Store reviews' },
        { value: 'B2B', label: 'Enterprise ready' },
    ];

    const whyUs = [
        { title: 'NTP customisation', us: 'Full new tab page redesign',  them: 'Static background only' },
        { title: 'Color accuracy',    us: 'All 30+ properties mapped',   them: 'Toolbar only' },
        { title: 'Enterprise deploy', us: 'Policy & admin deployment',   them: 'Manual install only' },
        { title: 'Bundling',          us: 'Theme + extension combo',     them: 'Theme only' },
        { title: 'Store publishing',  us: 'Full listing management',     them: 'You handle submission' },
        { title: 'Turnaround',        us: 'First mockup in 48 hours',    them: '1–2 week wait' },
    ];

    const seoArticle = {
        heading: 'Chrome themes for business: the low-cost way to make your brand unforgettable.',
        paragraphs: [
            { h3: 'Why branded browser experiences are growing in B2B' },
            'SaaS companies spend thousands on product design and UI. But the moment a user opens a new tab to check something, they\'re back to Chrome\'s generic grey interface. Forward-thinking companies are changing this with custom Chrome themes and branded new tab page extensions — keeping their brand visible even between sessions.',
            'The ROI is disproportionate to the cost. A custom Chrome theme that shows your logo in the toolbar and your brand colors in the tab strip costs a fraction of a single paid ad campaign — and it\'s seen by the user every single time they open their browser.',
            { h3: 'What is a Chrome theme exactly?' },
            'A Chrome theme is a packaged .crx file containing a JSON manifest and PNG image assets that define the visual appearance of Chrome\'s browser chrome (the frame, toolbar, and tab strip — not the web page content). Themes can customise the toolbar background, tab colors, bookmark bar, new tab page background, and more.',
            { h3: 'Chrome themes vs new tab page extensions' },
            'A Chrome theme styles the browser frame itself. A new tab page (NTP) extension replaces the default new tab page with custom HTML/CSS — allowing widgets, links, custom backgrounds, and even live data. For a complete branded experience, the two are often combined: the theme handles the toolbar, the NTP extension handles the new tab content.',
            { h3: 'How enterprise Chrome theme deployment works' },
            'For organisations using Google Workspace, Chrome themes can be deployed silently to all managed devices via the Chrome Web Store URL set in the Admin Console under Device Management > Chrome > User & browser settings > Extensions & Apps. No user action required. The theme applies the moment the policy syncs to the device — typically within minutes.',
        ],
    };

    const processSteps = [
        { title: 'Brand Extraction', desc: 'We analyse your brand guidelines and extract the precise colors, patterns, and assets needed for Chrome\'s theme system.' },
        { title: 'Color Mapping',    desc: 'All 30+ Chrome theme color properties mapped and tested across light and dark system themes.' },
        { title: 'NTP Design',       desc: 'New tab page design (if included) built as a full HTML/CSS/JS extension with review on a test Chrome profile.' },
        { title: 'QA & Polish',      desc: 'Testing on Windows, macOS, and ChromeOS. Review of readability across all browser UI states.' },
        { title: 'Store Publishing', desc: 'Chrome Web Store submission with optimised listing, screenshots, and policy compliance.' },
    ];

    const faqs = [
        {
            q: 'Can a Chrome theme change the new tab page?',
            a: 'A basic Chrome theme can set a background image for the new tab page, but for full control (custom links, widgets, layout) you need a new tab page extension alongside the theme. We build both as a bundle.',
        },
        {
            q: 'How do I deploy a Chrome theme to all employees?',
            a: 'Via Google Workspace Admin Console under Device Management. You set the Chrome Web Store URL of your theme and it deploys silently to all managed Chrome profiles. We provide the exact policy settings.',
        },
        {
            q: 'Can you make a private theme only for our company?',
            a: 'Yes. Chrome Web Store allows private, unlisted extensions and themes visible only via direct link — not searchable publicly. Ideal for internal corporate themes.',
        },
        {
            q: 'Does a Chrome theme slow down the browser?',
            a: 'No. Chrome themes are purely visual assets (image files and a color manifest). They have zero impact on browser performance, JavaScript, or page load times.',
        },
    ];

    const relatedArticles = articlesData
        ? articlesData.filter(a => a.category === 'Chrome' || a.category === 'Design').slice(0, 2)
        : [];

    return (
        <ServicePageLayout
            title="Chrome Theme Development"
            subtitle="Make every browser session a branded experience."
            description="Custom Chrome themes and new tab page extensions for businesses, enterprises, and SaaS products. We design, build, and publish branded browser experiences that keep your identity front and center — even between tabs."
            features={features}
            problems={problems}
            stats={stats}
            whyUs={whyUs}
            seoArticle={seoArticle}
            processSteps={processSteps}
            faqs={faqs}
            relatedArticles={relatedArticles}
            image="https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=1200"
            badgeText="Custom Browser Branding"
            ctaText="Design My Theme"
            ctaLink="/contact"
            seoTitle="Custom Chrome Theme Development — Business & Enterprise | Minderfly"
            seoDescription="Professional Chrome theme design and development for businesses and enterprises. Custom toolbar colors, new tab page design, and Chrome Web Store publishing. Branded browser experiences from $299."
            seoKeywords="custom chrome theme development, chrome theme for business, enterprise chrome theme, branded chrome browser, new tab page extension, chrome web store theme, chrome theme developer, corporate browser branding, google chrome theme service"
            canonicalUrl="/services/chrome-theme-development"
        />
    );
};

export default ChromeThemeDev;