import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FloatingWhatsApp = () => {
    const phoneNumber = "923449233424";
    const message = "Hi Minderfly, I'm interested in your services!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-whatsapp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, translateY: -5 }}
            whileTap={{ scale: 0.9 }}
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '60px',
                height: '60px',
                backgroundColor: '#25D366',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                zIndex: 9998,
                textDecoration: 'none',
                transition: 'box-shadow 0.3s ease'
            }}
            aria-label="Contact us on WhatsApp"
        >
            <FaWhatsapp />
            <span className="whatsapp-pulse"></span>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .floating-whatsapp:hover {
                    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5);
                }
                .whatsapp-pulse {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: #25D366;
                    border-radius: 50%;
                    z-index: -1;
                    animation: whatsapp-pulse-anim 2s infinite;
                }
                @keyframes whatsapp-pulse-anim {
                    0% {
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    100% {
                        transform: scale(1.6);
                        opacity: 0;
                    }
                }
                @media (max-width: 768px) {
                    .floating-whatsapp {
                        bottom: 20px;
                        right: 20px;
                        width: 50px;
                        height: 50px;
                        fontSize: 28px;
                    }
                }
            `}} />
        </motion.a>
    );
};

export default FloatingWhatsApp;
