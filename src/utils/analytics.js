// Google Analytics configuration and initialization
import ReactGA from 'react-ga4';

// Initialize Google Analytics
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID
const MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your actual GA4 Measurement ID

export const initGA = () => {
    ReactGA.initialize(MEASUREMENT_ID, {
        gaOptions: {
            siteSpeedSampleRate: 100,
        },
        gtagOptions: {
            send_page_view: false, // We'll manually track page views
        },
    });
};

// Track page views
export const logPageView = (path, title) => {
    ReactGA.send({
        hitType: 'pageview',
        page: path,
        title: title || document.title,
    });
};

// Track custom events
export const logEvent = (category, action, label = '', value = 0) => {
    ReactGA.event({
        category,
        action,
        label,
        value,
    });
};

// Track outbound links (e.g., WhatsApp, social media)
export const logOutboundLink = (url, label) => {
    ReactGA.event({
        category: 'Outbound Link',
        action: 'Click',
        label: label || url,
    });
};

// Track button clicks
export const logButtonClick = (buttonName) => {
    ReactGA.event({
        category: 'Button',
        action: 'Click',
        label: buttonName,
    });
};

// Track article views
export const logArticleView = (articleTitle) => {
    ReactGA.event({
        category: 'Article',
        action: 'View',
        label: articleTitle,
    });
};

export default {
    initGA,
    logPageView,
    logEvent,
    logOutboundLink,
    logButtonClick,
    logArticleView,
};
