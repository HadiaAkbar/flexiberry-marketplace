import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { useEffect } from "react";

import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AccountPage from "./pages/AccountPage";
import FlashSalePage from "./pages/FlashSalePage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import AllProductsPage from "./pages/AllProductsPage";
import CategoryPage from "./pages/CategoryPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import CheckoutPage from "./pages/CheckoutPage";

/* Vendor Pages */
import VendorLayout from "./pages/vendor/VendorLayout";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorStorePage from "./pages/vendor/VendorStorePage";
import VendorProductDetail from "./pages/vendor/VendorProductDetail";
import VendorLoginPage from "./pages/vendor/VendorLoginPage";
import VendorProductsPage from "./pages/vendor/VendorProductsPage";
import VendorOrdersPage from "./pages/vendor/VendorOrdersPage";
import VendorInstallmentsPage from "./pages/vendor/VendorInstallmentsPage";
import VendorBuyersPage from "./pages/vendor/VendorBuyersPage";
import VendorAnalyticsPage from "./pages/vendor/VendorAnalyticsPage";
import VendorKYCPage from "./pages/vendor/VendorKYCPage";
import VendorSettingsPage from "./pages/vendor/VendorSettingsPage";

/* Admin Pages */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductsPage from "./pages/admin/ProductsPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import OrdersPage from "./pages/admin/OrdersPage";
import CustomersPage from "./pages/admin/CustomersPage";
import InstallmentsPage from "./pages/admin/InstallmentsPage";
import NotificationsPage from "./pages/admin/NotificationsPage";
import ShopProfilePage from "./pages/admin/ShopProfilePage";
import SettingsPage from "./pages/admin/SettingsPage";

import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/flash-sale" element={<FlashSalePage />} />
            <Route path="/new-arrivals" element={<NewArrivalsPage />} />

            {/* Customer Dashboard */}
            <Route path="/dashboard" element={<CustomerDashboard />} />

            {/* Checkout */}
            <Route path="/checkout/verify" element={<CheckoutPage />} />

            {/* Vendor Store */}
            <Route path="/store/:vendorId" element={<VendorStorePage />} />
            <Route path="/vendor/product/:id" element={<VendorProductDetail />} />

            {/* Vendor Login */}
            <Route path="/vendor/login" element={<VendorLoginPage />} />

            {/* Vendor Dashboard */}
            <Route path="/vendor" element={<VendorLayout />}>
              <Route index element={<VendorDashboard />} />
              <Route path="products" element={<VendorProductsPage />} />
              <Route path="orders" element={<VendorOrdersPage />} />
              <Route path="installments" element={<VendorInstallmentsPage />} />
              <Route path="buyers" element={<VendorBuyersPage />} />
              <Route path="analytics" element={<VendorAnalyticsPage />} />
              <Route path="kyc" element={<VendorKYCPage />} />
              <Route path="settings" element={<VendorSettingsPage />} />
            </Route>

            {/* Admin Panel */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="installments" element={<InstallmentsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="shop-profile" element={<ShopProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </CartProvider>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
