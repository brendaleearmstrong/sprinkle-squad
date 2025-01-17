import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-vanilla-cream">
      <Header />
      <main className="pb-24">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
};