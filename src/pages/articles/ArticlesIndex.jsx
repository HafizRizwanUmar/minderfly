import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaCalendar, FaUser, FaTag, FaArrowRight } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { articlesData } from '../../data/articles';

const ArticlesIndex = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Extract unique categories
    const categories = ["All", ...new Set(articlesData.map(article => article.category))];

    const filteredArticles = selectedCategory === "All"
        ? articlesData
        : articlesData.filter(article => article.category === selectedCategory);

    return (
        <>
            <Helmet>
                <title>Blog & Resources - Minderfly</title>
                <meta name="description" content="Insights, tutorials, and resources on Web Development, Flutter, and Software trends." />
            </Helmet>

            <Navbar />

            <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 font-body">
                <div className="container mx-auto px-6">

                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-20 pt-10">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-accent tracking-widest text-sm font-bold uppercase mb-4 block"
                        >
                            The Library
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl font-heading font-extrabold mb-6 leading-tight"
                        >
                            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Resources</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-400 leading-relaxed"
                        >
                            Deep dives into modern development, software architecture, and productivity tools.
                        </motion.p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                                        ? 'bg-white text-black'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Articles Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article, index) => (
                            <motion.article
                                key={article.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                            >
                                {/* Image */}
                                <Link to={`/articles/${article.slug}`} className="block relative aspect-video overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-xs font-bold rounded-md border border-white/10 uppercase tracking-wide">
                                            {article.category}
                                        </span>
                                    </div>
                                </Link>

                                {/* Content */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-mono">
                                        <span className="flex items-center gap-1"><FaCalendar /> {article.date}</span>
                                        <span className="flex items-center gap-1"><FaTag /> {article.readTime}</span>
                                    </div>

                                    <Link to={`/articles/${article.slug}`} className="block mb-3">
                                        <h2 className="text-2xl font-bold font-heading group-hover:text-accent transition-colors leading-tight">
                                            {article.title}
                                        </h2>
                                    </Link>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {article.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                                                {article.author.charAt(0)}
                                            </div>
                                            <span className="text-xs text-slate-400 font-medium">{article.author}</span>
                                        </div>
                                        <Link to={`/articles/${article.slug}`} className="text-sm font-bold flex items-center gap-2 text-white group-hover:text-accent transition-colors">
                                            Read <FaArrowRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="text-center py-20 text-slate-500">
                            No articles found in this category.
                        </div>
                    )}

                </div>
            </div>

            <Footer />
        </>
    );
};

export default ArticlesIndex;
