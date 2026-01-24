import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaWindows, FaArrowRight, FaMobileAlt, FaSearch } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './StorePage.css';

const StorePage = () => {
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const products = [
        {
            id: 'debt-settler',
            name: 'Debt Settler',
            description: 'The ultimate free application to manage shared expenses and settle debts. No hidden fees.',
            price: 'Free',
            icon: <FaMobileAlt className="text-2xl" />,
            link: '/store/debt-settler',
            color: '#8B5CF6', // Violet
            featured: true,
            image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2671&auto=format&fit=crop"
        },
        {
            id: 'nishan-qr',
            name: 'Nishan QR Generator',
            description: 'Generate unlimited QR codes with a sleek, modern interface. The ultimate QR solution for Windows.',
            price: 'Free / $5',
            icon: <FaWindows className="text-2xl" />,
            link: '/store/nishan-qr-generator',
            color: '#0078D7', // Windows Blue
            featured: false
        },
        {
            id: 'flutter-web-emulator',
            name: 'Flutter Web Emulator',
            description: 'Run, debug, and test Flutter Web apps directly inside VS Code. Zero context switching.',
            price: 'Free',
            icon: <FaWindows className="text-2xl" />,
            link: '/store/flutter-web-emulator',
            color: '#007ACC', // VS Code Blue
            featured: false
        }
    ];

    const featuredProduct = products.find(p => p.featured);
    const otherProducts = products.filter(p => !p.featured);

    return (
        <>
            <Helmet>
                <title>Store - Minderfly</title>
                <meta name="description" content="Discover premium SaaS products and tools by Minderfly including Debt Settler and Nishan QR." />
            </Helmet>

            <Navbar />

            <div className="min-h-screen bg-[#202020] text-white pt-24 pb-20 selection:bg-[#0078D7] selection:text-white font-['Segoe_UI',_sans-serif]">

                {/* Hero / Spotlight Section */}
                <div className="container mx-auto px-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Fluent easing
                        className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-2xl group cursor-pointer"
                    >
                        {/* Background Image with Overlay */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${featuredProduct.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-10 md:p-14 w-full md:w-2/3 lg:w-1/2">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase bg-[#FFB900] text-black rounded-sm"
                            >
                                Spotlight
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
                            >
                                {featuredProduct.name}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg text-gray-200 mb-8 leading-relaxed"
                            >
                                {featuredProduct.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    to={featuredProduct.link}
                                    className="inline-flex items-center px-8 py-3 bg-[#0078D7] hover:bg-[#006cc1] text-white font-semibold rounded-[4px] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Get it now
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Filter / Category Bar (Visual only for now) */}
                <div className="container mx-auto px-6 mb-10 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Top Free Apps</h2>
                    <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-400">
                        <span className="text-white cursor-pointer hover:underline">All</span>
                        <span className="cursor-pointer hover:text-white transition-colors">Productivity</span>
                        <span className="cursor-pointer hover:text-white transition-colors">Finance</span>
                        <span className="cursor-pointer hover:text-white transition-colors">Development</span>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Include the featured product in the grid as well, or just the others? User said "link it inside store" - usually store has all items in grid too. Let's show all items including the spotlight one for completeness, or just the others if the list is long. Since list is short, let's show ALL products in the grid for easy access. */}
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredProduct(product.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                                className="group relative bg-[#2D2D2D] hover:bg-[#323232] rounded-lg p-6 transition-all duration-200 border border-transparent hover:border-[#ffffff1a] hover:shadow-xl"
                            >
                                <div className="flex flex-col h-full justify-between">
                                    <div>
                                        <div
                                            className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-3xl transition-transform duration-300 group-hover:scale-110"
                                            style={{ backgroundColor: `${product.color}20`, color: product.color }}
                                        >
                                            {product.icon}
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#0078D7] transition-colors">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="bg-[#ffffff1a] text-xs px-2 py-1 rounded text-gray-300">
                                                App
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Minderfly
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="font-semibold text-sm">
                                            {product.price}
                                        </span>

                                        <Link
                                            to={product.link}
                                            className="px-6 py-2 bg-[#ffffff1a] hover:bg-[#0078D7] text-white text-sm font-medium rounded-[4px] transition-colors"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>

                                {/* Tilt/Glow effect on hover could go here, but keeping it clean for MS style */}
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
