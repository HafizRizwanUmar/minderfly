import ProductPageTemplate from './ProductPageTemplate';

const product = {
  id: 'debt-settler',
  name: 'Debt Settler',
  tagline: 'Split expenses. Settle debts. Stay friends.',
  desc: 'The free app for managing shared costs between friends, roommates, and travel groups — zero friction, no sign-up, no hidden fees. Available on Android, Windows, and Fire OS.',
  category: 'Finance · Free',
  accent: '#c8f23a',
  badge: null,
  heroIcon: '÷',
  platforms: [
    { label: 'Android (Itch.io)',    sub: 'APK · Free download', href: 'https://hafizrizwanumar.itch.io/debtsettler',  icon: '📱' },
    { label: 'Windows (Microsoft)', sub: 'Windows 10 / 11',     href: 'https://apps.microsoft.com/detail/9N4Z8J2S0SFL?hl=en-us&gl=PK&ocid=pdpshare', icon: '⊞' },
    { label: 'Fire OS (Amazon)',    sub: 'Kindle & Fire Tablet', href: 'https://www.amazon.com/dp/B0GJNKLHXZ/',         icon: '📲' },
  ],
  stats: [
    { value: '10,000+', label: 'Active Users' },
    { value: '4.9 ★',  label: 'Average Rating' },
    { value: 'Free',    label: 'Always & Forever' },
    { value: '3',       label: 'Platforms' },
  ],
  features: [
    { icon: '÷', title: 'Instant Expense Splitting', desc: 'Split any expense equally or by custom percentages. Add participants, set amounts, and Debt Settler calculates who owes what instantly.' },
    { icon: '⟳', title: 'Real-Time Debt Tracking',   desc: 'Running balance per person, always up to date. No spreadsheets, no mental arithmetic — the app keeps the score.' },
    { icon: '✓', title: 'One-Tap Settlement',         desc: 'Mark individual debts or entire balances as settled with a single tap. Clean history, no awkward conversations required.' },
    { icon: '∞', title: 'Completely Free, Forever',   desc: 'No premium tier, no "Pro" features behind a paywall, no ads. Debt Settler is and will remain free for all users.' },
    { icon: '🔒', title: 'Private by Design',         desc: 'Your financial data stays on your device. No account sign-up, no cloud sync, no data sold to third parties.' },
    { icon: '↗', title: 'Export Reports',              desc: "Export a clean PDF or CSV summary of any group's expenses and settlements. Perfect for shared projects and trip reconciliation." },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Debt Settler',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Android, Windows',
    description: 'Debt Settler is a free expense splitting and debt tracking app for Android, Windows, and Fire OS. Split bills, track shared costs, and settle debts instantly.',
    url: 'https://minderfly.com/store/debt-settler',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '312' },
    author: { '@type': 'Organization', name: 'Minderfly', url: 'https://minderfly.com' },
  },
  seo: {
    title: 'Debt Settler — Free Expense Splitting App | Minderfly Store',
    description: 'Debt Settler is a free expense splitting and debt tracking app. Split bills, track shared costs, and settle debts instantly. Available on Android and Windows.',
    keywords: 'expense splitting app, bill splitter, track debts, shared expenses, Debt Settler, free finance app, roommate expense tracker',
    canonical: 'https://minderfly.com/store/debt-settler',
  },
};

export default function DebtSettler() {
  return <ProductPageTemplate product={product} />;
}