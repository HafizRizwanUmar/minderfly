import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';
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

const Hero = () => {
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

            <div className="hero-grid container">

                {/* 1. PAVE */}
                <motion.div
                    className="grid-item area-pave"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="giant-text">Build</h1>
                </motion.div>

                {/* 2. YOUR */}
                <motion.div
                    className="grid-item area-your"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="secondary-giant-text">Minderfly</h2>
                </motion.div>

                {/* 3. PATH */}
                <motion.div
                    className="grid-item area-path"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h1 className="giant-text">Vision</h1>
                </motion.div>

                {/* 4. DESCRIPTION & DATA */}
                <motion.div
                    className="grid-item area-desc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="tech-desc-container">
                        <p className="tech-desc">
                            We transform ideas into digital reality.
                            Whether it's a <strong>saas platform</strong>, a <strong>custom extension</strong>,
                            or a <strong>mobile app</strong>, we engineer the code that drives your startup forward.
                        </p>
                        <div className="tech-stack-list">
                            <span>[ Flutter Mobile ]</span>
                            <span>[ MERN Stack ]</span>
                            <span>[ Chrome Extensions ]</span>
                            <span>[ VS Code Plugins ]</span>
                        </div>
                    </div>
                </motion.div>

                {/* 5. CTA */}
                <motion.div
                    className="grid-item area-cta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="wireframe-btn-wrapper">
                        <MagneticButton
                            className="btn-wireframe"
                            href="https://wa.me/923449233424?text=Hi%2C%20I%20want%20to%20start%20a%20project."
                        >
                            Start Project
                        </MagneticButton>
                        <div className="connector-line"></div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;