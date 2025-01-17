import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { LoginButtons } from "@/components/home/LoginButtons";
import { Heart, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative overflow-hidden">
      {/* Animated Background Sprinkles with responsive sizing */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sprinkle-pop"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            {Math.random() > 0.7 ? (
              <Star 
                className={`w-2 h-2 sm:w-3 sm:h-3 ${[
                  'text-berry-blast',
                  'text-mint-chip',
                  'text-cherry-top',
                  'text-caramel-drizzle',
                  'text-sprinkle-rainbow-blue',
                  'text-sprinkle-rainbow-purple'
                ][Math.floor(Math.random() * 6)]}`}
              />
            ) : Math.random() > 0.4 ? (
              <Heart 
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${[
                  'text-berry-blast',
                  'text-mint-chip',
                  'text-cherry-top',
                  'text-caramel-drizzle',
                  'text-sprinkle-rainbow-blue',
                  'text-sprinkle-rainbow-purple'
                ][Math.floor(Math.random() * 6)]}`}
              />
            ) : (
              <div 
                className={`
                  w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shadow-lg
                  ${[
                    'bg-berry-blast',
                    'bg-mint-chip',
                    'bg-cherry-top',
                    'bg-caramel-drizzle',
                    'bg-sprinkle-rainbow-blue',
                    'bg-sprinkle-rainbow-purple'
                  ][Math.floor(Math.random() * 6)]}
                `}
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="w-full space-y-8 sm:space-y-12 lg:space-y-16">
        <HeroSection />
        <FeatureCards />
        <LoginButtons />
      </div>
    </div>
  );
};

export default Index;