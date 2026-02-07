import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';
import { FaArrowRight } from 'react-icons/fa';
import './Hero.css';

// Optimized Network Component
const NetworkBackground = () => {
    const canvasRef = useRef(null);
    // Detect mobile to reduce particle count for performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration - Adjusted for Startup Performance
        const nodeCount = isMobile ? 25 : 60; // Fewer nodes on mobile
        const connectionDistance = isMobile ? 100 : 150;
        // Tech symbols relevant to Minderfly
        const labels = ['{ }', '</>', 'JS', 'dart', '01'];

        let nodes = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Node {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3; // Slower, more elegant movement
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
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.font = `${this.size}px monospace`;
                ctx.fillText(this.label, this.x, this.y);
            }
        }

        const init = () => {
            nodes = Array.from({ length: nodeCount }).map(() => new Node());
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Connections first (behind text)
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';

            for (let i = 0; i < nodes.length; i++) {
                let nodeA = nodes[i];
                nodeA.update(); // Update position inside loop to save cycles

                for (let j = i + 1; j < nodes.length; j++) {
                    let nodeB = nodes[j];
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x + 5, nodeA.y - 5); // Offset to center of text
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

const Hero = ({ onStartProject }) => { // Accept prop
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBgText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section ref={ref} className="hero tech-theme" id="home">
            <div className="tech-bg">
                <div className="scanlines"></div>
                <NetworkBackground />

                {/* Watermark adjusted for Minderfly Branding */}
                <motion.div className="bg-watermark" style={{ y: yBgText }}>
                    <span>MINDER</span>
                    <span>FLY</span>
                </motion.div>
            </div>

            <div className="hero-content container">
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span>Minderfly Digital Agency</span>
                </motion.div>

                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Unlock Your <br />
                    <span className="text-gradient">Digital Potential</span>
                </motion.h1>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Trusted by 25,000+ users. We engineer high-performance <strong>web apps</strong>,
                    <strong> extensions</strong>, and <strong>mobile solutions</strong> that scale.
                    From concept to market leader, we build the future.
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
                        View Our Work
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;