import { motion } from 'framer-motion';
import { FaChrome, FaCode, FaMobileAlt, FaLaptopCode, FaPalette } from 'react-icons/fa';
import './Services.css';

const Services = () => {
    const services = [
        {
            icon: <FaPalette />,
            number: '01',
            title: 'Chrome Theme Building',
            description: 'Custom aesthetics for your browser experience.',
            type: 'glass',
            colSpan: 1
        },
        {
            icon: <FaChrome />,
            number: '02',
            title: 'Chrome Extension Building',
            description: 'Powerful tools to enhance browser functionality.',
            type: 'solid',
            colSpan: 2
        },
        {
            icon: <FaMobileAlt />,
            number: '03',
            title: 'Flutter Desktop Application',
            description: 'Cross-platform desktop apps with native performance.',
            type: 'glass',
            colSpan: 2
        },
        {
            icon: <FaCode />,
            number: '04',
            title: 'VS Code Extension Building',
            description: 'Developer tools to boost productivity.',
            type: 'solid',
            colSpan: 1
        },
        {
            icon: <FaLaptopCode />,
            number: '05',
            title: 'MERN Stack Website',
            description: 'Full-stack web solutions for modern businesses.',
            type: 'glass',
            colSpan: 3
        }
    ];

    return (
        <section className="services-section" id="services">
            <div className="container">
                <motion.div
                    className="services-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>
                        our <span className="gradient-text">services</span>
                        <br />
                        expertise
                    </h2>
                </motion.div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className={`service-card ${service.type} col-span-${service.colSpan}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            <span className="card-number">{service.number}</span>
                            <div className="card-icon">{service.icon}</div>
                            <h3 className="card-title">{service.title}</h3>
                            <p className="card-description">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
