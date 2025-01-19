import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { LoginButtons } from "@/components/home/LoginButtons";
import { 
  Star, 
  Sparkles, 
  Heart, 
  IceCream, 
  Cloud, 
  Candy,
  Cake,
  PartyPopper,
  Snowflake,
  Sun,
  Zap
} from "lucide-react";

// Background decoration components
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

const BackgroundIceCream = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none animate-float ${className}`}>
    <IceCream className="w-6 h-6" />
  </div>
);

const BackgroundCloud = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none animate-float ${className}`}>
    <Cloud className="w-8 h-8 opacity-20" />
  </div>
);

const BackgroundCandy = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none animate-spin-slow ${className}`}>
    <Candy className="w-5 h-5" />
  </div>
);

const BackgroundHeart = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none animate-float ${className}`}>
    <Heart className="w-4 h-4" />
  </div>
);

const BackgroundCake = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none animate-float ${className}`}>
    <Cake className="w-6 h-6" />
  </div>
);

const BackgroundParty = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none animate-sprinkle-pop ${className}`}>
    <PartyPopper className="w-6 h-6" />
  </div>
);

const BackgroundSnowflake = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none animate-spin-slow ${className}`}>
    <Snowflake className="w-4 h-4" />
  </div>
);

const BackgroundSun = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none animate-spin-slow ${className}`}>
    <Sun className="w-6 h-6" />
  </div>
);

const BackgroundZap = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none animate-sprinkle-pop ${className}`}>
    <Zap className="w-4 h-4" />
  </div>
);

export const Index = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-space-white to-soft-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Clouds Layer */}
        <BackgroundCloud className="top-[5%] left-[10%] text-soft-purple delay-[800ms]" />
        <BackgroundCloud className="top-[15%] right-[15%] text-electric-purple delay-[1200ms]" />
        <BackgroundCloud className="top-[45%] left-[20%] text-soft-purple delay-[2000ms]" />
        <BackgroundCloud className="bottom-[20%] right-[25%] text-electric-purple delay-[1600ms]" />
        <BackgroundCloud className="top-[60%] left-[40%] text-soft-purple delay-[2400ms]" />
        
        {/* Ice Creams Layer - Added more! */}
        <BackgroundIceCream className="top-[8%] left-[25%] text-neon-pink delay-[300ms]" />
        <BackgroundIceCream className="top-[30%] right-[8%] text-hot-pink delay-[900ms]" />
        <BackgroundIceCream className="bottom-[15%] left-[15%] text-neon-orange delay-[1500ms]" />
        <BackgroundIceCream className="bottom-[35%] right-[20%] text-bright-orange delay-[2100ms]" />
        <BackgroundIceCream className="top-[50%] left-[35%] text-neon-pink delay-[2700ms]" />
        <BackgroundIceCream className="bottom-[45%] right-[30%] text-hot-pink delay-[3000ms]" />
        
        {/* Candies Layer - Added more! */}
        <BackgroundCandy className="top-[20%] left-[40%] text-neon-pink delay-[600ms]" />
        <BackgroundCandy className="top-[40%] right-[35%] text-hot-pink delay-[1800ms]" />
        <BackgroundCandy className="bottom-[25%] left-[30%] text-electric-purple delay-[1200ms]" />
        <BackgroundCandy className="top-[55%] right-[45%] text-neon-orange delay-[2400ms]" />
        <BackgroundCandy className="bottom-[40%] left-[25%] text-bright-orange delay-[3300ms]" />
        
        {/* Party Poppers for Confetti Effect */}
        <BackgroundParty className="top-[10%] right-[20%] text-neon-pink delay-[450ms]" />
        <BackgroundParty className="bottom-[30%] left-[40%] text-hot-pink delay-[1650ms]" />
        <BackgroundParty className="top-[45%] right-[10%] text-electric-purple delay-[2850ms]" />
        
        {/* Rainbow Effect using Colorful Icons */}
        <BackgroundSun className="top-[25%] left-[45%] text-neon-orange delay-[750ms]" />
        <BackgroundZap className="top-[35%] left-[48%] text-hot-pink delay-[900ms]" />
        <BackgroundSnowflake className="top-[45%] left-[46%] text-electric-blue delay-[1050ms]" />
        
        {/* Hearts Layer */}
        <BackgroundHeart className="top-[12%] right-[45%] text-neon-pink delay-[450ms]" />
        <BackgroundHeart className="top-[35%] left-[12%] text-hot-pink delay-[1350ms]" />
        <BackgroundHeart className="bottom-[30%] right-[15%] text-electric-purple delay-[1950ms]" />
        <BackgroundHeart className="top-[65%] left-[35%] text-neon-pink delay-[2550ms]" />
        
        {/* Sprinkles Layer - Added many more! */}
        <BackgroundSprinkle className="top-[10%] left-[15%] text-neon-pink delay-500" />
        <BackgroundSparkle className="top-[15%] left-[10%] text-hot-pink delay-700" />
        <BackgroundSprinkle className="top-[20%] left-[20%] text-electric-purple delay-[1200ms]" />
        <BackgroundSparkle className="top-[5%] right-[25%] text-neon-orange delay-300" />
        <BackgroundSprinkle className="top-[15%] right-[15%] text-bright-orange delay-[900ms]" />
        <BackgroundSparkle className="top-[25%] right-[20%] text-electric-blue delay-[1500ms]" />
        <BackgroundSparkle className="top-[40%] left-[5%] text-neon-green delay-400" />
        <BackgroundSprinkle className="top-[45%] left-[15%] text-bright-blue delay-[1100ms]" />
        <BackgroundSprinkle className="top-[35%] right-[10%] text-hot-pink delay-600" />
        <BackgroundSparkle className="top-[50%] right-[5%] text-electric-purple delay-[1300ms]" />
        <BackgroundSparkle className="bottom-[20%] left-[20%] text-neon-orange delay-[800ms]" />
        <BackgroundSprinkle className="bottom-[15%] right-[25%] text-bright-orange delay-[1400ms]" />
        <BackgroundSparkle className="bottom-[10%] left-[30%] text-electric-blue delay-[1000ms]" />
        <BackgroundSprinkle className="bottom-[25%] right-[15%] text-neon-pink delay-[1600ms]" />
        
        {/* Additional Sparkles for Extra Fun */}
        <BackgroundSparkle className="top-[18%] left-[35%] text-neon-green delay-[1700ms]" />
        <BackgroundSparkle className="top-[28%] right-[40%] text-bright-blue delay-[1900ms]" />
        <BackgroundSparkle className="bottom-[22%] left-[40%] text-hot-pink delay-[2200ms]" />
        <BackgroundSparkle className="bottom-[32%] right-[35%] text-neon-orange delay-[2400ms]" />
        <BackgroundSparkle className="top-[70%] left-[25%] text-electric-purple delay-[2600ms]" />
        <BackgroundSparkle className="bottom-[40%] right-[45%] text-neon-pink delay-[2800ms]" />
        <BackgroundSparkle className="top-[85%] left-[45%] text-bright-orange delay-[3000ms]" />
        <BackgroundSparkle className="bottom-[50%] right-[20%] text-neon-green delay-[3200ms]" />
      </div>

      {/* Content */}
      <HeroSection />
      <FeatureCards />
      <LoginButtons />
    </div>
  );
};