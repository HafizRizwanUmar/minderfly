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

async function prerender() {
    console.log('🚀 Starting standalone prerender script...');

    // 1. Start a temporary static server
    const app = express();
    app.use(express.static(DIST_PATH));
    app.use((req, res) => {
        res.sendFile(path.join(DIST_PATH, 'index.html'));
    });

    const server = app.listen(PORT, async () => {
        console.log(`📡 Static server running on http://localhost:${PORT}`);

        // 2. Launch Puppeteer
        console.log('🌐 Launching browser...');

        let executablePath;
        if (process.platform === 'win32') {
            const localPaths = [
                'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
                path.join(os.homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe')
            ];
            executablePath = localPaths.find(p => fs.existsSync(p));
            console.log(`🪟 Windows detected. Using local Chrome: ${executablePath}`);
        } else {
            try {
                executablePath = await chromium.executablePath();
            } catch (err) {
                console.log('⚠️ @sparticuz/chromium failed to get path.');
            }
        }

        if (!executablePath) {
            console.error('❌ Could not find a browser executable. Please install Chrome or set EXECUTABLE_PATH.');
            process.exit(1);
        }

        const browser = await puppeteer.launch({
            args: process.platform === 'win32' ? [] : (chromium.args || []),
            defaultViewport: process.platform === 'win32' ? null : (chromium.defaultViewport || null),
            executablePath: executablePath,
            headless: true,
        });

        const page = await browser.newPage();

        for (const route of ROUTES) {
            const url = `http://localhost:${PORT}${route}`;
            console.log(`🌐 Prerendering: ${route}`);

            try {
                await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

                // Wait for specific content if needed (e.g., Hero section or similar)
                await new Promise(r => setTimeout(r, 2000));

                const html = await page.content();

                // 3. Save the HTML
                const folderPath = path.join(DIST_PATH, route);
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath, { recursive: true });
                }

                const filePath = path.join(folderPath, 'index.html');
                fs.writeFileSync(filePath, html);
                console.log(`✅ Saved: ${filePath}`);
            } catch (err) {
                console.error(`❌ Failed to prerender ${route}:`, err.message);
            }
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
