import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import VendorLayout from "./pages/vendor/VendorLayout";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/products" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Vendor (Admin) Portal */}
          <Route path="/vendor" element={<VendorLayout />}>
            <Route index element={<VendorDashboard />} />
            <Route path="shop" element={<VendorDashboard />} />
            <Route path="products" element={<VendorDashboard />} />
            <Route path="applications" element={<VendorDashboard />} />
            <Route path="ledger" element={<VendorDashboard />} />
            <Route path="analytics" element={<VendorDashboard />} />
            <Route path="settings" element={<VendorDashboard />} />
          </Route>

          {/* Super Admin Portal */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="vendors" element={<AdminDashboard />} />
            <Route path="users" element={<AdminDashboard />} />
            <Route path="applications" element={<AdminDashboard />} />
            <Route path="reports" element={<AdminDashboard />} />
            <Route path="security" element={<AdminDashboard />} />
            <Route path="settings" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
