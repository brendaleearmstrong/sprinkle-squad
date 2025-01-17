import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { LoginButtons } from "@/components/home/LoginButtons";
import { Heart, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 relative overflow-hidden">
      {/* Animated Background Sprinkles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
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
                className={`w-3 h-3 ${[
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
                className={`w-2 h-2 ${[
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
                  w-2 h-2 rounded-full shadow-lg
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

      <HeroSection />
      <FeatureCards />
      <LoginButtons />
    </div>
  );
};

export default Index;