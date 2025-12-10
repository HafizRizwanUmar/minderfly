import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaQuoteLeft } from 'react-icons/fa';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'CEO, TechStart',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-on-smartphone-40209-large.mp4',
            quote: "Minderfly transformed our digital presence completely. The team is incredible!"
        },
        {
            id: 2,
            name: 'David Chen',
            role: 'Founder, EcoLife',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-having-a-video-call-with-a-smartphone-at-home-40212-large.mp4',
            quote: "The mobile app they built for us exceeded all expectations. Highly recommended."
        },
        {
            id: 3,
            name: 'Emily Davis',
            role: 'Marketing Director',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-taking-a-selfie-with-her-phone-in-the-nature-40232-large.mp4',
            quote: "Professional, fast, and creative. The Chrome extension is a game changer."
        }
    ];

    return (
        <section className="testimonials-section">
            <div className="testimonials-bg-glow"></div>
            <div className="container">
                <motion.div
                    className="testimonials-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Client <span className="gradient-text">Stories</span></h2>
                    <p className="section-subtitle">Real results from real clients. See what they have to say.</p>
                </motion.div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial) => (
                        <VideoCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const VideoCard = ({ testimonial }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <motion.div
            className="video-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="video-wrapper" onClick={togglePlay}>
                <video
                    ref={videoRef}
                    src={testimonial.videoUrl}
                    loop
                    muted={false}
                    playsInline
                    className="testimonial-video"
                    poster="https://via.placeholder.com/300x533/1a1a1a/FFFFFF?text=Video+Loading"
                />
                {!isPlaying && (
                    <div className="play-overlay">
                        <div className="play-btn">
                            <FaPlay />
                        </div>
                    </div>
                )}

                <div className="video-overlay-info">
                    <div className="quote-icon">
                        <FaQuoteLeft />
                    </div>
                    <p className="video-quote">"{testimonial.quote}"</p>
                    <div className="client-info">
                        <h4>{testimonial.name}</h4>
                        <span>{testimonial.role}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TestimonialsSection;
