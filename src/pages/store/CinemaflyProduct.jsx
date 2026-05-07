import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AC='#a855f7',BG='#050505',WIRE='rgba(255,255,255,0.07)',MW='1280px',PAD={padding:'0 3rem'};
const DL_URL='https://apps.microsoft.com/detail/9P5XW3MZLQB0?hl=en-us&gl=PK&ocid=pdpshare';

const useReveal=(t=0.12)=>{const ref=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);obs.disconnect();}},{threshold:t});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);return[ref,v];};
const fade=(v,d=0)=>({opacity:v?1:0,transform:v?'none':'translateY(24px)',transition:`opacity .72s ease ${d}ms, transform .72s cubic-bezier(.22,1,.36,1) ${d}ms`});

const FORMATS=[{name:'HEVC / H.265',hot:true},{name:'4K HDR',hot:true},{name:'AV1',hot:false},{name:'MKV',hot:false},{name:'H.264',hot:false},{name:'VP9',hot:false},{name:'WEBM',hot:false},{name:'MOV',hot:false},{name:'FLV',hot:false},{name:'MP4',hot:false},{name:'OGG',hot:false},{name:'TS',hot:false}];
const HIGHLIGHTS=[{icon:'⚡',label:'DirectX 12 GPU Decoding',desc:'Hardware-accelerated playback of 4K HDR and HEVC. Smooth on any modern Windows device with minimal CPU load.'},{icon:'🔒',label:'100% Offline & Private',desc:'No telemetry, no accounts, no internet required. Your personal video library stays completely private.'},{icon:'◐',label:'Disappearing UI',desc:'Controls fade away during playback so your content fills the screen. The interface never gets in the way.'},{icon:'🖥',label:'Windows 11 Native',desc:'WinUI design system with dark mode, touch controls, media keys, and taskbar thumbnail previews.'}];
const FEATURES=[{icon:'◷',title:'Smart Subtitles',desc:'Auto-detects .srt/.ass files and embedded tracks. Customise font, size, colour, and position live during playback.'},{icon:'☰',title:'Playlist Manager',desc:'Build and save playlists. Drag to reorder. Your playback position in every file is automatically remembered.'},{icon:'⧉',title:'Picture-in-Picture',desc:'Float the player over any window. Keep watching while you work, browse, or code without losing your place.'},{icon:'♪',title:'Audio Boost & EQ',desc:'Amplify quiet dialogue up to 200%. Dial a 10-band equaliser or choose from cinematic presets.'},{icon:'⤻',title:'Auto-Resume',desc:'Every file remembers its last position. Close and reopen a video days later and continue exactly where you stopped.'},{icon:'⊞',title:'Drag & Drop Open',desc:'Drop any file or entire folder onto the window. Cinemafly builds a full playlist immediately, no dialogs.'}];
const FAQS=[{q:'Does Cinemafly play HEVC without buying the Windows codec extension?',a:'Yes. Cinemafly includes native HEVC and H.265 support. You do not need to purchase the Windows HEVC Video Extensions from the Microsoft Store.'},{q:'Is Cinemafly free?',a:'Yes, completely free. No in-app purchases, no subscription, no hidden fees.'},{q:'Does Cinemafly collect usage data?',a:'No. It works fully offline. No analytics, no account required, no data transmitted to any server.'},{q:'What Windows versions are supported?',a:'Windows 10 (version 1903+) and Windows 11. Optimised for Windows 11 with WinUI and DirectX 12.'}];

const appSchema={'@context':'https://schema.org','@type':'SoftwareApplication',name:'Cinemafly',applicationCategory:'MultimediaApplication',operatingSystem:'Windows 10, Windows 11',description:'Free Windows media player. Plays HEVC, H.265, MKV, 4K HDR, AV1, and 30+ formats without codec packs. GPU accelerated, privacy-first.',url:'https://minderfly.com/store/cinemafly',downloadUrl:DL_URL,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'},aggregateRating:{'@type':'AggregateRating',ratingValue:'4.8',reviewCount:'156'},author:{'@type':'Organization',name:'Minderfly',url:'https://minderfly.com'}};
const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:FAQS.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))};
const bcSchema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://minderfly.com/'},{'@type':'ListItem',position:2,name:'Store',item:'https://minderfly.com/store'},{'@type':'ListItem',position:3,name:'Cinemafly',item:'https://minderfly.com/store/cinemafly'}]};

