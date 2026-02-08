import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import MagneticButton from './MagneticButton';
import { FaArrowRight, FaCode, FaMobileAlt, FaChrome } from 'react-icons/fa';
import reactLogo from '../assets/react.svg';
import './Hero.css';

// Optimized Network Component - Tech Theme
const NetworkBackground = () => {
    const canvasRef = useRef(null);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const nodeCount = isMobile ? 30 : 60;
        const connectionDistance = isMobile ? 100 : 150;
        const labels = ['{ }', '</>', 'JS', 'dart', '01', 'npm'];

        let nodes = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Node {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.label = labels[Math.floor(Math.random() * labels.length)];
                this.size = Math.random() * 8 + 8;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = 'rgba(188, 216, 72, 0.4)'; // Minderfly Green tint
                ctx.font = `${this.size}px monospace`;
                ctx.fillText(this.label, this.x, this.y);
            }
        }

        const init = () => {
            nodes = Array.from({ length: nodeCount }).map(() => new Node());
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'rgba(188, 216, 72, 0.1)'; // Green connections

            for (let i = 0; i < nodes.length; i++) {
                let nodeA = nodes[i];
                nodeA.update();

                for (let j = i + 1; j < nodes.length; j++) {
                    let nodeB = nodes[j];
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x + 5, nodeA.y - 5);
                        ctx.lineTo(nodeB.x + 5, nodeB.y - 5);
                        ctx.stroke();
                    }
                }
                nodeA.draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isMobile]);

    return <canvas ref={canvasRef} className="network-canvas" />;
};

const Hero = ({ onStartProject }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBgText = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const yVisual = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    return (
        <section ref={ref} className="hero tech-theme" id="home">
            <div className="tech-bg">
                {/* Agency Green Glows */}
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>

                <div className="scanlines"></div>
                <NetworkBackground />

                <motion.div className="bg-watermark" style={{ y: yBgText }}>
                    <span>MINDER</span>
                    <span>FLY</span>
                </motion.div>
            </div>

            <div className="hero-container container">
                <div className="hero-grid">
                    {/* Left Column: Agency Text */}
                    <div className="hero-text-content">
                        <motion.div
                            className="hero-badge"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span><span className="dot"></span> Digital Innovation Lab</span>
                        </motion.div>

                        <motion.h1
                            className="hero-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Building <br />
                            <span className="text-gradient" style={{ lineHeight: '1.4' }}>Digital Excellence.</span>
                        </motion.h1>

                        <motion.p
                            className="hero-description"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            style={{ lineHeight: '1.8' }}
                        >
                            We are a full-cycle development studio specializing in <br />
                            <strong>MERN Stack, Flutter Apps, </strong> and <strong>Chrome Extensions</strong>. <br />
                            Turning complex ideas into scalable, high-performance software.
                        </motion.p>

                        <motion.div
                            className="hero-actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <MagneticButton
                                className="btn-primary-hero"
                                onClick={onStartProject}
                            >
                                Start Project <FaArrowRight style={{ marginLeft: '8px' }} />
                            </MagneticButton>

                            <a href="#work" className="btn-secondary-hero">
                                View Portfolio
                            </a>
                        </motion.div>

                        <motion.div
                            className="tech-stack-preview"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0 }}
                        >
                            <span>Powering next-gen apps with:</span>
                            <div className="stack-icons">
                                <FaCode title="Web Dev" />
                                <FaMobileAlt title="Mobile Apps" />
                                <FaChrome title="Extensions" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Abstract Tech Visual */}
                    <div className="hero-visual-content">
                        <motion.div
                            className="composition-container"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                            style={{ y: yVisual }}
                        >
                            {/* Central Glowing Core */}
                            <div className="core-glow"></div>

                            {/* Floating Elements representing services */}
                            <motion.div
                                className="floating-card glass-card code-card"
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="card-header">
                                    <div className="dot red"></div>
                                    <div className="dot yellow"></div>
                                    <div className="dot green"></div>
                                </div>
                                <div className="code-lines">
                                    <div className="line w-70"></div>
                                    <div className="line w-50"></div>
                                    <div className="line w-80"></div>
                                    <div className="line w-40"></div>
                                </div>
                                <div className="tech-badge">
                                    <img src={reactLogo} className="react-spin" alt="React" />
                                </div>
                            </motion.div>

                            <motion.div
                                className="floating-card glass-card mobile-card"
                                animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <div className="mobile-notch"></div>
                                <div className="mobile-screen">
                                    <div className="app-icon"></div>
                                    <div className="app-icon"></div>
                                    <div className="app-icon"></div>
                                    <div className="app-row"></div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="floating-card glass-card extension-card"
                                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            >
                                <div className="ext-icon"><FaChrome /></div>
                                <div className="ext-text">
                                    <div className="line w-full"></div>
                                    <div className="line w-60"></div>
                                </div>
                                <div className="toggle-switch"></div>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;