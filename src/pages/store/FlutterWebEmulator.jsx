import ProductPageTemplate from './ProductPageTemplate';

const product = {
  id: 'flutter-web-emulator',
  name: 'Flutter Web Emulator',
  tagline: 'Preview Flutter apps live inside VS Code.',
  desc: 'The VS Code extension that embeds a real Flutter Web preview inside your editor. See your UI update in real-time as you code — no switching windows, no browser tabs.',
  category: 'VS Code Extension',
  accent: '#06b6d4',
  badge: 'v2.9.0',
  heroIcon: '⬡',
  platforms: [
    { label: 'VS Code Marketplace', sub: 'Extension · Free', href: 'https://marketplace.visualstudio.com/items?itemName=HafizRizwanUmar.flutter-web-emulator', icon: '⬡' },
  ],
  stats: [
    { value: '8,000+', label: 'Installs' },
    { value: '4.7 ★',  label: 'Rating' },
    { value: 'v2.9.0', label: 'Latest Version' },
    { value: '0.99$',  label: 'Pro Upgrade' },
  ],
  features: [
    { icon: '⬡', title: 'In-Editor Preview',       desc: 'Flutter Web preview renders directly inside VS Code — no browser, no alt-tab. Stay in the zone while you code.' },
    { icon: '⚡', title: 'Real-Time Hot Reload',    desc: 'See your changes reflected instantly as you type. The emulator hot-reloads your app so the feedback loop is near-zero.' },
    { icon: '📐', title: 'Responsive Device Frames', desc: 'Simulate phone, tablet, and desktop viewports. Switch between device sizes with one click to test responsive layouts.' },
    { icon: '🎨', title: 'Dark & Light Mode',       desc: 'Test your app in both light and dark themes simultaneously without restarting — spot theming issues instantly.' },
    { icon: '🔗', title: 'Deep Workspace Integration', desc: 'Respects your workspace Flutter SDK, pubspec.yaml, and environment variables — no extra config required.' },
    { icon: '↗', title: 'Export Screenshots',       desc: 'Capture a screenshot of your preview at any viewport size and export it directly from the VS Code panel.' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Flutter Web Emulator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Windows, macOS, Linux',
    description: 'VS Code extension for Flutter Web development — live in-editor preview, hot reload, device frames. No browser switching required.',
    url: 'https://www.minderfly.com/store/flutter-web-emulator',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', reviewCount: '156' },
    author: { '@type': 'Organization', name: 'Minderfly', url: 'https://www.minderfly.com' },
  },
  seo: {
    title: 'Flutter Web Emulator — VS Code Extension | Minderfly Store',
    description: 'Preview Flutter Web apps live inside VS Code. Real-time hot reload, device frames, dark/light mode. Free on the VS Code Marketplace.',
    keywords: 'Flutter Web Emulator, VS Code extension, Flutter preview, hot reload, in-editor emulator, Minderfly Flutter extension',
    canonical: 'https://www.minderfly.com/store/flutter-web-emulator',
  },
};

export default function FlutterWebEmulator() {
  return <ProductPageTemplate product={product} />;
}