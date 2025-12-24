import React from 'react';
import '../styles/game.css';

const SettingsScreen = ({ onClose }) => {
    return (
        <div className="mf-game-root">
            <div className="mf-bg-decor">
                <div className="mf-bg-blob-primary" style={{ top: '-20%' }}></div>
                <div className="mf-bg-blob-secondary" style={{ bottom: '-20%' }}></div>
            </div>

            <header className="mf-game-header">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary border border-primary/20">
                        <span className="material-symbols-outlined text-lg">bolt</span>
                    </div>
                    <h2 className="text-white text-sm md:text-base font-bold tracking-wide uppercase opacity-90">
                        System Layout
                    </h2>
                </div>
                <button
                    onClick={onClose}
                    className="mf-game-btn-icon bg-white/5 hover:bg-white/10"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </header>

            <main className="relative z-10 flex flex-1 flex-col items-center pt-6 pb-10 px-4 w-full max-w-2xl mx-auto overflow-y-auto mf-custom-scrollbar">
                <div className="w-full mb-8 flex items-center justify-between">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display uppercase italic">Settings</h1>
                </div>

                <div className="w-full space-y-4">
                    {/* Sound Toggle */}
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400">
                                <span className="material-symbols-outlined">volume_up</span>
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Sound Effects</h3>
                                <p className="text-slate-400 text-xs md:text-sm mt-0.5">In-game audio and interactions</p>
                            </div>
                        </div>
                        <label className="inline-flex items-center cursor-pointer relative">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-12 h-7 bg-slate-700 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                    </div>

                    {/* Haptic Toggle */}
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400">
                                <span className="material-symbols-outlined">vibration</span>
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Haptic Feedback</h3>
                                <p className="text-slate-400 text-xs md:text-sm mt-0.5">Vibration on tapping buttons</p>
                            </div>
                        </div>
                        <label className="inline-flex items-center cursor-pointer relative">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-12 h-7 bg-slate-700 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                    </div>

                    <div className="py-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                    </div>

                    {/* Reset Progress */}
                    <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-red-500/10 hover:border-red-500/30 group transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">delete_forever</span>
                            </div>
                            <div className="text-left">
                                <h3 className="text-red-400 font-medium group-hover:text-red-300 transition-colors">Reset Progress</h3>
                                <p className="text-slate-400 text-xs md:text-sm mt-0.5 group-hover:text-red-300/70 transition-colors">Clear your personal best score</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-600 group-hover:text-red-400 transition-colors">chevron_right</span>
                    </button>
                </div>

                <div className="mt-auto pt-10 pb-4 text-center">
                    <p className="text-slate-600 text-xs font-mono uppercase tracking-widest">Version 1.2.0</p>
                </div>
            </main>
        </div>
    );
};

export default SettingsScreen;
