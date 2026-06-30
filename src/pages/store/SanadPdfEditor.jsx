import ProductPageTemplate from './ProductPageTemplate';

const product = {
  id: 'sanad-pdf-editor',
  name: 'Sanad PDF Editor',
  tagline: 'Edit, merge, sign PDFs — fully offline.',
  desc: 'A privacy-first Windows PDF editor. Merge, split, annotate, and sign documents locally — no uploads, no subscriptions, no cloud dependency.',
  category: 'Productivity · Windows',
  accent: '#f97316',
  badge: null,
  heroIcon: '📄',
  platforms: [
    { label: 'Microsoft Store', sub: 'Windows 10 / 11 · Free', href: '/store', icon: '⊞' },
  ],
  stats: [
    { value: '3,000+', label: 'Downloads' },
    { value: '4.6 ★',  label: 'Rating' },
    { value: 'Free',   label: 'Base Tier' },
    { value: '100%',   label: 'Offline' },
  ],
  features: [
    { icon: '📄', title: 'Merge & Split',          desc: 'Combine multiple PDFs into one document or split a large PDF into separate files. Batch processing supported.' },
    { icon: '✏️', title: 'Annotate & Comment',     desc: 'Add text, highlights, boxes, and freehand drawings directly on PDF pages. Review documents without printing.' },
    { icon: '✍️', title: 'Digital Signatures',     desc: 'Draw your signature once and apply it to any document. Timestamp support and visual signature placement.' },
    { icon: '🔒', title: 'Fully Offline',          desc: 'Every operation runs on your device. Your documents are never uploaded, never seen by any server.' },
    { icon: '⬇', title: 'Export & Compress',      desc: 'Export edited PDFs at full quality or compress them for email. PDF/A compliance for archival needs.' },
    { icon: '🔄', title: 'Page Management',        desc: 'Reorder, rotate, delete, or duplicate individual pages. Rearrange your document structure with drag and drop.' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sanad PDF Editor',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Windows',
    description: 'Sanad PDF Editor is a free, offline Windows app for merging, splitting, annotating, and signing PDF documents. No cloud uploads required.',
    url: 'https://www.minderfly.com/store/sanad-pdf-editor',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', reviewCount: '73' },
    author: { '@type': 'Organization', name: 'Minderfly', url: 'https://www.minderfly.com' },
  },
  seo: {
    title: 'Sanad PDF Editor — Free Offline PDF Tool for Windows | Minderfly',
    description: 'Edit, merge, split, annotate, and sign PDFs offline on Windows. No cloud uploads, no subscriptions. Free on the Microsoft Store.',
    keywords: 'PDF editor Windows, merge PDF, split PDF, sign PDF, offline PDF tool, Sanad PDF, free PDF editor',
    canonical: 'https://www.minderfly.com/store/sanad-pdf-editor',
  },
};

export default function SanadPdfEditor() {
  return <ProductPageTemplate product={product} />;
}