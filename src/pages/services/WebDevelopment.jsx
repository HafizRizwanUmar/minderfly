import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';
import { articlesData } from '../../data/articles';

const WebDevelopment = () => {
    const features = [
        { title: 'MERN Stack Experts', desc: 'We build robust backends with Node.js & Mongo, and dynamic frontends with React.' },
        { title: 'Next.js Solutions', desc: 'SEO-optimized, server-side rendered applications for maximum performance.' },
        { title: 'Responsive Design', desc: 'Pixel-perfect experiences across all devices, from desktop to mobile.' },
        { title: 'Custom API Integrations', desc: 'Seamlessly connect with third-party services, payment gateways, and CRMs.' },
        { title: 'Performance First', desc: 'Optimized loading times and smooth interactions for better user retention.' },
        { title: 'Scalable Architecture', desc: 'Built to grow with your business, handling increased traffic effortlessly.' }
    ];

    const relatedArticles = articlesData.filter(a => a.category === 'Web Development' || a.category === 'React').slice(0, 2);

    return (
        <ServicePageLayout
            title="Full-Stack Web Development"
            subtitle="Building the digital foundation for your future."
            description="We create powerful, scalable, and visually stunning web applications. Whether you need a complex SaaS platform, an e-commerce solution, or a custom business tool, our expert team delivers code that works as good as it looks."
            features={features}
            image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
            seoTitle="Web Development Services - Minderfly"
            seoDescription="Professional MERN stack and Next.js web development services. We build scalable, high-performance web applications."
            relatedArticles={relatedArticles}
        />
    );
};

export default WebDevelopment;
