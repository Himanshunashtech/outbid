import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './context/AuthContext';
import { OutbidProvider } from './context/OutbidContext';
import { Navbar } from './components/Navbar';
import { LiveTicker } from './components/LiveTicker';
import { OutbidModal } from './components/OutbidModal';
import { Footer } from './components/Footer';
import { LaunchStatsBanner } from './components/LaunchStatsBanner';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ActivityPage } from './pages/ActivityPage';
import { AboutPage } from './pages/AboutPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { RulesPage } from './pages/RulesPage';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col justify-between selection:bg-amber-500 selection:text-zinc-950">
      <ScrollToTop />
      <div>
        <Navbar />
        <LiveTicker />

        <main className="w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/product/:productSlug" element={<ProductDetailPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">
        <LaunchStatsBanner />
      </div>

      <Footer />
      <OutbidModal />
    </div>
  );
}

export function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <OutbidProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </OutbidProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
