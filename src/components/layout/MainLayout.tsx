import React from "react";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-cream via-cotton-candy to-pastel-sky">
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};