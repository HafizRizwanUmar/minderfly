import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';

const ChromeExtensionDev = () => {
    const features = [
        { title: 'Workflow Automation', desc: 'Automate repetitive browser tasks to save hours of manual work.' },
        { title: 'Data Extraction', desc: 'Build tools to scrape and organize data from websites efficiently.' },
        { title: 'Browser Actions', desc: 'Create powerful popups and sidebars integrated directly into Chrome.' },
        { title: 'Context Menu Tools', desc: 'Add custom options to the right-click menu for quick actions.' },
        { title: 'Cross-Browser Support', desc: 'Development for Chrome, Edge, Brave, and other Chromium browsers.' },
        { title: 'Store Publishing', desc: 'Assistance with publishing and optimizing your extension on the Web Store.' }
    ];

    return (
        <ServicePageLayout
            title="Chrome Extension Development"
            subtitle="Supercharge your browser."
            description="We specialize in building custom Chrome extensions that enhance productivity, automate workflows, and provide unique solutions. From internal business tools to public consumer extensions, we bring browser-based ideas to life."
            features={features}
            image="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200"
            seoTitle="Chrome Extension Development - Minderfly"
            seoDescription="Custom Chrome extension development services. Automate workflows and build powerful browser tools."
        />
    );
};

export default ChromeExtensionDev;
