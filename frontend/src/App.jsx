import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { ShoppingDirectory } from './pages/ShoppingDirectory';
import { ShopDetail } from './pages/ShopDetail';
import { FashionDirectory } from './pages/FashionDirectory';
import { FashionDetail } from './pages/FashionDetail';
import { EventsPage } from './pages/EventsPage';
import { EventDetail } from './pages/EventDetail';
import { PlanYourVisit } from './pages/PlanYourVisit';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { NotFound } from './pages/NotFound';

import { ContentProvider } from './context/ContentContext';

/**
 * Otomatis mengembalikan posisi scroll ke paling atas saat rute berpindah
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

/**
 * Wrapper redirect untuk rute legacy yang meneruskan parameter :slug
 */
function LegacyKulinerSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/fashion/${slug}` : '/fashion'} replace />;
}

function LegacyAgendaSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/informasi/${slug}` : '/informasi'} replace />;
}

export function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-canvas font-sans text-text-primary selection:bg-brand-primary selection:text-white">
          {/* Sticky Topbar Navbar */}
          <Navbar />

          {/* Dynamic Route Content */}
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/belanja" element={<ShoppingDirectory />} />
              <Route path="/belanja/:slug" element={<ShopDetail />} />
              <Route path="/fashion" element={<FashionDirectory />} />
              <Route path="/fashion/:slug" element={<FashionDetail />} />
              <Route path="/informasi" element={<EventsPage />} />
              <Route path="/informasi/:slug" element={<EventDetail />} />

              {/* Legacy Backward-Compatibility Redirects */}
              <Route path="/kuliner" element={<Navigate to="/fashion" replace />} />
              <Route path="/kuliner/:slug" element={<LegacyKulinerSlugRedirect />} />
              <Route path="/agenda" element={<Navigate to="/informasi" replace />} />
              <Route path="/agenda/:slug" element={<LegacyAgendaSlugRedirect />} />

              <Route path="/panduan-kunjungan" element={<PlanYourVisit />} />
              <Route path="/kontak" element={<ContactPage />} />
              <Route path="/kebijakan-privasi" element={<PrivacyPolicy />} />
              <Route path="/syarat-ketentuan" element={<TermsConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </ContentProvider>
    </BrowserRouter>
  );
}

export default App;
