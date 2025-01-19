import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { LoginButtons } from "@/components/home/LoginButtons";
import { Star, Sparkles } from "lucide-react";

// Background sprinkle component
const BackgroundSprinkle = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none animate-float ${className}`}>
    <Star className="w-4 h-4" />
  </div>
);

const BackgroundSparkle = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none animate-sprinkle-pop ${className}`}>
    <Sparkles className="w-3 h-3" />
  </div>
);

export const Index = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-space-white to-soft-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top left cluster */}
        <BackgroundSprinkle className="top-[10%] left-[15%] text-neon-pink delay-500" />
        <BackgroundSparkle className="top-[15%] left-[10%] text-hot-pink delay-700" />
        <BackgroundSprinkle className="top-[20%] left-[20%] text-electric-purple delay-[1200ms]" />
        
        {/* Top right cluster */}
        <BackgroundSparkle className="top-[5%] right-[25%] text-neon-orange delay-300" />
        <BackgroundSprinkle className="top-[15%] right-[15%] text-bright-orange delay-[900ms]" />
        <BackgroundSparkle className="top-[25%] right-[20%] text-electric-blue delay-[1500ms]" />
        
        {/* Middle left cluster */}
        <BackgroundSparkle className="top-[40%] left-[5%] text-neon-green delay-400" />
        <BackgroundSprinkle className="top-[45%] left-[15%] text-bright-blue delay-[1100ms]" />
        
        {/* Middle right cluster */}
        <BackgroundSprinkle className="top-[35%] right-[10%] text-hot-pink delay-600" />
        <BackgroundSparkle className="top-[50%] right-[5%] text-electric-purple delay-[1300ms]" />
        
        {/* Bottom clusters */}
        <BackgroundSparkle className="bottom-[20%] left-[20%] text-neon-orange delay-[800ms]" />
        <BackgroundSprinkle className="bottom-[15%] right-[25%] text-bright-orange delay-[1400ms]" />
        <BackgroundSparkle className="bottom-[10%] left-[30%] text-electric-blue delay-[1000ms]" />
        <BackgroundSprinkle className="bottom-[25%] right-[15%] text-neon-pink delay-[1600ms]" />
      </div>

      {/* Content */}
      <HeroSection />
      <FeatureCards />
      <LoginButtons />
    </div>
  );
};