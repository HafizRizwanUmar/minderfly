import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Team from '../components/Team';
import Footer from '../components/Footer';

const TeamPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Structured data for team
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Minderfly Team",
        "description": "Meet the talented professionals behind Minderfly digital agency",
        "url": "https://minderfly.com/team",
        "mainEntity": {
            "@type": "Organization",
            "name": "Minderfly",
            "url": "https://minderfly.com",
            "member": [
                {
                    "@type": "Person",
                    "name": "Minderfly Team",
                    "jobTitle": "Digital Solutions Experts",
                    "description": "Expert team specializing in MERN stack development, Flutter apps, VS Code extensions, and Chrome development"
                }
            ]
        }
    };

    return (
        <>
            <SEOHead
                title="Our Team - Meet the Digital Experts"
                description="Meet the talented team behind Minderfly. Our experts specialize in MERN stack development, Flutter mobile & desktop apps, VS Code extensions, and Chrome development. Dedicated to delivering innovative digital solutions."
                keywords="digital agency team, web development experts, MERN stack developers, Flutter developers, software engineers, VS Code extension developers, Chrome extension developers, professional team"
                canonical="https://minderfly.com/team"
                schema={structuredData}
            />

            <Navbar />
            <Team />
            <Footer />
        </>
    );
};

export default TeamPage;
