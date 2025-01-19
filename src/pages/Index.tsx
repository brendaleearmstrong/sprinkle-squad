import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { LoginButtons } from "@/components/home/LoginButtons";

export const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-space-white to-soft-white">
      <HeroSection />
      <FeatureCards />
      <LoginButtons />
    </div>
  );
};