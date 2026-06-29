import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';
import { articlesData } from '../../data/articles';

const MobileAppDevelopment = () => {
    const features = [
        {
            title: 'Flutter Cross-Platform',
            desc: 'One codebase for iOS, Android, and Web with native-level performance. Flutter\'s widget engine delivers 60fps animations and pixel-perfect UI across every device.',
        },
        {
            title: 'React Native Development',
            desc: 'Build iOS and Android apps with JavaScript and React. Share up to 95% of code while accessing native APIs for camera, GPS, biometrics, and push notifications.',
        },
        {
            title: 'Native iOS & Android',
            desc: 'Swift/SwiftUI for iOS, Kotlin for Android — when only native performance and platform-specific features will do. Ideal for hardware-intensive or App Store featured apps.',
        },
        {
            title: 'App Store Submission',
            desc: 'Full App Store (Apple) and Google Play submission including asset preparation, review correspondence, and resolving rejection feedback — we handle the entire process.',
        },
        {
            title: 'Push Notifications & Analytics',
            desc: 'Firebase Cloud Messaging, OneSignal, in-app analytics with Mixpanel or Amplitude. Know how users behave and re-engage them at the right moment.',
        },
        {
            title: 'Offline-First Architecture',
            desc: 'Local SQLite / Hive databases with background sync so your app works flawlessly even without a network connection — critical for field and enterprise apps.',
        },
    ];

    const problems = [
        {
            icon: '📱',
            problem: "You paid a developer to build an app that crashed on every other Android device and got rejected by the App Store three times in a row.",
            solution: "We test on 15+ real devices and follow Apple/Google guidelines from day one. Our App Store acceptance rate is 100% on first submission.",
        },
        {
            icon: '💰',
            problem: "You were told you need separate iOS and Android teams. That's two codebases, twice the bugs, and double the cost to maintain anything.",
            solution: "Flutter lets us ship to both platforms from a single codebase — saving you 40–60% in development and ongoing maintenance costs.",
        },
        {
            icon: '🐢',
            problem: "Your current app takes 4+ seconds to load, the UI is laggy, and users are leaving 1-star reviews about performance.",
            solution: "We profile every app with Flutter DevTools — identifying jank, memory leaks, and slow network calls. Performance is built in, not bolted on.",
        },
        {
            icon: '📡',
            problem: "Your app breaks the moment a user goes underground on the subway. You lose their data and they lose trust in your product.",
            solution: "We architect offline-first with local databases and background sync. Users always have full functionality, regardless of network state.",
        },
    ];

    const stats = [
        { value: '15+', label: 'Apps shipped' },
        { value: '100%', label: 'App Store acceptance' },
        { value: '2', label: 'Platforms one codebase' },
        { value: '60fps', label: 'Animation performance' },
    ];

    const whyUs = [
        { title: 'Platforms covered',  us: 'iOS + Android from 1 codebase', them: 'Separate teams / budgets' },
        { title: 'App Store support',  us: 'Submission & review handling',   them: 'Extra charge per revision' },
        { title: 'Design quality',     us: 'Custom-branded, pixel-perfect',  them: 'Default component libraries' },
        { title: 'Testing devices',    us: '15+ real device testing',        them: 'Simulator only' },
        { title: 'Performance target', us: '60fps, <3s cold start',          them: 'No stated target' },
        { title: 'Ownership',          us: 'Full source code & IP yours',    them: 'License-locked SDKs' },
    ];

    const seoArticle = {
        heading: 'Flutter vs React Native: what no one tells you before you start.',
        paragraphs: [
            { h3: 'The real cost of building two native apps' },
            'Most founders don\'t realise that maintaining separate iOS and Android codebases means every bug fix, UI update, and feature addition must be done twice — by two different developers with different skill sets. That\'s not a development expense, it\'s a tax you pay forever.',
            'Flutter eliminates this. One codebase. One team. One deployment pipeline. And because Flutter renders its own widgets rather than bridging to native components, the performance is genuinely indistinguishable from native on modern devices.',
            { h3: 'Flutter vs React Native — a honest comparison' },
            'Flutter compiles to native ARM code and uses its own rendering engine (Skia / Impeller), giving it a performance edge for UI-heavy apps. React Native bridges to native components, which means better platform fidelity but occasional bridging jank. If you\'re building a consumer app where animations and polish matter, choose Flutter. If you have an existing JavaScript team and need to move fast, React Native is the pragmatic choice.',
            { h3: 'What gets your app rejected by Apple and Google' },
            'The top three reasons for App Store rejection: missing privacy permissions justification, UI that doesn\'t follow Human Interface Guidelines, and crashes during Apple\'s review. We submit apps every month and know exactly what reviewers look for. Our rejection rate is zero — not because we\'re lucky, but because we pre-check against Apple\'s exact review criteria before submission.',
            { h3: 'How long does it take to build a mobile app?' },
            'An MVP with authentication, core features, and App Store submission: 6–10 weeks. A full consumer app with onboarding, payments, push notifications, and admin dashboard: 12–20 weeks. We never give you a timeline without a written specification first — vague estimates are how projects go 3x over budget.',
        ],
    };

    const processSteps = [
        { title: 'UX Blueprint', desc: 'User flows, wireframes, and an interactive prototype before a single line of code is written.' },
        { title: 'Architecture',  desc: 'State management, API contracts, local storage strategy, and third-party SDK selection.' },
        { title: 'Development',   desc: 'Weekly build drops on TestFlight (iOS) and Firebase App Distribution (Android) so you\'re always testing real code.' },
        { title: 'QA & Testing',  desc: 'Automated testing with Flutter integration tests, manual QA on 15+ devices, and performance profiling.' },
        { title: 'Store Launch',  desc: 'App Store and Google Play submission, review correspondence, and post-launch crash monitoring.' },
    ];

    const faqs = [
        {
            q: 'How much does a mobile app cost to build?',
            a: 'A simple utility app with authentication and core features: $4,000–9,000. A full consumer app with payments, notifications, and an admin dashboard: $10,000–25,000. We provide a detailed quote after a free discovery call — never a vague range that triples by launch.',
        },
        {
            q: 'Do you handle App Store submission?',
            a: 'Yes, entirely. We prepare all assets (icons, screenshots, descriptions), submit the app, respond to reviewer feedback, and handle any rejections. Our first-submission acceptance rate is 100%.',
        },
        {
            q: 'Can you add features to my existing app?',
            a: 'Yes. We audit the existing codebase first. Flutter and React Native codebases are our speciality — we can extend, refactor, or migrate native apps to cross-platform where it makes sense.',
        },
        {
            q: 'Do you build the backend too?',
            a: 'Yes. Most mobile projects need an API, authentication, and a database. We build these with Node.js/Express or Firebase, designed specifically for mobile consumption patterns.',
        },
    ];

    const relatedArticles = articlesData
        ? articlesData.filter(a => a.category === 'Mobile' || a.category === 'Flutter').slice(0, 2)
        : [];

    return (
        <ServicePageLayout
            title="Mobile App Development"
            subtitle="iOS & Android apps that users actually keep on their phone."
            description="We are a specialized mobile app development agency in Pakistan, building cross-platform apps with Flutter and React Native. Based in Lahore, we deliver pixel-perfect, performant apps ready for the App Store and Google Play. From fintech to local utility apps, we serve both Pakistani and international markets."
            features={features}
            problems={problems}
            stats={stats}
            whyUs={whyUs}
            seoArticle={seoArticle}
            processSteps={processSteps}
            faqs={faqs}
            relatedArticles={relatedArticles}
            image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
            badgeText="Flutter & React Native"
            ctaText="Get an App Quote"
            ctaLink="/contact"
            seoTitle="Mobile App Agency Pakistan | Flutter & React Native"
            seoDescription="Hire the best mobile app developers in Pakistan. Specialists in Flutter and React Native for iOS & Android. Based in Lahore, providing full-cycle app development and Store submission services."
            seoKeywords="mobile app development Pakistan, Flutter developer Lahore, React Native agency Pakistan, hire mobile app developers Lahore, iOS Android app development Pakistan, custom mobile apps Lahore, software house in Pakistan for apps"
            canonicalUrl="/services/mobile-app-development"
        />
    );
};

export default MobileAppDevelopment;