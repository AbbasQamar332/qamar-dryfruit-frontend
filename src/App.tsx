import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import AdminRoute from "@/components/AdminRoute";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProductsAdmin from "./pages/admin/ProductsAdmin.tsx";
import AboutAdmin from "./pages/admin/AboutAdmin.tsx";
import BenefitsAdmin from "./pages/admin/BenefitsAdmin.tsx";
import GalleryAdmin from "./pages/admin/GalleryAdmin.tsx";
import MessagesAdmin from "./pages/admin/MessagesAdmin.tsx";
import SettingsAdmin from "./pages/admin/SettingsAdmin.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
                <Route path="/dashboard/products" element={<AdminRoute><ProductsAdmin /></AdminRoute>} />
                <Route path="/dashboard/about" element={<AdminRoute><AboutAdmin /></AdminRoute>} />
                <Route path="/dashboard/benefits" element={<AdminRoute><BenefitsAdmin /></AdminRoute>} />
                <Route path="/dashboard/gallery" element={<AdminRoute><GalleryAdmin /></AdminRoute>} />
                <Route path="/dashboard/messages" element={<AdminRoute><MessagesAdmin /></AdminRoute>} />
                <Route path="/dashboard/settings" element={<AdminRoute><SettingsAdmin /></AdminRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
