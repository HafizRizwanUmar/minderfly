import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Team from '../components/Team';
import Footer from '../components/Footer';

const TeamPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>Our Team - Minderfly | Meet the Experts</title>
                <meta name="description" content="Meet the talented team behind Minderfly. Our experts in web development, UI/UX design, and project management are dedicated to delivering excellence." />
                <meta name="keywords" content="web development team, design team, software engineers, UI/UX designers, project managers, development experts" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://minderfly.com/team" />
                <meta property="og:title" content="Our Team - Minderfly" />
                <meta property="og:description" content="Meet the talented professionals driving innovation at Minderfly." />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://minderfly.com/team" />
                <meta property="twitter:title" content="Our Team - Minderfly" />

                <link rel="canonical" href="https://minderfly.com/team" />
            </Helmet>

            <Navbar />
            <Team />
            <Footer />
        </>
    );
};

export default TeamPage;
