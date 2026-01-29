import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWindows, FaArrowRight, FaCode, FaDownload, FaStar } from 'react-icons/fa';
import './StorePreview.css';

const StorePreview = () => {
    const products = [
        {
            id: 'nishan',
            title: 'Nishan QR Generator',
            subtitle: 'Native Windows Application',
            description: 'The most powerful offline QR code generator for Windows. Create encrypted WiFi codes, vCards, and marketing links without an internet connection.',
            longDescription: 'Designed for professionals who need privacy and speed. Nishan allows you to generate high-resolution QR codes for print and digital media instantly. Features include custom colors, error correction levels, and bulk generation.',
            image: '/nishan_preview.png',
            link: '/products/nishan-qr',
            icon: <FaWindows />,
            stats: [
                { label: 'Downloads', value: '10k+' },
                { label: 'User Rating', value: '4.8/5' }
            ],
            schema: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Nishan QR Generator",
                "operatingSystem": "Windows 10, Windows 11",
                "applicationCategory": "UtilitiesApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "1250"
                },
                "offers": {
                    "@type": "Offer",
                    "price": "0.00",
                    "priceCurrency": "USD"
                }
            }
        },
        {
            id: 'flutter',
            title: 'Flutter Web Emulator',
            subtitle: 'VS Code Extension',
            description: 'Streamline your mobile development workflow. Run and debug Flutter Web apps directly inside VS Code with a unified emulator interface.',
            longDescription: 'Stop switching windows. Our emulator integrates seamlessly into your IDE, providing a realistic mobile view for your web builds. It supports hot reload, custom device sizing, and landscape orientation testing.',
            image: '/flutter_preview.png',
            link: '/products/flutter-web-emulator',
            icon: <FaCode />,
            stats: [
                { label: 'Active Users', value: '25k+' },
                { label: 'Devs Trust', value: '5.0' }
            ],
            schema: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Flutter Web Emulator",
                "operatingSystem": "VS Code, Cross-platform",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5.0",
                    "ratingCount": "3400"
                },
                "offers": {
                    "@type": "Offer",
                    "price": "0.00",
                    "priceCurrency": "USD"
                }
            }
        }
    ];

    return (
        <section className="store-seo-section" id="products">
            <div className="container">
                <div className="seo-header">
                    <h2>We Help Developers <span className="gradient-text">Build Faster</span></h2>
                    <p>Premium tools engineered to accelerate your workflow.</p>
                </div>

                <div className="products-list">
                    {products.map((product, index) => (
                        <div key={product.id} className={`product-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
                            <script type="application/ld+json">
                                {JSON.stringify(product.schema)}
                            </script>

                            <motion.div
                                className="product-content"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="product-badge-row">
                                    <span className="icon-badge">{product.icon}</span>
                                    <span className="subtitle-badge">{product.subtitle}</span>
                                </div>
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-desc">{product.description}</p>
                                <p className="product-long-desc">{product.longDescription}</p>

                                <div className="product-meta">
                                    {product.stats.map((stat, i) => (
                                        <div key={i} className="meta-item">
                                            <strong>{stat.value}</strong>
                                            <span>{stat.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link to={product.link} className="btn-product-cta">
                                    View Product <FaArrowRight />
                                </Link>
                            </motion.div>

                            <motion.div
                                className="product-visual"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="visual-card-glass">
                                    <img src={product.image} alt={`${product.title} Interface`} />
                                    <div className="glow-effect"></div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StorePreview;
