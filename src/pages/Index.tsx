import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { LoginButtons } from "@/components/home/LoginButtons";
import { TestingPanel } from "@/components/testing/TestingPanel";

export const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-space-white to-soft-white">
      <HeroSection />
      <FeatureCards />
      <LoginButtons />
      <div className="container mx-auto px-4 py-8">
        <TestingPanel />
      </div>
    </div>
  );
};