import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect, useState, lazy, Suspense } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Main Pages
const Home = lazy(() => import('./pages/Home'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const Contact = lazy(() => import('./pages/Contact'));
const AffiliatePage = lazy(() => import('./pages/AffiliatePage'));

// Services
const ServicesHub = lazy(() => import('./pages/services/ServicesHub'));
const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'));
const MobileAppDevelopment = lazy(() => import('./pages/services/MobileAppDevelopment'));
const GraphicsDesign = lazy(() => import('./pages/services/GraphicsDesign'));
const ChromeExtensionDev = lazy(() => import('./pages/services/ChromeExtensionDev'));
const ChromeThemeDev = lazy(() => import('./pages/services/ChromeThemeDev'));
const AIAutomation = lazy(() => import('./pages/services/AIAutomation'));

// Store (Products)
const StoreHub = lazy(() => import('./pages/store/StoreHub'));
const SanadPdfEditor = lazy(() => import('./pages/store/SanadPdfEditor'));
const DebtSettler = lazy(() => import('./pages/store/DebtSettler'));
const NishanQr = lazy(() => import('./pages/store/NishanQr'));
const ChromeThemes = lazy(() => import('./pages/store/ChromeThemes'));
const FlutterWebEmulator = lazy(() => import('./pages/store/FlutterWebEmulator'));
const CinemaflyProduct = lazy(() => import('./pages/store/CinemaflyProduct'));

// Articles (Blog)
const ArticlesIndex = lazy(() => import('./pages/articles/ArticlesIndex'));
const ArticleDetail = lazy(() => import('./pages/articles/ArticleDetail'));

import { initGA, logPageView } from './utils/analytics';
import SpecialOfferModal from './components/SpecialOfferModal';
import ConversionManager from './components/ConversionManager';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { ModalProvider, useModal } from './context/ModalContext';
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

function AppContent() {
  const { isOfferModalOpen, selectedProject, closeModal, openModal } = useModal();

  return (
    <Router>
      <Analytics />
      <SpeedInsights />
      <main className="main-content">
        <SpecialOfferModal 
          isOpen={isOfferModalOpen} 
          onClose={closeModal} 
          initialProjectType={selectedProject} 
        />
        <ConversionManager onOpenContactForm={() => openModal('Smart Suggestion')} />
        <FloatingWhatsApp />
        <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
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
            <Route path="/services/ai-automation" element={<AIAutomation />} />

            {/* Store Routes */}
            <Route path="/store" element={<StoreHub />} />
            <Route path="/store/sanad-pdf-editor" element={<SanadPdfEditor />} /> {/* Alias */}
            <Route path="/store/debt-settler" element={<DebtSettler />} /> {/* Alias/Legacy */}
            <Route path="/store/nishan-qr" element={<NishanQr />} /> {/* Alias */}
            <Route path="/store/nishan-qr-generator" element={<NishanQr />} /> {/* Legacy */}
            <Route path="/store/chrome-themes" element={<ChromeThemes />} /> {/* Alias */}
            <Route path="/store/flutter-web-emulator" element={<FlutterWebEmulator />} /> {/* Alias */}
            <Route path="/store/cinemafly" element={<CinemaflyProduct />} />

            {/* Articles Routes */}
            <Route path="/articles" element={<ArticlesIndex />} />
            <Route path="/blog" element={<ArticlesIndex />} /> {/* Alias */}
            <Route path="/articles/:slug" element={<ArticleDetail />} />

            {/* Other Pages */}
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:id" element={<ProjectDetail />} /> 
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/affiliates" element={<AffiliatePage />} />

          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </HelmetProvider>
  );
}

export default App;



