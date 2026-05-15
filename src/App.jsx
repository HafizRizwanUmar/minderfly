import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';

// Main Pages
import Home from './pages/Home';
import WorkPage from './pages/WorkPage';
import ProjectDetail from './pages/ProjectDetail';
import TeamPage from './pages/TeamPage';
import Contact from './pages/Contact';
import AffiliatePage from './pages/AffiliatePage';

// Services
import ServicesHub from './pages/services/ServicesHub';
import WebDevelopment from './pages/services/WebDevelopment';
import MobileAppDevelopment from './pages/services/MobileAppDevelopment';
import GraphicsDesign from './pages/services/GraphicsDesign';
import ChromeExtensionDev from './pages/services/ChromeExtensionDev';
import ChromeThemeDev from './pages/services/ChromeThemeDev';
import AIAutomation from './pages/services/AIAutomation';

// Store (Products)
import StoreHub from './pages/store/StoreHub';
import SanadPdfEditor from './pages/store/SanadPdfEditor';
import DebtSettler from './pages/store/DebtSettler';
import NishanQr from './pages/store/NishanQr';
import ChromeThemes from './pages/store/ChromeThemes';
import FlutterWebEmulator from './pages/store/FlutterWebEmulator';
import CinemaflyProduct from './pages/store/CinemaflyProduct';

// Articles (Blog)
import ArticlesIndex from './pages/articles/ArticlesIndex';
import ArticleDetail from './pages/articles/ArticleDetail';

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
      <main className="main-content">
        <SpecialOfferModal 
          isOpen={isOfferModalOpen} 
          onClose={closeModal} 
          initialProjectType={selectedProject} 
        />
        <ConversionManager onOpenContactForm={() => openModal('Smart Suggestion')} />
        <FloatingWhatsApp />
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



