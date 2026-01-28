import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';

const ChromeThemeDev = () => {
    const features = [
        { title: 'Brand Consistency', desc: 'Bring your brand colors and logo directly into the browser interface.' },
        { title: 'Employee Onboarding', desc: 'Create a unified browser experience for your company devices.' },
        { title: 'Dark & Light Modes', desc: 'Themes that look great in any lighting condition.' },
        { title: 'High-Res Backgrounds', desc: 'Stunning 4K new tab backgrounds that inspire.' },
        { title: 'Custom Frames', desc: 'Unique window frame and toolbar designs to stand out.' },
        { title: 'Merchandising', desc: 'Create branded themes as digital merchandise for your community.' }
    ];

    return (
        <ServicePageLayout
            title="Chrome Theme Development"
            subtitle="Make the internet yours."
            description="Transform the look and feel of Google Chrome with custom themes. Perfect for brands wanting to extend their identity to the browser, or for creators looking to offer unique digital downloads."
            features={features}
            image="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200"
            seoTitle="Chrome Theme Development - Minderfly"
            seoDescription="Custom Chrome theme design and development. Branded browser themes for businesses and creators."
        />
    );
};

export default ChromeThemeDev;
