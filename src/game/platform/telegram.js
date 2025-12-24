export const isTelegramEnv = () => {
    return !!window.Telegram?.WebApp;
};

export const initTelegramApp = () => {
    if (isTelegramEnv()) {
        const tg = window.Telegram.WebApp;
        tg.expand();
        tg.ready();

        // Define Theme Colors based on Telegram Theme
        document.documentElement.style.setProperty('--primary', tg.themeParams.button_color || '#256af4');
        document.documentElement.style.setProperty('--background-dark', tg.themeParams.bg_color || '#101622');

        return true;
    }
    return false;
};
