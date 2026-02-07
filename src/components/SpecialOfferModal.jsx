import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import './SpecialOfferModal.css';

const SpecialOfferModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        projectType: 'Free Website (Feb Offer)',
        details: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch("https://minderfly-backend.vercel.app/api/send-email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitStatus('success');
                setTimeout(() => {
                    onClose();
                    setSubmitStatus(null);
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        projectType: 'Free Website (Feb Offer)',
                        details: ''
                    });
                }, 3000);
            } else {
                console.error("Server responded with error:", data);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="modal-container"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    >
                        <button className="modal-close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>

                        <div className="modal-header">
                            <h3><span className="gradient-text">Unlock Your Offer</span></h3>
                            <p>Fill in the details below to claim your Free Website offer for February!</p>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="0300 1234567"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="details">Project Details (Optional)</label>
                                <textarea
                                    id="details"
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    placeholder="Tell us a bit about what you need..."
                                    rows={3}
                                />
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary submit-btn ${submitStatus === 'success' ? 'success' : ''}`}
                                disabled={isSubmitting || submitStatus === 'success'}
                            >
                                {isSubmitting ? (
                                    <span>Sending...</span>
                                ) : submitStatus === 'success' ? (
                                    <span>Sent Successfully!</span>
                                ) : (
                                    <>
                                        <FaPaperPlane className="icon" />
                                        <span>Send Request</span>
                                    </>
                                )}
                            </button>

                            {submitStatus === 'error' && (
                                <p className="error-msg">Something went wrong. Please try again later.</p>
                            )}
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SpecialOfferModal;
