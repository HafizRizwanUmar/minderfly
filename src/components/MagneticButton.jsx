import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

const MagneticButton = ({ children, className, onClick, href }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const xPos = clientX - (left + width / 2);
        const yPos = clientY - (top + height / 2);
        x.set(xPos * 0.3);
        y.set(yPos * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const Component = href ? motion.a : motion.button;

    return (
        <Component
            ref={ref}
            href={href}
            onClick={onClick}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseXSpring, y: mouseYSpring }}
        >
            {children}
        </Component>
    );
};

export default MagneticButton;
