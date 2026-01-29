import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import './TestimonialsSection.css';

const testimonials = [
    {
        id: 1,
        name: 'James Wilson',
        role: 'Founder, Nexus AI',
        content: "We needed a complex Chrome extension to handle proprietary data analysis. Minderfly understood the assignment immediately. The delivery was flawless and secure.",
        rating: 5,
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        id: 2,
        name: 'Sarah Chen',
        role: 'Product Lead, FlowSync',
        content: "Minderfly's Flutter team is world-class. They ported our React web app to mobile in record time without compromising performance. Truly 'pixels perfect'.",
        rating: 5,
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
        id: 3,
        name: 'Marcus Thorne',
        role: 'CTO, Vertex Global',
        content: "I've worked with many agencies, but few have the technical depth to build custom VS Code extensions. Minderfly built a tool that saved our dev team 20 hours a week.",
        rating: 5,
        image: 'https://randomuser.me/api/portraits/men/85.jpg'
    },
    {
        id: 4,
        name: 'Elena Rodriguez',
        role: 'Director of Marketing, OmniBrand',
        content: "Our new website isn't just beautiful; it's a lead generation machine. The SEO optimization they included out-of-the-box was a game changer for us.",
        rating: 5,
        image: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
        id: 5,
        name: 'David Kim',
        role: 'Indie Developer',
        content: "The custom Chrome Theme they designed for my personal brand is stunning. It's the small details that matter, and Minderfly nailed every single one.",
        rating: 5,
        image: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
        id: 6,
        name: 'Olivia Sterling',
        role: 'CEO, Sterling & Co.',
        content: "Professional, transparent, and incredibly skilled. They didn't just write code; they acted as true partners in refining our product strategy.",
        rating: 5,
        image: 'https://randomuser.me/api/portraits/women/90.jpg'
    }
];

const ReviewCard = ({ review }) => (
    <div className="review-card">
        <div className="review-header">
            <div className="review-avatar">
                <img src={review.image} alt={review.name} />
            </div>
            <div className="review-info">
                <h4>{review.name}</h4>
                <span>{review.role}</span>
            </div>
            <div className="review-rating">
                {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                ))}
            </div>
        </div>
        <p className="review-content">"{review.content}"</p>
    </div>
);

const TestimonialsSection = () => {
    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="testimonials-header">
                    <h2>Trusted by <span className="gradient-text">Innovators</span></h2>
                    <p>Don't just take our word for it. Join hundreds of satisfied clients.</p>
                </div>
            </div>

            <div className="marquee-wrapper">
                <div className="marquee-track">
                    {/* First Set */}
                    {testimonials.map((t) => (
                        <ReviewCard key={t.id} review={t} />
                    ))}
                    {/* Duplicate Set for Seamless Loop */}
                    {testimonials.map((t) => (
                        <ReviewCard key={`dup-${t.id}`} review={t} />
                    ))}
                </div>

                {/* Second Row (Reverse Direction if desired, simplistic for now) */}
            </div>
        </section>
    );
};

export default TestimonialsSection;