const btn=(bg,fg,hover_bg,hover_fg)=>({display:'inline-flex',alignItems:'center',gap:9,padding:'12px 26px',borderRadius:10,background:bg,color:fg,fontSize:'.82rem',fontWeight:700,textDecoration:'none',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',letterSpacing:'.02em',transition:'all .2s',whiteSpace:'nowrap'});

/* ── Video Demo ── */
const VideoDemo=()=>{
  const[file,setFile]=useState(null);
  const[url,setUrl]=useState(null);
  const[muted,setMuted]=useState(true);
  const[drag,setDrag]=useState(false);
  const[err,setErr]=useState('');
  const[played,setPlayed]=useState(false);
  const vRef=useRef(null);
  const iRef=useRef(null);

  const load=useCallback((f)=>{
    if(!f)return;
    if(!f.type.startsWith('video/')&&!f.name.match(/\.(mp4|mkv|webm|mov|avi|flv|ogg|ts|hevc|265)$/i)){setErr('Please select a video file');return;}
    setErr('');setFile(f);
    setUrl(p=>{if(p)URL.revokeObjectURL(p);return URL.createObjectURL(f);});
    setPlayed(false);
  },[]);

  useEffect(()=>()=>{if(url)URL.revokeObjectURL(url);},[url]);

  const isH=!!(file?.name?.match(/\.(hevc|265)$/i)||file?.name?.toUpperCase().includes('HEVC'));
  const is4=!!(file?.name?.includes('4K')||file?.name?.includes('4k')||file?.name?.toUpperCase().includes('UHD'));
  const toggleMute=()=>{setMuted(v=>!v);if(vRef.current)vRef.current.muted=!muted;};
  const reset=()=>{setFile(null);setUrl(null);setErr('');setPlayed(false);};

  if(!url)return(
    <div onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
      onDrop={e=>{e.preventDefault();setDrag(false);load(e.dataTransfer.files[0]);}}
      onClick={()=>iRef.current?.click()} tabIndex={0} role="button"
      aria-label="Drop or click to open a video file"
      onKeyDown={e=>e.key==='Enter'&&iRef.current?.click()}
      style={{minHeight:360,borderRadius:18,cursor:'pointer',textAlign:'center',border:`2px dashed ${drag?AC:'rgba(255,255,255,.12)'}`,background:drag?'rgba(168,85,247,.06)':'rgba(255,255,255,.02)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:18,padding:'2.5rem 2rem',transition:'all .25s'}}>
      <input ref={iRef} type="file" accept="video/*,.mkv,.hevc,.265" style={{display:'none'}} onChange={e=>load(e.target.files[0])}/>
      <motion.div animate={{y:[0,-7,0]}} transition={{repeat:Infinity,duration:3,ease:'easeInOut'}}>
        <div style={{width:72,height:72,borderRadius:20,background:'rgba(168,85,247,.12)',border:'1px solid rgba(168,85,247,.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem'}}>▶</div>
      </motion.div>
      <div>
        <p style={{fontFamily:'var(--font-heading)',fontSize:'1.12rem',fontWeight:800,color:'#fff',letterSpacing:'-.02em',marginBottom:'.4rem'}}>Drop a video file here</p>
        <p style={{fontSize:'.8rem',fontWeight:300,color:'rgba(255,255,255,.36)',lineHeight:1.6}}>HEVC · MKV · MP4 · WEBM · MOV · AVI and more<br/><span style={{fontSize:'.7rem',color:'rgba(255,255,255,.2)'}}>Click to browse · File stays on your device</span></p>
      </div>
      {err&&<p style={{fontSize:'.76rem',color:'#f87171'}}>{err}</p>}
      <div style={{display:'flex',gap:6,flexWrap:'wrap',justifyContent:'center'}}>
        {['HEVC','4K HDR','MKV','AV1','H.264'].map(f=>(
          <span key={f} style={{padding:'3px 10px',borderRadius:100,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.09)',fontSize:'.62rem',color:'rgba(255,255,255,.35)'}}>{f}</span>
        ))}
      </div>
    </div>
  );

  return(
    <div>
      <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:10}}>
        <span style={{padding:'3px 11px',borderRadius:100,background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',fontSize:'.65rem',color:'rgba(255,255,255,.5)',maxWidth:220,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>📄 {file.name}</span>
        {isH&&<span style={{padding:'3px 11px',borderRadius:100,background:'rgba(168,85,247,.12)',border:'1px solid rgba(168,85,247,.3)',fontSize:'.65rem',color:AC,fontWeight:700}}>HEVC</span>}
        {is4&&<span style={{padding:'3px 11px',borderRadius:100,background:'rgba(251,191,36,.1)',border:'1px solid rgba(251,191,36,.3)',fontSize:'.65rem',color:'#fbbf24',fontWeight:700}}>4K</span>}
      </div>
      <div style={{borderRadius:14,overflow:'hidden',border:'1px solid rgba(255,255,255,.1)',background:'#000',boxShadow:'0 24px 60px rgba(0,0,0,.6)'}}>
        <div style={{height:36,background:'#111',borderBottom:'1px solid rgba(255,255,255,.07)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 12px'}}>
          <div style={{display:'flex',gap:6}}>{['#ff5f56','#ffbd2e','#27c93f'].map(c=><span key={c} style={{width:9,height:9,borderRadius:'50%',background:c,display:'block'}}/>)}</div>
          <span style={{fontSize:'.6rem',color:'rgba(255,255,255,.28)',fontFamily:'monospace'}}>Browser Preview</span>
          <button onClick={toggleMute} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,.45)',fontSize:'.9rem',padding:2}} aria-label={muted?'Unmute':'Mute'}>{muted?'🔇':'🔊'}</button>
        </div>
        <video ref={vRef} src={url} controls autoPlay muted={muted} playsInline onPlay={()=>setPlayed(true)} style={{width:'100%',maxHeight:340,display:'block',background:'#000'}}/>
      </div>
      {played&&(
        <div style={{marginTop:12,padding:'16px 18px',background:'rgba(168,85,247,.06)',border:'1px solid rgba(168,85,247,.18)',borderRadius:12}}>
          <p style={{fontSize:'.8rem',fontWeight:600,color:'#fff',marginBottom:'.3rem'}}>{isH?'⚠️ HEVC browser support is limited':'🎬 Enjoying the preview?'}</p>
          <p style={{fontSize:'.75rem',fontWeight:300,color:'rgba(255,255,255,.42)',lineHeight:1.6,marginBottom:'.75rem'}}>{isH?'Browsers often lack hardware HEVC decoding. Cinemafly plays every HEVC and H.265 file on Windows with full GPU acceleration — no codec extension required.':'Cinemafly gives you GPU-accelerated 4K, smart subtitles, audio boost, and an immersive dark UI that a browser cannot replicate.'}</p>
          <div style={{display:'flex',gap:9,flexWrap:'wrap',alignItems:'center'}}>
            <a href={DL_URL} target="_blank" rel="noopener noreferrer" style={{...btn(AC,'#fff')}}
              onMouseEnter={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.color='#000';}}
              onMouseLeave={e=>{e.currentTarget.style.background=AC;e.currentTarget.style.color='#fff';}}>⊞ Download Cinemafly Free</a>
            <button onClick={reset} style={{background:'none',border:'1px solid rgba(255,255,255,.12)',borderRadius:8,padding:'9px 16px',color:'rgba(255,255,255,.42)',fontSize:'.74rem',cursor:'pointer',fontFamily:'var(--font-body)',transition:'all .2s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.3)';e.currentTarget.style.color='#fff';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.12)';e.currentTarget.style.color='rgba(255,255,255,.42)';}}>Open another file</button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Page ── */
const CinemaflyProduct=()=>{
  const[muted,setMuted]=useState(true);
  const promoRef=useRef(null);
  const toggleMute=()=>{setMuted(v=>!v);if(promoRef.current)promoRef.current.muted=!muted;};
  const[heroRef,heroV]=useReveal(0.05);
  const[fmtRef,fmtV]=useReveal(0.08);
  const[demoRef,demoV]=useReveal(0.06);
  const[hlRef,hlV]=useReveal(0.08);
  const[featRef,featV]=useReveal(0.08);
  const[faqRef,faqV]=useReveal(0.08);
  const[ctaRef,ctaV]=useReveal(0.12);

  const NavBtn=(props)=>(
    <a {...props} style={{display:'inline-flex',alignItems:'center',gap:8,padding:'8px 20px',borderRadius:8,background:AC,color:'#fff',fontSize:'.76rem',fontWeight:700,textDecoration:'none',letterSpacing:'.02em',transition:'all .2s',...props.style}}
      onMouseEnter={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.color='#000';}}
      onMouseLeave={e=>{e.currentTarget.style.background=AC;e.currentTarget.style.color='#fff';}}/>
  );

  const sLabel=()=>({display:'inline-flex',alignItems:'center',gap:10,fontSize:'.6rem',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:AC,marginBottom:'1rem'});
  const sLine=()=>({width:20,height:1,background:AC,display:'block'});
  const sH2=()=>({fontFamily:'var(--font-heading)',fontSize:'clamp(1.8rem,3.5vw,3rem)',fontWeight:800,lineHeight:.97,letterSpacing:'-.04em',color:'#fff'});

  return(
    <>
      <Helmet>
        <title>Cinemafly — Media Player for HEVC, MKV, 4K HDR | Minderfly Store</title>
        <meta name="description" content="Free Windows media player. Plays HEVC, H.265, MKV, 4K HDR, AV1, and 30+ formats without codec packs. GPU accelerated, privacy-first." />
        <link rel="canonical" href="https://minderfly.com/store/cinemafly" />
      </Helmet>

      {/* NAV */}
      <nav style={{position:'fixed',top:0,left:0,right:0,height:64,background:'rgba(5,5,5,.9)',backdropFilter:'blur(24px)',borderBottom:`1px solid ${WIRE}`,display:'flex',alignItems:'center',zIndex:1000}}>
        <div style={{maxWidth:MW,margin:'0 auto',...PAD,width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link to="/store" style={{fontSize:'.76rem',fontWeight:500,color:'rgba(255,255,255,.32)',textDecoration:'none',transition:'color .2s'}}
            onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,.7)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,.32)'}>← Store</Link>
          <span style={{fontFamily:'var(--font-heading)',fontSize:'1.2rem',fontWeight:800,letterSpacing:'-.03em',color:'#fff'}}>Cinema<span style={{color:AC}}>fly</span></span>
          <NavBtn href={DL_URL} target="_blank" rel="noopener noreferrer">⊞ Free Download</NavBtn>
        </div>
      </nav>

      <main style={{background:BG,color:'#fff',fontFamily:'var(--font-body)',paddingTop:64}}>

        {/* HERO */}
        <section style={{padding:'80px 0 56px',position:'relative',overflow:'hidden'}} aria-label="Cinemafly hero">
          <div aria-hidden="true" style={{position:'absolute',top:'-15%',left:'50%',transform:'translateX(-50%)',width:'80%',height:'100%',background:'radial-gradient(ellipse at 50% 0%,rgba(168,85,247,.11) 0%,transparent 62%)',pointerEvents:'none'}}/>
          <div aria-hidden="true" style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(255,255,255,.022) 1px,transparent 1px)',backgroundSize:'40px 40px',pointerEvents:'none',maskImage:'radial-gradient(ellipse 70% 60% at 50% 0%,black,transparent)'}}/>
          <div style={{maxWidth:MW,margin:'0 auto',...PAD}}>
            <nav aria-label="Breadcrumb" style={{display:'flex',alignItems:'center',gap:8,fontSize:'.7rem',color:'rgba(255,255,255,.26)',marginBottom:'2.5rem'}}>
              <Link to="/" style={{color:'rgba(255,255,255,.3)',textDecoration:'none'}}>Home</Link><span>›</span>
              <Link to="/store" style={{color:'rgba(255,255,255,.3)',textDecoration:'none'}}>Store</Link><span>›</span>
              <span aria-current="page" style={{color:'rgba(255,255,255,.52)'}}>Cinemafly</span>
            </nav>
            <div ref={heroRef} style={{textAlign:'center',maxWidth:800,margin:'0 auto',marginBottom:'4rem'}}>
              <div style={{...fade(heroV),display:'inline-flex',alignItems:'center',gap:8,padding:'5px 16px',borderRadius:8,background:'rgba(168,85,247,.1)',border:'1px solid rgba(168,85,247,.25)',color:AC,fontSize:'.63rem',fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',marginBottom:'1.5rem'}}>▶ Free · Windows 10/11 · Microsoft Store</div>
              <h1 style={{...fade(heroV,55),fontFamily:'var(--font-heading)',fontSize:'clamp(3rem,7vw,6rem)',fontWeight:800,lineHeight:.93,letterSpacing:'-.055em',color:'#fff',marginBottom:'1.25rem'}}>Playback<br/><span style={{WebkitTextStroke:'1.5px rgba(255,255,255,.17)',color:'transparent'}}>without limits.</span></h1>
              <p style={{...fade(heroV,110),fontSize:'1.05rem',fontWeight:300,color:'rgba(255,255,255,.43)',lineHeight:1.7,marginBottom:'2.5rem'}}>The Windows media player that plays everything — HEVC, MKV, 4K HDR, AV1, and 30+ formats — without codec packs, without complexity, without touching your privacy.</p>
              <div style={{...fade(heroV,155),display:'flex',alignItems:'center',justifyContent:'center',gap:14,flexWrap:'wrap'}}>
                <a href={DL_URL} target="_blank" rel="noopener noreferrer"
                  style={{display:'inline-flex',alignItems:'center',gap:10,padding:'13px 30px',borderRadius:10,background:AC,color:'#fff',fontSize:'.9rem',fontWeight:700,textDecoration:'none',letterSpacing:'.02em',transition:'all .22s'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.color='#000';e.currentTarget.style.transform='translateY(-2px)';}}
                  onMouseLeave={e=>{e.currentTarget.style.background=AC;e.currentTarget.style.color='#fff';e.currentTarget.style.transform='none';}}>⊞ Download Free — Microsoft Store</a>
                <div style={{display:'flex',alignItems:'center',gap:9,fontSize:'.76rem',color:'rgba(255,255,255,.33)'}}>
                  <span style={{color:'#fbbf24'}}>★ 4.8</span><span style={{opacity:.4}}>·</span><span>1,000+ Downloads</span><span style={{opacity:.4}}>·</span><span>Free</span>
                </div>
              </div>
            </div>
            {/* Promo video */}
            <motion.div initial={{opacity:0,y:28,scale:.97}} animate={{opacity:1,y:0,scale:1}} transition={{duration:1.1,delay:.2,ease:[.22,1,.36,1]}} style={{maxWidth:980,margin:'0 auto',position:'relative'}}>
              <div aria-hidden="true" style={{position:'absolute',inset:-24,background:'radial-gradient(ellipse at 50% 50%,rgba(168,85,247,.13) 0%,transparent 60%)',pointerEvents:'none'}}/>
              <div style={{position:'relative',borderRadius:18,overflow:'hidden',border:'1px solid rgba(255,255,255,.1)',boxShadow:'0 48px 96px rgba(0,0,0,.75)'}}>
                <div style={{height:44,background:'#0e0e0e',borderBottom:'1px solid rgba(255,255,255,.07)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px'}}>
                  <div style={{display:'flex',gap:7}}>{['#ff5f56','#ffbd2e','#27c93f'].map(c=><span key={c} style={{width:10,height:10,borderRadius:'50%',background:c,display:'block'}}/>)}</div>
                  <span style={{fontSize:'.66rem',color:'rgba(255,255,255,.26)',fontFamily:'monospace'}}>Cinemafly Player</span>
                  <button onClick={toggleMute} aria-label={muted?'Unmute':'Mute'} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,.42)',fontSize:'1rem',padding:4}}>{muted?'🔇':'🔊'}</button>
                </div>
                <video ref={promoRef} src="/cinemafly_launch.mp4" autoPlay loop muted={muted} playsInline style={{width:'100%',height:'auto',display:'block',background:'#000',aspectRatio:'16/9'}}/>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FORMAT GRID */}
        <section ref={fmtRef} style={{padding:'96px 0',background:'rgba(255,255,255,.013)',borderTop:`1px solid ${WIRE}`,borderBottom:`1px solid ${WIRE}`}} aria-label="Supported video formats">
          <div style={{maxWidth:MW,margin:'0 auto',...PAD}}>
            <div style={{textAlign:'center',marginBottom:'3.5rem',...fade(fmtV)}}>
              <div style={sLabel()}><span style={sLine()}/>Universal Compatibility</div>
              <h2 style={{...sH2(),marginBottom:'.75rem'}}>Plays everything.<br/><span style={{color:'rgba(255,255,255,.24)'}}>Literally.</span></h2>
              <p style={{fontSize:'.88rem',fontWeight:300,color:'rgba(255,255,255,.35)',maxWidth:420,margin:'0 auto'}}>No codec packs. No $0.99 extension. Drop the file — it plays.</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8}}>
              {FORMATS.map((f,i)=>(
                <div key={f.name} style={{...fade(fmtV,i*28),position:'relative',background:'rgba(255,255,255,.03)',border:`1px solid ${f.hot?'rgba(168,85,247,.22)':'rgba(255,255,255,.07)'}`,borderRadius:12,padding:'18px 8px',textAlign:'center',transition:'all .22s',cursor:'default'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(168,85,247,.09)';e.currentTarget.style.borderColor='rgba(168,85,247,.35)';e.currentTarget.style.transform='translateY(-3px)';}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.03)';e.currentTarget.style.borderColor=f.hot?'rgba(168,85,247,.22)':'rgba(255,255,255,.07)';e.currentTarget.style.transform='none';}}>
                  {f.hot&&<span style={{position:'absolute',top:-1,right:-1,fontSize:'.52rem',fontWeight:700,color:'#000',background:AC,borderRadius:'0 10px 0 6px',padding:'2px 6px',letterSpacing:'.06em'}}>HOT</span>}
                  <span style={{fontFamily:'var(--font-heading)',fontSize:'.82rem',fontWeight:800,color:'#fff',letterSpacing:'-.02em'}}>{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE DEMO */}
        <section ref={demoRef} style={{padding:'100px 0'}} aria-label="Try Cinemafly — open a video file">
          <div style={{maxWidth:MW,margin:'0 auto',...PAD}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1.1fr',gap:'5rem',alignItems:'start'}}>
              <div style={fade(demoV)}>
                <div style={sLabel()}><span style={sLine()}/>Try It Now</div>
                <h2 style={{...sH2(),marginBottom:'1rem'}}>Open a video<br/><span style={{color:'rgba(255,255,255,.24)'}}>right here.</span></h2>
                <p style={{fontSize:'.88rem',fontWeight:300,color:'rgba(255,255,255,.42)',lineHeight:1.72,marginBottom:'1.75rem'}}>Drop any video file — including HEVC, MKV, and 4K — into the player on the right. The full Cinemafly experience runs natively on Windows with hardware GPU decoding.</p>
                {[['Native HEVC / H.265 playback','No $0.99 Windows codec extension'],['4K HDR with DirectX 12 GPU','Smooth on any modern Windows device'],['Immersive full-screen dark UI','Controls vanish while you\'re watching'],['Drop any file or folder','Instant playlist, no dialogs']].map(([t,s])=>(
                  <div key={t} style={{display:'flex',alignItems:'flex-start',gap:11,marginBottom:11}}>
                    <div style={{width:19,height:19,borderRadius:'50%',background:'rgba(168,85,247,.12)',border:'1px solid rgba(168,85,247,.28)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2}}>
                      <span style={{fontSize:'.52rem',color:AC,fontWeight:700}}>✓</span>
                    </div>
                    <div><div style={{fontSize:'.83rem',fontWeight:500,color:'#fff'}}>{t}</div><div style={{fontSize:'.73rem',fontWeight:300,color:'rgba(255,255,255,.3)'}}>{s}</div></div>
                  </div>
                ))}
                <div style={{marginTop:'1.5rem',padding:'20px 22px',background:'rgba(168,85,247,.06)',border:'1px solid rgba(168,85,247,.18)',borderRadius:13}}>
                  <p style={{fontSize:'.8rem',fontWeight:600,color:'#fff',marginBottom:'.32rem'}}>This preview has browser limitations.</p>
                  <p style={{fontSize:'.75rem',fontWeight:300,color:'rgba(255,255,255,.4)',lineHeight:1.62,marginBottom:'.9rem'}}>For full HEVC decoding, 4K HDR, subtitles, playlists, audio boost, and hardware acceleration — download the full Cinemafly app free.</p>
                  <a href={DL_URL} target="_blank" rel="noopener noreferrer"
                    style={{display:'inline-flex',alignItems:'center',gap:8,padding:'9px 20px',borderRadius:8,background:AC,color:'#fff',fontSize:'.78rem',fontWeight:700,textDecoration:'none',transition:'all .2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.color='#000';}}
                    onMouseLeave={e=>{e.currentTarget.style.background=AC;e.currentTarget.style.color='#fff';}}>⊞ Download Cinemafly Free</a>
                </div>
              </div>
              <div style={fade(demoV,100)}><VideoDemo/></div>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section ref={hlRef} style={{padding:'96px 0',background:'rgba(255,255,255,.013)',borderTop:`1px solid ${WIRE}`,borderBottom:`1px solid ${WIRE}`}} aria-label="Key advantages">
          <div style={{maxWidth:MW,margin:'0 auto',...PAD}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
              {HIGHLIGHTS.map((h,i)=>(
                <div key={h.label} style={{...fade(hlV,i*80),background:'rgba(255,255,255,.03)',border:`1px solid ${WIRE}`,borderRadius:18,padding:'32px',display:'flex',gap:18,alignItems:'flex-start',transition:'all .25s',cursor:'default'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(168,85,247,.055)';e.currentTarget.style.borderColor='rgba(168,85,247,.22)';e.currentTarget.style.transform='translateY(-3px)';}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.03)';e.currentTarget.style.borderColor=WIRE;e.currentTarget.style.transform='none';}}>
                  <div style={{width:48,height:48,borderRadius:13,background:'rgba(168,85,247,.1)',border:'1px solid rgba(168,85,247,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',flexShrink:0}}>{h.icon}</div>
                  <div>
                    <h3 style={{fontFamily:'var(--font-heading)',fontSize:'.97rem',fontWeight:700,color:'#fff',marginBottom:'.45rem',letterSpacing:'-.01em'}}>{h.label}</h3>
                    <p style={{fontSize:'.8rem',fontWeight:300,color:'rgba(255,255,255,.4)',lineHeight:1.7,margin:0}}>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section ref={featRef} style={{padding:'96px 0'}} aria-label="Full features">
          <div style={{maxWidth:MW,margin:'0 auto',...PAD}}>
            <div style={{textAlign:'center',marginBottom:'3.5rem',...fade(featV)}}>
              <div style={sLabel()}><span style={sLine()}/>Features</div>
              <h2 style={sH2()}>But wait, there's more.</h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
              {FEATURES.map((f,i)=>(
                <article key={f.title} style={{...fade(featV,i*50),background:'rgba(255,255,255,.03)',border:`1px solid ${WIRE}`,borderRadius:15,padding:'24px',transition:'all .25s',cursor:'default'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.05)';e.currentTarget.style.borderColor='rgba(168,85,247,.22)';e.currentTarget.style.transform='translateY(-3px)';}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.03)';e.currentTarget.style.borderColor=WIRE;e.currentTarget.style.transform='none';}}>
                  <div style={{width:40,height:40,borderRadius:11,background:'rgba(168,85,247,.1)',border:'1px solid rgba(168,85,247,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',color:AC,marginBottom:'.9rem'}}>{f.icon}</div>
                  <h3 style={{fontFamily:'var(--font-heading)',fontSize:'.92rem',fontWeight:700,color:'#fff',marginBottom:'.4rem',letterSpacing:'-.01em'}}>{f.title}</h3>
                  <p style={{fontSize:'.78rem',fontWeight:300,color:'rgba(255,255,255,.38)',lineHeight:1.7,margin:0}}>{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERT INSIGHTS / SEO SECTION */}
        <section style={{padding:'96px 0',background:'rgba(255,255,255,.005)',borderTop:`1px solid ${WIRE}`}} aria-label="Deep dive into Cinemafly technology">
          <div style={{maxWidth:MW,margin:'0 auto',...PAD}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:'5rem',alignItems:'start'}}>
              <div>
                <div style={sLabel()}><span style={sLine()}/>Expert Insights</div>
                <h2 style={{...sH2(),marginBottom:'1.5rem'}}>Why we built<br/><span style={{color:'rgba(255,255,255,.24)'}}>Cinemafly Pro.</span></h2>
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  {[
                    {t:'Technical Friction',d:'Stop struggling with "Missing Codec" errors and external extensions.'},
                    {t:'Privacy First',d:'100% offline playback with zero data tracking or telemetry.'},
                    {t:'Cinema Grade',d:'Professional audio passthrough for Dolby Atmos & DTS-HD.'}
                  ].map(item=>(
                    <div key={item.t} style={{padding:'16px',background:'rgba(255,255,255,.02)',border:`1px solid ${WIRE}`,borderRadius:12}}>
                      <div style={{fontSize:'.85rem',fontWeight:700,color:'#fff',marginBottom:4}}>{item.t}</div>
                      <div style={{fontSize:'.75rem',fontWeight:300,color:'rgba(255,255,255,.35)',lineHeight:1.5}}>{item.d}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{color:'rgba(255,255,255,.45)',fontSize:'.92rem',lineHeight:1.8,fontWeight:300}}>
                <h3 style={{fontFamily:'var(--font-heading)',fontSize:'1.5rem',fontWeight:700,color:'#fff',marginBottom:'1.5rem',letterSpacing:'-.02em'}}>The Modern Way to Experience 4K Media on Windows 11</h3>
                <p style={{marginBottom:'1.5rem'}}>
                  In an era where 4K Ultra HD and HEVC (H.265) are the standard, Windows users are often met with "Missing Codec" errors. 
                  <strong> Cinemafly Pro</strong> eliminates this friction by providing a premium, lightweight engine designed specifically for high-efficiency video playback.
                </p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32,marginBottom:'1.5rem'}}>
                  <div>
                    <h4 style={{fontSize:'.9rem',fontWeight:700,color:'#fff',marginBottom:8}}>Native Performance</h4>
                    <p style={{fontSize:'.85rem'}}>Seamlessly play MKV, MP4, AV1, and HEVC files with full hardware acceleration. Enjoy smooth playback while using minimal system resources.</p>
                  </div>
                  <div>
                    <h4 style={{fontSize:'.9rem',fontWeight:700,color:'#fff',marginBottom:8}}>Cinema-Grade Sound</h4>
                    <p style={{fontSize:'.85rem'}}>Experience immersive audio with automatic passthrough for Dolby Atmos and DTS-HD. Perfect for professional home theater setups.</p>
                  </div>
                </div>
                <p style={{marginBottom:'1.5rem'}}>
                  Unlike many "free" players that bundle telemetry or drain battery life, Cinemafly is 100% privacy-first and optimized for Windows 11 Fluent UI. 
                  It includes professional tools to trim and compress your files without losing quality, making it the ultimate native experience for 2026.
                </p>
                <div style={{padding:'20px',background:'rgba(168,85,247,.06)',border:'1px solid rgba(168,85,247,.2)',borderRadius:14}}>
                  <p style={{fontSize:'.88rem',color:'#fff',margin:0}}>
                    <strong>Keywords:</strong> HEVC Player, 4K Video Player, H.265 Codec, MKV Player, Dolby Atmos, Video Converter, AV1 Player
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={faqRef} style={{padding:'96px 0',background:'rgba(255,255,255,.013)',borderTop:`1px solid ${WIRE}`,borderBottom:`1px solid ${WIRE}`}} aria-label="FAQ">
          <div style={{maxWidth:MW,margin:'0 auto',...PAD}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:'5rem',alignItems:'start'}}>
              <div style={fade(faqV)}>
                <div style={sLabel()}><span style={sLine()}/>FAQ</div>
                <h2 style={{...sH2(),marginBottom:'1rem'}}>Common<br/><span style={{color:'rgba(255,255,255,.24)'}}>questions.</span></h2>
                <p style={{fontSize:'.82rem',fontWeight:300,color:'rgba(255,255,255,.32)',lineHeight:1.72}}>More? <a href="mailto:hello@minderfly.com" style={{color:AC,textDecoration:'none',borderBottom:'1px solid rgba(168,85,247,.35)',paddingBottom:1}}>Email us</a>.</p>
              </div>
              <div style={{borderTop:`1px solid ${WIRE}`,...fade(faqV,80)}}>
                {FAQS.map(f=>(
                  <div key={f.q} style={{borderBottom:`1px solid ${WIRE}`,padding:'1.1rem 0'}}>
                    <p style={{fontSize:'.85rem',fontWeight:600,color:'#fff',marginBottom:'.38rem',letterSpacing:'-.01em'}}>{f.q}</p>
                    <p style={{fontSize:'.8rem',fontWeight:300,color:'rgba(255,255,255,.38)',lineHeight:1.7,margin:0}}>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section ref={ctaRef} style={{padding:'64px 0 110px'}} aria-label="Download Cinemafly">
          <div style={{maxWidth:MW,margin:'0 auto',...PAD}}>
            <div style={{...fade(ctaV),position:'relative',borderRadius:20,overflow:'hidden',padding:'80px',background:'linear-gradient(135deg,#1a0a2e 0%,#0d0d0d 60%)'}}>
              <div aria-hidden="true" style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 55% 85% at 82% 50%,rgba(168,85,247,.24) 0%,transparent 60%)',pointerEvents:'none'}}/>
              <div aria-hidden="true" style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(168,85,247,.5),transparent)'}}/>
              <div style={{position:'relative',zIndex:1,display:'grid',gridTemplateColumns:'1fr auto',gap:48,alignItems:'center'}}>
                <div>
                  <div style={sLabel()}><span style={sLine()}/>Available Now · Free</div>
                  <h2 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1.8rem,3.5vw,3.2rem)',fontWeight:800,lineHeight:.97,letterSpacing:'-.04em',color:'#fff',marginBottom:'.85rem'}}>Your media.<br/>Finally free to play.</h2>
                  <p style={{fontSize:'.92rem',fontWeight:300,color:'rgba(255,255,255,.42)',lineHeight:1.72,maxWidth:450}}>Download Cinemafly free from the Microsoft Store. No trials, no paywalls, no codec hunting. Open your files and watch.</p>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:10,flexShrink:0}}>
                  <a href={DL_URL} target="_blank" rel="noopener noreferrer"
                    style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 28px',borderRadius:10,background:AC,color:'#fff',fontSize:'.86rem',fontWeight:700,textDecoration:'none',letterSpacing:'.02em',whiteSpace:'nowrap',transition:'all .2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.color='#000';e.currentTarget.style.transform='translateY(-2px)';}}
                    onMouseLeave={e=>{e.currentTarget.style.background=AC;e.currentTarget.style.color='#fff';e.currentTarget.style.transform='none';}}>⊞ Get on Microsoft Store</a>
                  <Link to="/store"
                    style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:8,padding:'12px 28px',borderRadius:10,background:'none',border:`1px solid rgba(255,255,255,.12)`,color:'rgba(255,255,255,.42)',fontSize:'.84rem',textDecoration:'none',letterSpacing:'.02em',transition:'all .2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.3)';e.currentTarget.style.color='#fff';}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.12)';e.currentTarget.style.color='rgba(255,255,255,.42)';}}>← Back to Store</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default CinemaflyProduct;