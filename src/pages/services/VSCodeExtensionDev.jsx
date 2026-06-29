import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';
import { articlesData } from '../../data/articles';

const VSCodeExtensionDev = () => {
    const features = [
        {
            title: 'Custom Editor Tooling',
            desc: 'Build specialized panels, context menus, and editor commands tailored to your internal APIs or developer platform.',
        },
        {
            title: 'Language Server Integration',
            desc: 'Implement advanced features like autocomplete, hover documentation, syntax highlighting, and inline diagnostics for proprietary languages.',
        },
        {
            title: 'Webview Panels',
            desc: 'Embed complex React or Vue applications directly inside VS Code for interactive dashboards and configuration tools.',
        },
        {
            title: 'CI/CD & Cloud Integration',
            desc: 'Connect VS Code directly to your cloud infrastructure, allowing developers to manage deployments without leaving the editor.',
        },
        {
            title: 'Authentication Flows',
            desc: 'Secure OAuth integrations and secret storage to interact safely with external services and APIs.',
        },
        {
            title: 'Marketplace Publishing',
            desc: 'Full lifecycle management, from packaging to publishing on the Visual Studio Marketplace with optimized assets.',
        },
    ];

    const problems = [
        {
            icon: '📉',
            problem: "Your developer API is great, but adoption is slow because users have to constantly switch between their editor and your documentation.",
            solution: "We build VS Code extensions that bring your API docs, snippets, and management tools directly into the developer's workspace.",
        },
        {
            icon: '⏰',
            problem: "Your internal engineering team wastes hours on repetitive project scaffolding, deployments, or custom script executions.",
            solution: "We automate these workflows with custom VS Code commands and UI panels tailored to your company's specific stack.",
        },
    ];

    const stats = [
        { value: '10+', label: 'Extensions shipped' },
        { value: 'Typescript', label: 'Core tech stack' },
        { value: '100%', label: 'Marketplace approved' },
    ];

    const whyUs = [
        { title: 'Editor APIs', us: 'Deep knowledge of VS Code internals', them: 'Basic command implementation' },
        { title: 'UI Quality', us: 'React-powered Webviews', them: 'Vanilla HTML/JS' },
        { title: 'Performance', us: 'Lazy loading & minimal bundle size', them: 'Bloated extensions that slow VS Code' },
    ];

    const seoArticle = {
        heading: 'Why developer-first companies need a VS Code Extension.',
        paragraphs: [
            { h3: 'The ultimate developer distribution channel' },
            'VS Code is the dominant code editor globally. If you build tools for developers, the highest leverage move you can make is integrating directly where they spend 8 hours a day. Forcing them to context-switch to a web browser creates friction.',
            { h3: 'Automating internal workflows' },
            'Beyond commercial products, custom VS Code extensions are incredible for internal team productivity. Standardizing project setups, integrating with internal CI/CD, or querying proprietary databases straight from the editor saves countless engineering hours.',
        ],
    };

    const processSteps = [
        { title: 'Architecture', desc: 'Defining extension capabilities, UI/Webview requirements, and necessary VS Code APIs.' },
        { title: 'Development', desc: 'Building the extension in TypeScript, implementing Webviews, and integrating with your APIs.' },
        { title: 'Testing', desc: 'Rigorous testing across different OS environments and VS Code versions.' },
        { title: 'Publishing', desc: 'Packaging via vsce and managing submission to the Visual Studio Marketplace.' },
    ];

    const faqs = [
        {
            q: 'Do you build Webviews with React?',
            a: 'Yes, we specialize in embedding full React applications inside VS Code Webview panels for complex user interfaces.',
        },
        {
            q: 'Can the extension work offline?',
            a: 'It depends on your requirements. We can architect the extension to cache data locally or function entirely offline if it doesn\'t rely on external APIs.',
        },
    ];

    const relatedArticles = articlesData
        ? articlesData.filter(a => a.category === 'VS Code' || a.title.includes('VS Code')).slice(0, 2)
        : [];

    return (
        <ServicePageLayout
            title="VS Code Extension Development"
            subtitle="Bring your tools directly into the developer's editor."
            description="We build custom Visual Studio Code extensions for developer-first companies and internal engineering teams. From complex React Webviews to Language Server integrations."
            features={features}
            problems={problems}
            stats={stats}
            whyUs={whyUs}
            seoArticle={seoArticle}
            processSteps={processSteps}
            faqs={faqs}
            relatedArticles={relatedArticles}
            image="https://images.unsplash.com/photo-1607799279861-4ddf950c4369?auto=format&fit=crop&q=80&w=1200"
            badgeText="TypeScript · Webviews"
            ctaText="Discuss Your Extension"
            ctaLink="/contact"
            seoTitle="VS Code Extension Development Agency | Minderfly"
            seoDescription="Hire expert VS Code extension developers. We build custom developer tools, React Webviews, and Language Server integrations. Bring your API to the editor."
            seoKeywords="vs code extension development, visual studio code developer, custom vs code extension, vscode webview react, developer tools agency"
            canonicalUrl="/services/vscode-extension-development"
        />
    );
};

export default VSCodeExtensionDev;
