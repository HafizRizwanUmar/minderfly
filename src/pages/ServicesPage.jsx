import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Footer from '../components/Footer';

const ServicesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Structured data for services
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Digital Agency Services",
        "provider": {
            "@type": "Organization",
            "name": "Minderfly",
            "url": "https://minderfly.com"
        },
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Digital Development Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "MERN Stack Development",
                        "description": "Full-stack web development using MongoDB, Express.js, React, and Node.js. Build scalable, modern web applications with cutting-edge technology."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Flutter Development",
                        "description": "Cross-platform mobile and desktop application development using Flutter. Create beautiful, natively compiled applications for mobile, web, and desktop from a single codebase."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "VS Code Extension Development",
                        "description": "Custom Visual Studio Code extensions to enhance developer productivity and workflow. Build powerful tools for the most popular code editor."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Chrome Extension & Theme Development",
                        "description": "Browser extensions and custom themes for Google Chrome. Enhance browsing experience with powerful extensions and beautiful themes."
                    }
                }
            ]
        }
    };

    return (
        <>
            <SEOHead
                title="Our Services - Digital Agency Solutions"
                description="Explore Minderfly's comprehensive digital services: MERN stack development, Flutter mobile & desktop apps, VS Code extensions, and Chrome themes & extensions. We build innovative solutions and help clients bring their ideas to life."
                keywords="MERN stack development, MongoDB, Express.js, React, Node.js, Flutter development, mobile apps, desktop apps, VS Code extensions, Chrome extensions, Chrome themes, web development services, custom software development, digital agency services"
                canonical="https://minderfly.com/services"
                schema={structuredData}
            />

            <Navbar />
            <Services />
            <Footer />
        </>
    );
};

export default ServicesPage;
