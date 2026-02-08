import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ onContactClick }) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    // Close mobile menu when route changes
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Work', path: '/work' },
        { name: 'Store', path: '/store' },
        { name: 'Team', path: '/team' },
        { name: 'Articles', path: '/articles' }
    ];

    const menuVars = {
        initial: { scaleY: 0 },
        animate: {
            scaleY: 1,
            transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] }
        },
        exit: {
            scaleY: 0,
            transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const containerVars = {
        initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
        open: {
            transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 }
        }
    };

    const mobileLinkVars = {
        initial: {
            y: "30vh",
            transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] }
        },
        open: {
            y: 0,
            transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] }
        }
    };

    return (
        <>
            <motion.header
                className="navbar-wrapper"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <nav className="navbar glass-panel">
                    <div className="navbar-left">
                        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
                            <span className="logo-text">minder</span>
                            <span className="logo-accent">fly</span>
                        </Link>
                    </div>

                    <div className="navbar-center">
                        <ul className="navbar-links">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="nav-link">
                                        <span className="link-text">{item.name}</span>
                                        <span className="link-text-hover">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="navbar-right">
                        <div className="desktop-cta">
                            <MagneticButton className="contact-btn-wrapper">
                                <button
                                    className="btn-magnetic"
                                    onClick={() => {
                                        if (onContactClick) onContactClick();
                                        else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Let's Talk
                                </button>
                            </MagneticButton>
                        </div>

                        <button
                            className={`navbar-toggle ${open ? 'open' : ''}`}
                            onClick={() => setOpen(!open)}
                            aria-label={open ? 'Close menu' : 'Open menu'}
                        >
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </nav>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="mobile-menu-overlay"
                        variants={menuVars}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <div className="mobile-menu-container">
                            <div className="mobile-menu-header">
                                <span className="menu-title">Menu</span>
                                <button className="close-btn" onClick={() => setOpen(false)}>Close</button>
                            </div>

                            <motion.div
                                className="mobile-links-container"
                                variants={containerVars}
                                initial="initial"
                                animate="open"
                                exit="initial"
                            >
                                {navItems.map((item) => (
                                    <div className="mobile-link-wrapper" key={item.name}>
                                        <motion.div variants={mobileLinkVars}>
                                            <Link
                                                to={item.path}
                                                onClick={() => setOpen(false)}
                                                className="mobile-link"
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    </div>
                                ))}

                                <motion.div variants={mobileLinkVars} className="mobile-cta-wrapper">
                                    <button
                                        className="btn btn-primary mobile-contact-btn"
                                        onClick={() => {
                                            setOpen(false);
                                            if (onContactClick) onContactClick();
                                            else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        Let's Talk Project
                                    </button>
                                </motion.div>
                            </motion.div>

                            <div className="mobile-menu-footer">
                                <a href="mailto:hello@minderfly.com">hello@minderfly.com</a>
                                <div className="socials">
                                    <a href="#">Instagram</a>
                                    <a href="#">LinkedIn</a>
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
