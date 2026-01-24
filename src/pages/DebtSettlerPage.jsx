import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaDesktop, FaCheck, FaGooglePlay, FaWindows } from 'react-icons/fa';
import ProductNavbar from '../components/ProductNavbar';
import ProductFooter from '../components/ProductFooter';

const DebtSettlerPage = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const features = [
        "Settle debts instantly with friends",
        "Track shared expenses effortlessly",
        "Completely free to use forever",
        "Secure and private data handling",
        "Real-time synchronization across devices",
        "Export reports for free"
    ];

    return (
        <>
            <Helmet>
                <title>Free Debt Settlement App - DebtSettler | Settle Shared Expenses Free</title>
                <meta name="description" content="Download DebtSettler for free. The best free mobile and desktop application to settle your debt and shared expenses. Available on Minderfly Store and Microsoft Store." />
                <meta name="keywords" content="free debt settler, free expense tracker, settle shared expenses free, free debt app, debt manager free, minderfly store, microsoft store" />
                <link rel="canonical" href="https://minderfly.com/debt-settler" />
            </Helmet>

            <ProductNavbar productName="Debt Settler" ctaLink="#" />

            <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-indigo-500/30">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl translate-y-1/2"></div>
                    </div>

                    <div className="container mx-auto max-w-6xl relative z-10 text-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.6 }}
                            variants={fadeIn}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6 drop-shadow-sm">
                                Settle Debt. <br />
                                <span className="text-white">Absolutely Free.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                                The ultimate free application to manage shared expenses and settle debts.
                                No hidden fees, just seamless financial harmony.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="/mobile app/debtsettler.apk"
                                    download="debtsettler.apk"
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all duration-300 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transform hover:-translate-y-1"
                                >
                                    <FaMobileAlt className="text-2xl" />
                                    <div className="text-left">
                                        <div className="text-xs font-medium text-indigo-200">Download for Mobile</div>
                                        <div className="text-lg font-bold">Minderfly Store</div>
                                    </div>
                                </a>

                                <a
                                    href="#"
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full transition-all duration-300 shadow-lg hover:shadow-slate-700/25 transform hover:-translate-y-1"
                                >
                                    <FaDesktop className="text-2xl" />
                                    <div className="text-left">
                                        <div className="text-xs font-medium text-slate-400">Download for Desktop</div>
                                        <div className="text-lg font-bold">Microsoft Store</div>
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-20 bg-slate-900/50 backdrop-blur-sm border-t border-slate-800">
                    <div className="container mx-auto max-w-6xl px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                                        <FaCheck className="text-indigo-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-slate-100">{feature}</h3>
                                    <p className="text-slate-400">Experience the freedom of managing your finances without any cost.</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-900/10"></div>
                    <div className="container mx-auto max-w-4xl text-center relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to settle up?</h2>
                        <p className="text-xl text-slate-300 mb-10">Join thousands of users who trust DebtSettler for their shared expenses.</p>
                        <button className="px-10 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-colors shadow-xl">
                            Get Started for Free
                        </button>
                    </div>
                </section>
            </div>
            <ProductFooter productName="Debt Settler" />
        </>
    );
};

export default DebtSettlerPage;
