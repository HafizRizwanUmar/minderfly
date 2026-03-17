import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { FaArrowRight, FaCode, FaMobileAlt, FaChrome, FaDesktop, FaExternalLinkAlt } from 'react-icons/fa';
import { projectsData } from '../data/projects';
import './WorkShowcase.css';

// Icons mapping for different project categories
const getIcon = (category) => {
    if (category.includes('Extension')) return <FaCode />;
    if (category.includes('Chrome')) return <FaChrome />;
    if (category.includes('Desktop')) return <FaDesktop />;
    if (category.includes('MERN') || category.includes('React') || category.includes('Website')) return <FaMobileAlt />;
    return <FaMobileAlt />;
};

const WorkShowcase = () => {
    const scrollRef = useRef(null);

    return (
        <section className="work-section" id="work">
            <div className="container">
                <div className="work-header">
                    <Reveal><h2>Selected <span className="highlight">Works</span></h2></Reveal>
                    <Reveal delay={0.2}><p className="work-subtitle">Crafting digital experiences across platforms</p></Reveal>
                </div>

                <div className="work-scroll-container" ref={scrollRef}>
                    <div className="work-grid">
                        {projectsData.map((project, index) => {
                            const CardComponent = project.isExternal ? motion.a : motion(Link);
                            const cardProps = project.isExternal 
                                ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
                                : { to: project.link };

                            return (
                                <CardComponent
                                    key={project.id}
                                    {...cardProps}
                                    className="work-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    aria-label={`View ${project.title} - ${project.category}`}
                                >
                                    <div className="card-background"></div>

                                    <div className="card-header">
                                        <div className="card-icon">
                                            {getIcon(project.category)}
                                        </div>
                                        <span className="card-category">{project.category}</span>
                                    </div>

                                    {project.thumbnail && (
                                        <div className="card-image-container">
                                            <img src={project.thumbnail} alt={project.title} className="card-image" />
                                        </div>
                                    )}

                                    <div className="card-content">
                                        <h3 className="card-title">{project.title}</h3>
                                        <p className="card-description">{project.description}</p>

                                        <div className="card-footer">
                                            <span className="card-stats">{project.stats}</span>
                                            <div className="card-link-icon">
                                                <FaExternalLinkAlt />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-glow"></div>
                                </CardComponent>
                            );
                        })}
                    </div>
                </div>

                <div className="work-scroll-hint">
                    <span>Scroll to explore</span>
                    <FaArrowRight className="scroll-arrow" />
                </div>
            </div>
        </section>
    );
};

export default WorkShowcase;