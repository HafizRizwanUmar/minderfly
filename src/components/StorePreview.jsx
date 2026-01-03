import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaDownload, FaUsers } from 'react-icons/fa';
import './StorePreview.css';

const StorePreview = () => {
    const products = [
        {
            id: 'nishan',
            title: 'Nishan QR Generator',
            description: 'The ultimate QR code solution for Windows. Create unlimited, high-quality QR codes with a sleek native interface.',
            stats: [
                { label: 'Downloads', value: '10k+' },
                { label: 'Rating', value: '4.8/5' },
                { label: 'Users', value: '5k+' },
                { label: 'Uptime', value: '99.9%' }
            ],
            image: 'https://images.unsplash.com/photo-1595079686539-094317808eff?auto=format&fit=crop&q=80&w=800',
            link: '/store/nishan-qr-generator',
            color: '#bcd848'
        },
        {
            id: 'flutter',
            title: 'Flutter Web Emulator',
            description: 'Run, debug, and test your Flutter Web applications directly inside VS Code without context switching.',
            stats: [
                { label: 'Installs', value: '25k+' },
                { label: 'Rating', value: '5.0' },
                { label: 'Active', value: '12k+' },
                { label: 'Saved', value: '100h+' }
            ],
            image: 'https://images.unsplash.com/photo-1629904853716-f004b3a778fd?auto=format&fit=crop&q=80&w=800',
            link: '/store/flutter-web-emulator',
            color: '#42a5f5'
        }
    ];

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section className="store-preview-section" ref={containerRef}>
            <div className="container">
                <div className="store-header">
                    <h2>We Help Developers <em>Grow</em></h2>
                    <p>A collection of premium tools we built to accelerate development.</p>
                    <Link to="/store" className="btn-case-study">View All Products</Link>
                </div>

                <div className="store-carousel">
                    {products.map((product) => (
                        <div key={product.id} className="store-product-group">
                            {/* Stats Card */}
                            <motion.div
                                className="store-card stats-card"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                style={{ '--accent-color': product.color }}
                            >
                                <div className="card-top">
                                    <div className="product-badge">{product.title}</div>
                                    <h3>{product.title}</h3>
                                    <p>{product.description}</p>
                                    <Link to={product.link} className="learn-more-link">
                                        Learn more <FaArrowRight />
                                    </Link>
                                </div>
                                <div className="card-stats">
                                    {product.stats.map((stat, idx) => (
                                        <div key={idx} className="stat-item">
                                            <span className="stat-value">{stat.value}</span>
                                            <span className="stat-label">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Image Card */}
                            <motion.div
                                className="store-card image-card"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <img src={product.image} alt={product.title} />
                                <div className="image-overlay">
                                    <span className="image-badge">Product Preview</span>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StorePreview;
