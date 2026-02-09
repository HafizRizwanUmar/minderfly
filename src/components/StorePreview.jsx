import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWindows, FaArrowRight, FaMobileAlt, FaStar, FaDownload } from 'react-icons/fa';
import './StorePreview.css';

const StorePreview = () => {
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const products = [
        {
            id: 'debt-settler',
            name: 'Debt Settler',
            description: 'The ultimate free application to manage shared expenses and settle debts with friends. No hidden fees, just seamless financial harmony.',
            price: 'Free',
            icon: <FaMobileAlt />,
            link: '/store/debt-settler',
            color: '#8B5CF6',
            rating: 4.9,
            downloads: '10k+'
        },
        {
            id: 'nishan-qr',
            name: 'Nishan QR Generator',
            description: 'Generate unlimited custom QR codes with a sleek, modern interface. The professional choice for Windows users.',
            price: 'Free / $5',
            icon: <FaWindows />,
            link: '/store/nishan-qr-generator',
            color: '#0078D7',
            rating: 4.8,
            downloads: '5k+'
        },
        {
            id: 'flutter-web-emulator',
            name: 'Flutter Web Emulator',
            description: 'Run, debug, and test Flutter Web apps directly inside VS Code. Eliminate context switching and boost productivity.',
            price: 'Free',
            icon: <FaWindows />,
            link: '/store/flutter-web-emulator',
            color: '#007ACC',
            rating: 4.7,
            downloads: '2k+'
        }
    ];

    return (
        <section className="store-seo-section relative overflow-hidden" id="products">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-purple-900/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-blue-900/10 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="seo-header">
                    <h2>Our <span className="gradient-text">Top Products</span></h2>
                    <p>Premium tools engineered to accelerate your workflow and simplify your life.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredProduct(product.id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                            className="group relative bg-[#252525] rounded-xl p-8 border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 flex flex-col h-full"
                        >
                            {/* Hover Reveal Gradient */}
                            <div
                                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at center, rgba(255,255,255,0.03), transparent 70%)`
                                }}
                            />

                            <div className="flex justify-between items-start mb-6">
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: `${product.color}20`, color: product.color }}
                                >
                                    {product.icon}
                                </div>
                                <div className="text-right">
                                    <span className="block text-xl font-bold text-white">{product.price}</span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors text-gray-100">
                                {product.name}
                            </h3>

                            <div className="flex items-center gap-3 mb-5 text-sm text-gray-400">
                                <span className="flex items-center gap-1 text-[#FFB900]">
                                    {product.rating} <FaStar />
                                </span>
                                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                <span>{product.downloads} Downloads</span>
                            </div>

                            <p className="text-base text-gray-400 leading-relaxed mb-8 flex-grow">
                                {product.description}
                            </p>

                            <Link
                                to={product.link}
                                className="w-full py-3 bg-white/5 hover:bg-[#0078D7] hover:text-white text-gray-200 font-medium rounded-lg transition-all flex items-center justify-center gap-2 group-hover:bg-[#0078D7] group-hover:text-white"
                            >
                                View Details <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/store"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                    >
                        See More Products <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default StorePreview;
