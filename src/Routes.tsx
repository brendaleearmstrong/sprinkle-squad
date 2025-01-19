import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Index } from "./pages/Index";
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
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { ComingSoon } from "./pages/ComingSoon";

export const Routes = () => {
  const [isParent, setIsParent] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("preview-authenticated") === "true";
  });

  useEffect(() => {
    checkUserType();
  }, []);

  const checkUserType = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_parent')
        .eq('id', user.id)
        .maybeSingle();
      
      setIsParent(profile?.is_parent ?? null);
    }
  };

  if (!isAuthenticated) {
    return <ComingSoon onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  return (
    <RouterRoutes>
      <Route element={<MainLayout />}>
        <Route path="/" element={
          isParent ? <Navigate to="/parent-dashboard" /> : <Index />
        } />
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
    </RouterRoutes>
  );
};