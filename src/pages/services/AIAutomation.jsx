import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';
import { articlesData } from '../../data/articles';

const AIAutomation = () => {
    const features = [
        {
            title: 'n8n Workflow Automation',
            desc: 'Self-hosted n8n automation workflows connecting your internal tools, databases, APIs, and external services. Open-source, no per-task fees, and fully customisable logic that Zapier simply cannot do.',
        },
        {
            title: 'Make.com & Zapier Builds',
            desc: 'Complex Make.com scenarios and Zapier automation chains with error handling, data transformation, conditional logic, and multi-step approval flows — built correctly from the start.',
        },
        {
            title: 'AI-Powered Workflows',
            desc: 'Integrate GPT-4, Claude, or Gemini into your business workflows: auto-generate content, classify support tickets, extract data from documents, and draft responses — all automated.',
        },
        {
            title: 'CRM & Sales Automation',
            desc: 'HubSpot, Salesforce, Pipedrive, and Airtable automation: lead scoring, follow-up sequences, deal updates, and pipeline reporting — no manual data entry, ever.',
        },
        {
            title: 'Document & Email Automation',
            desc: 'Auto-generate contracts, invoices, reports, and proposals from templates. Email triggered by CRM events, form submissions, or payment webhooks — personalised for each recipient.',
        },
        {
            title: 'Custom Automation APIs',
            desc: 'When off-the-shelf automation tools can\'t handle the logic, we build custom automation scripts and webhook APIs in Node.js — designed to run on a schedule or in response to events.',
        },
    ];

    const problems = [
        {
            icon: '🔄',
            problem: "Your team manually copies data between 5 different tools every day. It's 2 hours of mind-numbing work that adds zero value — and humans make mistakes.",
            solution: "We map your current workflow and build an n8n automation that syncs your tools in real time. Zero manual transfers, zero errors, and your team gets 2 hours back every day.",
        },
        {
            icon: '💸',
            problem: "You're paying $500/month for Zapier premium just to run basic workflows, and you're still hitting task limits and hitting error logs you can't understand.",
            solution: "We migrate Zapier workflows to self-hosted n8n — same functionality, zero per-task fees, and full visibility into every workflow run. Typical savings: $300–800/month.",
        },
        {
            icon: '🤖',
            problem: "Everyone's talking about AI automation but your business is still doing everything manually. You don't know where to start or what's actually worth automating.",
            solution: "We run a free automation audit: we identify your top 3 highest-ROI automation opportunities and give you a clear build plan — no jargon, just outcomes.",
        },
        {
            icon: '📧',
            problem: "Your sales team is sending hundreds of manual follow-up emails every week. Half the leads are slipping through the cracks because the process depends on memory.",
            solution: "We build CRM-triggered email sequences with GPT-4 personalisation. Every lead gets a relevant, timely follow-up automatically — no one falls through the cracks.",
        },
    ];

    const stats = [
        { value: '10x', label: 'Faster than manual workflows' },
        { value: '80%', label: 'Average time saved per task' },
        { value: '$0', label: 'Per-task fees with n8n' },
        { value: '24/7', label: 'Workflows run continuously' },
    ];

    const whyUs = [
        { title: 'Primary tool',      us: 'n8n self-hosted (free to run)',   them: 'Zapier/Make ($/per task)' },
        { title: 'AI integration',    us: 'GPT-4, Claude, Gemini built-in',  them: 'OpenAI plugin only' },
        { title: 'Custom logic',      us: 'Any complexity, custom code',     them: 'Limited by nodes/actions' },
        { title: 'Error handling',    us: 'Full retry + alert system',       them: 'Basic error stops' },
        { title: 'Running cost',      us: 'Server only (~$10–20/mo)',        them: '$49–600+/month platform fee' },
        { title: 'Ownership',         us: 'You own all workflows & data',    them: 'Platform-dependent' },
    ];

    const seoArticle = {
        heading: 'n8n vs Zapier vs Make.com: which automation platform does your business actually need?',
        paragraphs: [
            { h3: 'The automation tax nobody talks about' },
            'Zapier charges per task. Make.com charges per operation. As your business grows and automations run more frequently, your bill quietly doubles, then triples. Companies processing thousands of CRM updates per day can end up paying $500–1,500/month in automation platform fees alone — for workflows that could run for $15/month on self-hosted n8n.',
            { h3: 'What n8n can do that Zapier and Make cannot' },
            'n8n is open-source and can be self-hosted on any server. This means: no task limits, no per-operation charges, the ability to execute custom JavaScript within workflows, access to any HTTP API without a pre-built integration, and full control over your data (critical for GDPR compliance and sensitive business data).',
            'n8n also supports complex logical branching, sub-workflows, loop nodes, error handling with retry logic, and webhook-in/webhook-out — capabilities that require Enterprise plans on Zapier and are limited even then.',
            { h3: 'When Zapier is still the right choice' },
            'For small teams with simple workflows (under 1,000 tasks/month) who need to get started immediately without server management, Zapier\'s hosted solution is fine. It has the largest integration library and the fastest time-to-first-workflow. But the moment volume grows or workflows need custom logic, the economics shift decisively in favour of n8n.',
            { h3: 'AI automation: what actually works in 2024' },
            'The most ROI-positive AI automation use cases we\'ve built for clients: GPT-powered support ticket classification and routing (saves 3–5 hours/day for support teams), automated first-draft email responses from CRM context (saves 1–2 hours/day for sales reps), document data extraction and CRM population from PDFs (eliminates manual data entry for accounts teams), and content repurposing pipelines (one long-form piece generates 10 platform-specific variants automatically).',
            { h3: 'How to identify what to automate first' },
            'The best candidates for automation are: tasks that happen frequently (daily/weekly), tasks that follow predictable rules (if X then Y), tasks that involve moving data between systems, and tasks where human error is costly. We run a free 30-minute automation audit to identify exactly these use cases in your business — with an ROI estimate for each.',
        ],
    };

    const processSteps = [
        { title: 'Workflow Audit',  desc: 'We map your current manual processes, identify automation opportunities, and rank them by time saved and build effort.' },
        { title: 'Architecture',    desc: 'Tool selection (n8n / Make / custom), data flow design, error handling strategy, and webhook architecture documented.' },
        { title: 'Build & Test',    desc: 'Workflows built, edge cases handled, and tested with real data — not just happy-path scenarios.' },
        { title: 'Deploy & Monitor',desc: 'Production deployment with error alerting, run logs, and a monitoring dashboard so you can see every workflow execution.' },
        { title: 'Documentation',   desc: 'Written documentation of every workflow so your team can maintain and extend them independently if needed.' },
    ];

    const faqs = [
        {
            q: 'What is n8n and why is it better than Zapier?',
            a: 'n8n is an open-source workflow automation tool that can be self-hosted. Unlike Zapier, it has no per-task fees, supports custom JavaScript within workflows, allows unlimited complexity, and keeps your data on your own servers. For growing businesses, it typically saves $200–800/month vs Zapier while offering more power.',
        },
        {
            q: 'Can you integrate AI (ChatGPT) into my existing workflows?',
            a: 'Yes. We integrate GPT-4, Claude, and Gemini into automation workflows via API. Common use cases: auto-generating email responses, summarising documents, classifying support tickets, and extracting structured data from unstructured text.',
        },
        {
            q: 'I already have Zapier automations — can you migrate them?',
            a: 'Yes. We analyse your existing Zaps, rebuild them in n8n with improved error handling, and test edge cases that Zapier was silently failing on. Most migrations are complete within 1–2 weeks.',
        },
        {
            q: 'Do I need a server to run n8n?',
            a: 'For self-hosted n8n (which we recommend for cost and data reasons), yes — a small VPS (e.g., DigitalOcean $6/month droplet) is sufficient for most business workflows. We handle the server setup, SSL, and n8n installation as part of the project.',
        },
    ];

    const relatedArticles = articlesData
        ? articlesData.filter(a => a.category === 'AI' || a.category === 'Automation').slice(0, 2)
        : [];

    return (
        <ServicePageLayout
            title="AI & Workflow Automation"
            subtitle="Stop doing manually what machines should be doing for you."
            description="We design and build custom automation workflows using n8n, Make.com, and AI APIs — eliminating hours of repetitive manual work, reducing human error, and connecting every tool in your business stack without monthly per-task fees."
            features={features}
            problems={problems}
            stats={stats}
            whyUs={whyUs}
            seoArticle={seoArticle}
            processSteps={processSteps}
            faqs={faqs}
            relatedArticles={relatedArticles}
            image="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1200"
            badgeText="n8n · GPT-4 · Make.com"
            ctaText="Get a Free Automation Audit"
            ctaLink="/contact"
            seoTitle="AI Automation Agency Pakistan | n8n & Workflow Automation Services | Minderfly"
            seoDescription="Expert AI workflow automation in Pakistan — n8n, Make.com, and GPT-4 integration. Replace manual processes, migrate from Zapier, and automate your business from Lahore. Free automation audit — see ROI before you commit."
            seoKeywords="AI automation agency Pakistan, n8n automation service Pakistan, n8n developer for hire Lahore, workflow automation service Pakistan, Zapier alternative Pakistan, Make.com automation Pakistan, AI workflow automation Pakistan, business process automation Lahore, ChatGPT workflow integration Pakistan, automate business processes Pakistan, n8n vs Zapier, n8n developer Pakistan, AI automation for small business Pakistan, CRM automation Pakistan, hire n8n developer Pakistan"
            canonicalUrl="/services/ai-automation"
        />
    );
};

export default AIAutomation;
