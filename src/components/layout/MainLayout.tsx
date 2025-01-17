import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vanilla-cream via-berry-blast/30 to-mint-chip/30 overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')] opacity-[0.03] pointer-events-none" />
      <main className="relative pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};