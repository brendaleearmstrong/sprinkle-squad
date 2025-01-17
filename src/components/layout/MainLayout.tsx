import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-soft-white">
      <Header />
      <main className="flex-1 relative">
        <div className="absolute inset-0 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 pb-24">
            <Outlet />
          </div>
        </div>
      </main>
      <footer className="w-full bg-deep-purple text-space-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-space-white/90 text-sm">
              © 2025 Devera Tech. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-4 text-space-white/80 text-sm">
              <a href="#" className="hover:text-space-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-space-white transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-space-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
      <BottomNav />
    </div>
  );
};