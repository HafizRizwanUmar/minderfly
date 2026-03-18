/* ═══════════════════════════════════════
   ChromeThemeDev.jsx — Upgraded product page
   Uses ServicePageLayout with rich props
═══════════════════════════════════════ */
import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';

const ChromeThemes = () => {
  const features = [
    {
      title: 'High-Resolution Backgrounds',
      desc: '4K and Retina-ready New Tab backgrounds — custom artwork, curated photography, or AI-generated scenes. Every pixel at full resolution.',
    },
    {
      title: 'Brand Colour Systems',
      desc: 'Frame colour, toolbar tint, tab strip, and button colours all mapped to your brand palette. Consistent with your visual identity on every page load.',
    },
    {
      title: 'Dark & Light Mode Variants',
      desc: 'Two-mode pairs that look stunning in any lighting. Consistent with your colour palette in both dark and light Chrome settings.',
    },
    {
      title: 'Custom Frame & Toolbar Design',
      desc: 'Unique window chrome: frame colour, toolbar tints, tab shapes. Makes your browser instantly recognisable and on-brand.',
    },
    {
      title: 'Creator & Merch Themes',
      desc: 'Publish branded themes to the Chrome Web Store as free or paid digital downloads — a low-cost, high-visibility brand touchpoint for your community.',
    },
    {
      title: 'Chrome Web Store Publishing',
      desc: 'End-to-end store listing management: title, description, screenshot preparation, and submission to the Chrome Web Store by our team.',
    },
  ];

  const processSteps = [
    { title: 'Brand Audit',    desc: 'We analyse your existing colours, typography, and imagery to inform the design direction.' },
    { title: 'Concept',        desc: 'Full Chrome UI mockups presented for approval before any production work begins.' },
    { title: 'Production',     desc: 'Theme files built to Chrome spec: correct resolutions, colour profiles, and manifest configuration.' },
    { title: 'QA & Testing',   desc: 'Tested across Windows, macOS, and Linux at multiple display densities and Chrome versions.' },
    { title: 'Store Publish',  desc: 'Packaged and published to the Chrome Web Store with optimised listing copy and screenshots.' },
  ];

  const faqs = [
    {
      q: 'What file formats do you deliver?',
      a: 'The complete Chrome theme package: a .crx file, unpacked source folder, all Web Store assets (screenshots, promotional tiles), and source artwork in vector and raster formats.',
    },
    {
      q: 'Can I sell my theme on the Chrome Web Store?',
      a: 'Yes. Chrome themes can be published as free or paid items. We handle the full listing setup. You own all assets and revenue.',
    },
    {
      q: 'Will it work on Edge, Brave, and Arc?',
      a: 'Yes. Chrome themes work on all Chromium-based browsers. We verify compatibility across Chrome, Edge, Brave, Arc, and Vivaldi as part of QA.',
    },
    {
      q: 'How long does theme design take?',
      a: 'A standard brand theme takes 1–2 weeks from brief to published. Complex custom artwork or multi-variant themes may take up to 3 weeks.',
    },
    {
      q: 'Can you update an existing theme?',
      a: 'Yes. We can refresh artwork, adjust colours, or publish a new version while retaining your existing store listing, reviews, and install count.',
    },
  ];

  return (
    <ServicePageLayout
      title="Chrome Theme Development"
      subtitle="Make the internet yours."
      description="Transform Google Chrome into a branded experience. We design and publish custom Chrome themes for companies, creators, and communities — from brand-consistent internal tools to commercial digital downloads on the Chrome Web Store."
      features={features}
      processSteps={processSteps}
      faqs={faqs}
      image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
      ctaText="Start Your Theme"
      ctaLink="/contact"
      badgeText="Chrome Web Store Ready"
      seoTitle="Chrome Theme Design & Development Services — Branded Browser Themes | Minderfly"
      seoDescription="Custom Chrome theme design and development for brands, creators, and businesses. High-resolution New Tab backgrounds, branded toolbars, and Chrome Web Store publishing. Request a free quote."
      seoKeywords="Chrome theme development, custom Chrome theme, branded browser theme, Chrome Web Store theme, Google Chrome theme design, browser branding, New Tab page design, creator browser theme"
      canonicalUrl="/services/chrome-theme-development"
    />
  );
};

export default ChromeThemes;