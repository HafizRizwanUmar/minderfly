import React, { createContext, useContext, useReducer } from 'react';

// Initial State
const getInitialState = () => {
    let highScore = 0;
    let coins = 0;
    try {
        const storedHighScore = localStorage.getItem('minderfly_highscore');
        const storedCoins = localStorage.getItem('minderfly_coins');
        highScore = storedHighScore ? parseInt(storedHighScore, 10) : 0;
        coins = storedCoins ? parseInt(storedCoins, 10) : 0;
    } catch (e) { console.warn('Storage disabled'); }

    return {
        currentScreen: 'HOME',
        score: 0,
        highScore,
        coins,
        timeLeft: 60,
        gameActive: false,
        difficulty: 1,
        combo: 0,
        multiplier: 1,
    };
};

const initialState = getInitialState();

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
    SPEND_COINS: 'SPEND_COINS',
    ADD_COINS: 'ADD_COINS',
    REVIVE_GAME: 'REVIVE_GAME',
    INCREMENT_COMBO: 'INCREMENT_COMBO',
    RESET_COMBO: 'RESET_COMBO',
    PENALIZE: 'PENALIZE',
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
                gameActive: true,
                combo: 0,
                multiplier: 1,
            };

        case ACTION_TYPES.PAUSE_GAME:
            return { ...state, currentScreen: 'PAUSED', gameActive: false };

        case ACTION_TYPES.RESUME_GAME:
            return { ...state, currentScreen: 'PLAYING', gameActive: true };

        case ACTION_TYPES.END_GAME:
            const newHighScore = Math.max(state.score, state.highScore);
            // Earn 1 coin for every 100 points
            const coinsEarned = Math.floor(state.score / 100);
            const newCoins = state.coins + coinsEarned;

            localStorage.setItem('minderfly_highscore', newHighScore.toString());
            localStorage.setItem('minderfly_coins', newCoins.toString());

            return {
                ...state,
                currentScreen: 'GAME_OVER',
                gameActive: false,
                highScore: newHighScore,
                coins: newCoins,
                lastCoinsEarned: coinsEarned, // Track for UI display
            };

        case ACTION_TYPES.REVIVE_GAME:
            // Revive adds 10 seconds and resumes game
            return {
                ...state,
                currentScreen: 'COUNTDOWN',
                timeLeft: 10,
                gameActive: true,
            };

        case ACTION_TYPES.SPEND_COINS:
            const remainingCoins = state.coins - action.payload;
            localStorage.setItem('minderfly_coins', remainingCoins.toString());
            return { ...state, coins: remainingCoins };

        case ACTION_TYPES.ADD_COINS: // Direct add (e.g. from ads)
            const totalCoins = state.coins + action.payload;
            localStorage.setItem('minderfly_coins', totalCoins.toString());
            return { ...state, coins: totalCoins };

        case ACTION_TYPES.INCREMENT_COMBO:
            const newCombo = state.combo + 1;
            let multiplier = 1;
            if (newCombo >= 10) multiplier = 2;
            else if (newCombo >= 5) multiplier = 1.5;

            return {
                ...state,
                combo: newCombo,
                multiplier
            };

        case ACTION_TYPES.RESET_COMBO:
            return {
                ...state,
                combo: 0,
                multiplier: 1
            };

        case ACTION_TYPES.PENALIZE:
            // Deduct time (e.g. 2s) and reset combo
            const penaltyTime = Math.max(0, state.timeLeft - action.payload);
            return {
                ...state,
                timeLeft: penaltyTime,
                combo: 0,
                multiplier: 1
            };

        case ACTION_TYPES.UPDATE_SCORE:
            // Score = Base Points * Multiplier
            const pointsToAdd = Math.floor(action.payload * state.multiplier);
            return { ...state, score: state.score + pointsToAdd };

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
    const spendCoins = (amount) => dispatch({ type: ACTION_TYPES.SPEND_COINS, payload: amount });
    const addCoins = (amount) => dispatch({ type: ACTION_TYPES.ADD_COINS, payload: amount });
    const reviveGame = () => dispatch({ type: ACTION_TYPES.REVIVE_GAME });

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
                tickTimer,
                spendCoins,
                addCoins,
                reviveGame,
                incrementCombo: () => dispatch({ type: ACTION_TYPES.INCREMENT_COMBO }),
                resetCombo: () => dispatch({ type: ACTION_TYPES.RESET_COMBO }),
                penalize: (seconds) => dispatch({ type: ACTION_TYPES.PENALIZE, payload: seconds })
            }
        }}>
            {children}
        </GameStateContext.Provider>
    );
};

export const useGameState = () => useContext(GameStateContext);
