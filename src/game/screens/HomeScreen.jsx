import React, { useState } from 'react';
import '../styles/game.css';

const HomeScreen = ({ onStart, onSettings, highScore, onLeaderboard }) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className={`mf-game-root relative overflow-hidden ${showHowToPlay ? 'blur-md scale-[0.98]' : ''} transition-all duration-500 ease-out`}>
      {/* Dynamic Background */}
      <div className="mf-bg-decor">
        <div className="mf-bg-blob-primary opacity-60 animate-pulse-slow"></div>
        <div className="mf-bg-blob-secondary opacity-40"></div>
        <div className="mf-bg-grid-pattern"></div>
        <div className="mf-overlay-noise"></div>
      </div>

      <header className="mf-game-header w-full max-w-7xl mx-auto flex justify-between px-4 mt-2">
        {/* Top Left: Home / Website Button */}
        <button
          onClick={() => window.location.href = '/'}
          className="mf-game-btn-icon group bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
          aria-label="Back to Website"
          title="Go to Website"
        >
          <span className="text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform">🏠</span>
        </button>

        {/* Top Right: Settings Button */}
        <button
          onClick={onSettings}
          className="mf-game-btn-icon group bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
          aria-label="Settings"
          title="Settings"
        >
          <span className="text-2xl filter drop-shadow-lg group-hover:rotate-90 transition-transform duration-500">⚙️</span>
        </button>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 w-full max-w-5xl mx-auto text-center">
        {/* Hero Section */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="mf-game-title select-none pointer-events-none drop-shadow-2xl">
            <span className="block text-white tracking-tighter mix-blend-overlay opacity-90">NEON</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#d4f870] to-white relative top-[-0.2em]">RUSH</span>
          </h1>
        </div>

        {/* Primary Stats Card (Real High Score) */}
        <div className="mb-14 group cursor-default">
          <div className="relative px-12 py-6 rounded-[2.5rem] bg-[#121212]/80 backdrop-blur-md border border-white/5 shadow-2xl transition-all duration-300 group-hover:border-primary/30 group-hover:bg-[#151515]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1 rounded-full border border-white/5">
              Personal Record
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/10 flex items-center justify-center border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.15)] ring-1 ring-yellow-500/10">
                <span className="text-3xl filter drop-shadow-md">🏆</span>
              </div>
              <span className="text-5xl md:text-6xl font-black text-white tabular-nums tracking-tighter font-display">
                {(highScore || 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard / Leaderboard Button */}
        <div className="mb-12">
          <button
            onClick={onLeaderboard}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all group"
          >
            <span className="text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform">📊</span>
            <span className="text-sm font-bold text-slate-300 group-hover:text-white uppercase tracking-wider">Dashboard</span>
          </button>
        </div>

        {/* Main Play Button */}
        <div className="flex justify-center w-full mb-16 relative z-20">
          <button
            onClick={onStart}
            className="mf-game-btn-primary group relative w-full max-w-xs md:max-w-md h-24 md:h-28 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(188,216,72,0.3)] hover:shadow-[0_0_60px_rgba(188,216,72,0.5)] border-2 border-primary/50"
            aria-label="Start Game"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            <div className="relative flex items-center justify-center gap-6 h-full">
              <span className="text-3xl md:text-4xl filter drop-shadow-lg group-hover:scale-110 transition-transform">🎮</span>
              <span className="text-2xl md:text-3xl tracking-[0.15em] font-black italic text-[#050505]">PLAY</span>
            </div>
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-auto pb-6 w-full">
          <button
            onClick={() => setShowHowToPlay(true)}
            className="text-[10px] text-slate-500 hover:text-white font-mono tracking-widest uppercase transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <span className="text-base">❔</span> How to Play
          </button>
        </div>
      </main>

      {/* Modern How to Play Modal */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl transition-opacity duration-300">
          <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-[600px] overflow-hidden animate-countdown-pop">
            <button
              onClick={() => setShowHowToPlay(false)}
              className="absolute top-6 right-6 z-30 w-12 h-12 flex items-center justify-center text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-full transition-all hover:rotate-90"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Left Content */}
            <div className="flex-1 p-8 md:p-12 flex flex-col">
              <h2 className="text-4xl font-display font-black text-white mb-2 uppercase italic tracking-tighter">
                Mission <span className="text-primary">Brief</span>
              </h2>
              <p className="text-slate-500 mb-8 font-medium">Master the art of timing.</p>

              <div className="space-y-6 flex-1 overflow-y-auto mf-custom-scrollbar pr-4">
                <StepItem
                  num="01"
                  title="Observe"
                  desc="Watch the grid. Distractions will pulse."
                  icon="visibility"
                />
                <StepItem
                  num="02"
                  title="Wait"
                  desc="Hold for the specific Target Color."
                  icon="timelapse"
                  color="text-yellow-400"
                />
                <StepItem
                  num="03"
                  title="Engage"
                  desc="Tap instantly when valid. Speed is key."
                  icon="touch_app"
                  color="text-primary"
                />
              </div>

              <button
                onClick={() => setShowHowToPlay(false)}
                className="mt-6 w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-colors"
              >
                Understood
              </button>
            </div>

            {/* Right Visual */}
            <div className="hidden md:flex flex-1 bg-[#0f0f0f] relative items-center justify-center border-l border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent opacity-50"></div>
              <div className="relative z-10 text-center">
                <div className="w-40 h-40 mx-auto bg-[#1a1a1a] rounded-[2rem] border border-white/10 flex items-center justify-center shadow-2xl mb-8 relative group cursor-not-allowed">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse-slow"></div>
                  <span className="material-symbols-outlined text-6xl text-primary animate-bounce relative z-10">ads_click</span>
                  <div className="absolute -bottom-4 bg-[#222] text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 shadow-lg">
                    TAP ZONE
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

// Sub-components
const StepItem = ({ num, title, desc, icon, color = 'text-slate-400' }) => (
  <div className="flex gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group">
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-mono text-slate-600 font-bold">{num}</span>
      <div className={`w-10 h-10 rounded-xl bg-[#151515] flex items-center justify-center shadow-inner ${color}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </div>
    <div>
      <h3 className="text-white font-bold text-lg">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default HomeScreen;
