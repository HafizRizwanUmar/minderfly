import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

const Terms = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            <SEOHead
                title="Terms of Service"
                description="Terms of Service for Minderfly. Read our terms and conditions."
                canonical="https://www.minderfly.com/terms"
            />
            <Navbar />
            <main style={{ padding: '120px 5%', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Terms of Service</h1>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Last updated: {new Date().toLocaleDateString()}</p>
                <div style={{ marginTop: '2rem', lineHeight: '1.6' }}>
                    <h2 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.5rem' }}>1. Acceptance of Terms</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>By accessing or using our services, you agree to be bound by these Terms of Service.</p>
                    
                    <h2 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.5rem' }}>2. Description of Service</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>Minderfly provides software development, design, and automation services.</p>

                    <h2 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.5rem' }}>3. Intellectual Property</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>The content, organization, graphics, design, and other matters related to our services are protected under applicable copyrights and intellectual property rights.</p>

                    <h2 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.5rem' }}>4. Contact Us</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>If you have any questions about these Terms, please contact us at hello@minderfly.com.</p>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Terms;
