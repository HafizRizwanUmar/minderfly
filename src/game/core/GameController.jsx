import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useGameState, GameProvider } from './GameState.jsx';
import HomeScreen from '../screens/HomeScreen';
import CountdownScreen from '../screens/CountdownScreen';
import GameplayScreen from '../screens/GameplayScreen';
import PauseScreen from '../screens/PauseScreen';
import GameOverScreen from '../screens/GameOverScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DailyRewardScreen from '../screens/DailyRewardScreen';

// We wrap the internal controller with the Provider
const GameController = () => {
    return (
        <GameProvider>
            <GameLogic />
        </GameProvider>
    );
};

const GameLogic = () => {
    const { state, actions } = useGameState();
    const { currentScreen, timeLeft, gameActive, score } = state;

    // Game Loop State
    const [activeTile, setActiveTile] = useState(null);
    const timerRef = useRef(null);
    const tileTimerRef = useRef(null);

    // Platform Mock (Replace with actual platform detection later)
    const isTelegram = false; // Placeholder

    // Timer Logic
    useEffect(() => {
        if (currentScreen === 'PLAYING' && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                actions.tickTimer();
            }, 1000);
        } else if (timeLeft === 0 && currentScreen === 'PLAYING') {
            actions.endGame();
        }

        return () => clearInterval(timerRef.current);
    }, [currentScreen, timeLeft, actions]);

    // Active Tile Logic
    useEffect(() => {
        if (currentScreen === 'PLAYING') {
            const cycleTile = () => {
                const nextTile = Math.floor(Math.random() * 16);
                setActiveTile(nextTile);
                // Speed increases as time decreases? For now constant.
                tileTimerRef.current = setTimeout(cycleTile, 1000); // 1 second per tile
            };

            cycleTile();
        } else {
            setActiveTile(null);
            clearTimeout(tileTimerRef.current);
        }

        return () => clearTimeout(tileTimerRef.current);
    }, [currentScreen]);


    // Handlers
    const handleTileClick = (index) => {
        if (currentScreen !== 'PLAYING') return;

        if (index === activeTile) {
            // Success
            actions.addScore(100);
            // Optionally force next tile immediately
            clearTimeout(tileTimerRef.current);
            const nextTile = Math.floor(Math.random() * 16);
            setActiveTile(nextTile);
            // Re-trigger loop
            // Note: This simple logic might need refinement for a perfect loop reset
        } else {
            // Penalty?
            // actions.addScore(-10);
        }
    };

    const handleAdReward = (double) => {
        console.log("Claim reward, double:", double);
        actions.setScreen('HOME');
    };

    // Render Logic
    const renderScreen = () => {
        switch (currentScreen) {
            case 'HOME':
                return <HomeScreen
                    onStart={actions.startGame}
                    onSettings={() => actions.setScreen('SETTINGS')}
                    highScore={state.highScore}
                    onLeaderboard={() => actions.setScreen('LEADERBOARD')}
                />;
            case 'COUNTDOWN':
                return <CountdownScreen onComplete={() => actions.setScreen('PLAYING')} />;
            case 'PLAYING':
            case 'PAUSED': // Render Gameplay behind Pause overlay
                return (
                    <>
                        <GameplayScreen
                            score={score}
                            timeLeft={timeLeft}
                            activeTile={activeTile}
                            onTileClick={handleTileClick}
                            onPause={actions.pauseGame}
                        />
                        {currentScreen === 'PAUSED' && (
                            <PauseScreen
                                onResume={actions.resumeGame}
                                onQuit={() => actions.setScreen('HOME')}
                            />
                        )}
                    </>
                );
            case 'GAME_OVER':
                return <GameOverScreen
                    score={score}
                    onReplay={() => {
                        // Logic to restart
                        actions.startGame();
                    }}
                    onHome={() => actions.setScreen('HOME')}
                    onClaimReward={() => console.log('Show Ad')}
                />;
            case 'LEADERBOARD':
                return <LeaderboardScreen onClose={() => actions.setScreen('HOME')} />;
            case 'SETTINGS':
                return <SettingsScreen onClose={() => actions.setScreen('HOME')} />;
            case 'DAILY_REWARD':
                return <DailyRewardScreen
                    onClose={() => actions.setScreen('HOME')}
                    onClaim={handleAdReward}
                />;
            default:
                return <HomeScreen onStart={actions.startGame} />;
        }
    };

    return (
        <div className="w-full h-full">
            {renderScreen()}
        </div>
    );
};

export default GameController;
