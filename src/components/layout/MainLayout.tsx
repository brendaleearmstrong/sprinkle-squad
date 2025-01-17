import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-vanilla-cream">
      <Header />
      <main className="relative pb-24 pt-20 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <Outlet />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="backdrop-blur-md bg-vanilla-cream/90 border-t border-chocolate-swirl/10 shadow-lg">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};