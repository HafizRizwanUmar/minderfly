import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import MagneticButton from './MagneticButton';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        // lock body scroll when mobile menu is open
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    // Close mobile menu when route changes
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    const navItems = [
        { name: 'home', path: '/', hash: null },
        { name: 'services', path: '/services', hash: null },
        { name: 'work', path: '/work', hash: null },
        { name: 'store', path: '/store', hash: null },
        { name: 'team', path: '/team', hash: null },
        { name: 'articles', path: '/articles', hash: null }
    ];

    const handleNavClick = (item) => {
        setOpen(false);
    };

    const whatsappNumber = '923449233424';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20would%20like%20to%20discuss%20a%20project`;

    return (
        <>
            <motion.nav
                className="navbar"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="container navbar-content">
                    <div className="navbar-left">
                        <Link to="/" className="navbar-logo">
                            <span className="logo-text">minder</span>
                            <span className="logo-accent">fly</span>
                        </Link>
                    </div>

                    <div className="navbar-center">
                        <ul className="navbar-links">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} onClick={() => handleNavClick(item)}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="navbar-right">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary navbar-btn whatsapp-btn"
                        >
                            <FaWhatsapp className="whatsapp-icon" />
                            <span>Contact</span>
                        </a>

                        <button
                            className={`navbar-toggle ${open ? 'open' : ''}`}
                            onClick={() => setOpen(!open)}
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                        >
                            <span className="hamburger">
                                <span />
                                <span />
                                <span />
                            </span>
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {open && (
                    <motion.aside
                        className="mobile-nav-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <motion.div
                            className="mobile-nav-panel container"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
                        >
                            <div className="mobile-nav-head">
                                <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
                                    <span className="logo-text">minder</span>
                                    <span className="logo-accent">fly</span>
                                </Link>
                                <button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close menu">×</button>
                            </div>

                            <ul className="mobile-links">
                                {navItems.map((item) => (
                                    <li key={item.name} onClick={() => handleNavClick(item)}>
                                        <Link to={item.path}>{item.name}</Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="mobile-cta">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary whatsapp-btn-mobile"
                                >
                                    <FaWhatsapp />
                                    <span>Contact on WhatsApp</span>
                                </a>
                            </div>
                        </motion.div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
