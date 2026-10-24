import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './admin/context/AdminContext';

// Storefront Components
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import ScrollToTop from './components/common/ScrollToTop';

// Storefront Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import ReturnsPolicyPage from './pages/ReturnsPolicyPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Components & Pages
import AdminLayout from './admin/components/layout/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import Products from './admin/pages/Products';
import Categories from './admin/pages/Categories';
import Inventory from './admin/pages/Inventory';
import Orders from './admin/pages/Orders';
import OrderDetails from './admin/pages/OrderDetails';
import Customers from './admin/pages/Customers';
import ProductAnalytics from './admin/pages/ProductAnalytics';
import SalesAnalytics from './admin/pages/SalesAnalytics';
import Reports from './admin/pages/Reports';
import Settings from './admin/pages/Settings';
import Profile from './admin/pages/Profile';

/**
 * Layout wrapper for Customer-Facing Storefront
 */
function StorefrontLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-warmwhite text-darktext font-body selection:bg-gold-soft selection:text-maroon">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Main Navigation */}
      <Navbar />

      {/* Main Routing Stage */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Main Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <AdminProvider>
              <ScrollToTop />
              <Routes>
                {/* 1. Customer Storefront Routes */}
                <Route element={<StorefrontLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/category/:categorySlug" element={<CategoryPage />} />
                  <Route path="/product/:slug" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
                  <Route path="/returns" element={<ReturnsPolicyPage />} />
                </Route>

                {/* 2. Admin Operational Control Center Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="inventory" element={<Inventory />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="orders/:orderId" element={<OrderDetails />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="analytics/products" element={<ProductAnalytics />} />
                  <Route path="analytics/sales" element={<SalesAnalytics />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                {/* 3. 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AdminProvider>
          </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
