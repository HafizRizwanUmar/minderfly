import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/* ── tokens ── */
const AC   = '#f97316';
const BG   = '#050505';
const WIRE = 'rgba(255,255,255,0.07)';
const MW   = '1280px';
const PAD  = { padding: '0 3rem' };
const DL   = 'https://apps.microsoft.com/detail/9PP98R4WHT3V?hl=en-us&gl=PK&ocid=pdpshare';

/* ── utils ── */
const useReveal = (t = 0.12) => {
  const ref = useRef(null);
  const [v, sv] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { sv(true); obs.disconnect(); } },
      { threshold: t }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
};
const fade = (v, d = 0) => ({
  opacity: v ? 1 : 0,
  transform: v ? 'none' : 'translateY(24px)',
  transition: `opacity .72s ease ${d}ms, transform .72s cubic-bezier(.22,1,.36,1) ${d}ms`,
});
const sLabel = (color = AC) => ({
  display: 'inline-flex', alignItems: 'center', gap: 10,
  fontSize: '.6rem', fontWeight: 700, letterSpacing: '.2em',
  textTransform: 'uppercase', color, marginBottom: '1rem',
});
const sLine = (color = AC) => ({ width: 20, height: 1, background: color, display: 'block' });
const sH2 = () => ({
  fontFamily: 'var(--font-heading)',
  fontSize: 'clamp(1.8rem,3.5vw,3rem)',
  fontWeight: 800, lineHeight: .97, letterSpacing: '-.04em', color: '#fff',
});

/* ── data ── */
const FEATURES = [
  { icon: '⊕', title: 'Merge & Split PDFs',         desc: 'Combine multiple PDFs or extract specific pages. Drag-reorder pages visually before saving — no renumbering needed.' },
  { icon: '✎', title: 'Annotate & Comment',          desc: 'Highlight, sticky notes, shapes, and typed comments. Full annotation toolset for academic review and contract mark-up.' },
  { icon: '✍', title: 'E-Signature & Forms',         desc: 'Sign contracts with drawn, typed, or image signatures. Fill interactive PDF forms and save with one click.' },
  { icon: '🔒', title: '100% Offline & Private',     desc: 'Everything runs locally. No file uploads, no cloud processing, no account required. Your documents stay on your machine.' },
  { icon: '⇆', title: 'Convert & Compress',          desc: 'Convert PDFs to Word, Excel, or images and back. Compress for email without visible quality loss.' },
  { icon: '∞',  title: 'No Daily Limits',            desc: 'Unlike web tools capped at 3 operations per day, Sanad has no usage limits. Merge 50 files, annotate all day — free.' },
];

const STEPS = [
  { n: '01', t: 'Open',    d: 'Drag and drop any PDF or open from File Explorer. No conversion required.' },
  { n: '02', t: 'Edit',    d: 'Annotate, sign, fill forms, merge, or split — all from a single toolbar.' },
  { n: '03', t: 'Preview', d: 'Review changes live in the preview pane before committing.' },
  { n: '04', t: 'Save',    d: 'Export locally. Your original is never overwritten unless you choose.' },
];

const FAQS = [
  { q: 'Why use Sanad over a web-based PDF tool?',    a: 'Web tools upload your files to third-party servers. For financial documents, legal contracts, and medical records — that is a genuine security risk. Sanad processes everything locally. No data ever leaves your machine.' },
  { q: 'Is Sanad free?',                              a: 'Sanad has a generous free tier covering the most common operations: merging, splitting, annotating, and form filling. Pro features (OCR, batch processing) are a one-time purchase, not a subscription.' },
  { q: 'Does it work without internet?',              a: 'Yes, fully offline after installation from the Microsoft Store. No internet connection is required for any operation.' },
  { q: 'What Windows versions are supported?',        a: 'Windows 10 (build 1903+) and Windows 11. The Microsoft Store installation handles updates automatically.' },
];

const appSchema = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'Sanad PDF Editor', applicationCategory: 'BusinessApplication',
  operatingSystem: 'Windows 10, Windows 11',
  description: 'Free Windows PDF editor. Merge, split, annotate, sign, and convert PDFs offline — no uploads, no account, no daily limits.',
  url: 'https://minderfly.com/store/sanad-pdf-editor', downloadUrl: DL,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', reviewCount: '73' },
  author: { '@type': 'Organization', name: 'Minderfly', url: 'https://minderfly.com' },
};
const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

