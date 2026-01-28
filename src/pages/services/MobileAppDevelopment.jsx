import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';

const MobileAppDevelopment = () => {
    const features = [
        { title: 'Flutter Expertise', desc: 'Cross-platform development that feels truly native on both iOS and Android.' },
        { title: 'Single Codebase', desc: 'Save time and budget by maintaining one codebase for multiple platforms.' },
        { title: 'Beautiful UI/UX', desc: 'Engaging, intuitive interfaces following Material Design and Cupertino guidelines.' },
        { title: 'High Performance', desc: '60fps rendering for buttery smooth animations and transitions.' },
        { title: 'Store Deployment', desc: 'Full support for publishing to Apple App Store and Google Play Store.' },
        { title: 'Maintenance & Support', desc: 'Ongoing updates and bug fixes to keep your app running perfectly.' }
    ];

    return (
        <ServicePageLayout
            title="Mobile App Development"
            subtitle="Your idea, in everyone's pocket."
            description="We build high-quality mobile applications using Flutter, Google's UI toolkit. Get native performance and beautiful design on both iOS and Android without the cost of two separate development teams."
            features={features}
            image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
            seoTitle="Mobile App Development Services - Minderfly"
            seoDescription="Expert Flutter mobile app development services. Cross-platform iOS and Android apps with native performance."
        />
    );
};

export default MobileAppDevelopment;
