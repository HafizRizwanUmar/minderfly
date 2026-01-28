import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';

const GraphicsDesign = () => {
    const features = [
        { title: 'Brand Identity', desc: 'Logos, color palettes, and typography that define your unique brand voice.' },
        { title: 'UI/UX Design', desc: 'User-centric interfaces for web and mobile that drive engagement.' },
        { title: 'Social Media Assets', desc: 'Eye-catching posts, banners, and stories to grow your online presence.' },
        { title: 'Marketing Materials', desc: 'Brochures, flyers, and presentations that leave a lasting impression.' },
        { title: 'Illustrations', desc: 'Custom vectors and artwork to add personality to your project.' },
        { title: 'Design Systems', desc: 'Comprehensive style guides to ensure consistency across all touchpoints.' }
    ];

    return (
        <ServicePageLayout
            title="Premium Graphics Design"
            subtitle="Visual storytelling that captivates."
            description="Design is not just about how it looks, but how it works. Our design team crafts compelling visual identities and user interfaces that communicate your message clearly and effectively."
            features={features}
            image="https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=1200"
            seoTitle="Graphics Design Services - Minderfly"
            seoDescription="Premium graphics design and UI/UX services. Branding, logo design, and user interface design for digital products."
        />
    );
};

export default GraphicsDesign;
