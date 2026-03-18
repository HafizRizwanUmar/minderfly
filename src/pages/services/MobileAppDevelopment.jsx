import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';

const MobileAppDevelopment = () => {
    const features = [
        {
            title: 'Flutter & Dart Expertise',
            desc: 'We specialise exclusively in Flutter — not as an afterthought but as a primary discipline. Expect deep knowledge of state management, rendering, and platform channels.',
        },
        {
            title: 'Single Codebase, Two Platforms',
            desc: 'One Flutter codebase deploys to iOS and Android with native-quality performance. Significantly lower build and maintenance costs compared to separate native apps.',
        },
        {
            title: 'Native-Quality UI',
            desc: 'Custom widgets, 60fps animations, and platform-adaptive components that respect Material Design on Android and Cupertino conventions on iOS.',
        },
        {
            title: 'Offline-First Architecture',
            desc: 'Apps built with SQLite, Hive, or Isar for robust offline functionality — syncing intelligently when connectivity is restored.',
        },
        {
            title: 'App Store & Play Store Deployment',
            desc: 'Complete support for app signing, provisioning profiles, store listing setup, screenshot preparation, and review submission for both platforms.',
        },
        {
            title: 'Ongoing Maintenance',
            desc: 'Post-launch retainers covering Flutter SDK upgrades, OS compatibility fixes, crash monitoring, performance optimisation, and feature additions.',
        },
    ];

    const processSteps = [
        { title: 'Discovery',     desc: 'Define screens, user flows, data models, and platform-specific requirements.' },
        { title: 'UI Design',     desc: 'High-fidelity Figma prototypes for all screens — including edge cases — before any code is written.' },
        { title: 'Development',   desc: 'Iterative Flutter development with weekly TestFlight / Play Console builds for your feedback.' },
        { title: 'QA',            desc: 'Device testing across iOS and Android, automated widget tests, and performance profiling.' },
        { title: 'Store Launch',  desc: 'Submission, review handling, and post-launch monitoring for both stores.' },
    ];

    const faqs = [
        {
            q: 'Why Flutter over React Native?',
            a: "Flutter renders its own UI widgets via the Skia/Impeller engine — it doesn't rely on native components bridged through JavaScript. This means consistent UI across platforms, smoother animations, and no bridge-related performance bottlenecks.",
        },
        {
            q: 'Can Flutter access native device hardware?',
            a: 'Yes. Flutter uses platform channels to call native iOS and Android APIs — camera, GPS, Bluetooth, NFC, biometrics, push notifications, and more are all fully accessible.',
        },
        {
            q: 'Do you also build Flutter desktop apps?',
            a: 'Yes — we offer Flutter desktop development for Windows and macOS. The same codebase can target mobile, desktop, and web simultaneously if your requirements allow it.',
        },
        {
            q: 'How do you handle backend integration?',
            a: "We integrate with REST APIs, GraphQL, Firebase, Supabase, and custom Node.js backends. If you don't have a backend yet, we can build one as part of your project.",
        },
        {
            q: 'What state management do you use?',
            a: 'Riverpod for most projects — it is type-safe, testable, and scales well. For larger or legacy codebases, we also work comfortably with Bloc and Provider.',
        },
    ];

    return (
        <ServicePageLayout
            title="Mobile App Development"
            subtitle="Your idea, in everyone's pocket."
            description="We build high-quality mobile applications with Flutter — Google's cross-platform UI toolkit. Get native performance, beautiful UI, and a single maintainable codebase for both iOS and Android, without paying for two separate development teams."
            features={features}
            processSteps={processSteps}
            faqs={faqs}
            image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
            badgeText="Flutter Specialists"
            ctaText="Get a Free Estimate"
            ctaLink="/contact"
            seoTitle="Flutter Mobile App Development Services — iOS & Android | Minderfly"
            seoDescription="Expert Flutter mobile app development for iOS and Android. Cross-platform apps with native performance, beautiful UI, and a single codebase. App Store and Play Store deployment included. Request a free project estimate."
            seoKeywords="Flutter app development, mobile app development, iOS app development, Android app development, cross-platform mobile app, Flutter developer, React Native alternative, Flutter iOS Android, custom mobile app, Flutter Riverpod, mobile app agency"
            canonicalUrl="/services/mobile-app-development"
        />
    );
};

export default MobileAppDevelopment;