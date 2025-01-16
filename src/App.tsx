import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import ParentLogin from "./pages/ParentLogin";
import KidLogin from "./pages/KidLogin";
import ParentDashboard from "./pages/ParentDashboard";
import KidDashboard from "./pages/KidDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/parent-login" element={<ParentLogin />} />
            <Route path="/kid-login" element={<KidLogin />} />
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/kid-dashboard" element={<KidDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;