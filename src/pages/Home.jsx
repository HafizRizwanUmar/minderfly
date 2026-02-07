import { useEffect } from 'react';
import Lenis from 'lenis';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import WorkShowcase from '../components/WorkShowcase';
import Team from '../components/Team';
import Services from '../components/Services';
import StorePreview from '../components/StorePreview';
import OffersSection from '../components/OffersSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ArticleSection from '../components/ArticleSection';
import StatsSection from '../components/StatsSection';
import TrustBadges from '../components/TrustBadges';
import FebOfferBanner from '../components/FebOfferBanner';
import SpecialOfferModal from '../components/SpecialOfferModal';
import { useState } from 'react';

const Home = () => {
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, []);

    // Structured data for homepage
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "name": "Minderfly",
                "url": "https://minderfly.com",
                "logo": "https://minderfly.com/logo.png",
                "description": "Digital agency that builds innovative solutions and provides professional services for MERN stack development, Flutter apps, VS Code extensions, and Chrome themes & extensions.",
                "foundingDate": "2020",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "Customer Service",
                    "availableLanguage": "English"
                },
                "sameAs": [
                    "https://github.com/minderfly"
                ]
            },
            {
                "@type": "WebSite",
                "name": "Minderfly",
                "url": "https://minderfly.com",
                "description": "Digital agency specializing in custom software development and web solutions",
                "publisher": {
                    "@type": "Organization",
                    "name": "Minderfly"
                }
            },
            {
                "@type": "ProfessionalService",
                "name": "Minderfly Digital Agency",
                "image": "https://minderfly.com/logo.png",
                "description": "Full-service digital agency offering MERN stack development, Flutter mobile apps, VS Code extensions, and Chrome development services.",
                "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "PK"
                },
                "serviceType": [
                    "Web Development",
                    "Mobile App Development",
                    "Browser Extension Development",
                    "Custom Software Development"
                ],
                "areaServed": "Worldwide",
                "priceRange": "$$"
            }
        ]
    };

    return (
        <>
            <SEOHead
                title="Minderfly | Web & Mobile App Development, Graphics & Chrome Extensions"
                description="Expert Web & Mobile App Development, Graphics Designing, and Chrome Extension creation. Home of Sanad PDF Editor, Debt Settler, and Nishan QR."
                keywords="web developer in lahore, web development, mobile app development, graphics designing, extension development, chrome theme development, Sanad PDF editor, Debt Settler, Nishan QR, Flutter Web Emulator, custom software, brands"
                canonical="https://minderfly.com/"
                schema={structuredData}
            />

            <div className="app">
                <Navbar onContactClick={() => setIsOfferModalOpen(true)} />
                <FebOfferBanner onClaim={() => setIsOfferModalOpen(true)} />
                <Hero onStartProject={() => setIsOfferModalOpen(true)} />
                <SpecialOfferModal isOpen={isOfferModalOpen} onClose={() => setIsOfferModalOpen(false)} />
                <StatsSection />
                <TrustBadges />
                <Services />
                <WorkShowcase />
                <TestimonialsSection />
                <OffersSection />
                <StorePreview />
                <Team />
                <ArticleSection />
                <Footer />
            </div>
        </>
    );
};

export default Home;
