import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import WorkShowcase from '../components/WorkShowcase';
import Team from '../components/Team';
import Services from '../components/Services';

const Home = () => {
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

    return (
        <>
            <Helmet>
                <title>Minderfly - Professional Web Development & Design Agency</title>
                <meta name="description" content="Minderfly delivers exceptional web development, UI/UX design, and custom software solutions. Transform your digital presence with our expert team." />
                <meta name="keywords" content="web development agency, UI/UX design, custom software development, MERN stack, React development, Flutter apps" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://minderfly.com/" />
                <meta property="og:title" content="Minderfly - Web Development & Design Agency" />
                <meta property="og:description" content="Professional web development and design solutions for modern businesses." />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://minderfly.com/" />
                <meta property="twitter:title" content="Minderfly - Web Development Agency" />

                <link rel="canonical" href="https://minderfly.com/" />
            </Helmet>

            <div className="app">
                <Navbar />
                <Hero />
                <WorkShowcase />
                <Team />
                <Services />
                <Footer />
            </div>
        </>
    );
};

export default Home;
