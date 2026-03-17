import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaExternalLinkAlt, FaCheckCircle, FaCode, FaRocket } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import Reveal from '../components/Reveal';
import { projectsData } from '../data/projects';
import './ProjectDetail.css';

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projectsData.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
                <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                <Link to="/work" className="text-accent flex items-center gap-2 hover:underline">
                    <FaArrowLeft /> Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <>
            <SEOHead 
                title={`${project.title} - Project Case Study | Minderfly`}
                description={project.description}
            />
            <Navbar />
            
            <div className="project-detail-page bg-[#050505] text-white pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Back Link */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-12"
                    >
                        <Link to="/work" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
                        </Link>
                    </motion.div>

                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="text-accent font-bold uppercase tracking-wider text-sm mb-4 block">
                                {project.category}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                                {project.title}
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed mb-10">
                                {project.details || project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-6">
                                {project.isExternal ? (
                                    <a 
                                        href={project.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn btn-primary inline-flex items-center gap-2"
                                    >
                                        Live Preview <FaExternalLinkAlt size={14} />
                                    </a>
                                ) : (
                                    <button className="btn btn-primary opacity-50 cursor-not-allowed">
                                        Internal Project
                                    </button>
                                )}
                                <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10">
                                    <span className="text-accent font-bold">{project.stats}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-10">
                                <img 
                                    src={project.thumbnail} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full z-0 opacity-50"></div>
                        </motion.div>
                    </div>

                    {/* Key Features & Tech Stack */}
                    <div className="grid md:grid-cols-2 gap-16 mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 p-10 rounded-3xl border border-white/10"
                        >
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <FaRocket className="text-accent" /> Key Features
                            </h2>
                            <ul className="space-y-4">
                                {(project.features || ['Custom UI/UX', 'Mobile Responsive', 'SEO Optimized', 'High Performance']).map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                                        <FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/5 p-10 rounded-3xl border border-white/10"
                        >
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <FaCode className="text-accent" /> Technologies
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {(project.technologies || ['React', 'Framer Motion', 'Tailwind CSS', 'Vite']).map((tech, idx) => (
                                    <span key={idx} className="px-5 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/10 text-slate-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Screenshots Gallery */}
                    {project.screenshots && project.screenshots.length > 0 && (
                        <div className="mb-24">
                            <Reveal>
                                <h2 className="text-4xl font-bold mb-12 text-center">Visual <span className="text-accent">Showcase</span></h2>
                            </Reveal>
                            <div className="grid md:grid-cols-2 gap-8">
                                {project.screenshots.map((screen, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="rounded-2xl overflow-hidden border border-white/10 group cursor-pointer"
                                    >
                                        <img 
                                            src={screen} 
                                            alt={`${project.title} Screenshot ${idx + 1}`} 
                                            className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Next Project CTA */}
                    <div className="text-center py-20 bg-gradient-to-b from-transparent to-[#111] rounded-3xl border border-white/5">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your project?</h2>
                        <p className="text-slate-400 mb-10 text-xl max-w-2xl mx-auto">
                            Let's collaborate to build something extraordinary for your business or academy.
                        </p>
                        <Link to="/" className="btn btn-primary text-lg px-10 py-4">
                            Get Linked With Us
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProjectDetail;
