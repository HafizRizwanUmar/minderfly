import { motion } from 'framer-motion';
import { useRef } from 'react';

const Reveal = ({ children, delay = 0, width = "fit-content", className = "", direction = "up" }) => {
    const ref = useRef(null);

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
            x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
            scale: direction === "scale" ? 0.9 : 1
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1
        },
    };

    return (
        <div ref={ref} style={{ width, overflow: 'hidden' }} className={className}>
            <motion.div
                variants={variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Reveal;
