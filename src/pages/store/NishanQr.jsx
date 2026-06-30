import ProductPageTemplate from './ProductPageTemplate';

const product = {
  id: 'nishan-qr',
  name: 'Nishan QR Generator',
  tagline: 'Professional QR codes, offline and private.',
  desc: 'Unlimited custom QR codes for URLs, WiFi, contact cards, and text. Full colour control, instant PNG/SVG download — no account, no internet required.',
  category: 'Utilities · Windows',
  accent: '#3b82f6',
  badge: null,
  heroIcon: '⬛',
  platforms: [
    { label: 'Microsoft Store', sub: 'Windows 10 / 11 · Free', href: 'https://apps.microsoft.com/detail/9njf5mhwhhps?hl=en-US&gl=PK', icon: '⊞' },
  ],
  stats: [
    { value: '5,000+', label: 'Downloads' },
    { value: '4.8 ★',  label: 'Rating' },
    { value: 'Free',   label: 'Base Tier' },
    { value: 'Offline', label: 'Works Offline' },
  ],
  features: [
    { icon: '⬛', title: 'Unlimited QR Codes',       desc: 'Generate as many QR codes as you need — URLs, WiFi credentials, vCards, plain text, email, and more. No limits.' },
    { icon: '🎨', title: 'Full Colour Customisation', desc: 'Choose any foreground and background colour. Add your brand colours for professional, on-brand QR codes every time.' },
    { icon: '⬇', title: 'PNG & SVG Export',          desc: 'Download your QR codes as high-resolution PNG or scalable SVG — perfect for print, web, and presentations.' },
    { icon: '🔒', title: 'Fully Offline',             desc: 'Nishan QR runs entirely on your device. No internet connection required, no data sent to any server.' },
    { icon: '⚡', title: 'Instant Generation',        desc: 'QR codes generate in real-time as you type. See your code update instantly with every keystroke.' },
    { icon: '📋', title: 'Multiple Input Types',      desc: 'Support for URL, WiFi (with security type), email, SMS, phone, vCard contact, and free-form text.' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nishan QR Generator',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Windows',
    description: 'Nishan QR Generator is a free offline Windows app for creating unlimited custom QR codes. Export as PNG or SVG. No account required.',
    url: 'https://www.minderfly.com/store/nishan-qr-generator',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '187' },
    author: { '@type': 'Organization', name: 'Minderfly', url: 'https://www.minderfly.com' },
  },
  seo: {
    title: 'Nishan QR Generator — Free Offline QR Code App for Windows | Minderfly',
    description: 'Generate unlimited custom QR codes offline on Windows. Full colour control, PNG & SVG export, no sign-up needed. Free on the Microsoft Store.',
    keywords: 'QR code generator, offline QR maker, Windows QR app, free QR generator, custom QR code, Nishan QR',
    canonical: 'https://www.minderfly.com/store/nishan-qr-generator',
  },
};

export default function NishanQr() {
  return <ProductPageTemplate product={product} />;
}