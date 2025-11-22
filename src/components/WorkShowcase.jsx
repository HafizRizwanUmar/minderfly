import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FaArrowRight, FaCode, FaMobileAlt, FaChrome, FaDesktop, FaExternalLinkAlt } from 'react-icons/fa';
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

    const projects = [
        {
            id: 0,
            title: 'Flutter Web Emulator',
            category: 'VS Code Extension',
            description: 'A revolutionary tool used by 4000+ developers.',
            stats: '4,000+ Users',
            link: 'https://marketplace.visualstudio.com/items?itemName=HafizRizwanUmar.flutter-web-emulator',
        },
        {
            id: 1,
            title: 'Pastel Aurora',
            category: 'Chrome Theme',
            description: 'Aesthetics for your browser with 450+ users.',
            stats: '450+ Users',
            link: 'https://chromewebstore.google.com/detail/lmggijfeinibhlmbnjlkiobndeiogimo',
        },
        {
            id: 2,
            title: 'Knights Engineering',
            category: 'MERN Website',
            description: 'Enterprise platform for UAE based oil company.',
            stats: 'Enterprise Client',
            link: 'https://knightsengineering.ae/',
        },
        {
            id: 3,
            title: 'Nishan QR',
            category: 'Desktop App',
            description: 'Professional QR generator for Windows.',
            stats: 'Microsoft Store',
            link: 'https://apps.microsoft.com/detail/9njf5mhwhhps?hl=en-US&gl=PK',
        },
        {
            id: 4,
            title: 'Campus Skill Share',
            category: 'React Platform',
            description: 'P2P skill sharing for university students.',
            stats: 'Education Platform',
            link: '#',
        }
    ];

    return (
        <section className="work-section" id="work">
            <div className="container">
                <motion.div
                    className="work-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Selected <span className="highlight">Works</span></h2>
                    <p className="work-subtitle">Crafting digital experiences across platforms</p>
                </motion.div>

                <div className="work-scroll-container" ref={scrollRef}>
                    <div className="work-grid">
                        {projects.map((project, index) => (
                            <motion.a
                                key={project.id}
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
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
                            </motion.a>
                        ))}
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