import React, { useEffect } from 'react';
import GameController from './core/GameController.jsx';
import { initTelegramApp } from './platform/telegram';
import { AdsManager } from './ads/monetag';
import './styles/game.css';

const GameApp = () => {
    useEffect(() => {
        // Initialize Platform
        initTelegramApp();

        // Initialize Ads
        AdsManager.init();

        // Prevent default touch behaviors (zooming, pull-to-refresh) for game feel
        const preventDefault = (e) => e.preventDefault();
        document.addEventListener('touchmove', preventDefault, { passive: false });

        return () => {
            document.removeEventListener('touchmove', preventDefault);
        };
    }, []);

    return (
        <div className="game-wrapper fixed inset-0 w-full h-full bg-[#101622] overflow-hidden z-[9999]">
            <GameController />
        </div>
    );
};

export default GameApp;
