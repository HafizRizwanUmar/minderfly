import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';

const ServicePageLayout = ({
    title,
    subtitle,
    description,
    features,
    image,
    ctaText = "Start Your Project",
    ctaLink = "/contact",
    badgeText = "Expert Service",
    seoTitle,
    seoDescription,
    relatedArticles = []
}) => {

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>{seoTitle || `${title} - Minderfly Services`}</title>
                <meta name="description" content={seoDescription || description} />
            </Helmet>

            <Navbar />

            <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 font-body">

                {/* Hero Section */}
                <section className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="lg:w-1/2"
                    >
                        <motion.span variants={fadeInUp} className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-semibold tracking-wide mb-6">
                            {badgeText}
                        </motion.span>
                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-heading font-extrabold leading-tight mb-6">
                            {title}
                        </motion.h1>
                        <motion.h2 variants={fadeInUp} className="text-2xl text-slate-400 font-light mb-8">
                            {subtitle}
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
                            {description}
                        </motion.p>
                        <motion.div variants={fadeInUp}>
                            <a href={ctaLink} className="btn btn-primary group">
                                {ctaText} <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-700">
                            <img src={image} alt={title} className="w-full h-auto object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="bg-[#0a0a0a] py-24 border-y border-white/5">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why Choose Us?</h3>
                            <p className="text-slate-400">We deliver excellence in every aspect of our service.</p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={fadeInUp}
                                    className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                                        <FaCheckCircle size={20} />
                                    </div>
                                    <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Related Articles Section */}
                {relatedArticles.length > 0 && (
                    <section className="container mx-auto px-6 py-20 border-t border-white/10">
                        <h2 className="text-3xl font-heading font-bold mb-10">Related Insights</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {relatedArticles.map((article) => (
                                <a href={`/articles/${article.slug}`} key={article.id} className="group block bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all">
                                    <div className="p-6">
                                        <span className="text-xs text-accent font-bold uppercase tracking-wider mb-2 block">{article.category}</span>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{article.title}</h3>
                                        <p className="text-slate-400 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                                        <span className="text-sm font-semibold flex items-center gap-2">Read Article <FaArrowRight size={12} /></span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="container mx-auto px-6 py-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 md:p-20 border border-white/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to transform your vision?</h2>
                            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Let's build something extraordinary together. Contact us today to get started.</p>
                            <a href={ctaLink} className="btn btn-primary px-10 py-4 text-lg">
                                Get a Quote
                            </a>
                        </div>
                    </motion.div>
                </section>

            </div>

            <Footer />
        </>
    );
};

export default ServicePageLayout;
