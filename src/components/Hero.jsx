import { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import { FaArrowRight, FaCode, FaMobileAlt, FaChrome } from 'react-icons/fa';
import reactLogo from '../assets/react.svg';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const TechBackground3D = () => {
    return (
        <group>
            {/* Tech Particles - subtle green/white */}
            <Sparkles count={150} scale={12} size={2} speed={0.4} opacity={0.5} color="#bcd848" />
            <Sparkles count={100} scale={15} size={3} speed={0.3} opacity={0.3} color="#ffffff" />

            {/* Floating Geometric Shapes */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                {/* Abstract Tech Sphere */}
                <mesh position={[4, 2, -5]} scale={1.5}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial color="#bcd848" wireframe transparent opacity={0.1} />
                </mesh>

                {/* Another floaty shape */}
                <mesh position={[-4, -2, -3]} scale={1}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.05} />
                </mesh>
            </Float>
        </group>
    );
};

const Hero = ({ onStartProject }) => {
    const heroRef = useRef(null);
    const badgeRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const actionsRef = useRef(null);
    const stackRef = useRef(null);


    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Entrance Animations
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Badge Reveal
            tl.fromTo(badgeRef.current,
                { y: -20, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.2 }
            );

            // Split Text Animation for Title
            const splitTitle = titleRef.current.querySelectorAll('.char');
            if (splitTitle.length > 0) {
                tl.fromTo(splitTitle,
                    { y: 50, opacity: 0, rotateX: -90 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        stagger: 0.05,
                        duration: 1.2,
                        ease: "back.out(1.7)"
                    },
                    "-=0.4"
                );
            } else {
                // Fallback if split text structure isn't there yet (though we add it below)
                tl.fromTo(titleRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    "-=0.4"
                );
            }

            // Description Fade In + Slight Slide
            tl.fromTo(descRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
                "-=0.8"
            )
                // Actions Stagger
                .fromTo(actionsRef.current.children,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" },
                    "-=0.6"
                )
                // Tech Stack Fade
                .fromTo(stackRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 1 },
                    "-=0.4"
                );

        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Helper to split text into characters
    const renderSplitText = (text, className = "") => {
        return text.split("").map((char, index) => (
            <span key={index} className={`char inline-block ${char === " " ? "w-2" : ""}`}>
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    };

    return (
        <section ref={heroRef} className="hero tech-theme" id="home">
            <div className="tech-bg">
                {/* Agency Green Glows */}
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="scanlines"></div>

                {/* Three.js Background */}
                <div className="absolute inset-0 z-0">
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                        <ambientLight intensity={0.5} />
                        <TechBackground3D />
                    </Canvas>
                </div>

                <div className="bg-watermark">
                    <span>MINDER</span>
                    <span>FLY</span>
                </div>
            </div>

            <div className="hero-container container relative z-10">
                <div className="hero-grid">
                    {/* Left Column: Agency Text */}
                    <div className="hero-text-content">
                        <div ref={badgeRef} className="hero-badge opacity-0">
                            <span><span className="dot"></span> Digital Innovation Lab</span>
                        </div>

                        <h1 ref={titleRef} className="hero-title flex flex-col items-center">
                            <div className="overflow-hidden" style={{ paddingBottom: '10px' }}>
                                {renderSplitText("Building")}
                            </div>
                            <div className="overflow-hidden whitespace-nowrap" style={{ lineHeight: '1.2', paddingBottom: '10px' }}>
                                {renderSplitText("Digital Excellence.")}
                            </div>
                        </h1>

                        <p ref={descRef} className="hero-description opacity-0" style={{ lineHeight: '1.8' }}>
                            We are a full-cycle development studio specializing in <strong>MERN Stack, Flutter Apps, </strong> and <strong>Chrome Extensions</strong>. <br />
                            Turning complex ideas into scalable, high-performance software.
                        </p>

                        <div ref={actionsRef} className="hero-actions opacity-0">
                            <MagneticButton
                                className="btn-primary-hero"
                                onClick={onStartProject}
                            >
                                Start Project <FaArrowRight style={{ marginLeft: '8px' }} />
                            </MagneticButton>

                            <a href="#work" className="btn-secondary-hero">
                                View Portfolio
                            </a>
                        </div>

                        <div ref={stackRef} className="tech-stack-preview opacity-0">
                            <span>Powering next-gen apps with:</span>
                            <div className="stack-icons">
                                <FaCode title="Web Dev" />
                                <FaMobileAlt title="Mobile Apps" />
                                <FaChrome title="Extensions" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column Removed */}
                </div>
            </div>
        </section>
    );
};

export default Hero;