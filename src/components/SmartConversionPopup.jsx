import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import './SmartConversionPopup.css';

const SmartConversionPopup = ({ isOpen, onClose, data }) => {
    if (!data) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="smart-popup-overlay">
                    <motion.div
                        className="smart-popup-container"
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="popup-close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>

                        {data.icon && (
                            <div className="popup-image">
                                {data.icon}
                            </div>
                        )}

                        <h3>{data.title}</h3>
                        <p>{data.message}</p>

                        <button className="popup-btn" onClick={data.onAction}>
                            {data.ctaText}
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SmartConversionPopup;
