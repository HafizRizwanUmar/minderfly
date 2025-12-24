import React from 'react';
import '../styles/game.css';

const LeaderboardScreen = ({ onClose }) => {
    const leaderboardData = [
        { rank: 1, name: 'Kairos', score: 128450, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
        { rank: 2, name: 'Vortex', score: 115200, color: 'text-slate-300', bg: 'bg-slate-400/20' },
        { rank: 3, name: 'Nebula', score: 98900, color: 'text-orange-400', bg: 'bg-orange-700/20' },
        { rank: 4, name: 'Synthetix', score: 84320 },
        { rank: 5, name: 'GlitchMod', score: 81050 },
        { rank: 6, name: 'You', score: 78450, isUser: true },
        { rank: 7, name: 'CyberCore', score: 72100 },
        { rank: 8, name: 'Pixelated', score: 65900 },
        { rank: 9, name: 'ByteWave', score: 64200 },
        { rank: 10, name: 'NeonFlux', score: 61050 },
    ];

    return (
        <div className="mf-game-modal-overlay">
            <div className="relative w-full max-w-lg h-[85vh] max-h-[800px] flex flex-col mx-4">
                <div className="absolute -inset-1 bg-gradient-to-b from-primary/30 to-purple-600/30 rounded-[2.5rem] blur opacity-40"></div>
                <div className="relative flex-1 bg-[#1a2233] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">

                    <div className="absolute top-5 right-5 z-20">
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="flex-shrink-0 p-6 pb-4 flex flex-col items-center bg-[#1a2233] z-10 border-b border-white/5 shadow-lg">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-3 border border-white/10 ring-1 ring-white/5 shadow-inner">
                            <span className="material-symbols-outlined text-3xl text-yellow-400">emoji_events</span>
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-wider uppercase mb-1 drop-shadow-md">Leaderboard</h2>
                        <p className="text-slate-400 text-xs font-medium tracking-wide mb-5">Global Rankings • Season 4</p>

                        <div className="flex p-1 bg-background-dark rounded-xl w-full max-w-xs border border-white/5">
                            <button className="flex-1 py-2 rounded-lg bg-[#1a2233] border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg transition-all">This Week</button>
                            <button className="flex-1 py-2 rounded-lg text-slate-500 hover:text-slate-300 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white/5">All Time</button>
                        </div>
                    </div>

                    <div className="flex items-center px-6 py-2 bg-background-dark/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 backdrop-blur-sm">
                        <span className="w-12 text-center">Rank</span>
                        <span className="flex-1 px-4">Player</span>
                        <span className="w-24 text-right">Score</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2 relative scroll-smooth mf-custom-scrollbar">
                        {leaderboardData.map((player) => (
                            <div
                                key={player.rank}
                                className={`group flex items-center p-3 rounded-xl transition-all ${player.isUser
                                    ? 'bg-primary/10 border border-primary/50 shadow-[0_0_15px_rgba(188,216,72,0.15)] transform scale-[1.01]'
                                    : 'bg-white/5 border border-white/5 hover:bg-white/10'
                                    }`}
                            >
                                <div className="w-12 flex justify-center">
                                    {player.rank <= 3 ? (
                                        <span className={`material-symbols-outlined ${player.color} drop-shadow-sm`}>emoji_events</span>
                                    ) : (
                                        <span className="font-bold text-slate-500">{player.rank}</span>
                                    )}
                                </div>
                                <div className="flex-1 px-2 flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${player.bg || 'bg-white/5'} ${player.color || 'text-slate-400'}`}>
                                        {player.name[0]}
                                    </div>
                                    <span className={`font-bold tracking-wide ${player.isUser ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                                        {player.name}
                                        {player.isUser && (
                                            <span className="ml-2 inline-flex items-center gap-1 text-[10px] bg-primary/20 px-2 py-0.5 rounded-full text-primary font-bold uppercase tracking-wide border border-primary/30">
                                                You
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <div className={`w-24 text-right font-black tabular-nums ${player.isUser ? 'text-white' : 'text-slate-500'}`}>
                                    {player.score.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LeaderboardScreen;
