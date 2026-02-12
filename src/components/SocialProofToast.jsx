import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import './SocialProofToast.css';

const SocialProofToast = ({ isVisible, data, onClose }) => {
    if (!data) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="social-proof-toast"
                    initial={{ opacity: 0, y: 50, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="toast-avatar">
                        <img src={data.image || `https://ui-avatars.com/api/?name=${data.name}&background=random`} alt={data.name} />
                    </div>
                    <div className="toast-content">
                        <span className="toast-name">{data.name}</span>
                        <span className="toast-action">{data.action}</span>
                    </div>
                    <span className="toast-time">{data.timeAgo}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SocialProofToast;
