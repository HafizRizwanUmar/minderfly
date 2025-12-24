
const ADS_FUNCTION = 'show_10371743';

export const TelegramAds = {
    /**
     * Shows a rewarded interstitial ad.
     * @returns {Promise<boolean>} Resolves true if ad watched, false/error otherwise.
     */
    showRewardedInterstitial: () => {
        return new Promise((resolve, reject) => {
            if (typeof window[ADS_FUNCTION] === 'function') {
                window[ADS_FUNCTION]().then(() => {
                    // You need to add your user reward function here, which will be executed after the user watches the ad.
                    console.log('Rewarded Interstitial watched.');
                    resolve(true);
                }).catch(e => {
                    console.error('Rewarded Interstitial error:', e);
                    reject(e);
                });
            } else {
                console.warn(`Telegram Ads function ${ADS_FUNCTION} not found.`);
                // If ad SDK is missing, we might want to just grant reward or fail silently.
                // For dev purposes, let's treat it as failure but non-blocking.
                resolve(false);
            }
        });
    },

    /**
     * Shows a rewarded popup ad.
     * @returns {Promise<boolean>} Resolves true if ad watched.
     */
    showRewardedPopup: () => {
        return new Promise((resolve, reject) => {
            if (typeof window[ADS_FUNCTION] === 'function') {
                window[ADS_FUNCTION]('pop').then(() => {
                    console.log('Rewarded Popup watched.');
                    resolve(true);
                }).catch(e => {
                    console.error('Rewarded Popup error:', e);
                    reject(e);
                });
            } else {
                console.warn(`Telegram Ads function ${ADS_FUNCTION} not found.`);
                resolve(false);
            }
        });
    },

    /**
     * Initializes the In-App Interstitial configuration.
     * Should be called once on app init or appropriate location.
     */
    initInAppInterstitial: () => {
        if (typeof window[ADS_FUNCTION] === 'function') {
            window[ADS_FUNCTION]({
                type: 'inApp',
                inAppSettings: {
                    frequency: 2,
                    capping: 0.1,
                    interval: 30,
                    timeout: 5,
                    everyPage: false
                }
            });
            console.log('In-App Interstitial initialized.');
        } else {
            console.warn(`Telegram Ads function ${ADS_FUNCTION} not found for init.`);
        }
    }
};
