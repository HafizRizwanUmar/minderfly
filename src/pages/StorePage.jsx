import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaWindows, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './StorePage.css';

const StorePage = () => {
    const products = [
        {
            id: 'nishan-qr',
            name: 'Nishan QR Code Generator',
            description: 'Generate unlimited QR codes with a sleek, modern interface. The ultimate QR solution for Windows.',
            price: 'Free / $5 Lifetime',
            icon: <FaWindows className="product-icon" />,
            link: '/store/nishan-qr-generator',
            color: '#0078D7' // Windows Blue-ish
        },
        {
            id: 'flutter-web-emulator',
            name: 'Flutter Web Emulator',
            description: 'Run, debug, and test Flutter Web apps directly inside VS Code. Zero context switching.',
            price: 'Free',
            icon: <FaWindows className="product-icon" />, // Using Windows icon as it's a VS Code extension (Microsoft)
            link: '/store/flutter-web-emulator',
            color: '#007ACC' // VS Code Blue
        }
    ];

    return (
        <>
            <Helmet>
                <title>Store - Minderfly</title>
                <meta name="description" content="Discover premium SaaS products and tools by Minderfly." />
            </Helmet>

            <Navbar />

            <div className="store-page">
                <div className="container">
                    <motion.div
                        className="store-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1>Our <span className="text-gradient">Store</span></h1>
                        <p>Premium tools designed to enhance your productivity.</p>
                    </motion.div>

                    <div className="products-grid">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                className="product-card"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="card-content">
                                    <div className="product-icon-wrapper" style={{ backgroundColor: `${product.color}20`, color: product.color }}>
                                        {product.icon}
                                    </div>
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <div className="product-meta">
                                        <span className="price-tag">{product.price}</span>
                                    </div>
                                    <Link to={product.link} className="btn-product-link">
                                        View Details <FaArrowRight />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default StorePage;
