import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';

// Main Pages
import Home from './pages/Home';
import WorkPage from './pages/WorkPage';
import TeamPage from './pages/TeamPage';
import AntigravitySession from './pages/AntigravitySession';
import GameApp from './game/GameApp';

// Services
import ServicesHub from './pages/services/ServicesHub';
import WebDevelopment from './pages/services/WebDevelopment';
import MobileAppDevelopment from './pages/services/MobileAppDevelopment';
import GraphicsDesign from './pages/services/GraphicsDesign';
import ChromeExtensionDev from './pages/services/ChromeExtensionDev';
import ChromeThemeDev from './pages/services/ChromeThemeDev';

// Store (Products)
import StoreHub from './pages/store/StoreHub';
import SanadPdfEditor from './pages/store/SanadPdfEditor';
import DebtSettler from './pages/store/DebtSettler';
import NishanQr from './pages/store/NishanQr';
import ChromeThemes from './pages/store/ChromeThemes';
import FlutterWebEmulator from './pages/store/FlutterWebEmulator';

// Articles (Blog)
import ArticlesIndex from './pages/articles/ArticlesIndex';
import ArticleDetail from './pages/articles/ArticleDetail';

import { initGA, logPageView } from './utils/analytics';
import './App.css';

// Component to track page views
function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics on first load
    initGA();
  }, []);

  useEffect(() => {
    // Track page view on route change
    const pageTitle = document.title;
    logPageView(location.pathname + location.search, pageTitle);
  }, [location]);

  return null;
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Analytics />
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />

          {/* Services Routes */}
          <Route path="/services" element={<ServicesHub />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/mobile-app-development" element={<MobileAppDevelopment />} />
          <Route path="/services/graphics-design" element={<GraphicsDesign />} />
          <Route path="/services/chrome-extension-development" element={<ChromeExtensionDev />} />
          <Route path="/services/chrome-theme-development" element={<ChromeThemeDev />} />

          {/* Store Routes */}
          <Route path="/store" element={<StoreHub />} />
          <Route path="/products/sanad-pdf-editor" element={<SanadPdfEditor />} /> {/* Sitemap Req */}
          <Route path="/store/sanad-pdf-editor" element={<SanadPdfEditor />} /> {/* Alias */}

          <Route path="/products/debt-settler" element={<DebtSettler />} /> {/* Sitemap Req */}
          <Route path="/store/debt-settler" element={<DebtSettler />} /> {/* Alias/Legacy */}

          <Route path="/products/nishan-qr" element={<NishanQr />} /> {/* Sitemap Req */}
          <Route path="/store/nishan-qr" element={<NishanQr />} /> {/* Alias */}
          <Route path="/store/nishan-qr-generator" element={<NishanQr />} /> {/* Legacy */}

          <Route path="/products/chrome-themes" element={<ChromeThemes />} /> {/* Sitemap Req */}
          <Route path="/store/chrome-themes" element={<ChromeThemes />} /> {/* Alias */}

          <Route path="/products/flutter-web-emulator" element={<FlutterWebEmulator />} /> {/* Sitemap Req */}
          <Route path="/store/flutter-web-emulator" element={<FlutterWebEmulator />} /> {/* Alias */}

          {/* Articles Routes */}
          <Route path="/articles" element={<ArticlesIndex />} />
          <Route path="/blog" element={<ArticlesIndex />} /> {/* Alias */}
          <Route path="/articles/:slug" element={<ArticleDetail />} />

          {/* Other Pages */}
          <Route path="/work" element={<WorkPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/antigravity-masterclass" element={<AntigravitySession />} />
          <Route path="/game" element={<GameApp />} />

        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;



