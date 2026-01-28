import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaDesktop, FaCheck, FaWindows, FaAmazon, FaItchIo } from 'react-icons/fa';
import ProductNavbar from '../../components/ProductNavbar';
import ProductFooter from '../../components/ProductFooter';
import phoneMockup from '../../assets/octopus-phone.png';

const DebtSettler = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
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

            <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-primary/30 font-body">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 overflow-hidden">
                    {/* Ambient Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/4"></div>
                    </div>

                    <div className="container mx-auto max-w-7xl relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Text Content */}
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                                className="text-center lg:text-left"
                            >
                                <motion.div variants={fadeIn}>
                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-6">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                                            Settle Debt.
                                        </span>
                                        <br />
                                        <span className="text-primary relative inline-block">
                                            Absolutely Free.
                                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                            </svg>
                                        </span>
                                    </h1>
                                </motion.div>

                                <motion.p variants={fadeIn} className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                                    The ultimate free application to manage shared expenses and settle debts.
                                    No hidden fees, just seamless financial harmony.
                                </motion.p>

                                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                                    <a
                                        href="https://hafizrizwanumar.itch.io/debtsettler"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#fa5c5c] hover:bg-[#ff4e4e] rounded-full transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transform hover:-translate-y-1"
                                    >
                                        <FaItchIo className="text-2xl" />
                                        <div className="text-left">
                                            <div className="text-xs font-medium text-white/80 uppercase tracking-wider">Download for Mobile</div>
                                            <div className="text-lg font-bold font-display">Itch.io</div>
                                        </div>
                                    </a>

                                    <a
                                        href="https://apps.microsoft.com/detail/9N4Z8J2S0SFL?hl=en-us&gl=PK&ocid=pdpshare"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 backdrop-blur-md transform hover:-translate-y-1"
                                    >
                                        <FaWindows className="text-2xl text-blue-400" />
                                        <div className="text-left">
                                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">For Desktop</div>
                                            <div className="text-lg font-bold font-display">Microsoft Store</div>
                                        </div>
                                    </a>

                                    <a
                                        href="https://www.amazon.com/dp/B0GJNKLHXZ/ref=sr_1_5?dib=eyJ2IjoiMSJ9.uHySQ5mxehZhuh_R6PT8OoC9GAwM0v7JfXR4Me4o7_jGjHj071QN20LucGBJIEps.Rkk4U4DtQfQTEat6AxIQc26l8oio-b3N5ElDU7ReG5U&dib_tag=se&qid=1769349973&refinements=p_4%3Arebel&s=mobile-apps&search-type=ss&sr=1-5&tag=fcid07-20&linkCode=ll1&fbclid=IwZXh0bgNhZW0CMTEAAR1GYD0UeQ"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 backdrop-blur-md transform hover:-translate-y-1"
                                    >
                                        <FaAmazon className="text-2xl text-amber-400" />
                                        <div className="text-left">
                                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">For Tablet</div>
                                            <div className="text-lg font-bold font-display">Amazon Store</div>
                                        </div>
                                    </a>
                                </motion.div>
                            </motion.div>

                            {/* Image Content */}
                            <motion.div
                                initial={{ opacity: 0, x: 50, rotate: 5 }}
                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                className="relative hidden lg:block"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-[80px] scale-75 animate-pulse"></div>
                                <motion.img
                                    src={phoneMockup}
                                    alt="Debt Settler App Interface"
                                    className="relative z-10 w-full max-w-[500px] mx-auto drop-shadow-2xl"
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent pointer-events-none"></div>
                    <div className="container mx-auto max-w-7xl px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-20"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Features that matter</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Everything you need to keep your friendships debt-free.</p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeIn}
                                    className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-primary/30 transition-all duration-500 group"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <FaCheck className="text-xl text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-100 font-display">{feature}</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">Experience the freedom of managing your finances without any cost.</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-32 px-6 relative overflow-hidden">
                    <div className="container mx-auto max-w-5xl relative z-10">
                        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-white/10 backdrop-blur-xl p-12 md:p-20 text-center">
                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                                <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-display relative z-10">Ready to settle up?</h2>
                            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto relative z-10">Join thousands of users who trust DebtSettler for their shared expenses.</p>
                            <button className="relative z-10 px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-primary hover:text-black transition-all duration-300 shadow-xl shadow-white/5 hover:shadow-primary/25">
                                Get Started for Free
                            </button>
                        </div>
                    </div>
                </section>
            </div>
            <ProductFooter productName="Debt Settler" />
        </>
    );
};

export default DebtSettler;
