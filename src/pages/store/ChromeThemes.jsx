import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';

const ChromeThemes = () => {
    const features = [
        { title: '4K Backgrounds', desc: 'High-resolution immersive backgrounds that look great on any screen.' },
        { title: 'Custom UI Colors', desc: 'Carefully curated color palettes for tabs, toolbar, and frame.' },
        { title: 'Dark Mode Support', desc: 'Themes that are easy on the eyes, day or night.' },
        { title: 'Minimalist Design', desc: 'Clean aesthetics that focus on content, not clutter.' },
        { title: 'Regular Updates', desc: 'New themes added monthly to keep your browser fresh.' },
        { title: 'Easy Installation', desc: 'One-click install from the Chrome Web Store.' }
    ];

    return (
        <ServicePageLayout
            title="Premium Chrome Themes"
            subtitle="Personalize your browsing experience."
            description="Discover our collection of handcrafted Chrome themes. From serene landscapes to abstract art and dark mode minimalism, find the perfect look to match your style and mood."
            features={features}
            image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
            ctaText="Browse Collection"
            ctaLink="#"
            badgeText="Theme Collection"
            seoTitle="Premium Chrome Themes - Minderfly Store"
            seoDescription="Download best Chrome themes by Minderfly. Dark mode, minimalist, and 4K themes for Google Chrome."
        />
    );
};

export default ChromeThemes;
