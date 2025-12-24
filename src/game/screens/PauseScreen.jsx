import React from 'react';
import '../styles/game.css';

const PauseScreen = ({ onResume, onQuit }) => {
    return (
        <div className="mf-game-modal-overlay">
            <div className="relative w-full max-w-sm mx-6">
                <div className="absolute -inset-1 bg-gradient-to-b from-primary/50 to-white/10 rounded-[2.5rem] blur opacity-25"></div>
                <div className="relative bg-[#1a2233] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl flex flex-col items-center text-center">

                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                        <span className="material-symbols-outlined text-4xl text-primary drop-shadow-[0_0_10px_rgba(188,216,72,0.8)]">pause</span>
                    </div>

                    <h2 className="text-3xl font-black text-white tracking-wider uppercase mb-2 drop-shadow-lg">
                        Game Paused
                    </h2>
                    <p className="text-slate-400 text-sm font-medium mb-8 uppercase tracking-widest">
                        Ready to continue?
                    </p>

                    <div className="flex flex-col gap-4 w-full">
                        <button
                            onClick={onResume}
                            className="mf-game-btn mf-game-btn-primary rounded-xl"
                        >
                            <span className="material-symbols-outlined animate-pulse">play_arrow</span>
                            RESUME
                        </button>
                        <button
                            onClick={onQuit}
                            className="mf-game-btn bg-transparent hover:bg-white/5 border border-white/10 text-slate-400 hover:text-white rounded-xl h-16 w-full text-lg"
                        >
                            <span className="material-symbols-outlined">close</span>
                            QUIT
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PauseScreen;
