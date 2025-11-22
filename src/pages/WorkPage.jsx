import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import WorkShowcase from '../components/WorkShowcase';
import Footer from '../components/Footer';

const WorkPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Structured data for work portfolio
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Minderfly Portfolio & Work Showcase",
        "description": "Explore our portfolio of successful projects including MERN stack applications, Flutter apps, VS Code extensions, and Chrome development work.",
        "url": "https://minderfly.com/work",
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
                {
                    "@type": "CreativeWork",
                    "name": "MERN Stack Web Applications",
                    "description": "Full-stack web applications built with MongoDB, Express.js, React, and Node.js"
                },
                {
                    "@type": "CreativeWork",
                    "name": "Flutter Mobile & Desktop Apps",
                    "description": "Cross-platform applications for mobile and desktop using Flutter framework"
                },
                {
                    "@type": "CreativeWork",
                    "name": "VS Code Extensions",
                    "description": "Developer productivity tools and extensions for Visual Studio Code"
                },
                {
                    "@type": "CreativeWork",
                    "name": "Chrome Themes & Extensions",
                    "description": "Browser customization and functionality extensions for Google Chrome"
                }
            ]
        }
    };

    return (
        <>
            <SEOHead
                title="Our Work & Portfolio - Innovative Digital Solutions"
                description="Explore Minderfly's portfolio of successful projects. View our work in MERN stack development, Flutter apps, VS Code extensions, and Chrome themes & extensions. See how we turn ideas into reality."
                keywords="web development portfolio, MERN stack projects, Flutter apps showcase, VS Code extensions, Chrome extensions, digital agency work, software development case studies, project showcase"
                canonical="https://minderfly.com/work"
                schema={structuredData}
            />

            <Navbar />
            <WorkShowcase />
            <Footer />
        </>
    );
};

export default WorkPage;
