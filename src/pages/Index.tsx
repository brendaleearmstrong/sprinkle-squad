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
        <BackgroundSprinkle className="top-[10%] left-[15%] text-neon-pink" style={{ animationDelay: '0.5s' }} />
        <BackgroundSparkle className="top-[15%] left-[10%] text-hot-pink" style={{ animationDelay: '0.7s' }} />
        <BackgroundSprinkle className="top-[20%] left-[20%] text-electric-purple" style={{ animationDelay: '1.2s' }} />
        
        {/* Top right cluster */}
        <BackgroundSparkle className="top-[5%] right-[25%] text-neon-orange" style={{ animationDelay: '0.3s' }} />
        <BackgroundSprinkle className="top-[15%] right-[15%] text-bright-orange" style={{ animationDelay: '0.9s' }} />
        <BackgroundSparkle className="top-[25%] right-[20%] text-electric-blue" style={{ animationDelay: '1.5s' }} />
        
        {/* Middle left cluster */}
        <BackgroundSparkle className="top-[40%] left-[5%] text-neon-green" style={{ animationDelay: '0.4s' }} />
        <BackgroundSprinkle className="top-[45%] left-[15%] text-bright-blue" style={{ animationDelay: '1.1s' }} />
        
        {/* Middle right cluster */}
        <BackgroundSprinkle className="top-[35%] right-[10%] text-hot-pink" style={{ animationDelay: '0.6s' }} />
        <BackgroundSparkle className="top-[50%] right-[5%] text-electric-purple" style={{ animationDelay: '1.3s' }} />
        
        {/* Bottom clusters */}
        <BackgroundSparkle className="bottom-[20%] left-[20%] text-neon-orange" style={{ animationDelay: '0.8s' }} />
        <BackgroundSprinkle className="bottom-[15%] right-[25%] text-bright-orange" style={{ animationDelay: '1.4s' }} />
        <BackgroundSparkle className="bottom-[10%] left-[30%] text-electric-blue" style={{ animationDelay: '1.0s' }} />
        <BackgroundSprinkle className="bottom-[25%] right-[15%] text-neon-pink" style={{ animationDelay: '1.6s' }} />
      </div>

      {/* Content */}
      <HeroSection />
      <FeatureCards />
      <LoginButtons />
    </div>
  );
};