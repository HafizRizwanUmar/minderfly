import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope,
  FaDribbble, FaArrowRight,
} from 'react-icons/fa';
import './Footer.css';

/* ═══════════════════════════════════════
   FOOTER — Minderfly
   Sections: CTA · Links grid · Bottom bar
   + Animated contact modal (backend wired)
═══════════════════════════════════════ */

/* ── Structured data ── */
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Minderfly',
  url: 'https://minderfly.com',
  logo: 'https://minderfly.com/logo.png',
  description: 'Minderfly is a digital agency and product studio building Chrome extensions, VS Code tools, Windows apps, and full-stack web experiences.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'hello@minderfly.com',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://github.com/minderfly',
    'https://linkedin.com/company/minderfly',
    'https://twitter.com/minderfly',
  ],
};

const NAV = [
  {
    label: 'Company',
    links: [
      { text: 'Services',   href: '/services' },
      { text: 'Work',       href: '/#work' },
      { text: 'Team',       href: '/team' },
      { text: 'Articles',   href: '/articles' },
      { text: 'Contact',    href: '/contact' },
    ],
  },
  {
    label: 'Products',
    links: [
      { text: 'App Store',             href: '/store' },
      { text: 'Debt Settler',          href: '/store/debt-settler' },
      { text: 'Cinemafly',             href: '/store/cinemafly', badge: 'Free' },
      { text: 'Sanad PDF Editor',      href: '/store/sanad-pdf-editor' },
      { text: 'Nishan QR Generator',   href: '/store/nishan-qr-generator' },
    ],
  },
  {
    label: 'Services',
    links: [
      { text: 'Chrome Extensions',    href: '/services/chrome-extension-development' },
      { text: 'VS Code Extensions',   href: '/services/vscode-extension-development' },
      { text: 'Mobile Apps',          href: '/services/mobile-app-development' },
      { text: 'Web Development',      href: '/services/web-development' },
      { text: 'Antigravity Masterclass', href: '/antigravity-masterclass', badge: 'New' },
    ],
  },
];

const SOCIALS = [
  { Icon: FaGithub,   href: 'https://github.com/minderfly',           label: 'GitHub'   },
  { Icon: FaLinkedin, href: 'https://linkedin.com/company/minderfly', label: 'LinkedIn' },
  { Icon: FaTwitter,  href: 'https://twitter.com/minderfly',          label: 'Twitter'  },
  { Icon: FaEnvelope, href: 'mailto:hello@minderfly.com',             label: 'Email'    },
];

/* ═══════════════════════════════════════
   MAIN FOOTER COMPONENT
   Sections: CTA · Links grid · Bottom bar
═══════════════════════════════════════ */
const Footer = ({ onContactClick }) => {
  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <footer className="footer" id="contact" aria-label="Site footer and contact">
        <div className="footer-rule-top" aria-hidden="true"/>

        <div className="footer-inner">

          {/* ── CTA SECTION ── */}
          <section className="footer-cta-section" aria-label="Contact call-to-action">
            <div>
              <div className="footer-eyebrow" aria-hidden="true">
                <span className="footer-eyebrow-num">05 /</span>
                <span className="footer-eyebrow-line"/>
                <span className="footer-eyebrow-label">Let's collaborate</span>
              </div>

              <h2 className="footer-headline">
                LET'S{' '}
                <span className="footer-headline-accent">BUILD</span>
                <br/>
                <span className="footer-headline-stroke">TOGETHER</span>
              </h2>

              <p className="footer-sub">
                Transforming ideas into exceptional digital experiences. From Chrome extensions to full-stack platforms — we bring your vision to life with precision and craft.
              </p>
            </div>

            <div className="footer-cta-right">
              {onContactClick ? (
                <button
                  className="circle-cta"
                  onClick={(e) => {
                    e.preventDefault();
                    onContactClick();
                  }}
                  aria-label="Open contact modal"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                >
                  Book<br/>a call
                </button>
              ) : (
                <Link
                  to="/contact"
                  className="circle-cta"
                  aria-label="Visit contact page to book a call"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  Book<br/>a call
                </Link>
              )}

              <div className="footer-availability" aria-live="polite">
                <span className="footer-availability-dot" aria-hidden="true"/>
                Available for new projects
              </div>
            </div>
          </section>

          {/* ── LINKS SECTION ── */}
          <nav className="footer-links-section" aria-label="Footer navigation">

            {/* Brand column */}
            <div className="footer-brand">
              <Link to="/" className="footer-brand-logo">
                Minder<span>fly</span>
              </Link>
              <p className="footer-brand-desc">
                A digital agency and product studio building Chrome extensions, developer tools, and full-stack experiences for clients worldwide.
              </p>
              <div className="footer-social" role="list" aria-label="Social media links">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="footer-social-link"
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    role="listitem"
                  >
                    <Icon aria-hidden="true"/>
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {NAV.map(col => (
              <div key={col.label} className="footer-nav-col">
                <span className="footer-nav-label">{col.label}</span>
                <ul className="footer-nav-list">
                  {col.links.map(link => (
                    <li key={link.text}>
                      <Link to={link.href} style={{ textDecoration: 'none' }}>
                        {link.text}
                        {link.badge && (
                          <span className="footer-nav-badge">{link.badge}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* ── BOTTOM BAR ── */}
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p className="copyright">
                © {new Date().getFullYear()} Minderfly. All rights reserved.
              </p>
              <a href="/privacy" className="footer-bottom-link">Privacy</a>
              <a href="/terms"   className="footer-bottom-link">Terms</a>
            </div>

            <div className="footer-bottom-right">
              <div className="footer-made-tag">
                Crafted with <span aria-label="love">♥</span> by Minderfly
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;