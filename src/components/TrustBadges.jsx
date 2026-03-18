import { FaChrome, FaWindows, FaGooglePlay, FaAppStore, FaItchIo, FaAmazon } from 'react-icons/fa';

/* ═══════════════════════════════════════════════
   TrustBadges — Minderfly
   Infinite dual-row ticker · editorial dark
   Platform availability strip
═══════════════════════════════════════════════ */

const PLATFORMS = [
  { Icon: FaChrome,     label: 'Chrome Web Store',   href: 'https://chrome.google.com/webstore' },
  { Icon: FaWindows,    label: 'Microsoft Store',     href: 'https://apps.microsoft.com'         },
  { Icon: FaGooglePlay, label: 'Google Play',         href: 'https://play.google.com'            },
  { Icon: FaItchIo,     label: 'Itch.io',             href: 'https://itch.io'                    },
  { Icon: FaAmazon,     label: 'Amazon Appstore',     href: 'https://amazon.com/appstore'        },
  { Icon: FaWindows,    label: 'VS Code Marketplace', href: 'https://marketplace.visualstudio.com' },
];

const TrustBadges = () => (
  <>
    <style>{`
      .tb-section {
        padding: 0;
        background: #050505;
        position: relative;
        overflow: hidden;
        border-top:    1px solid rgba(255,255,255,.06);
        border-bottom: 1px solid rgba(255,255,255,.06);
        font-family: var(--font-body, 'DM Sans', sans-serif);
      }

      /* Fade edges */
      .tb-section::before,
      .tb-section::after {
        content: '';
        position: absolute;
        top: 0; bottom: 0;
        width: 140px;
        z-index: 2;
        pointer-events: none;
      }
      .tb-section::before { left:0;  background: linear-gradient(to right, #050505, transparent); }
      .tb-section::after  { right:0; background: linear-gradient(to left,  #050505, transparent); }

      /* Label row */
      .tb-label-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        padding: 18px 0 14px;
        border-bottom: 1px solid rgba(255,255,255,.05);
      }

      .tb-label {
        font-family: 'IBM Plex Mono', monospace;
        font-size: .6rem;
        font-weight: 700;
        letter-spacing: .2em;
        text-transform: uppercase;
        color: rgba(255,255,255,.22);
      }

      .tb-label-line {
        width: 32px;
        height: 1px;
        background: rgba(255,255,255,.12);
        display: block;
      }

      /* Ticker rows */
      .tb-ticker-wrap {
        padding: 6px 0 18px;
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .tb-track {
        display: flex;
        gap: 0;
        width: max-content;
        padding: 10px 0;
        align-items: center;
      }

      .tb-track.row-fwd { animation: tb-fwd 28s linear infinite; }
      .tb-track.row-rev { animation: tb-rev 32s linear infinite; }

      .tb-track:hover { animation-play-state: paused; }

      @keyframes tb-fwd {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }

      @keyframes tb-rev {
        from { transform: translateX(-50%); }
        to   { transform: translateX(0); }
      }

      /* Individual item */
      .tb-item {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 0 36px;
        font-size: .8rem;
        font-weight: 600;
        color: rgba(255,255,255,.3);
        text-decoration: none;
        letter-spacing: .04em;
        border-right: 1px solid rgba(255,255,255,.06);
        transition: color .22s;
        white-space: nowrap;
        cursor: pointer;
      }

      .tb-item:hover { color: rgba(255,255,255,.75); }

      .tb-item svg {
        font-size: 1.2rem;
        flex-shrink: 0;
        transition: color .22s;
        color: rgba(255,255,255,.22);
      }

      .tb-item:hover svg { color: #c8f23a; }

      /* Separator dot */
      .tb-dot {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: rgba(255,255,255,.12);
        flex-shrink: 0;
        margin: 0 -2px;
      }

      /* Rating badge */
      .tb-rating {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 0 36px;
        font-family: 'IBM Plex Mono', monospace;
        font-size: .65rem;
        font-weight: 700;
        color: rgba(255,255,255,.22);
        letter-spacing: .08em;
        border-right: 1px solid rgba(255,255,255,.06);
        white-space: nowrap;
      }

      .tb-stars { color: #fbbf24; letter-spacing: 1px; }

      @media (max-width: 768px) {
        .tb-item { padding: 0 24px; font-size: .75rem; }
        .tb-label-row { padding: 14px 0 12px; }
      }
    `}</style>

    <section
      className="tb-section"
      aria-label="Minderfly products available on major platforms"
    >
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Minderfly',
        url: 'https://minderfly.com',
        availableChannel: PLATFORMS.map(p => ({
          '@type': 'ServiceChannel',
          name: p.label,
          serviceUrl: p.href,
        })),
      })}}/>

      {/* Label */}
      <div className="tb-label-row">
        <span className="tb-label-line" aria-hidden="true"/>
        <p className="tb-label">Available on trusted platforms</p>
        <span className="tb-label-line" aria-hidden="true"/>
      </div>

      {/* Ticker rows */}
      <div className="tb-ticker-wrap" aria-hidden="true">
        {/* Row 1 — forward */}
        <div className="tb-track row-fwd">
          {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
            <a
              key={i}
              href={p.href}
              className="tb-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p.Icon/>
              {p.label}
            </a>
          ))}
          {/* Rating badge */}
          <span className="tb-rating">
            <span className="tb-stars">★★★★★</span> 4.8 avg rating
          </span>
          {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
            <a key={`r-${i}`} href={p.href} className="tb-item" target="_blank" rel="noopener noreferrer">
              <p.Icon/>
              {p.label}
            </a>
          ))}
        </div>
      </div>

      {/* Accessible hidden list for SEO */}
      <ul style={{ display:'none' }} aria-label="Platforms">
        {PLATFORMS.map(p => (
          <li key={p.label}>
            <a href={p.href} target="_blank" rel="noopener noreferrer">{p.label}</a>
          </li>
        ))}
      </ul>
    </section>
  </>
);

export default TrustBadges;