import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import StoreHero from '../../components/StoreHero';
import TrendingSection from '../../components/TrendingSection';
import '../StorePage.css';

const StoreHub = () => {
    return (
        <>
            <Helmet>
                <title>Minderfly Store - Premium Digital Products</title>
                <meta name="description" content="Discover top-rated tools, games, and templates." />
            </Helmet>

            <Navbar />

            <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20 font-['Space_Grotesk',_sans-serif]">
                {/* Background Ambient Glow */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
                    <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-orange-900/10 blur-[100px] rounded-full" />
                </div>

                <div className="relative z-10 container mx-auto px-6">
                    <StoreHero />
                    <TrendingSection />

                    {/* Placeholder for "Your Apps" or other categories mentioned in typical store UIs */}
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold mb-6 text-gray-400 uppercase tracking-widest text-sm">More Categories</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Action', 'Adventure', 'Strategy', 'RPG', 'Simulation', 'Puzzle', 'Sports', 'Racing'].map(cat => (
                                <div key={cat} className="p-6 bg-[#111] border border-[#222] rounded-xl hover:border-[#444] hover:bg-[#161616] cursor-pointer transition-all text-center font-bold text-gray-300 hover:text-white">
                                    {cat}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default StoreHub;

