import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaRocket, FaLightbulb, FaGift } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const SmartConversionPopup = ({ isOpen, onClose, data }) => {
    if (!data) return null;
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000, width: 320 }}
                    className="smart-popup-wrapper"
                >
                    <div style={{ background: '#111', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16, padding: '24px 20px 20px', boxShadow: '0 10px 40px rgba(0,0,0,.6)', position: 'relative' }}>
                        <button 
                            onClick={onClose} 
                            style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: 'rgba(255,255,255,.3)', cursor: 'pointer', fontSize: 16 }}
                            aria-label="Close"
                        >✕</button>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(200,242,58,.1)', color: '#c8f23a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                                {data.icon || '✨'}
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <h4 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{data.title}</h4>
                                <p style={{ margin: '0 0 16px', fontSize: 13, color: 'rgba(255,255,255,.55)', lineHeight: 1.5 }}>{data.message}</p>
                                <button 
                                    onClick={data.onAction}
                                    style={{ background: '#c8f23a', color: '#000', border: 'none', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', width: '100%', transition: 'transform .2s' }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    {data.ctaText}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const ConversionManager = ({ onOpenContactForm }) => {
    const location = useLocation();
    const [popupData, setPopupData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

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

    // --- Smart Triggers ---
    useEffect(() => {
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
        <SmartConversionPopup
            isOpen={showPopup}
            onClose={handleClosePopup}
            data={popupData}
        />
    );
};

export default ConversionManager;
