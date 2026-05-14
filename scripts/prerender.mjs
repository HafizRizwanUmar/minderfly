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
const CONCURRENCY = 5; // Prerender 5 pages at a time

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

async function prerenderRoute(browser, route) {
    const url = `http://localhost:${PORT}${route}`;
    const page = await browser.newPage();
    
    // Optimize performance by blocking unnecessary resources
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        const resourceType = req.resourceType();
        if (['image', 'stylesheet', 'font'].includes(resourceType)) {
            // We need stylesheets for correct HTML rendering, but images/fonts can be skipped for pure HTML structure
            // Actually, for some React apps, stylesheets are needed to calculate dimensions if JS depends on it.
            // Let's keep stylesheets but block images to save bandwidth/time.
            if (resourceType === 'image') return req.abort();
        }
        req.continue();
    });

    try {
        console.log(`🌐 Prerendering: ${route}`);
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        
        // Short wait for any client-side JS/animations to settle
        await new Promise(r => setTimeout(r, 500));

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
            try {
                executablePath = await chromium.executablePath();
            } catch (err) {
                console.log('⚠️ @sparticuz/chromium failed.');
            }
        }

        if (!executablePath) {
            console.error('❌ No browser executable found.');
            process.exit(1);
        }

        const browser = await puppeteer.launch({
            args: process.platform === 'win32' ? [] : (chromium.args || []),
            defaultViewport: process.platform === 'win32' ? null : (chromium.defaultViewport || null),
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
