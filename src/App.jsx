import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import TeamPage from './pages/TeamPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetail from './pages/ArticleDetail';
import StorePage from './pages/StorePage';
import NishanProduct from './pages/products/NishanProduct';
import FlutterWebEmulatorProduct from './pages/products/FlutterWebEmulatorProduct';
import AntigravitySession from './pages/AntigravitySession';
import GameApp from './game/GameApp';
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
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/store/nishan-qr-generator" element={<NishanProduct />} />
          <Route path="/store/flutter-web-emulator" element={<FlutterWebEmulatorProduct />} />
          <Route path="/antigravity-masterclass" element={<AntigravitySession />} />
          <Route path="/game" element={<GameApp />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;



