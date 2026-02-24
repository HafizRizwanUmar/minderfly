import puppeteer from 'puppeteer-core';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3333;
const DIST_PATH = path.join(__dirname, '..', 'dist');

const ROUTES = [
    '/',
    '/services',
    '/services/web-development',
    '/services/mobile-app-development',
    '/services/graphics-design',
    '/services/chrome-extension-development',
    '/services/chrome-theme-development',
    '/store',
    '/products/sanad-pdf-editor',
    '/products/debt-settler',
    '/products/nishan-qr',
    '/products/flutter-web-emulator',
    '/products/chrome-themes',
    '/products/cinemafly',
    '/work',
    '/team',
    '/articles'
];

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

        // 2. Launch Puppeteer using local Chrome installation
        const browser = await puppeteer.launch({
            headless: "new",
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
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
