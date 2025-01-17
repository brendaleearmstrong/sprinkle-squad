import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { LoginButtons } from "@/components/home/LoginButtons";
import { Heart, Star, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative overflow-hidden">
      {/* Background animations */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={`static-${i}`}
            className="absolute animate-sprinkle-pop"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            {Math.random() > 0.6 ? (
              <Star 
                className={`w-2 h-2 sm:w-3 sm:h-3 ${[
                  'text-neon-pink',
                  'text-hot-pink',
                  'text-neon-orange',
                  'text-bright-orange',
                  'text-electric-purple',
                  'text-neon-green'
                ][Math.floor(Math.random() * 6)]}`}
              />
            ) : Math.random() > 0.3 ? (
              <Heart 
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${[
                  'text-neon-pink',
                  'text-hot-pink',
                  'text-neon-orange',
                  'text-bright-orange',
                  'text-electric-purple',
                  'text-soft-purple'
                ][Math.floor(Math.random() * 6)]}`}
              />
            ) : (
              <div 
                className={`
                  w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shadow-lg animate-pulse
                  ${[
                    'bg-neon-pink',
                    'bg-hot-pink',
                    'bg-neon-orange',
                    'bg-bright-orange',
                    'bg-electric-purple',
                    'bg-neon-green'
                  ][Math.floor(Math.random() * 6)]}
                `}
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            )}
          </div>
        ))}

        {/* Shooting stars effect */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute animate-shooting"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            <Sparkles 
              className={`w-3 h-3 sm:w-4 sm:h-4 transform -rotate-45 ${[
                'text-neon-pink',
                'text-hot-pink',
                'text-neon-orange',
                'text-bright-orange',
                'text-electric-purple',
                'text-neon-green'
              ][Math.floor(Math.random() * 6)]}`}
            />
          </div>
        ))}
      </div>

      <div className="w-full">
        {/* Hero Section */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-8 pb-12">
          <HeroSection />
          
          {/* Main CTAs - Side by side on desktop */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Kid Login - More prominent */}
            <div className="bg-gradient-to-br from-neon-orange via-bright-orange to-hot-pink p-8 rounded-3xl shadow-xl transform transition-all duration-300 hover:scale-[1.02] order-1 md:order-none">
              <h3 className="text-3xl font-display text-space-white mb-4 flex items-center gap-3">
                <Star className="h-8 w-8 animate-spin-slow" />
                Kids Zone!
              </h3>
              <p className="text-space-white/90 mb-6 text-lg">Ready for an amazing adventure? Jump right in!</p>
              <Link to="/kid-login" className="group block">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-space-white text-neon-orange hover:bg-soft-white font-display text-2xl py-8 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-105 border-4 border-space-white"
                >
                  <Star className="mr-3 h-7 w-7 text-neon-orange group-hover:text-bright-orange animate-pulse" />
                  Start Playing!
                </Button>
              </Link>
            </div>

            {/* Parent Section */}
            <div className="bg-gradient-to-br from-electric-purple via-soft-purple to-neon-pink p-8 rounded-3xl shadow-xl transform transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-3xl font-display text-space-white mb-4 flex items-center gap-3">
                <Crown className="h-8 w-8 animate-float" />
                Parents Corner
              </h3>
              <p className="text-space-white/90 mb-6 text-lg">Create amazing challenges and rewards for your kids!</p>
              <Link to="/parent-login" className="group block">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-space-white text-electric-purple hover:bg-soft-white font-display text-2xl py-8 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-105 border-4 border-space-white"
                >
                  <Sparkles className="mr-3 h-7 w-7 text-electric-purple group-hover:text-soft-purple" />
                  Parent Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Benefits - More visual */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Star className="w-10 h-10 text-neon-orange animate-pulse" />,
                text: "Earn Fun Rewards"
              },
              {
                icon: <Heart className="w-10 h-10 text-hot-pink animate-bounce" />,
                text: "Complete Tasks Together"
              },
              {
                icon: <Sparkles className="w-10 h-10 text-electric-purple animate-spin-slow" />,
                text: "Watch Progress Grow"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-space-white/95 to-space-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4 transform transition-all duration-300 hover:scale-105 border border-soft-purple/10"
              >
                {item.icon}
                <span className="font-display text-xl text-electric-purple font-bold">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards Section - More game-like */}
        <div className="bg-gradient-to-b from-transparent to-vanilla-cream pt-16">
          <FeatureCards />
        </div>

        {/* Additional Login Options */}
        <div className="bg-vanilla-cream pb-16">
          <LoginButtons />
        </div>
      </div>
    </div>
  );
};

export default Index;