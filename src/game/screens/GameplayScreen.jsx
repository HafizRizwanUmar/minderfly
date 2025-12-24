import React from 'react';
import '../styles/game.css';

const GameplayScreen = ({ score, timeLeft, activeTile, combo, multiplier, onTileClick, onPause }) => {
    // Generate a grid of 16 tiles
    const tiles = Array.from({ length: 16 }, (_, i) => i);

    return (
        <div className="mf-game-root">
            <div className="mf-bg-decor">
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="mf-bg-grid-pattern"></div>
            </div>

            <header className="mf-game-header">
                <div className="flex flex-col items-start gap-1">
                    <span className="mf-text-label">Score</span>
                    <div className="flex items-baseline gap-2">
                        <span className="mf-text-value drop-shadow-lg">{score.toLocaleString()}</span>
                    </div>
                </div>

                <button
                    onClick={onPause}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-2xl">pause</span>
                </button>

                <div className="flex flex-col items-end gap-1">
                    <span className="mf-text-label">Time Left</span>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl animate-pulse">timer</span>
                        <span className="mf-text-value drop-shadow-lg tabular-nums text-2xl md:text-3xl">
                            00:{timeLeft.toString().padStart(2, '0')}
                        </span>
                    </div>
                    <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                        <div
                            className="h-full bg-primary shadow-[0_0_10px_rgba(188,216,72,0.8)] transition-all duration-1000 linear"
                            style={{ width: `${(timeLeft / 60) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="px-4 py-2 flex justify-between items-center max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Combo</span>
                    <span className={`text-xl font-black ${combo > 5 ? 'text-primary' : 'text-white'}`}>x{combo}</span>
                </div>
                {multiplier > 1 && (
                    <div className="flex items-center gap-2 animate-bounce">
                        <span className="px-2 py-1 rounded bg-primary text-black font-black text-xs tracking-wider">MULTIPLIER ACTIVE</span>
                        <span className="text-primary font-black text-xl">x{multiplier}</span>
                    </div>
                )}
            </div>

            <main className="flex-1 relative z-10 flex items-center justify-center p-4 md:p-8">
                <div className="mf-tile-grid">
                    {tiles.map((index) => (
                        <div
                            key={index}
                            onPointerDown={() => onTileClick(index)}
                            className={`mf-tile ${activeTile === index ? 'mf-tile-active' : ''}`}
                        >
                            {activeTile === index && (
                                <>
                                    <div className="absolute inset-0 bg-white/10 rounded-[inherit]"></div>
                                    <div className="absolute inset-2 border-2 border-white/30 rounded-[inherit] opacity-50"></div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <div className="mf-overlay-noise"></div>
        </div >
    );
};

export default GameplayScreen;