/* ════════════════════════════════
   PDF DEMO COMPONENT
════════════════════════════════ */
const PdfDemo = () => {
  const [file,     setFile]     = useState(null);
  const [url,      setUrl]      = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error,    setError]    = useState('');
  const [viewed,   setViewed]   = useState(false);
  const inputRef = useRef(null);
  const iframeRef = useRef(null);

  const load = useCallback((f) => {
    if (!f) return;
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a PDF file (.pdf)');
      return;
    }
    setError('');
    setFile(f);
    setUrl(prev => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(f); });
    setViewed(false);
  }, []);

  useEffect(() => {
    return () => { if (url) URL.revokeObjectURL(url); };
  }, [url]);

  /* show pitch after a short delay once viewer loads */
  useEffect(() => {
    if (!url) return;
    const t = setTimeout(() => setViewed(true), 3500);
    return () => clearTimeout(t);
  }, [url]);

  const fmtSize = (b) => b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`;
  const reset = () => { setFile(null); setUrl(null); setError(''); setViewed(false); };

  if (!url) return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); load(e.dataTransfer.files[0]); }}
      onClick={() => inputRef.current?.click()}
      tabIndex={0} role="button" aria-label="Drop a PDF or click to browse"
      onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
      style={{
        minHeight: 400, borderRadius: 18, cursor: 'pointer', textAlign: 'center',
        border: `2px dashed ${dragging ? AC : 'rgba(255,255,255,.12)'}`,
        background: dragging ? `rgba(249,115,22,.05)` : 'rgba(255,255,255,.02)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 20, padding: '2.5rem 2rem', transition: 'all .25s',
      }}
    >
      <input ref={inputRef} type="file" accept=".pdf,application/pdf" style={{ display: 'none' }} onChange={e => load(e.target.files[0])} />
      <motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: `rgba(249,115,22,.1)`, border: `1px solid rgba(249,115,22,.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
          📄
        </div>
      </motion.div>
      <div>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.12rem', fontWeight: 800, color: '#fff', letterSpacing: '-.02em', marginBottom: '.4rem' }}>
          Drop a PDF here to preview it
        </p>
        <p style={{ fontSize: '.8rem', fontWeight: 300, color: 'rgba(255,255,255,.36)', lineHeight: 1.65 }}>
          View any PDF instantly in your browser<br/>
          <span style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.2)' }}>Click to browse · File stays on your device · View only</span>
        </p>
      </div>
      {error && <p style={{ fontSize: '.76rem', color: '#f87171' }}>{error}</p>}

      {/* capability pills */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {['View free here', 'Edit in Sanad app', 'Sign offline', 'Merge & split', 'No uploads'].map(t => (
          <span key={t} style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.09)', fontSize: '.62rem', color: 'rgba(255,255,255,.35)' }}>{t}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* file meta row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        <span style={{ padding: '3px 11px', borderRadius: 100, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', fontSize: '.65rem', color: 'rgba(255,255,255,.5)', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          📄 {file.name}
        </span>
        <span style={{ padding: '3px 11px', borderRadius: 100, background: `rgba(249,115,22,.1)`, border: `1px solid rgba(249,115,22,.28)`, fontSize: '.65rem', color: AC, fontWeight: 700 }}>
          {fmtSize(file.size)}
        </span>
        <span style={{ padding: '3px 11px', borderRadius: 100, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.09)', fontSize: '.65rem', color: 'rgba(255,255,255,.4)' }}>
          👁 View Only
        </span>
      </div>

      {/* iframe viewer */}
      <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 24px 60px rgba(0,0,0,.55)' }}>
        {/* chrome bar */}
        <div style={{ height: 36, background: '#111', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ff5f56','#ffbd2e','#27c93f'].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'block' }}/>)}
          </div>
          <span style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.28)', fontFamily: 'monospace' }}>Browser Preview — View Only</span>
          <a href={url} download={file.name} style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.38)', textDecoration: 'none', transition: 'color .2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.38)'}>
            ⬇ Save
          </a>
        </div>
        <iframe
          ref={iframeRef}
          src={`${url}#toolbar=1&navpanes=0&scrollbar=1`}
          title={`PDF preview: ${file.name}`}
          style={{ width: '100%', height: 480, border: 'none', display: 'block', background: '#525659' }}
          aria-label="PDF document viewer"
        />
      </div>

      {/* pitch — shown after viewing delay */}
      {viewed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, ease: [.22,1,.36,1] }}
          style={{ marginTop: 14, padding: '18px 20px', background: `rgba(249,115,22,.06)`, border: `1px solid rgba(249,115,22,.18)`, borderRadius: 13 }}
        >
          <p style={{ fontSize: '.82rem', fontWeight: 600, color: '#fff', marginBottom: '.3rem' }}>
            Want to edit, sign, or merge this PDF?
          </p>
          <p style={{ fontSize: '.76rem', fontWeight: 300, color: 'rgba(255,255,255,.42)', lineHeight: 1.62, marginBottom: '.85rem' }}>
            The browser can only show you the file. Sanad lets you annotate every page, add a digital signature, merge with other documents, or compress it for email — all offline, all free.
          </p>
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href={DL} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 20px', borderRadius: 8, background: AC, color: '#fff', fontSize: '.78rem', fontWeight: 700, textDecoration: 'none', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background = AC; e.currentTarget.style.color = '#fff'; }}>
              ⊞ Download Sanad — Free
            </a>
            <button onClick={reset}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,.12)', borderRadius: 8, padding: '9px 16px', color: 'rgba(255,255,255,.42)', fontSize: '.74rem', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.3)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; e.currentTarget.style.color = 'rgba(255,255,255,.42)'; }}>
              Open another PDF
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* ════════════════════════════════
   PAGE
════════════════════════════════ */
const SanadPdfEditor = () => {
  const [heroRef, heroV] = useReveal(0.05);
  const [demoRef, demoV] = useReveal(0.06);
  const [featRef, featV] = useReveal(0.08);
  const [procRef, procV] = useReveal(0.08);
  const [faqRef,  faqV]  = useReveal(0.08);
  const [ctaRef,  ctaV]  = useReveal(0.12);

  return (
    <>
      <Helmet>
        <title>Sanad PDF Editor — Offline PDF Editor for Windows | Minderfly Store</title>
        <meta name="description" content="Free Windows PDF editor. Merge, split, annotate, sign, and convert PDFs offline — no uploads, no account, no daily limits." />
        <link rel="canonical" href="https://minderfly.com/store/sanad-pdf-editor" />
      </Helmet>

      {/* ── NAV ── */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, height:64, background:'rgba(5,5,5,.9)', backdropFilter:'blur(24px)', borderBottom:`1px solid ${WIRE}`, display:'flex', alignItems:'center', zIndex:1000 }}>
        <div style={{ maxWidth:MW, margin:'0 auto', ...PAD, width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Link to="/store" style={{ fontSize:'.76rem', fontWeight:500, color:'rgba(255,255,255,.32)', textDecoration:'none', transition:'color .2s' }}
            onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,.7)'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.32)'}>← Store</Link>
          <span style={{ fontFamily:'var(--font-heading)', fontSize:'1.2rem', fontWeight:800, letterSpacing:'-.03em', color:'#fff' }}>
            Sanad <span style={{ color:AC }}>PDF</span>
          </span>
          <a href={DL} target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 20px', borderRadius:8, background:AC, color:'#fff', fontSize:'.76rem', fontWeight:700, textDecoration:'none', letterSpacing:'.02em', transition:'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#000'; }}
            onMouseLeave={e => { e.currentTarget.style.background=AC; e.currentTarget.style.color='#fff'; }}>
            ⊞ Free Download
          </a>
        </div>
      </nav>

      <main style={{ background:BG, color:'#fff', fontFamily:'var(--font-body)', paddingTop:64 }}>

        {/* ══ HERO ══ */}
        <section style={{ padding:'80px 0 56px', position:'relative', overflow:'hidden' }} aria-label="Sanad PDF Editor hero">
          <div aria-hidden="true" style={{ position:'absolute', top:'-10%', right:'-5%', width:'55%', height:'80%', background:`radial-gradient(ellipse at 70% 30%,rgba(249,115,22,.07) 0%,transparent 62%)`, pointerEvents:'none' }}/>
          <div aria-hidden="true" style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,.02) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none', maskImage:'radial-gradient(ellipse 70% 60% at 70% 0%,black,transparent)' }}/>

          <div style={{ maxWidth:MW, margin:'0 auto', ...PAD }}>
            <nav aria-label="Breadcrumb" style={{ display:'flex', alignItems:'center', gap:8, fontSize:'.7rem', color:'rgba(255,255,255,.26)', marginBottom:'2.5rem' }}>
              <Link to="/" style={{ color:'rgba(255,255,255,.3)', textDecoration:'none' }}>Home</Link><span>›</span>
              <Link to="/store" style={{ color:'rgba(255,255,255,.3)', textDecoration:'none' }}>Store</Link><span>›</span>
              <span aria-current="page" style={{ color:'rgba(255,255,255,.52)' }}>Sanad PDF Editor</span>
            </nav>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>
              {/* copy */}
              <div ref={heroRef}>
                <div style={{ ...fade(heroV), display:'inline-flex', alignItems:'center', gap:8, padding:'5px 16px', borderRadius:8, background:`rgba(249,115,22,.09)`, border:`1px solid rgba(249,115,22,.22)`, color:AC, fontSize:'.62rem', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', marginBottom:'1.5rem' }}>
                  ✦ Windows App · Free · 100% Offline
                </div>
                <h1 style={{ ...fade(heroV, 55), fontFamily:'var(--font-heading)', fontSize:'clamp(2.4rem,5vw,4.2rem)', fontWeight:800, lineHeight:.95, letterSpacing:'-.05em', color:'#fff', marginBottom:'1.25rem' }}>
                  The offline PDF editor<br/>
                  <span style={{ WebkitTextStroke:'1.5px rgba(255,255,255,.17)', color:'transparent' }}>Windows deserves.</span>
                </h1>
                <p style={{ ...fade(heroV, 110), fontSize:'1rem', fontWeight:300, color:'rgba(255,255,255,.44)', lineHeight:1.72, maxWidth:460, marginBottom:'2.5rem' }}>
                  Merge, split, annotate, sign, and convert PDFs — all locally on your machine. No uploads, no subscriptions, no daily limits. Your documents stay private.
                </p>
                <div style={{ ...fade(heroV, 155), display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
                  <a href={DL} target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'12px 26px', borderRadius:10, background:AC, color:'#fff', fontSize:'.88rem', fontWeight:700, textDecoration:'none', letterSpacing:'.02em', transition:'all .22s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#000'; e.currentTarget.style.transform='translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background=AC; e.currentTarget.style.color='#fff'; e.currentTarget.style.transform='none'; }}>
                    ⊞ Download Free — Microsoft Store
                  </a>
                  <div style={{ display:'flex', alignItems:'center', gap:9, fontSize:'.75rem', color:'rgba(255,255,255,.3)' }}>
                    <span style={{ color:'#fbbf24' }}>★ 4.6</span><span style={{ opacity:.4 }}>·</span>
                    <span>3,000+ Downloads</span><span style={{ opacity:.4 }}>·</span><span>Free</span>
                  </div>
                </div>
              </div>

              {/* app window mockup */}
              <motion.div
                initial={{ opacity:0, x:32, scale:.95 }}
                animate={{ opacity:1, x:0, scale:1 }}
                transition={{ duration:.95, delay:.2, ease:[.22,1,.36,1] }}
                style={{ position:'relative' }}
              >
                <div aria-hidden="true" style={{ position:'absolute', inset:-20, background:`radial-gradient(ellipse at center,rgba(249,115,22,.1) 0%,transparent 62%)`, pointerEvents:'none' }}/>
                <div style={{ position:'relative', borderRadius:18, overflow:'hidden', border:'1px solid rgba(255,255,255,.1)', background:'#0d0d0d', boxShadow:'0 40px 80px rgba(0,0,0,.6)' }}>
                  {/* title bar */}
                  <div style={{ height:40, background:'#111', borderBottom:'1px solid rgba(255,255,255,.07)', display:'flex', alignItems:'center', padding:'0 14px', gap:10 }}>
                    <div style={{ display:'flex', gap:6 }}>{['#ff5f56','#ffbd2e','#27c93f'].map(c => <span key={c} style={{ width:9, height:9, borderRadius:'50%', background:c, display:'block' }}/>)}</div>
                    <span style={{ fontSize:'.66rem', color:'rgba(255,255,255,.28)', fontFamily:'monospace', marginLeft:'auto', marginRight:'auto' }}>Sanad PDF Editor</span>
                  </div>
                  {/* toolbar */}
                  <div style={{ height:42, background:'#161616', borderBottom:'1px solid rgba(255,255,255,.06)', display:'flex', alignItems:'center', padding:'0 14px', gap:8 }}>
                    {['Merge','Split','Annotate','Sign','Convert'].map((t, i) => (
                      <div key={t} style={{ padding:'5px 11px', borderRadius:7, background: i===2?`rgba(249,115,22,.14)`:'rgba(255,255,255,.05)', border:`1px solid ${i===2?`rgba(249,115,22,.3)`:'rgba(255,255,255,.07)'}`, fontSize:'.68rem', fontWeight: i===2?700:400, color: i===2?AC:'rgba(255,255,255,.45)', cursor:'default' }}>{t}</div>
                    ))}
                  </div>
                  {/* doc area */}
                  <div style={{ background:'#525659', padding:'20px', display:'flex', justifyContent:'center', minHeight:280 }}>
                    <div style={{ width:'62%', background:'#fff', borderRadius:4, boxShadow:'0 4px 20px rgba(0,0,0,.4)', padding:'22px', position:'relative' }}>
                      {[78,62,70,55,66,42,58].map((w,i) => (
                        <div key={i} style={{ height:7, borderRadius:3, background:`rgba(0,0,0,${.05+i*.01})`, width:`${w}%`, marginBottom:9 }}/>
                      ))}
                      {/* orange highlight */}
                      <div style={{ height:7, borderRadius:3, background:'rgba(249,115,22,.28)', width:'58%', marginBottom:9 }}/>
                      {/* sticky note */}
                      <div style={{ position:'absolute', top:14, right:-14, width:60, height:52, background:'#fef08a', borderRadius:4, boxShadow:'2px 2px 6px rgba(0,0,0,.2)', padding:'5px 7px' }}>
                        {[80,60,70].map((w,i) => <div key={i} style={{ height:4, background:'rgba(0,0,0,.1)', borderRadius:2, marginBottom:3, width:`${w}%` }}/>)}
                      </div>
                      {/* signature line */}
                      <div style={{ marginTop:18, borderTop:'1px dashed rgba(0,0,0,.18)', paddingTop:10, display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ fontSize:'.55rem', color:'rgba(0,0,0,.3)' }}>Signed:</div>
                        <div style={{ fontFamily:'cursive', fontSize:'.95rem', color:AC, borderBottom:`1px solid rgba(249,115,22,.35)`, paddingBottom:2 }}>H. Rizwan</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ PDF VIEWER DEMO ══ */}
        <section ref={demoRef} style={{ padding:'100px 0', background:'rgba(255,255,255,.013)', borderTop:`1px solid ${WIRE}`, borderBottom:`1px solid ${WIRE}` }} aria-label="Preview a PDF — then see what Sanad adds">
          <div style={{ maxWidth:MW, margin:'0 auto', ...PAD }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1.15fr', gap:'5rem', alignItems:'start' }}>

              {/* copy */}
              <div style={fade(demoV)}>
                <div style={sLabel()}><span style={sLine()}/>Try It Now</div>
                <h2 style={{ ...sH2(), marginBottom:'1rem' }}>
                  Open a PDF<br/><span style={{ color:'rgba(255,255,255,.24)' }}>right here.</span>
                </h2>
                <p style={{ fontSize:'.88rem', fontWeight:300, color:'rgba(255,255,255,.42)', lineHeight:1.72, marginBottom:'1.75rem' }}>
                  Drop any PDF into the viewer to preview it in your browser. Once you've seen what you're working with, discover what Sanad adds on Windows.
                </p>

                {/* feature checklist */}
                <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:'2rem' }}>
                  {[
                    ['View here — free in your browser',  'No download required to preview'],
                    ['Merge, split, and reorder pages',   'Drag-and-drop page visual editor'],
                    ['Annotate, highlight & comment',     'Sticky notes, shapes, free-draw'],
                    ['Sign contracts digitally',          'Drawn, typed, or image signatures'],
                    ['100% offline — no uploads ever',   'Your documents never leave your device'],
                  ].map(([title, sub]) => (
                    <div key={title} style={{ display:'flex', alignItems:'flex-start', gap:11 }}>
                      <div style={{ width:19, height:19, borderRadius:'50%', background:`rgba(249,115,22,.12)`, border:`1px solid rgba(249,115,22,.28)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
                        <span style={{ fontSize:'.52rem', color:AC, fontWeight:700 }}>✓</span>
                      </div>
                      <div>
                        <div style={{ fontSize:'.82rem', fontWeight:500, color:'#fff' }}>{title}</div>
                        <div style={{ fontSize:'.73rem', fontWeight:300, color:'rgba(255,255,255,.3)' }}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ padding:'20px 22px', background:`rgba(249,115,22,.06)`, border:`1px solid rgba(249,115,22,.18)`, borderRadius:13 }}>
                  <p style={{ fontSize:'.8rem', fontWeight:600, color:'#fff', marginBottom:'.32rem' }}>The browser preview is read-only.</p>
                  <p style={{ fontSize:'.75rem', fontWeight:300, color:'rgba(255,255,255,.4)', lineHeight:1.62, marginBottom:'.9rem' }}>
                    You can view the PDF here. For annotating, signing, merging, converting, and compressing — download Sanad for Windows. It's free, works offline, and has no daily limits.
                  </p>
                  <a href={DL} target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 20px', borderRadius:8, background:AC, color:'#fff', fontSize:'.78rem', fontWeight:700, textDecoration:'none', transition:'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#000'; }}
                    onMouseLeave={e => { e.currentTarget.style.background=AC; e.currentTarget.style.color='#fff'; }}>
                    ⊞ Download Sanad Free
                  </a>
                </div>
              </div>

              {/* PDF drop zone / viewer */}
              <div style={fade(demoV, 100)}>
                <PdfDemo />
              </div>
            </div>
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section ref={featRef} style={{ padding:'96px 0' }} aria-label="Features">
          <div style={{ maxWidth:MW, margin:'0 auto', ...PAD }}>
            <div style={{ marginBottom:'4rem', ...fade(featV) }}>
              <div style={sLabel()}><span style={sLine()}/>Features</div>
              <h2 style={{ ...sH2() }}>Everything you need.<br/><span style={{ color:'rgba(255,255,255,.24)' }}>Nothing you don't.</span></h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
              {FEATURES.map((f, i) => (
                <article key={f.title} style={{ ...fade(featV, i*52), background:'rgba(255,255,255,.03)', border:`1px solid ${WIRE}`, borderRadius:15, padding:'24px', transition:'all .25s', cursor:'default' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,.05)'; e.currentTarget.style.borderColor=`rgba(249,115,22,.22)`; e.currentTarget.style.transform='translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,.03)'; e.currentTarget.style.borderColor=WIRE; e.currentTarget.style.transform='none'; }}>
                  <div style={{ width:40, height:40, borderRadius:11, background:`rgba(249,115,22,.09)`, border:`1px solid rgba(249,115,22,.2)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', color:AC, marginBottom:'.9rem' }}>{f.icon}</div>
                  <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'.92rem', fontWeight:700, color:'#fff', marginBottom:'.4rem', letterSpacing:'-.01em' }}>{f.title}</h3>
                  <p style={{ fontSize:'.78rem', fontWeight:300, color:'rgba(255,255,255,.38)', lineHeight:1.7, margin:0 }}>{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROCESS ══ */}
        <section ref={procRef} style={{ padding:'80px 0', background:'rgba(255,255,255,.013)', borderTop:`1px solid ${WIRE}`, borderBottom:`1px solid ${WIRE}` }} aria-label="How it works">
          <div style={{ maxWidth:MW, margin:'0 auto', ...PAD }}>
            <div style={{ textAlign:'center', marginBottom:'3.5rem', ...fade(procV) }}>
              <div style={sLabel()}><span style={sLine()}/>How It Works</div>
              <h2 style={{ ...sH2() }}>Open, edit, save.<br/><span style={{ color:'rgba(255,255,255,.24)' }}>That simple.</span></h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0, position:'relative' }}>
              <div aria-hidden="true" style={{ position:'absolute', top:24, left:'12%', right:'12%', height:1, background:WIRE }}/>
              {STEPS.map((s, i) => (
                <div key={s.n} style={{ padding:'0 18px', paddingTop:52, position:'relative', textAlign:'center', ...fade(procV, i*80) }}>
                  <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:48, height:48, borderRadius:'50%', background:BG, border:`1px solid rgba(255,255,255,.12)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontSize:'.72rem', fontWeight:700, color:AC, zIndex:1, transition:'all .2s', cursor:'default' }}
                    onMouseEnter={e => { e.currentTarget.style.background=AC; e.currentTarget.style.color='#000'; e.currentTarget.style.borderColor=AC; }}
                    onMouseLeave={e => { e.currentTarget.style.background=BG; e.currentTarget.style.color=AC; e.currentTarget.style.borderColor='rgba(255,255,255,.12)'; }}>
                    {s.n}
                  </div>
                  <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'.9rem', fontWeight:700, color:'#fff', marginBottom:'.5rem', letterSpacing:'-.01em' }}>{s.t}</h3>
                  <p style={{ fontSize:'.78rem', fontWeight:300, color:'rgba(255,255,255,.36)', lineHeight:1.65, margin:0 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section ref={faqRef} style={{ padding:'96px 0' }} aria-label="FAQ">
          <div style={{ maxWidth:MW, margin:'0 auto', ...PAD }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'5rem', alignItems:'start' }}>
              <div style={fade(faqV)}>
                <div style={sLabel()}><span style={sLine()}/>FAQ</div>
                <h2 style={{ ...sH2(), marginBottom:'1rem' }}>Common<br/><span style={{ color:'rgba(255,255,255,.24)' }}>questions.</span></h2>
                <p style={{ fontSize:'.82rem', fontWeight:300, color:'rgba(255,255,255,.32)', lineHeight:1.72 }}>
                  More? <a href="mailto:hello@minderfly.com" style={{ color:AC, textDecoration:'none', borderBottom:`1px solid rgba(249,115,22,.35)`, paddingBottom:1 }}>Email us</a>.
                </p>
              </div>
              <div style={{ borderTop:`1px solid ${WIRE}`, ...fade(faqV, 80) }}>
                {FAQS.map(f => (
                  <div key={f.q} style={{ borderBottom:`1px solid ${WIRE}`, padding:'1.1rem 0' }}>
                    <p style={{ fontSize:'.85rem', fontWeight:600, color:'#fff', marginBottom:'.38rem', letterSpacing:'-.01em' }}>{f.q}</p>
                    <p style={{ fontSize:'.8rem', fontWeight:300, color:'rgba(255,255,255,.38)', lineHeight:1.7, margin:0 }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section ref={ctaRef} style={{ padding:'64px 0 110px' }} aria-label="Download Sanad PDF Editor">
          <div style={{ maxWidth:MW, margin:'0 auto', ...PAD }}>
            <div style={{ ...fade(ctaV), position:'relative', borderRadius:20, overflow:'hidden', padding:'80px', background:AC }}>
              <div aria-hidden="true" style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 80% at 88% 50%,rgba(255,255,255,.18) 0%,transparent 60%)', pointerEvents:'none' }}/>
              <div style={{ position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'1fr auto', gap:48, alignItems:'center' }}>
                <div>
                  <div style={{ fontSize:'.6rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(0,0,0,.4)', marginBottom:'1rem' }}>
                    Windows App · Free · Offline
                  </div>
                  <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.8rem,3.5vw,3rem)', fontWeight:800, lineHeight:.97, letterSpacing:'-.04em', color:'#000', marginBottom:'.85rem' }}>
                    Edit PDFs offline.<br/>Keep your data private.
                  </h2>
                  <p style={{ fontSize:'.95rem', fontWeight:300, color:'rgba(0,0,0,.52)', lineHeight:1.72, maxWidth:450 }}>
                    Download Sanad free from the Microsoft Store. No sign-up, no cloud, no daily limits. Your documents stay on your machine.
                  </p>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:10, flexShrink:0 }}>
                  <a href={DL} target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'12px 28px', borderRadius:10, background:'#000', color:'#fff', fontSize:'.86rem', fontWeight:700, textDecoration:'none', letterSpacing:'.02em', whiteSpace:'nowrap', transition:'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='#1a1a1a'; e.currentTarget.style.transform='translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='#000'; e.currentTarget.style.transform='none'; }}>
                    ⊞ Download Free
                  </a>
                  <Link to="/store"
                    style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, padding:'12px 28px', borderRadius:10, background:'none', border:'1px solid rgba(0,0,0,.2)', color:'rgba(0,0,0,.6)', fontSize:'.84rem', textDecoration:'none', letterSpacing:'.02em', transition:'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(0,0,0,.5)'; e.currentTarget.style.color='#000'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,0,0,.2)'; e.currentTarget.style.color='rgba(0,0,0,.6)'; }}>
                    ← Back to Store
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default SanadPdfEditor;