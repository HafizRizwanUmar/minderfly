import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

const Privacy = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            <SEOHead
                title="Privacy Policy"
                description="Privacy Policy for Minderfly. Learn how we collect, use, and protect your data."
                canonical="https://minderfly.com/privacy"
            />
            <Navbar />
            <main style={{ padding: '120px 5%', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Privacy Policy</h1>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Last updated: {new Date().toLocaleDateString()}</p>
                <div style={{ marginTop: '2rem', lineHeight: '1.6' }}>
                    <h2 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.5rem' }}>1. Information We Collect</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>We collect information you provide directly to us, such as when you fill out a contact form or request a quote.</p>
                    
                    <h2 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.5rem' }}>2. How We Use Your Information</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>

                    <h2 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.5rem' }}>3. Data Security</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access or disclosure.</p>

                    <h2 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.5rem' }}>4. Contact Us</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>If you have any questions about this Privacy Policy, please contact us at hello@minderfly.com.</p>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Privacy;
