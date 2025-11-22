import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import WorkShowcase from '../components/WorkShowcase';
import Footer from '../components/Footer';

const WorkPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>Our Work - Minderfly | Portfolio & Case Studies</title>
                <meta name="description" content="Explore Minderfly's portfolio of successful projects. View our work in web development, mobile apps, and innovative digital solutions." />
                <meta name="keywords" content="web development portfolio, case studies, project showcase, custom software, mobile apps, web applications" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://minderfly.com/work" />
                <meta property="og:title" content="Our Work - Minderfly" />
                <meta property="og:description" content="Explore our portfolio of successful web development and design projects." />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://minderfly.com/work" />
                <meta property="twitter:title" content="Our Work - Minderfly" />

                <link rel="canonical" href="https://minderfly.com/work" />
            </Helmet>

            <Navbar />
            <WorkShowcase />
            <Footer />
        </>
    );
};

export default WorkPage;
