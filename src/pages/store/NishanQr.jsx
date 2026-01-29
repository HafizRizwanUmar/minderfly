import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { QRCodeCanvas } from 'qrcode.react';
import {
    FaWindows, FaQrcode, FaInfinity, FaBolt, FaCheck,
    FaDownload, FaLink, FaFont, FaWifi, FaEnvelope,
    FaPalette, FaCog, FaMobileAlt, FaShareAlt
} from 'react-icons/fa';
import './NishanProduct.css';

const NishanQr = () => {
    // --- State ---
    const [activeTab, setActiveTab] = useState('link'); // link, text, email, wifi
    const [qrValue, setQrValue] = useState('https://minderfly.com');
    const [config, setConfig] = useState({
        bgColor: '#ffffff',
        fgColor: '#000000',
        size: 300,
        margin: true,
        level: 'H'
    });

    // WiFi Specific State
    const [wifiData, setWifiData] = useState({ ssid: '', password: '', encryption: 'WPA' });
    // Email Specific State
    const [emailData, setEmailData] = useState({ email: '', subject: '', body: '' });

    // --- Logic ---
    useEffect(() => {
        // Construct QR Value based on active tab
        let newValue = '';
        if (activeTab === 'link' || activeTab === 'text') {
            // value is handled directly in input onChange for these simples ones, 
            // but for 'link' we might want to ensure https? 
            // For now, let's just leave the simple input.
            // If switching TO link/text, we keep the current plain string if sensible, or reset?
            // Let's rely on the input field directly updating `qrValue` for these modes.
        } else if (activeTab === 'wifi') {
            // WIFI:T:WPA;S:mynetwork;P:mypass;;
            newValue = `WIFI:T:${wifiData.encryption};S:${wifiData.ssid};P:${wifiData.password};;`;
            setQrValue(newValue);
        } else if (activeTab === 'email') {
            // mailto:abc@example.com?subject=...&body=...
            newValue = `mailto:${emailData.email}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
            setQrValue(newValue);
        }
    }, [activeTab, wifiData, emailData]);

    const handleSimpleInputChange = (e) => {
        setQrValue(e.target.value);
    };

    const downloadQR = () => {
        const canvas = document.querySelector('#qr-gen canvas');
        if (!canvas) return;

        const pngUrl = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `nishan-qr-${activeTab}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const tabVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <Helmet>
                <title>Free QR Code Generator - Nishan QR by Minderfly</title>
                <meta name="description" content="Generate high-quality QR codes for Links, Text, WiFi, and Email. Customize colors and design. Free online tool." />
            </Helmet>

            <div className="nishan-wrapper">
                {/* Navbar */}
                <nav className="nishan-nav">
                    <div className="nishan-container nav-container">
                        <Link to="/store" className="nishan-back-link">← Back to Store</Link>
                        <div className="nishan-logo">
                            Nishan <span className="nishan-accent">QR</span>
                        </div>
                        <a href="https://apps.microsoft.com/store/detail/nishan-qr-code-generator/9NBLGGH4N9W2" target="_blank" rel="noopener noreferrer" className="btn-nishan-sm">
                            <FaWindows /> Open App
                        </a>
                    </div>
                </nav>

                <div className="nishan-main-workspace">
                    <div className="nishan-container workspace-grid">

                        {/* LEFT COLUMN: Controls */}
                        <motion.div
                            className="workspace-controls"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="controls-header">
                                <h1>Create your <br /><span className="gradient-text">Custom QR Code</span></h1>
                                <p>Select a type and enter your details.</p>
                            </div>

                            {/* TABS */}
                            <div className="qr-type-tabs">
                                <button
                                    className={`tab-btn ${activeTab === 'link' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('link')}
                                >
                                    <FaLink /> Link
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('text')}
                                >
                                    <FaFont /> Text
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'wifi' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('wifi')}
                                >
                                    <FaWifi /> WiFi
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'email' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('email')}
                                >
                                    <FaEnvelope /> Email
                                </button>
                            </div>

                            {/* INPUT AREAS */}
                            <div className="input-area">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'link' && (
                                        <motion.div
                                            key="link"
                                            variants={tabVariants}
                                            initial="hidden" animate="visible" exit="hidden"
                                            className="input-group"
                                        >
                                            <label>Website URL</label>
                                            <input
                                                type="text"
                                                placeholder="https://example.com"
                                                value={qrValue}
                                                onChange={handleSimpleInputChange}
                                                className="nishan-input"
                                            />
                                        </motion.div>
                                    )}

                                    {activeTab === 'text' && (
                                        <motion.div
                                            key="text"
                                            variants={tabVariants}
                                            initial="hidden" animate="visible" exit="hidden"
                                            className="input-group"
                                        >
                                            <label>Plain Text</label>
                                            <textarea
                                                rows="4"
                                                placeholder="Enter your text content here..."
                                                value={qrValue}
                                                onChange={handleSimpleInputChange}
                                                className="nishan-input"
                                            />
                                        </motion.div>
                                    )}

                                    {activeTab === 'wifi' && (
                                        <motion.div
                                            key="wifi"
                                            variants={tabVariants}
                                            initial="hidden" animate="visible" exit="hidden"
                                            className="input-stack"
                                        >
                                            <div className="input-group">
                                                <label>Network Name (SSID)</label>
                                                <input
                                                    type="text"
                                                    placeholder="MyWiFi"
                                                    value={wifiData.ssid}
                                                    onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                                                    className="nishan-input"
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label>Password</label>
                                                <input
                                                    type="text"
                                                    placeholder="Required for secured networks"
                                                    value={wifiData.password}
                                                    onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                                                    className="nishan-input"
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label>Encryption</label>
                                                <select
                                                    value={wifiData.encryption}
                                                    onChange={(e) => setWifiData({ ...wifiData, encryption: e.target.value })}
                                                    className="nishan-input"
                                                >
                                                    <option value="WPA">WPA/WPA2</option>
                                                    <option value="WEP">WEP</option>
                                                    <option value="nopass">No Encryption</option>
                                                </select>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'email' && (
                                        <motion.div
                                            key="email"
                                            variants={tabVariants}
                                            initial="hidden" animate="visible" exit="hidden"
                                            className="input-stack"
                                        >
                                            <div className="input-group">
                                                <label>Email Address</label>
                                                <input
                                                    type="email"
                                                    placeholder="user@example.com"
                                                    value={emailData.email}
                                                    onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                                                    className="nishan-input"
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label>Subject</label>
                                                <input
                                                    type="text"
                                                    placeholder="Inquiry..."
                                                    value={emailData.subject}
                                                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                                                    className="nishan-input"
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label>Message</label>
                                                <textarea
                                                    rows="3"
                                                    placeholder="Type your message..."
                                                    value={emailData.body}
                                                    onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                                                    className="nishan-input"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* CUSTOMIZATION */}
                            <div className="customization-section">
                                <h3><FaPalette /> Appearance</h3>
                                <div className="color-pickers">
                                    <div className="color-control">
                                        <label>Foreground</label>
                                        <div className="color-wrapper">
                                            <input
                                                type="color"
                                                value={config.fgColor}
                                                onChange={(e) => setConfig({ ...config, fgColor: e.target.value })}
                                            />
                                            <span>{config.fgColor}</span>
                                        </div>
                                    </div>
                                    <div className="color-control">
                                        <label>Background</label>
                                        <div className="color-wrapper">
                                            <input
                                                type="color"
                                                value={config.bgColor}
                                                onChange={(e) => setConfig({ ...config, bgColor: e.target.value })}
                                            />
                                            <span>{config.bgColor}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </motion.div>

                        {/* RIGHT COLUMN: Preview */}
                        <motion.div
                            className="workspace-preview"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="preview-card-sticky">
                                <div className="preview-header">
                                    <h2>Live Preview</h2>
                                </div>
                                <div className="qr-canvas-wrapper" id="qr-gen">
                                    <QRCodeCanvas
                                        value={qrValue || "https://minderfly.com"}
                                        size={config.size}
                                        level={config.level}
                                        includeMargin={config.margin}
                                        bgColor={config.bgColor}
                                        fgColor={config.fgColor}
                                    />
                                </div>
                                <div className="preview-actions">
                                    <button onClick={downloadQR} className="btn-nishan-primary full-width">
                                        <FaDownload /> Download PNG
                                    </button>
                                </div>
                                <div className="preview-info">
                                    <p>Your code works forever.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Legacy Sections (Features, Pricing) moved/styled below */}
                <div className="nishan-legacy-content">
                    <section className="nishan-features">
                        <div className="nishan-container">
                            <div className="features-header">
                                <h2>Why use Nishan QR?</h2>
                            </div>
                            <div className="features-grid">
                                <div className="feature-box">
                                    <FaQrcode className="f-icon" />
                                    <h3>High Quality</h3>
                                    <p>Vector-sharp printing for any size.</p>
                                </div>
                                <div className="feature-box">
                                    <FaBolt className="f-icon" />
                                    <h3>Instant</h3>
                                    <p>Generated entirely in your browser.</p>
                                </div>
                                <div className="feature-box">
                                    <FaInfinity className="f-icon" />
                                    <h3>Unlimited</h3>
                                    <p>Create as many as you need, free.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SEO Content Section */}
                    <section className="nishan-seo-content">
                        <div className="nishan-container">
                            <article className="seo-article">
                                <h2>The Ultimate Free QR Code Generator</h2>
                                <p>
                                    Nishan QR is a powerful, free online tool that allows you to generate high-quality QR codes for websites, text, WiFi networks, and emails.
                                    Whether you are a business owner, student, or just organizing your digital life, creating a scannable code has never been easier.
                                    Our tool runs entirely in your browser, ensuring that your data stays private and secure.
                                </p>

                                <h3>What is a QR Code?</h3>
                                <p>
                                    A QR (Quick Response) Code is a type of two-dimensional matrix barcode that can be read by smartphones and specialized scanners.
                                    Invented in 1994, it has become the standard for sharing digital information in the physical world.
                                    Unlike traditional barcodes, QR codes can store a significant amount of data, including URLs, text credentials, and contact information.
                                </p>

                                <h3>How to Create a QR Code?</h3>
                                <ol>
                                    <li><strong>Choose your type:</strong> Select from Link, Text, WiFi, or Email tabs above.</li>
                                    <li><strong>Enter your content:</strong> Paste your URL, type your message, or enter network details.</li>
                                    <li><strong>Customize:</strong> Use the Appearance options to change the foreground and background colors to match your brand.</li>
                                    <li><strong>Download:</strong> Click the "Download PNG" button to save your high-resolution QR code instantly.</li>
                                </ol>

                                <h3>Common Use Cases</h3>
                                <div className="seo-grid">
                                    <div className="seo-card">
                                        <h4>🏢 For Business</h4>
                                        <p>Share your website, portfolio, or menu on business cards, flyers, and posters.</p>
                                    </div>
                                    <div className="seo-card">
                                        <h4>📶 WiFi Access</h4>
                                        <p>Allow guests to connect to your WiFi network instantly without typing complex passwords.</p>
                                    </div>
                                    <div className="seo-card">
                                        <h4>📧 Direct Contact</h4>
                                        <p>Pre-fill an email draft to make it easier for customers to contact support.</p>
                                    </div>
                                    <div className="seo-card">
                                        <h4>📱 Personal Use</h4>
                                        <p>Share weird messages, jokes, or surprise links with friends.</p>
                                    </div>
                                </div>

                                <h3>Frequently Asked Questions</h3>
                                <div className="faq-section">
                                    <div className="faq-item">
                                        <h4>Is this QR Code Generator free?</h4>
                                        <p>Yes, Nishan QR is 100% free to use for both personal and commercial purposes. There are no hidden fees or watermarks.</p>
                                    </div>
                                    <div className="faq-item">
                                        <h4>Do these QR Codes expire?</h4>
                                        <p>No. The QR codes generated here are static. They contain the data directly and will work forever as long as your link/content is valid.</p>
                                    </div>
                                    <div className="faq-item">
                                        <h4>Is my data safe?</h4>
                                        <p>Absolutely. All generation happens locally in your browser. We do not store or track the content of your QR codes.</p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <footer className="nishan-footer">
                    <div className="nishan-container">
                        <p>&copy; {new Date().getFullYear()} Minderfly. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default NishanQr;
