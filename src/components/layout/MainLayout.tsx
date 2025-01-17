import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vanilla-cream via-whipped-cream to-mint-chip/20">
      {/* Decorative sprinkle pattern overlay */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')] opacity-[0.03] pointer-events-none" />
      
      {/* Main content area */}
      <main className="relative pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation with frosted glass effect */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-t border-waffle-cone/10 shadow-lg">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};