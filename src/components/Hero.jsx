import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onStartProject }) => {
    const heroRef    = useRef(null);
    const lineRef    = useRef(null);
    const labelRef   = useRef(null);
    const eyebrowRef = useRef(null);
    const word1Ref   = useRef(null);
    const word2Ref   = useRef(null);
    const word3Ref   = useRef(null);
    const descRef    = useRef(null);
    const actionsRef = useRef(null);
    const tickerRef  = useRef(null);
    const counterRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            // Vertical accent line draws downward
            tl.fromTo(lineRef.current,
                { scaleY: 0, transformOrigin: 'top center' },
                { scaleY: 1, duration: 1.2, ease: 'power3.inOut' },
                0
            );

            // Side label
            tl.fromTo(labelRef.current,
                { opacity: 0, x: -16 },
                { opacity: 1, x: 0, duration: 0.7 },
                0.5
            );

            // Eyebrow badge
            tl.fromTo(eyebrowRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.6 },
                0.4
            );

            // Words clip-reveal stagger
            [word1Ref, word2Ref, word3Ref].forEach((ref, i) => {
                tl.fromTo(ref.current,
                    { yPercent: 115 },
                    { yPercent: 0, duration: 1, ease: 'power4.out' },
                    0.55 + i * 0.14
                );
            });

            // Description
            tl.fromTo(descRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.7 },
                1.1
            );

            // Buttons
            if (actionsRef.current?.children) {
                tl.fromTo(actionsRef.current.children,
                    { opacity: 0, y: 14 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)' },
                    1.25
                );
            }

            // Counter count-up
            gsap.to({ val: 0 }, {
                val: 7000,
                duration: 2.2,
                delay: 1,
                ease: 'power2.out',
                onUpdate: function () {
                    if (counterRef.current) {
                        const v = Math.round(this.targets()[0].val);
                        counterRef.current.textContent =
                            v >= 1000 ? (v / 1000).toFixed(1) + 'K' : v;
                    }
                }
            });

            // Ticker
            tl.fromTo(tickerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6 },
                1.5
            );

        }, heroRef);

        return () => ctx.revert();
    }, []);

    const tickerItems = [
        'MERN Stack', 'Flutter Apps', 'Chrome Extensions',
        'VS Code Extensions', 'AWS Cloud', 'Desktop Apps',
        'MERN Stack', 'Flutter Apps', 'Chrome Extensions',
        'VS Code Extensions', 'AWS Cloud', 'Desktop Apps',
    ];

    return (
        <section ref={heroRef} className="mf-hero" id="home">

            {/* ── Atmospheric BG ── */}
            <div className="mf-bg" aria-hidden="true">
                <div className="mf-ray" />
                <div className="mf-grid" />
                <div className="mf-grain" />
                <span className="mf-corner mf-corner--tl">01 / STUDIO</span>
                <span className="mf-corner mf-corner--tr">EST. 2024</span>
                <span className="mf-corner mf-corner--br">LHR · PK</span>
            </div>

            {/* ── Layout ── */}
            <div className="mf-layout">

                {/* Left rail — vertical branding */}
                <div className="mf-rail">
                    <div ref={lineRef} className="mf-rail-line" />
                    <span ref={labelRef} className="mf-rail-label">MINDERFLY</span>
                </div>

                {/* Center — headline */}
                <div className="mf-center">

                    <div ref={eyebrowRef} className="mf-eyebrow" style={{ opacity: 0 }}>
                        <span className="mf-dot" />
                        Digital Innovation Lab
                    </div>

                    <h1 className="mf-headline">
                        <span className="mf-clip">
                            <span ref={word1Ref} className="mf-word w-dim">Building</span>
                        </span>
                        <span className="mf-clip">
                            <span ref={word2Ref} className="mf-word">Digital</span>
                        </span>
                        <span className="mf-clip">
                            <span ref={word3Ref} className="mf-word w-accent">Excellence.</span>
                        </span>
                    </h1>

                    <p ref={descRef} className="mf-desc" style={{ opacity: 0 }}>
                        Full-cycle studio turning complex ideas into scalable,
                        high-performance software —{' '}
                        <strong>MERN Stack</strong>, <strong>Flutter</strong>{' '}
                        &amp; <strong>Chrome Extensions</strong>.
                    </p>

                    <div ref={actionsRef} className="mf-actions" style={{ opacity: 0 }}>
                        <MagneticButton className="mf-btn-primary" onClick={onStartProject}>
                            <span>Start a Project</span>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4"
                                    stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </MagneticButton>
                        <a href="#work" className="mf-btn-ghost">View Work</a>
                    </div>
                </div>

                {/* Right — live metric card */}
                <div className="mf-metric">
                    <div className="mf-metric-ring" />
                    <div className="mf-metric-content">
                        <div className="mf-metric-num">
                            <span ref={counterRef}>0</span>
                            <sup>+</sup>
                        </div>
                        <div className="mf-metric-lbl">Active Users</div>
                        <div className="mf-metric-sub">80+ countries</div>
                    </div>
                    <div className="mf-metric-badge">LIVE</div>
                </div>

            </div>

            {/* ── Bottom marquee ticker ── */}
            <footer ref={tickerRef} className="mf-ticker" style={{ opacity: 0 }}>
                <div className="mf-ticker-inner">
                    <div className="mf-ticker-track">
                        {tickerItems.map((item, i) => (
                            <span key={i} className="mf-tick-item">
                                {item}
                                <span className="mf-tick-sep" aria-hidden="true">◆</span>
                            </span>
                        ))}
                    </div>
                </div>
            </footer>

        </section>
    );
};

export default Hero;