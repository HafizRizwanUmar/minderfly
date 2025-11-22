import { motion } from 'framer-motion';
import { FaChrome, FaCode, FaMobileAlt, FaFileCode } from 'react-icons/fa';
import './BentoGrid.css';

const BentoGrid = () => {
    const projects = [
        {
            icon: <FaFileCode />,
            number: '01',
            title: 'VS Code Extension',
            subtitle: 'Flutter Web Emulator',
            description: 'Revolutionizing Flutter development',
            stats: '4000+ users • 20+ countries',
            review: '"THANK GOD, FINALLY NO MORE HEADACHE AND TIME WASTE"',
            reviewer: 'Sarmad Hassan',
            link: 'https://marketplace.visualstudio.com/items?itemName=HafizRizwanUmar.flutter-web-emulator',
            type: 'glass',
            colSpan: 2
        },
        {
            icon: <FaChrome />,
            number: '02',
            title: 'Chrome Theme',
            subtitle: 'Pastel Aurora',
            description: 'Beautiful aesthetics for your browser',
            stats: '450+ users globally',
            review: 'Two 5-star reviews',
            link: 'https://chromewebstore.google.com/detail/lmggijfeinibhlmbnjlkiobndeiogimo',
            type: 'solid',
            colSpan: 1
        },
        {
            icon: <FaCode />,
            number: '03',
            title: 'MERN Stack Website',
            subtitle: 'Knights Engineering',
            description: 'Enterprise oil tank repair solutions',
            stats: 'UAE-based client',
            link: 'https://knightsengineering.ae/',
            type: 'glass',
            colSpan: 1
        },
        {
            icon: <FaMobileAlt />,
            number: '04',
            title: 'Flutter Desktop App',
            subtitle: 'Nishan QR Generator',
            description: 'Professional QR code generation',
            stats: 'Microsoft Store featured',
            link: 'https://apps.microsoft.com/detail/9njf5mhwhhps?hl=en-US&gl=PK',
            type: 'solid',
            colSpan: 2
        },
    ];

    return (
        <section className="bento-section" id="services">
            <div className="container">
                {/* Top section - Stats */}
                <div className="bento-header">
                    <motion.div
                        className="bento-title-section"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="bento-title">
                            data that
                            <br />
                            proves
                            <br />
                            <span className="gradient-text">our impact</span>
                        </h2>
                    </motion.div>

                    <div className="bento-stats-grid">
                        <motion.div
                            className="stat-card glass"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <h3>Our key results</h3>
                            <div className="stat-row">
                                <div className="stat-item">
                                    <span className="big-number gradient-text">3x</span>
                                    <p>faster dev</p>
                                </div>
                                <div className="stat-item">
                                    <span className="big-number gradient-text">+85%</span>
                                    <p>satisfaction</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="stat-card glass"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <h3>Budget in 2024</h3>
                            <div className="budget-amount gradient-text">$613k</div>
                            <p className="budget-desc">invested in innovation</p>
                        </motion.div>
                    </div>
                </div>

                {/* Services Grid */}
                <motion.div
                    className="services-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>
                        who our services
                        <br />
                        are the <span className="gradient-text">perfect</span>
                        <br />
                        solution for
                    </h2>
                </motion.div>

                <div className="bento-grid">
                    {projects.map((project, index) => (
                        <motion.a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`bento-card ${project.type} col-span-${project.colSpan}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ scale: 1.01, y: -5 }}
                        >
                            <span className="card-number">{project.number}</span>
                            <div className="card-content-wrapper">
                                <div className="card-icon">{project.icon}</div>
                                <div className="card-text">
                                    <h3 className="card-title">{project.title}</h3>
                                    <h4 className="card-subtitle">{project.subtitle}</h4>
                                    <p className="card-description">{project.description}</p>
                                </div>
                            </div>
                            <div className="card-stats">{project.stats}</div>
                            {project.review && (
                                <div className="card-review">
                                    <p className="review-text">{project.review}</p>
                                    {project.reviewer && (
                                        <span className="reviewer">— {project.reviewer}</span>
                                    )}
                                </div>
                            )}
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
