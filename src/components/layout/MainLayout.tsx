import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue via-soft-yellow to-soft-pink">
      {/* Main content area with improved padding for different screen sizes */}
      <main className="relative pb-20 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation with frosted glass effect */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="backdrop-blur-md bg-white/70 border-t border-primary/10 shadow-lg">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};