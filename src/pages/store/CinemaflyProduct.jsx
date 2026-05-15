import ProductPageTemplate from './ProductPageTemplate';

const product = {
  id: 'cinemafly',
  name: 'Cinemafly',
  tagline: 'A smarter Windows media player for cinephiles.',
  desc: 'Cinemafly is a lightweight, beautiful media player for Windows — with playlist management, subtitle support, and a distraction-free cinema mode built for movie lovers.',
  category: 'Media · Windows',
  accent: '#e879f9',
  badge: null,
  heroIcon: '🎬',
  platforms: [
    { label: 'Microsoft Store', sub: 'Windows 10 / 11 · Free', href: 'https://apps.microsoft.com/detail/9PP89MW1QX99?hl=en-US&gl=PK', icon: '⊞' },
  ],
  stats: [
    { value: '6,000+', label: 'Downloads' },
    { value: '4.7 ★',  label: 'Rating' },
    { value: 'Free',   label: 'Always' },
    { value: '15+',    label: 'Formats Supported' },
  ],
  features: [
    { icon: '🎬', title: 'Cinema Mode',             desc: 'Full-screen immersive playback with auto-hiding controls. A dedicated mode designed to eliminate all distractions.' },
    { icon: '📋', title: 'Playlist Management',     desc: 'Build and save playlists with drag-and-drop reordering. Queue up entire folders or handpick your selections.' },
    { icon: '💬', title: 'Subtitle Support',         desc: 'Drop-in SRT and ASS subtitle support. Auto-match subtitles by filename or load manually with full styling control.' },
    { icon: '🔊', title: 'Audio Track Selection',   desc: 'Switch between multiple audio tracks on multi-language video files — ideal for foreign films and dubbed content.' },
    { icon: '⚡', title: 'Hardware Acceleration',   desc: 'GPU-accelerated decoding means smooth 4K and HDR playback without draining your CPU or battery life.' },
    { icon: '🎨', title: 'Minimal, Dark UI',        desc: 'Designed to get out of the way. A clean dark interface that puts your content first and controls second.' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Cinemafly',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Windows',
    description: 'Cinemafly is a free Windows media player with cinema mode, playlist management, subtitle support, and hardware-accelerated playback.',
    url: 'https://minderfly.com/store/cinemafly',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', reviewCount: '224' },
    author: { '@type': 'Organization', name: 'Minderfly', url: 'https://minderfly.com' },
  },
  seo: {
    title: 'Cinemafly — Free Windows Media Player | Minderfly Store',
    description: 'Cinemafly is a beautiful free Windows media player with cinema mode, playlist management, and subtitle support. Download free from the Microsoft Store.',
    keywords: 'Windows media player, free video player, cinema mode, subtitle support, Cinemafly, Minderfly player',
    canonical: 'https://minderfly.com/store/cinemafly',
  },
};

export default function CinemaflyProduct() {
  return <ProductPageTemplate product={product} />;
}