import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SocialProofToast from './SocialProofToast';
import SmartConversionPopup from './SmartConversionPopup';
import { FaRocket, FaLightbulb, FaGift } from 'react-icons/fa';

const SOCIAL_PROOF_DATA = [
    { name: "Ahmed", action: "booked a demo", timeAgo: "2m ago", image: "" },
    { name: "Sarah", action: "purchased Pro plan", timeAgo: "5m ago", image: "" },
    { name: "Mike", action: "downloaded the guide", timeAgo: "12m ago", image: "" },
    { name: "Fatima", action: "started a free trial", timeAgo: "1m ago", image: "" },
    { name: "John", action: "requested a quote", timeAgo: "8m ago", image: "" },
];

const ConversionManager = ({ onOpenContactForm }) => {
    const location = useLocation();
    const [popupData, setPopupData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [toastData, setToastData] = useState(null);
    const [showToast, setShowToast] = useState(false);

    // Use localStorage to persist dismissal across sessions
    const [hasSeenScrollPopup, setHasSeenScrollPopup] = useState(
        () => localStorage.getItem('mf_scroll_popup_dismissed') === 'true'
    );
    const [hasSeenTimePopup, setHasSeenTimePopup] = useState(
        () => localStorage.getItem('mf_time_popup_dismissed') === 'true'
    );

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    // --- Social Proof Logic ---
    useEffect(() => {
        const interval = setInterval(() => {
            const randomUser = SOCIAL_PROOF_DATA[Math.floor(Math.random() * SOCIAL_PROOF_DATA.length)];
            setToastData(randomUser);
            setShowToast(true);

            // Hide toast after 5 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 5000);

        }, 45000); // Show every 45 seconds

        return () => clearInterval(interval);
    }, []);


    // --- Smart Triggers ---
    useEffect(() => {
        // Reset triggers on route change if desired (optional, maybe keep global state)
        // For now, we keep flags consistent per session to avoid annoying user.

        const handleScroll = () => {
            if (hasSeenScrollPopup || showPopup) return;

            const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;

            if (scrollPercentage > 0.6) {
                triggerPopup('scroll');
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Time Trigger
        const timeTimer = setTimeout(() => {
            if (!hasSeenTimePopup && !showPopup) {
                triggerPopup('time');
            }
        }, 35000); // 35 seconds

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeTimer);
        };
    }, [location.pathname, hasSeenScrollPopup, hasSeenTimePopup, showPopup]);


    const triggerPopup = (type) => {
        let content = null;

        // Dynamic Content based on Page and Trigger
        if (type === 'scroll') {
            content = {
                title: "Looks like you're interested! 👀",
                message: "Want a free custom strategy plan for your project?",
                ctaText: "Book Free Strategy Call",
                icon: <FaRocket />,
                onAction: () => { setShowPopup(false); onOpenContactForm?.(); }
            };
            setHasSeenScrollPopup(true);
            localStorage.setItem('mf_scroll_popup_dismissed', 'true');
        } else if (type === 'time') {
            if (location.pathname.includes('/store')) {
                content = {
                    title: "Need help choosing?",
                    message: "Not sure which tool is right for you? Let's chat.",
                    ctaText: "Get Recommendation",
                    icon: <FaLightbulb />,
                    onAction: () => { setShowPopup(false); onOpenContactForm?.(); }
                };
            } else if (location.pathname.includes('/services')) {
                content = {
                    title: "Build something great.",
                    message: "Ready to turn your idea into reality? Get a free consultation.",
                    ctaText: "Book Consultation",
                    icon: <FaRocket />,
                    onAction: () => { setShowPopup(false); onOpenContactForm?.(); }
                };
            } else {
                content = {
                    title: "Limited Time Offer",
                    message: "Get a free audit of your current digital presence.",
                    ctaText: "Claim Free Audit",
                    icon: <FaGift />,
                    onAction: () => { setShowPopup(false); onOpenContactForm?.(); }
                };
            }
            setHasSeenTimePopup(true);
            localStorage.setItem('mf_time_popup_dismissed', 'true');
        }

        if (content) {
            setPopupData(content);
            setShowPopup(true);
        }
    };

    return (
        <>
            <SocialProofToast isVisible={showToast} data={toastData} onClose={() => setShowToast(false)} />
            <SmartConversionPopup
                isOpen={showPopup}
                onClose={handleClosePopup}
                data={popupData}
            />
        </>
    );
};

export default ConversionManager;
