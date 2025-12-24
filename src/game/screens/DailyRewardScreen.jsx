import React, { useState } from 'react';
import '../styles/game.css';

const DailyRewardScreen = ({ onClose, onClaim }) => {
    const [doubleReward, setDoubleReward] = useState(false);

    return (
        <div className="mf-game-root items-center justify-center">
            <div className="mf-bg-decor">
                <div className="mf-bg-grid-pattern opacity-20"></div>
            </div>

            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[4px] z-10"></div>

            <main className="relative z-20 w-full max-w-sm md:max-w-md mx-4 animate-[float_6s_ease-in-out_infinite]" style={{ animationDuration: '6s' }}>
                <div className="absolute -inset-1 bg-gradient-to-b from-primary/50 to-blue-600/50 rounded-[2.2rem] blur-xl opacity-40"></div>
                <div className="relative bg-[#101622] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>

                    <div className="pt-8 pb-4 px-6 text-center">
                        <h2 className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-2">Daily Login Bonus</h2>
                        <h1 className="text-3xl font-bold text-white mb-1">Day 4</h1>

                        {/* Progress Dots */}
                        <div className="flex items-center justify-center gap-1.5 mt-4 mb-2">
                            {[...Array(7)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full ${i < 3 ? 'w-6 bg-primary/60' :
                                        i === 3 ? 'w-8 bg-primary shadow-neon ring-1 ring-primary/50 ring-offset-1 ring-offset-[#101622]' :
                                            'w-6 bg-slate-700'
                                        }`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-6 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>

                        <div className="relative z-10 mb-5">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-primary/10 border border-white/10 flex items-center justify-center shadow-neon backdrop-blur-sm group cursor-pointer hover:border-primary/50 transition-colors">
                                <span className="material-symbols-outlined text-6xl text-primary drop-shadow-lg">diamond</span>
                            </div>
                            <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg border-2 border-[#101622] rotate-12">
                                RARE
                            </div>
                        </div>

                        <h3 className="text-4xl font-black text-white tracking-tight drop-shadow-lg">
                            {doubleReward ? 1000 : 500} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">GEMS</span>
                        </h3>
                        <p className="text-slate-400 text-sm mt-1 font-medium">Added to your inventory</p>
                    </div>

                    <div className="p-6 pt-2 space-y-4">
                        {/* Double Reward Toggle */}
                        <label className={`group relative flex items-center gap-4 p-3.5 rounded-2xl border border-dashed transition-all cursor-pointer ${doubleReward ? 'border-yellow-500 bg-yellow-500/10' : 'border-slate-700 hover:border-yellow-500/50 hover:bg-yellow-500/5 bg-slate-900/50'}`}>
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">play_circle</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-white font-semibold text-sm group-hover:text-yellow-400 transition-colors">Double Reward</h4>
                                    <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-1.5 rounded uppercase font-bold tracking-wider">Ad</span>
                                </div>
                                <p className="text-slate-400 text-xs mt-0.5">Watch video to get <span className="text-white font-medium">1000 Gems</span></p>
                            </div>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={doubleReward}
                                    onChange={(e) => setDoubleReward(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-yellow-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </div>
                        </label>

                        <button
                            onClick={() => onClaim(doubleReward)}
                            className="mf-game-btn mf-game-btn-primary rounded-2xl group overflow-hidden"
                        >
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full z-0"></div>
                            <div className="relative z-10 flex items-center justify-center gap-2">
                                <span className="font-bold text-white tracking-wider text-sm md:text-base">CLAIM REWARD</span>
                                <span className="material-symbols-outlined text-white text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </div>
                        </button>

                        <p className="text-center text-[10px] text-slate-500 font-mono">NEXT REWARD IN 23H 59M</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DailyRewardScreen;
