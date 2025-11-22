import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Footer from '../components/Footer';

const ServicesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>Our Services - Minderfly | Web Development & Design Solutions</title>
                <meta name="description" content="Explore Minderfly's comprehensive web development and design services. From VS Code extensions to full-stack MERN applications, we deliver exceptional digital solutions." />
                <meta name="keywords" content="web development services, UI/UX design, MERN stack, Flutter development, Chrome extensions, custom software development" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://minderfly.com/services" />
                <meta property="og:title" content="Our Services - Minderfly" />
                <meta property="og:description" content="Comprehensive web development and design services for modern businesses." />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://minderfly.com/services" />
                <meta property="twitter:title" content="Our Services - Minderfly" />

                <link rel="canonical" href="https://minderfly.com/services" />
            </Helmet>

            <Navbar />
            <Services />
            <Footer />
        </>
    );
};

export default ServicesPage;
