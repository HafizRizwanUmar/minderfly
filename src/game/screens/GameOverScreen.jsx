import React from 'react';
import '../styles/game.css';

const GameOverScreen = ({ score, onReplay, onHome, onClaimReward }) => {
    return (
        <div className="mf-game-root">
            <div className="mf-bg-decor">
                <div className="mf-bg-grid-pattern"></div>
            </div>

            <div className="mf-game-modal-overlay">
                <div className="relative w-full max-w-md mx-6">
                    <div className="absolute -inset-1 bg-gradient-to-b from-primary/50 to-white/10 rounded-[2.5rem] blur opacity-25"></div>
                    <div className="relative bg-[#1a2233] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl flex flex-col items-center text-center">

                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                            <span className="material-symbols-outlined text-4xl text-yellow-400 relative z-10">emoji_events</span>
                        </div>

                        <h2 className="text-3xl font-black text-white tracking-wider uppercase mb-2">
                            Round Complete
                        </h2>

                        {/* New Best Badge */}
                        <div className="flex items-center gap-2 mb-8 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                            <span className="text-primary text-xs font-bold uppercase tracking-widest">New Personal Best!</span>
                        </div>

                        <div className="flex flex-col items-center w-full mb-8">
                            <span className="mf-text-label mb-2">Total Score</span>
                            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-primary/50 tracking-tighter drop-shadow-2xl tabular-nums mb-6">
                                {score.toLocaleString()}
                            </span>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <div className="bg-black/50 border border-white/5 rounded-2xl p-3 flex flex-col items-center">
                                    <span className="mf-text-label mb-1">Accuracy</span>
                                    <span className="text-lg font-bold text-white">94%</span>
                                </div>
                                <div className="bg-black/50 border border-white/5 rounded-2xl p-3 flex flex-col items-center">
                                    <span className="mf-text-label mb-1">Streak</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-lg font-bold text-white">42</span>
                                        <span className="material-symbols-outlined text-base text-orange-500">local_fire_department</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <button
                                onClick={onReplay}
                                className="mf-game-btn mf-game-btn-primary rounded-xl"
                            >
                                <span className="material-symbols-outlined group-hover:-rotate-180 transition-transform duration-500">replay</span>
                                PLAY AGAIN
                            </button>

                            {/* Ad Reward Button */}
                            <button
                                onClick={onClaimReward}
                                className="mf-game-btn bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white rounded-xl h-12 text-sm"
                            >
                                <span className="material-symbols-outlined text-yellow-400">stars</span>
                                CLAIM BONUS REWARD
                            </button>

                            <button
                                onClick={onHome}
                                className="mf-game-btn bg-transparent text-slate-500 hover:text-white h-10 text-xs"
                            >
                                BACK TO HOME
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameOverScreen;
