import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import { useModal } from '../context/ModalContext';
import './Navbar.css';
// Force reload-2026-03-18

const Navbar = ({ onContactClick }) => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Scroll class for background opacity
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [open]);

    // Close mobile menu on route change
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    const navItems = [
        { name: 'Home',     path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Work',     path: '/work' },
        { name: 'Store',    path: '/store' },
        { name: 'Team',     path: '/team' },
        { name: 'Articles', path: '/articles' },
        { name: 'Affiliates', path: '/affiliates' },
        { name: 'Contact',  path: '/contact' },
    ];

    const { openModal } = useModal();

    const handleContact = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log('Navbar: handleContact called', { hasPropCallback: !!onContactClick });
        setOpen(false);
        
        if (onContactClick) {
            onContactClick();
        } else {
            openModal('General Inquiry');
        }
    };

    // Framer variants
    const overlayVariants = {
        initial: { scaleY: 0 },
        animate: {
            scaleY: 1,
            transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] },
        },
        exit: {
            scaleY: 0,
            transition: { delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const linksContainerVariants = {
        initial: { transition: { staggerChildren: 0.07, staggerDirection: -1 } },
        open:    { transition: { delayChildren: 0.25, staggerChildren: 0.07 } },
    };

    const linkVariants = {
        initial: {
            y: '100%',
            transition: { duration: 0.4, ease: [0.37, 0, 0.63, 1] },
        },
        open: {
            y: 0,
            transition: { duration: 0.6, ease: [0, 0.55, 0.45, 1] },
        },
    };

    return (
        <>
            {/* ── Desktop Navbar ── */}
            <motion.header
                className={`navbar-wrapper${scrolled ? ' scrolled' : ''}`}
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <nav className="navbar">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
                        <span className="logo-text">minder</span>
                        <span className="logo-accent">fly</span>
                    </Link>

                    {/* Pill nav */}
                    <div className="navbar-center">
                        <ul className="navbar-links">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className={`nav-link${location.pathname === item.path ? ' active' : ''}`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right side */}
                    <div className="navbar-right">
                        <div className="desktop-cta">
                            <MagneticButton 
                                className="btn-magnetic" 
                                onClick={(e) => {
                                    console.log('Navbar: MagneticButton clicked');
                                    handleContact(e);
                                }}
                            >
                                Let's Talk
                            </MagneticButton>
                        </div>

                        {/* Hamburger */}
                        <button
                            className={`navbar-toggle${open ? ' open' : ''}`}
                            onClick={() => setOpen(!open)}
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                        >
                            <span className="hamburger-box">
                                <span className="hamburger-inner" />
                            </span>
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* ── Mobile Menu ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="mobile-menu-overlay"
                        variants={overlayVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <div className="mobile-menu-container">
                            {/* Header row */}
                            <div className="mobile-menu-header">
                                <span className="menu-title">Navigation</span>
                                <button className="close-btn" onClick={() => setOpen(false)}>
                                    Close
                                </button>
                            </div>

                            {/* Links */}
                            <motion.div
                                className="mobile-links-container"
                                variants={linksContainerVariants}
                                initial="initial"
                                animate="open"
                                exit="initial"
                            >
                                {navItems.map((item) => (
                                    <div className="mobile-link-wrapper" key={item.name}>
                                        <motion.div variants={linkVariants}>
                                            <Link
                                                to={item.path}
                                                className="mobile-link"
                                                onClick={() => setOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    </div>
                                ))}

                                <motion.div variants={linkVariants} className="mobile-cta-wrapper">
                                    <button 
                                        className="mobile-contact-btn" 
                                        onClick={(e) => {
                                            console.log('Navbar: Mobile contact button clicked');
                                            handleContact(e);
                                        }}
                                    >
                                        Let's Talk Project
                                    </button>
                                </motion.div>
                            </motion.div>

                            {/* Footer */}
                            <div className="mobile-menu-footer">
                                <a href="mailto:hello@minderfly.com">hello@minderfly.com</a>
                                <div className="socials">
                                    <a href="#" aria-label="Instagram">Instagram</a>
                                    <a href="#" aria-label="LinkedIn">LinkedIn</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;