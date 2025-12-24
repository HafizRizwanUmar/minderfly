import React, { createContext, useContext, useReducer } from 'react';

// Initial State
const getInitialHighScore = () => {
    try {
        const stored = localStorage.getItem('minderfly_highscore');
        return stored ? parseInt(stored, 10) : 0;
    } catch (e) {
        return 0;
    }
};

const initialState = {
    currentScreen: 'HOME', // HOME, COUNTDOWN, PLAYING, PAUSED, GAME_OVER, LEADERBOARD, SETTINGS, DAILY_REWARD
    score: 0,
    highScore: getInitialHighScore(),
    timeLeft: 60,
    gameActive: false,
    difficulty: 1,
};

// Actions
const ACTION_TYPES = {
    SET_SCREEN: 'SET_SCREEN',
    START_GAME: 'START_GAME',
    END_GAME: 'END_GAME',
    UPDATE_SCORE: 'UPDATE_SCORE',
    TICK_TIMER: 'TICK_TIMER',
    RESET_GAME: 'RESET_GAME',
    PAUSE_GAME: 'PAUSE_GAME',
    RESUME_GAME: 'RESUME_GAME',
};

// Reducer
const gameReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_SCREEN:
            return { ...state, currentScreen: action.payload };

        case ACTION_TYPES.START_GAME:
            return {
                ...state,
                currentScreen: 'COUNTDOWN',
                score: 0,
                timeLeft: 60,
                gameActive: true
            };

        case ACTION_TYPES.PAUSE_GAME:
            return { ...state, currentScreen: 'PAUSED', gameActive: false };

        case ACTION_TYPES.RESUME_GAME:
            return { ...state, currentScreen: 'PLAYING', gameActive: true };

        case ACTION_TYPES.END_GAME:
            const newHighScore = Math.max(state.score, state.highScore);
            localStorage.setItem('minderfly_highscore', newHighScore.toString());
            return {
                ...state,
                currentScreen: 'GAME_OVER',
                gameActive: false,
                highScore: newHighScore
            };

        case ACTION_TYPES.UPDATE_SCORE:
            return { ...state, score: state.score + action.payload };

        case ACTION_TYPES.TICK_TIMER:
            return { ...state, timeLeft: state.timeLeft - 1 };

        default:
            return state;
    }
};

// Context
const GameStateContext = createContext();

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    // Helper actions
    const setScreen = (screen) => dispatch({ type: ACTION_TYPES.SET_SCREEN, payload: screen });
    const startGame = () => dispatch({ type: ACTION_TYPES.START_GAME });
    const pauseGame = () => dispatch({ type: ACTION_TYPES.PAUSE_GAME });
    const resumeGame = () => dispatch({ type: ACTION_TYPES.RESUME_GAME });
    const endGame = () => dispatch({ type: ACTION_TYPES.END_GAME });
    const addScore = (points) => dispatch({ type: ACTION_TYPES.UPDATE_SCORE, payload: points });
    const tickTimer = () => dispatch({ type: ACTION_TYPES.TICK_TIMER });

    return (
        <GameStateContext.Provider value={{
            state,
            actions: {
                setScreen,
                startGame,
                pauseGame,
                resumeGame,
                endGame,
                addScore,
                tickTimer
            }
        }}>
            {children}
        </GameStateContext.Provider>
    );
};

export const useGameState = () => useContext(GameStateContext);
