import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import PageLoader from './components/PageLoader/PageLoader';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// Keep the landing page eager for a fast first paint; split the rest by route.
const Explore = lazy(() => import('./pages/Explore'));
const Species = lazy(() => import('./pages/Species'));
const SpeciesDetail = lazy(() => import('./pages/SpeciesDetail'));
const Simulation = lazy(() => import('./pages/Simulation'));
const AI = lazy(() => import('./pages/AI'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppRoutes() {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/species" element={<Species />} />
          <Route path="/species/:id" element={<SpeciesDetail />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/ai" element={<AI />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </Router>
  );
}

export default App;
