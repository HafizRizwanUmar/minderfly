import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import express from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3333;
const DIST_PATH = path.join(__dirname, '..', 'dist');
const CONCURRENCY = 3; // Reduced to avoid memory pressure on VPS

import { articlesData } from '../src/data/articles.js';
import { projectsData } from '../src/data/projects.js';

const STATIC_ROUTES = [
    '/',
    '/services',
    '/services/web-development',
    '/services/mobile-app-development',
    '/services/graphics-design',
    '/services/chrome-extension-development',
    '/services/chrome-theme-development',
    '/services/ai-automation',
    '/store',
    '/store/sanad-pdf-editor',
    '/store/debt-settler',
    '/store/nishan-qr',
    '/store/nishan-qr-generator',
    '/store/chrome-themes',
    '/store/flutter-web-emulator',
    '/store/cinemafly',
    '/articles',
    '/blog',
    '/work',
    '/team',
    '/contact',
    '/affiliates'
];

const ARTICLE_ROUTES = articlesData.map(article => `/articles/${article.slug}`);
const PROJECT_ROUTES = projectsData
    .filter(project => !project.isExternal)
    .map(project => `/work/${project.id}`);

const ROUTES = [...new Set([...STATIC_ROUTES, ...ARTICLE_ROUTES, ...PROJECT_ROUTES])];

// Resource types to block — block everything except scripts needed for React to render
const BLOCKED_TYPES = new Set(['image', 'media', 'font', 'websocket', 'eventsource', 'manifest']);

async function prerenderRoute(browser, route) {
    const url = `http://localhost:${PORT}${route}`;
    const page = await browser.newPage();

    // Block heavy resources that don't affect HTML output
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        const resourceType = req.resourceType();
        // Block images, videos, fonts, websockets — keep JS + CSS for correct rendering
        if (BLOCKED_TYPES.has(resourceType)) {
            return req.abort();
        }
        // Also block external analytics/tracking scripts that can hang networkidle
        const reqUrl = req.url();
        if (
            reqUrl.includes('googletagmanager') ||
            reqUrl.includes('google-analytics') ||
            reqUrl.includes('datafa.st') ||
            reqUrl.includes('clarity.ms') ||
            reqUrl.includes('hotjar') ||
            reqUrl.includes('facebook.net')
        ) {
            return req.abort();
        }
        req.continue();
    });

    try {
        console.log(`🌐 Prerendering: ${route}`);

        // Use networkidle2 (allows 2 pending requests) instead of networkidle0
        // networkidle0 waits for ALL requests — risky with analytics scripts
        // Also increased timeout to 60s for heavy pages like cinemafly
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        // Wait for React to fully hydrate and render content
        await new Promise(r => setTimeout(r, 800));

        const html = await page.content();

        const folderPath = path.join(DIST_PATH, route);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const filePath = path.join(folderPath, 'index.html');
        fs.writeFileSync(filePath, html);
        console.log(`✅ Saved: ${route}`);
    } catch (err) {
        console.error(`❌ Failed ${route}:`, err.message);
        // Don't crash the whole process — continue with other routes
    } finally {
        await page.close();
    }
}

async function prerender() {
    console.log('🚀 Starting standalone prerender script...');
    console.log(`📊 Total routes to prerender: ${ROUTES.length}`);

    const app = express();
    app.use(express.static(DIST_PATH));
    app.use((req, res) => {
        res.sendFile(path.join(DIST_PATH, 'index.html'));
    });

    const server = app.listen(PORT, async () => {
        console.log(`📡 Static server running on http://localhost:${PORT}`);

        let executablePath;
        if (process.platform === 'win32') {
            const localPaths = [
                'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
                path.join(os.homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe')
            ];
            executablePath = localPaths.find(p => fs.existsSync(p));
        } else {
            // Linux/VPS — try system Chromium first, then @sparticuz/chromium
            const linuxPaths = [
                '/usr/bin/chromium-browser',
                '/usr/bin/chromium',
                '/usr/bin/google-chrome',
                '/usr/bin/google-chrome-stable',
            ];
            executablePath = linuxPaths.find(p => fs.existsSync(p));

            if (!executablePath) {
                try {
                    executablePath = await chromium.executablePath();
                } catch (err) {
                    console.log('⚠️ @sparticuz/chromium failed, trying system chromium...');
                }
            }
        }

        if (!executablePath) {
            console.error('❌ No browser executable found. Install chromium: sudo apt install chromium-browser');
            process.exit(1);
        }

        console.log(`🌍 Using browser: ${executablePath}`);

        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',   // Prevents crashes on low-RAM VPS
                '--disable-gpu',
                '--no-first-run',
                '--no-zygote',
                '--single-process',          // Better for VPS environments
            ],
            executablePath: executablePath,
            headless: true,
        });

        // Process in chunks
        for (let i = 0; i < ROUTES.length; i += CONCURRENCY) {
            const chunk = ROUTES.slice(i, i + CONCURRENCY);
            await Promise.all(chunk.map(route => prerenderRoute(browser, route)));
        }

        await browser.close();
        server.close();
        console.log('✨ Prerender complete!');
        process.exit(0);
    });
}

prerender().catch(err => {
    console.error('💥 Prerender failed:', err);
    process.exit(1);
});
