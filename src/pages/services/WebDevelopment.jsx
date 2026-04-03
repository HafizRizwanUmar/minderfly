import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';
import { articlesData } from '../../data/articles';

const WebDevelopment = () => {
    const features = [
        {
            title: 'MERN Stack Development',
            desc: 'Full-stack applications built with MongoDB, Express.js, React, and Node.js — a proven combination for scalable, maintainable web platforms that handle real traffic.',
        },
        {
            title: 'Next.js & SSR',
            desc: 'Server-side rendered and statically generated applications with Next.js. Superior SEO, sub-second load times, and edge-ready deployments on Vercel or AWS.',
        },
        {
            title: 'Responsive & Accessible UI',
            desc: 'Pixel-perfect, WCAG-compliant interfaces that work flawlessly across every device, browser, and assistive technology — built mobile-first from day one.',
        },
        {
            title: 'API & Third-Party Integrations',
            desc: 'Stripe payments, CRM systems, analytics platforms, authentication providers, and any REST or GraphQL API your business requires — integrated cleanly.',
        },
        {
            title: 'Performance Engineering',
            desc: 'Core Web Vitals optimisation, code splitting, image optimisation, caching strategies, and CDN configuration — we target 90+ Lighthouse scores as standard.',
        },
        {
            title: 'Scalable Architecture',
            desc: 'Microservice-ready, horizontally scalable back-ends with CI/CD pipelines, Docker containers, and infrastructure-as-code — built to grow with your business.',
        },
    ];

    const problems = [
        {
            icon: '😩',
            problem: "You hired a cheap freelancer who disappeared mid-project, leaving half-built code you can't even open.",
            solution: "We work in weekly sprints with a live staging URL. You see real progress every 7 days — no black-box development, no ghosting.",
        },
        {
            icon: '🐌',
            problem: "Your existing website takes 8+ seconds to load on mobile. Customers leave before the page even finishes loading.",
            solution: "We audit and rebuild for Core Web Vitals. Our standard target is 90+ Lighthouse score, <2s LCP, and full mobile responsiveness.",
        },
        {
            icon: '🔒',
            problem: "Your web app has no proper authentication or security. You know it's a liability but don't know where to start fixing it.",
            solution: "We implement industry-standard security: OAuth 2.0, JWT, bcrypt hashing, HTTPS, rate limiting, and injection protection.",
        },
        {
            icon: '💸',
            problem: "You've been quoted $20,000+ by a big agency for a project that should cost a fraction of that — and they can't start for 3 months.",
            solution: "We offer transparent, milestone-based pricing with a first sprint starting within 5 business days of project kickoff.",
        },
    ];

    const stats = [
        { value: '40+', label: 'Projects delivered' },
        { value: '<24h', label: 'Response time' },
        { value: '90+', label: 'Lighthouse score' },
        { value: '5★', label: 'Client satisfaction' },
    ];

    const whyUs = [
        { title: 'Start date',         us: 'Within 5 business days',   them: '4–12 week waiting list' },
        { title: 'Communication',       us: 'Direct Slack / WhatsApp',  them: 'Account manager middleman' },
        { title: 'Code ownership',      us: '100% yours from day 1',    them: 'Locked-in retainers' },
        { title: 'Revisions',           us: 'Unlimited in sprint',      them: 'Billable after 2 rounds' },
        { title: 'Post-launch support', us: '30-day warranty included', them: 'Separate support contract' },
        { title: 'Tech stack',          us: 'Best fit for your needs',  them: 'Whatever they specialise in' },
    ];

    const seoArticle = {
        heading: 'How to hire a web developer who actually delivers.',
        paragraphs: [
            { h3: 'Why most web dev projects fail' },
            "The #1 reason web projects fail is not technical — it is communication. Clients don't see progress until a big reveal that doesn't match expectations. By the time the disconnect surfaces, months and thousands of dollars are gone.",
            "At Minderfly, we solve this with weekly sprint demos on a live staging URL. You interact with real, working software every 7 days. If the direction is wrong, we catch it in week 1, not week 12.",
            { h3: 'MERN stack vs Next.js: which is right for your project?' },
            "Choose MERN when you need a decoupled API serving multiple clients — mobile apps, third-party systems, and a web front-end all talking to the same back-end. Choose Next.js when SEO is critical, you want the simplest path to a full-stack React app, or you need static site generation for blazing-fast page loads.",
            "Both stacks are production-proven and used by companies like Netflix, Airbnb, and TikTok. The right choice depends entirely on your specific use case — something we determine together in a free discovery call.",
            { h3: 'What does a web development project actually cost?' },
            "A landing page: $500–1,500. A business web app with authentication and a dashboard: $3,000–8,000. A full SaaS platform with subscriptions, multi-tenancy, and admin panel: $8,000–25,000. These are honest estimates — not 'it depends' non-answers. We scope every project in detail before you commit a single dollar.",
            { h3: 'The Minderfly build process' },
            "Every project begins with a discovery session where we map your requirements, define the tech stack, and produce a written specification. Sprint 1 is always a proof-of-concept: the core data model, authentication, and one key user flow — de-risking the entire project before significant investment is made.",
        ],
    };

    const processSteps = [
        { title: 'Discovery',    desc: 'Requirements mapping, tech stack selection, and a detailed project specification before anything is built.' },
        { title: 'Architecture', desc: 'Database schema, API design, component hierarchy, and deployment architecture signed off before sprint one.' },
        { title: 'Build',        desc: 'Agile sprints with weekly demos on a live staging URL. Full code review and documentation throughout.' },
        { title: 'QA',           desc: 'Cross-browser testing, Lighthouse audits, load testing, and security scanning before any production deployment.' },
        { title: 'Launch',       desc: 'Zero-downtime deployment, DNS cutover support, monitoring setup, and a 30-day post-launch warranty.' },
    ];

    const faqs = [
        {
            q: 'MERN stack or Next.js — which should I choose?',
            a: "Use Next.js if SEO matters (blogs, marketing sites, e-commerce) or if you want the simplest path to a full-stack React app. Use the MERN stack if you need a decoupled API serving multiple clients (web, mobile, third parties), or if your backend logic is too complex for Next.js API routes.",
        },
        {
            q: 'Do you build SaaS platforms?',
            a: 'Yes — SaaS is our most common engagement type. We architect multi-tenancy, subscription billing (Stripe), user authentication (Clerk/Auth0), and role-based access from the start so these concerns never become expensive retrofits.',
        },
        {
            q: 'Do you work on existing codebases?',
            a: "Yes. We do thorough code audits before committing. If it's maintainable, we extend it. If it's beyond rescue, we tell you honestly and propose a phased rebuild strategy.",
        },
        {
            q: 'Can you help with DevOps and deployment?',
            a: 'Yes. We set up CI/CD pipelines (GitHub Actions), containerise with Docker, and deploy to AWS (EC2, ECS, Lambda) or Vercel. Infrastructure-as-code with Terraform is available for larger projects.',
        },
        {
            q: 'Do you offer post-launch maintenance?',
            a: 'Yes — monthly retainers covering dependency updates, security patches, performance monitoring, bug fixes, and minor feature additions. Retainer scope is agreed at project completion.',
        },
    ];

    const relatedArticles = articlesData
        ? articlesData.filter(a => a.category === 'Web Development' || a.category === 'React').slice(0, 2)
        : [];

    return (
        <ServicePageLayout
            title="Full-Stack Web Development"
            subtitle="Building the digital foundation for your future."
            description="We create powerful, scalable, and visually refined web applications using the MERN stack and Next.js. Whether you need a complex SaaS platform, a high-conversion marketing site, or a custom business tool — our team delivers code that performs as good as it looks."
            features={features}
            problems={problems}
            stats={stats}
            whyUs={whyUs}
            seoArticle={seoArticle}
            processSteps={processSteps}
            faqs={faqs}
            relatedArticles={relatedArticles}
            image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
            badgeText="MERN & Next.js Experts"
            ctaText="Start Your Project"
            ctaLink="/contact"
            seoTitle="MERN Stack & Next.js Web Development Services | Minderfly"
            seoDescription="Hire expert MERN stack and Next.js developers to build scalable SaaS platforms, e-commerce stores, and custom web apps. React, Node.js, MongoDB, and Express specialists. Get a free project estimate in 24 hours."
            seoKeywords="MERN stack development service, Next.js developer for hire, React web development agency, Node.js backend development, full stack web development, SaaS platform development, custom web application development, web app development agency, MongoDB Express React Node developer"
            canonicalUrl="/services/web-development"
        />
    );
};

export default WebDevelopment;