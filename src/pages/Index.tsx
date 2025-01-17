import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { LoginButtons } from "@/components/home/LoginButtons";
import { Heart, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative overflow-hidden">
      {/* Animated Background Sprinkles */}
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
        {/* Hero Section with immediate CTAs */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-8 pb-12">
          <HeroSection />
          
          {/* Quick Access Buttons */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link to="/kid-login" className="group">
              <Button
                variant="default"
                size="lg"
                className="w-full bg-neon-orange hover:bg-bright-orange text-space-white font-display text-xl sm:text-2xl py-6 rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <Star className="mr-3 h-6 w-6 animate-spin-slow" />
                Start Your Adventure!
              </Button>
            </Link>
            
            <Link to="/parent-login" className="group">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-4 border-electric-purple bg-space-white text-electric-purple font-display text-xl sm:text-2xl py-6 rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <Sparkles className="mr-3 h-6 w-6 animate-float" />
                Parent Dashboard
              </Button>
            </Link>
          </div>

          {/* Quick Benefits */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            {[
              {
                icon: <Star className="w-8 h-8 text-neon-orange" />,
                text: "Earn Fun Rewards"
              },
              {
                icon: <Heart className="w-8 h-8 text-hot-pink" />,
                text: "Complete Tasks Together"
              },
              {
                icon: <Sparkles className="w-8 h-8 text-electric-purple" />,
                text: "Watch Progress Grow"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-space-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg flex flex-col items-center gap-2"
              >
                {item.icon}
                <span className="font-display text-lg text-electric-purple">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="bg-gradient-to-b from-transparent to-vanilla-cream pt-12">
          <FeatureCards />
        </div>

        {/* Additional Login Options */}
        <div className="bg-vanilla-cream pb-20">
          <LoginButtons />
        </div>
      </div>
    </div>
  );
};

export default Index;