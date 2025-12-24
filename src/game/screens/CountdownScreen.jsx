import React, { useEffect, useState } from 'react';
import '../styles/game.css';

const CountdownScreen = ({ onComplete }) => {
    const [count, setCount] = useState(3);

    useEffect(() => {
        if (count === 0) {
            onComplete();
            return;
        }

        const timer = setTimeout(() => {
            setCount(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [count, onComplete]);

    return (
        <div className="mf-game-root items-center justify-center">
            <div className="mf-bg-decor">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="mf-bg-grid-pattern"></div>
            </div>

            <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center p-6">
                <div className="relative flex items-center justify-center mb-12">
                    <div className="absolute inset-0 rounded-full border border-primary/20 scale-[2.5]"></div>
                    <div className="absolute inset-0 rounded-full border border-dashed border-white/10 scale-[3.2] animate-spin-slow"></div>

                    <div className="relative z-20 key={count}">
                        <h1 className="text-[12rem] md:text-[16rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-primary/50 drop-shadow-2xl animate-countdown-pop select-none">
                            {count > 0 ? count : 'GO!'}
                        </h1>
                    </div>

                    <div className="absolute z-10 w-64 h-64 bg-primary/30 blur-[80px] rounded-full"></div>
                </div>

                <div className="space-y-4 max-w-lg mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Get Ready!
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl font-medium">
                        Tap the glowing circles as fast as you can.
                    </p>
                </div>

                <div className="mt-16 w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full origin-left animate-[width_3s_linear]" style={{ animationDuration: '3s' }}></div>
                </div>
            </main>
        </div>
    );
};

export default CountdownScreen;
