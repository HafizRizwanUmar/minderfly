import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaGift } from 'react-icons/fa';
import './FebOfferBanner.css';

const FebOfferBanner = ({ onClaim }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Set deadline to end of February 2026
        const deadline = new Date('2026-03-01T00:00:00');

        const timer = setInterval(() => {
            const now = new Date();
            const difference = deadline - now;

            if (difference <= 0) {
                clearInterval(timer);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            className="feb-offer-banner"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
        >
            <div className="container banner-content">
                <div className="banner-left">
                    <div className="icon-wrapper">
                        <FaGift />
                    </div>
                    <div className="text-content">
                        <h3>February Special: <span className="highlight">Free Website!</span></h3>
                        <p>Get a professional one-page portfolio website for free. Limited time only!</p>
                    </div>
                </div>

                <div className="banner-right">
                    <div className="countdown">
                        <div className="time-unit">
                            <span className="number">{String(timeLeft.days).padStart(2, '0')}</span>
                            <span className="label">Days</span>
                        </div>
                        <span className="separator">:</span>
                        <div className="time-unit">
                            <span className="number">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="label">Hrs</span>
                        </div>
                        <span className="separator">:</span>
                        <div className="time-unit">
                            <span className="number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="label">Mins</span>
                        </div>
                        <span className="separator">:</span>
                        <div className="time-unit">
                            <span className="number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className="label">Secs</span>
                        </div>
                    </div>

                    <button className="btn btn-primary claim-btn" onClick={onClaim}>
                        Claim Now
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default FebOfferBanner;
