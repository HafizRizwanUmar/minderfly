import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaWindows, FaMobileAlt, FaStar, FaDownload, FaFilePdf, FaPalette } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../StorePage.css'; // Reusing StorePage.css as it is detailed and premium

const StoreHub = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const categories = ['All', 'Productivity', 'Finance', 'Development', 'Utilities'];

    const products = [
        {
            id: 'debt-settler',
            name: 'Debt Settler',
            description: 'The ultimate free application to manage shared expenses and settle debts with friends. No hidden fees, just seamless financial harmony.',
            price: 'Free',
            icon: <FaMobileAlt className="text-3xl" />,
            link: '/store/debt-settler',
            color: '#8B5CF6',
            category: 'Finance',
            featured: true,
            rating: 4.9,
            downloads: '10k+',
            image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2671&auto=format&fit=crop"
        },
        {
            id: 'nishan-qr',
            name: 'Nishan QR Generator',
            description: 'Generate unlimited custom QR codes with a sleek, modern interface. The professional choice for Windows users.',
            price: 'Free / $5',
            icon: <FaWindows className="text-3xl" />,
            link: '/store/nishan-qr',
            color: '#0078D7',
            category: 'Utilities',
            featured: false,
            rating: 4.8,
            downloads: '5k+',
            image: "https://images.unsplash.com/photo-1595079676614-88bcc705b761?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: 'flutter-web-emulator',
            name: 'Flutter Web Emulator',
            description: 'Run, debug, and test Flutter Web apps directly inside VS Code. Eliminate context switching and boost productivity.',
            price: 'Free',
            icon: <FaWindows className="text-3xl" />,
            link: '/store/flutter-web-emulator',
            color: '#007ACC',
            category: 'Development',
            featured: false,
            rating: 4.7,
            downloads: '2k+',
            image: "https://images.unsplash.com/photo-1628277613967-6abca504d0ac?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: 'sanad-pdf',
            name: 'Sanad PDF Editor',
            description: 'Professional PDF editing on Windows. Merge, Split, Convert, and Sign documents securely offline.',
            price: 'Free / Paid',
            icon: <FaFilePdf className="text-3xl" />,
            link: '/store/sanad-pdf-editor',
            color: '#FF5722',
            category: 'Productivity',
            featured: false,
            rating: 4.5,
            downloads: '5k+',
            image: "https://images.unsplash.com/photo-1568205469440-205934423853?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: 'chrome-themes',
            name: 'Premium Chrome Themes',
            description: 'A collection of high-quality, immersive Chrome themes to personalize your browsing experience.',
            price: 'Various',
            icon: <FaPalette className="text-3xl" />,
            link: '/store/chrome-themes',
            color: '#E91E63',
            category: 'Utilities',
            featured: false,
            rating: 4.8,
            downloads: '20k+',
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600"
        }
    ];

    const featuredProduct = products.find(p => p.featured);
    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <Helmet>
                <title>Minderfly Store - Sanad PDF, Debt Settler, Nishan QR & Dev Tools</title>
                <meta name="description" content="Download top-rated tools: Sanad PDF Editor, Debt Settler, Nishan QR Generator, Flutter Web Emulator, and premium Chrome Themes." />
            </Helmet>

            <Navbar />

            <div className="min-h-screen bg-[#1a1a1a] text-white pt-24 pb-20 font-['Segoe_UI',_sans-serif] selection:bg-[#0078D7] selection:text-white">

                {/* Background Ambient Glow */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
                    <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-blue-900/10 blur-[100px] rounded-full" />
                </div>

                <div className="relative z-10 container mx-auto px-6">

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-20"
                    >
                        <div className="relative w-full h-[550px] rounded-2xl overflow-hidden shadow-2xl group border border-white/5">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: `url(${featuredProduct.image})` }}
                            />

                            {/* Gradient Overlay - darker at bottom/left for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/95 via-black/50 to-transparent" />

                            {/* Glossy sheen effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3 lg:w-1/2">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-[#FFB900] text-black rounded shadow-[0_0_15px_rgba(255,185,0,0.4)]">
                                        Spotlight
                                    </span>
                                    <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md border border-white/10 rounded">
                                        Editors' Choice
                                    </span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight drop-shadow-lg"
                                >
                                    {featuredProduct.name}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light"
                                >
                                    {featuredProduct.description}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex items-center gap-4"
                                >
                                    <Link
                                        to={featuredProduct.link}
                                        className="px-8 py-4 bg-[#0078D7] hover:bg-[#006cc1] text-white font-semibold rounded-lg shadow-[0_4px_20px_rgba(0,120,215,0.4)] hover:shadow-[0_6px_25px_rgba(0,120,215,0.6)] transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                                    >
                                        <FaDownload /> Get it Now
                                    </Link>
                                    <button className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg border border-white/10 transition-all">
                                        Learn More
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Category Filter */}
                    <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            Top Apps <span className="text-sm font-normal text-gray-400 bg-white/5 px-3 py-1 rounded-full">{filteredProducts.length}</span>
                        </h2>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === category
                                        ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    variants={itemVariants}
                                    layout
                                    onMouseEnter={() => setHoveredProduct(product.id)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                    className="group relative bg-[#252525] rounded-xl p-6 border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1"
                                >
                                    {/* Hover Reveal Gradient */}
                                    <div
                                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)`
                                        }}
                                    />

                                    <div className="flex flex-col h-full relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div
                                                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                                                style={{ backgroundColor: `${product.color}20`, color: product.color }}
                                            >
                                                {product.icon}
                                            </div>
                                            {product.featured && (
                                                <span className="bg-[#FFB900]/20 text-[#FFB900] text-[10px] font-bold px-2 py-1 rounded border border-[#FFB900]/30">
                                                    FEATURED
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors text-gray-100">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center gap-3 mb-4 text-xs text-gray-400">
                                            <span className="flex items-center gap-1 text-[#FFB900]">
                                                {product.rating} <FaStar />
                                            </span>
                                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                            <span>{product.downloads} Downloads</span>
                                        </div>

                                        <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                                            {product.description}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                            <span className="font-semibold text-sm text-gray-200">
                                                {product.price}
                                            </span>

                                            <Link
                                                to={product.link}
                                                className="px-4 py-2 bg-white/10 hover:bg-[#0078D7] hover:text-white text-gray-200 text-sm font-medium rounded transition-colors"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </div>

            <Footer />
        </>
    );
};

export default StoreHub;
