import React, { useState, useRef, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaWindows, FaPlay, FaShieldAlt, FaBolt, FaMoon, FaFileVideo, FaMagic, FaClosedCaptioning, FaList, FaExpand, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import ProductNavbar from '../../components/ProductNavbar';
import ProductFooter from '../../components/ProductFooter';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedStars = () => {
    const starsRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.getElapsedTime();
        if (starsRef.current) {
            starsRef.current.rotation.y = elapsed * 0.05;
            starsRef.current.rotation.x = elapsed * 0.02;
        }
    });

    return (
        <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    );
};

const CinemaflyProduct = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);
    const mobileVideoRef = useRef(null);
    const mainRef = useRef(null);
    const titleRef = useRef(null);

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (videoRef.current) videoRef.current.muted = !isMuted;
        if (mobileVideoRef.current) mobileVideoRef.current.muted = !isMuted;
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Hero Title Animation
            gsap.fromTo(titleRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
            );

            // ScrollTrigger for Sections
            gsap.utils.toArray('.gsap-fade-up').forEach((elem) => {
                gsap.fromTo(elem,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 80%",
                        }
                    }
                );
            });

        }, mainRef);

        return () => ctx.revert();
    }, []);

    const bentoItems = [
        { title: "HEVC", color: "from-purple-500 to-indigo-500", size: "col-span-1 row-span-2" },
        { title: "MKV", color: "from-blue-500 to-cyan-500", size: "col-span-1" },
        { title: "4K HDR", color: "from-pink-500 to-rose-500", size: "col-span-2" },
        { title: "MP4", color: "from-emerald-500 to-teal-500", size: "col-span-1" },
        { title: "AV1", color: "from-orange-500 to-amber-500", size: "col-span-1" },
    ];

    const detailedFeatures = [
        {
            icon: <FaClosedCaptioning />,
            title: "Smart Subtitles",
            desc: "Auto-detects and loads subtitles. Customize font, size, and color."
        },
        {
            icon: <FaList />,
            title: "Playlist Management",
            desc: "Create, edit, and save playlists for your binge-watching sessions."
        },
        {
            icon: <FaExpand />,
            title: "Picture-in-Picture",
            desc: "Multitask like a pro. Keep watching while you work."
        },
        {
            icon: <FaVolumeUp />,
            title: "Audio Boost",
            desc: "Enhance quiet dialogue or boost the bass for action scenes."
        },
        {
            icon: <FaMagic />,
            title: "Auto-Resume",
            desc: "Pick up exactly where you left off, every time."
        },
        {
            icon: <FaFileVideo />,
            title: "Drag & Drop",
            desc: "Simple, intuitive interface. Just drop your files and play."
        }
    ];

    return (
        <>
            <Helmet>
                <title>Cinemafly - Design without limits | Minderfly</title>
                <meta name="description" content="Cinemafly is the next-generation media player for Windows. Play HEVC, MKV, and 4K natively. No codecs required." />
                <link rel="canonical" href="https://minderfly.com/products/cinemafly" />
            </Helmet>

            <ProductNavbar productName="Cinemafly" ctaLink="https://apps.microsoft.com/detail/9P5XW3MZLQB0?hl=en-us&gl=PK&ocid=pdpshare" />

            <div ref={mainRef} className="min-h-screen bg-black text-white overflow-hidden selection:bg-purple-500/30 font-body">

                {/* Hero Section */}
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <Canvas camera={{ position: [0, 0, 1] }}>
                            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                                <AnimatedStars />
                            </Float>
                        </Canvas>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>

                    <div className="container mx-auto max-w-7xl relative z-10 text-center font-lato">
                        {/* Hero Video Container - NOW FIRST -- keeping mute functionality */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative max-w-6xl mx-auto mb-16"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30 animate-pulse"></div>
                            <div className="relative rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl">
                                <video
                                    ref={videoRef}
                                    src="/cinemafly_launch.mp4"
                                    autoPlay
                                    loop
                                    muted={isMuted}
                                    playsInline
                                    className="w-full h-auto object-cover"
                                />
                                {/* UI Overlay Mockup */}
                                <div className="absolute top-0 left-0 w-full h-12 bg-black/50 backdrop-blur-md flex items-center px-4 justify-between border-b border-white/5 z-20">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono">Cinemafly Player</div>
                                    <button
                                        onClick={toggleMute}
                                        className="text-white/70 hover:text-white transition-colors p-1"
                                        aria-label={isMuted ? "Unmute" : "Mute"}
                                    >
                                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        <div className="max-w-4xl mx-auto relative z-20">
                            <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold font-poppins tracking-tight mb-6 opacity-0">
                                Playback <br className="hidden md:block" />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                                    without limits
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-lato gsap-fade-up">
                                The high-performance media player that handles everything you throw at it. HEVC, 4K, MKV—no codecs needed.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mobile Video Section (Visible only on small screens) */}
                <section className="lg:hidden px-6 pb-20 relative">
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black relative group">
                        <video
                            ref={mobileVideoRef}
                            src="/cinemafly_launch.mp4"
                            autoPlay
                            loop
                            muted={isMuted}
                            playsInline
                            className="w-full h-auto object-cover"
                        />
                        <button
                            onClick={toggleMute}
                            className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-full text-white/90 border border-white/10 hover:bg-black/70 transition-all z-20"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                    </div>
                </section>

                {/* Bento Grid Section */}
                <section className="py-32 bg-black relative">
                    <div className="container mx-auto max-w-6xl px-6">
                        <div className="text-center mb-16 gsap-fade-up">
                            <span className="text-purple-500 font-bold tracking-wider text-sm uppercase mb-4 block">Universal Compatibility</span>
                            <h2 className="text-4xl md:text-5xl font-bold font-display">Plays everything. Literally.</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] gsap-fade-up">
                            {bentoItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`${item.size} rounded-3xl relative overflow-hidden group bg-[#111] border border-white/5 hover:border-white/20 transition-colors`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                                    <div className="absolute inset-0 flex items-center justify-center p-6">
                                        <span className="text-3xl md:text-5xl font-bold font-display text-white/90 group-hover:scale-110 transition-transform duration-500">
                                            {item.title}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div
                                className="col-span-2 row-span-2 rounded-3xl bg-[#111] border border-white/5 overflow-hidden relative flex flex-col items-center justify-center text-center p-8"
                            >
                                <div className="absolute inset-0 bg-[url('/cinemafly_logo.png')] bg-center bg-no-repeat opacity-5 blur-sm bg-contain transform scale-150"></div>
                                <h3 className="text-2xl font-bold mb-2 relative z-10">And much more...</h3>
                                <p className="text-gray-400 relative z-10">FLV, WEBM, MOV, VOB, OGG, WAV</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Zig-Zag Features */}
                <section className="py-20 overflow-hidden">
                    <div className="container mx-auto max-w-7xl px-6 space-y-32">

                        {/* Feature 1 */}
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="gsap-fade-up">
                                <h2 className="text-4xl md:text-6xl font-bold font-poppins mb-6">Lightning speed</h2>
                                <p className="text-xl text-gray-400 leading-relaxed mb-8 font-lato">
                                    Optimized for modern hardware. Cinemafly uses tailored acceleration to play high-bitrate 4K HDR content smoothly, without draining your battery or overheating your device.
                                </p>
                                <ul className="space-y-4 text-gray-300 font-lato">
                                    <li className="flex items-center gap-3"><FaBolt className="text-yellow-400" /> GPU Acceleration</li>
                                    <li className="flex items-center gap-3"><FaBolt className="text-yellow-400" /> Low CPU Usage</li>
                                    <li className="flex items-center gap-3"><FaBolt className="text-yellow-400" /> Instant Startup</li>
                                </ul>
                            </div>
                            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] gsap-fade-up">
                                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent"></div>
                                {/* Abstract Visualization */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-yellow-500/20 blur-[100px] rounded-full animate-pulse"></div>
                                <div className="relative z-10 h-full flex items-center justify-center">
                                    <span className="text-9xl font-bold text-white/5 select-none font-display">FAST</span>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="order-2 md:order-1 relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] gsap-fade-up">
                                <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-transparent"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-500/20 blur-[100px] rounded-full animate-pulse"></div>
                                <div className="relative z-10 h-full flex items-center justify-center">
                                    <FaMoon className="text-9xl text-white/5" />
                                </div>
                            </div>
                            <div className="order-1 md:order-2 gsap-fade-up">
                                <span className="text-purple-500 font-bold mb-2 block font-lato">Immersion</span>
                                <h2 className="text-4xl md:text-6xl font-bold font-poppins mb-6">Combine creativity and productivity</h2>
                                <p className="text-xl text-gray-400 leading-relaxed mb-8 font-lato">
                                    Our interface is designed to disappear. The dark, minimal UI ensures your focus stays 100% on the content. Controls appear only when you need them.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="gsap-fade-up">
                                <span className="text-blue-500 font-bold mb-2 block font-lato">Security</span>
                                <h2 className="text-4xl md:text-6xl font-bold font-poppins mb-6">Under your control</h2>
                                <p className="text-xl text-gray-400 leading-relaxed mb-8 font-lato">
                                    Your personal videos are private. Cinemafly works completely offline. We don't track your viewing habits, collect metadata, or require an account.
                                </p>
                            </div>
                            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] gsap-fade-up">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/20 blur-[100px] rounded-full animate-pulse"></div>
                                <div className="relative z-10 h-full flex items-center justify-center">
                                    <FaShieldAlt className="text-9xl text-white/5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Go Further / Windows Section */}
                <section className="py-32">
                    <div className="container mx-auto max-w-7xl px-6 text-center gsap-fade-up">
                        <span className="text-green-400 font-bold mb-4 block flex justify-center items-center gap-2 font-lato"><FaWindows /> Built for Windows</span>
                        <h2 className="text-5xl md:text-7xl font-bold font-poppins mb-12">Go further, together</h2>

                        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#111] max-w-5xl mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                            <img src="/launch_screen_clean.png" alt="Windows Integration" className="w-full opacity-50" onError={(e) => e.target.style.display = 'none'} />
                            <div className="absolute bottom-0 left-0 w-full z-20 p-20">
                                <p className="text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-lato">
                                    Native integration with Windows 11. Supports dark mode, touch controls, and media keys out of the box.
                                </p>
                                <a
                                    href="https://apps.microsoft.com/detail/9P5XW3MZLQB0?hl=en-us&gl=PK&ocid=pdpshare"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-12 py-5 bg-white text-black text-xl font-bold rounded-full hover:scale-105 transition-transform duration-300 inline-block font-body"
                                >
                                    Get it on Microsoft Store
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detailed Features Grid (But wait, there's more) */}
                <section className="py-32 bg-black border-t border-white/5">
                    <div className="container mx-auto max-w-7xl px-6">
                        <div className="text-center mb-20 gsap-fade-up">
                            <span className="text-pink-500 font-bold text-sm tracking-wider uppercase font-lato">Features</span>
                            <h2 className="text-4xl md:text-5xl font-bold font-poppins mt-4">But wait, there's more...</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {detailedFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 hover:bg-[#111] transition-all group gsap-fade-up"
                                >
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-xl text-white group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 font-poppins">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed font-lato">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
            <ProductFooter productName="Cinemafly" />
        </>
    );
};

export default CinemaflyProduct;
