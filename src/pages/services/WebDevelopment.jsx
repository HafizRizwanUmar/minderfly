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
            processSteps={processSteps}
            faqs={faqs}
            relatedArticles={relatedArticles}
            image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
            badgeText="MERN & Next.js Experts"
            ctaText="Start Your Project"
            ctaLink="/contact"
            seoTitle="Full-Stack Web Development Services — MERN Stack & Next.js | Minderfly"
            seoDescription="Expert MERN stack and Next.js web development services. We build scalable SaaS platforms, e-commerce solutions, and custom business applications with React, Node.js, MongoDB, and Express. Get a free project estimate."
            seoKeywords="MERN stack development, Next.js development, React web development, Node.js backend development, full stack web development, SaaS platform development, MongoDB Express React Node, web application development, custom web development services, scalable web apps"
            canonicalUrl="/services/web-development"
        />
    );
};

export default WebDevelopment;