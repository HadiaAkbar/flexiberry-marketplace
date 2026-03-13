// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { CartProvider } from "@/context/CartContext";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import ProductDetail from "./pages/ProductDetail";
// import ShopPage from "./pages/ShopPage";
// import LoginPage from "./pages/LoginPage";
// import VendorLayout from "./pages/vendor/VendorLayout";
// import VendorDashboard from "./pages/vendor/VendorDashboard";
// import VendorStorePage from "./pages/vendor/VendorStorePage";
// import VendorProductDetail from "./pages/vendor/VendorProductDetail";
// import VendorLoginPage from "./pages/vendor/VendorLoginPage";
// import AdminLayout from "./pages/admin/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CartPage from "./pages/CartPage";
// import WishlistPage from "@/pages/WishlistPage";
// import AccountPage  from "@/pages/AccountPage";
// import NewArrivalsPage from "./pages/NewArrivalsPage";
// import FlashSalePage from "./pages/FlashSalePage";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <CartProvider>
//         <BrowserRouter>
//           <Routes>
//             {/* ── Public ── */}
//             <Route path="/" element={<Index />} />
//             <Route path="/product/:id" element={<ProductDetail />} />
//             <Route path="/category/:slug" element={<ShopPage />} />
//             <Route path="/products" element={<ShopPage />} />
//             <Route path="/shop" element={<ShopPage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/wishlist" element={<WishlistPage />} />
//             <Route path="/account" element={<AccountPage />} />
//             <Route path="/new-arrivals" element={<NewArrivalsPage />} />
//             <Route path="/flash-sale" element={<FlashSalePage />} />
//             {/* ── Vendor store (public-facing shop) ── */}
//             <Route path="/store/:vendorId" element={<VendorStorePage />} />
//             <Route path="/store" element={<VendorStorePage />} />
//             <Route path="/vendor/product/:id" element={<VendorProductDetail />} />
//             {/* ── Vendor Login / Register (standalone, no sidebar) ── */}
//             <Route path="/vendor/login" element={<VendorLoginPage />} />
//             {/* ── Vendor (Admin) Portal ── */}
//             <Route path="/vendor" element={<VendorLayout />}>
//               <Route index element={<VendorDashboard />} />
//               <Route path="shop" element={<VendorDashboard />} />
//               <Route path="products" element={<VendorDashboard />} />
//               <Route path="applications" element={<VendorDashboard />} />
//               <Route path="ledger" element={<VendorDashboard />} />
//               <Route path="analytics" element={<VendorDashboard />} />
//               <Route path="settings" element={<VendorDashboard />} />
//             </Route>
//             {/* ── Super Admin Portal ── */}
//             <Route path="/admin" element={<AdminLayout />}>
//               <Route index element={<AdminDashboard />} />
//               <Route path="vendors" element={<AdminDashboard />} />
//               <Route path="users" element={<AdminDashboard />} />
//               <Route path="applications" element={<AdminDashboard />} />
//               <Route path="reports" element={<AdminDashboard />} />
//               <Route path="security" element={<AdminDashboard />} />
//               <Route path="settings" element={<AdminDashboard />} />
//             </Route>
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";

import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AccountPage from "./pages/AccountPage";
import FlashSalePage from "./pages/FlashSalePage";
import CategoryPage from "./pages/CategoryPage";

/* Vendor Pages */
import VendorLayout from "./pages/vendor/VendorLayout";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorStorePage from "./pages/vendor/VendorStorePage";
import VendorProductDetail from "./pages/vendor/VendorProductDetail";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <CartProvider>
        <BrowserRouter>
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/flash-sale" element={<FlashSalePage />} />

            {/* Vendor Store */}
            <Route path="/store/:vendorId" element={<VendorStorePage />} />
            <Route path="/vendor/product/:id" element={<VendorProductDetail />} />

            {/* Vendor Dashboard */}
            <Route path="/vendor" element={<VendorLayout />}>
              <Route index element={<VendorDashboard />} />
              <Route path="shop" element={<VendorDashboard />} />
              <Route path="products" element={<VendorDashboard />} />
              <Route path="analytics" element={<VendorDashboard />} />
              <Route path="settings" element={<VendorDashboard />} />
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