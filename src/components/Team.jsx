import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Team.css';
import teamMemberImg from '../assets/team-member.png';

const Team = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const teamMembers = [
        {
            id: 1,
            name: 'HAFIZ RIZWAN UMAR',
            firstName: 'HAFIZ',
            lastName: 'RIZWAN',
            role: 'FULL STACK DEVELOPER',
            location: 'BASED IN PAKISTAN',
            image: teamMemberImg,
            social: {
                linkedin: 'https://www.linkedin.com/in/hafiz-rizwan-umar',
                github: 'https://github.com/hafizrizwanumar'
            }
        },
    ];

    const currentMember = teamMembers[currentIndex];

    const nextMember = () => {
        setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    };

    const prevMember = () => {
        setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
            }
            if (e.key === 'ArrowLeft') {
                setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [teamMembers.length]);

    return (
        <section id="team" className="team-section">
            <div className="team-container">
                {/* Side Navigation */}
                <div className="team-side-nav">
                    <a href="#about" className="side-nav-link">[ ABOUT ]</a>
                    <a href="#work" className="side-nav-link">[ WORKS ]</a>
                    <a href="#contact" className="side-nav-link">[ CONTACTS ]</a>
                </div>

                {/* Navigation Arrows */}
                <button
                    className="team-nav-btn team-nav-prev"
                    onClick={prevMember}
                    aria-label="Previous team member"
                >
                    <FaChevronLeft />
                </button>
                <button
                    className="team-nav-btn team-nav-next"
                    onClick={nextMember}
                    aria-label="Next team member"
                >
                    <FaChevronRight />
                </button>

                {/* Background Text */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentMember.id}
                        className="team-bg-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentMember.firstName}
                        <br />
                        {currentMember.lastName}
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentMember.id}
                        className="team-content"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {/* Image */}
                        <div className="team-image-wrapper">
                            <img
                                src={currentMember.image}
                                alt={currentMember.name}
                                className="team-image"
                            />
                        </div>

                        {/* Info */}
                        <div className="team-info">
                            <div className="team-role">
                                {currentMember.role}
                                <br />
                                {currentMember.location}
                            </div>

                            <h2 className="team-name">
                                {currentMember.firstName}
                                <br />
                                {currentMember.lastName}
                            </h2>
                        </div>

                        {/* Social */}
                        <div className="team-social">
                            {currentMember.social.linkedin !== '#' && (
                                <a href={currentMember.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                                    <FaLinkedin /> LINKEDIN
                                </a>
                            )}
                            {currentMember.social.github !== '#' && (
                                <a href={currentMember.social.github} target="_blank" rel="noopener noreferrer" className="social-link">
                                    <FaGithub /> GITHUB
                                </a>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Pagination Dots */}
                <div className="team-pagination">
                    {teamMembers.map((member, index) => (
                        <button
                            key={member.id}
                            className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`View ${member.name}`}
                        />
                    ))}
                </div>

                {/* Counter */}
                <div className="team-counter">
                    <span className="counter-current">{String(currentIndex + 1).padStart(2, '0')}</span>
                    <span className="counter-divider"> / </span>
                    <span className="counter-total">{String(teamMembers.length).padStart(2, '0')}</span>
                </div>
            </div>
        </section>
    );
};

export default Team;
