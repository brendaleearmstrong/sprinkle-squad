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
import ParentSignup from "./pages/ParentSignup";
import DailyBonus from "./pages/DailyBonus";
import Leaderboard from "./pages/Leaderboard";
import SpecialRewards from "./pages/SpecialRewards";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

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
            <Route path="/parent-signup" element={<ParentSignup />} />
            <Route path="/daily-bonus" element={<DailyBonus />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/special-rewards" element={<SpecialRewards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;