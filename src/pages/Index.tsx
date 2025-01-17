import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { LoginButtons } from "@/components/home/LoginButtons";
import { Heart, Star, Sparkles, Crown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the subscription
    toast({
      title: "Thanks for subscribing!",
      description: "We'll keep you updated about new features.",
    });
    setEmail("");
  };

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
        {/* Hero Section with CTAs moved up */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-4 pb-8">
          <HeroSection />
          
          {/* Main CTAs - Side by side on desktop */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Kid Login - More prominent */}
            <div className="bg-gradient-to-br from-neon-orange via-bright-orange to-hot-pink p-6 rounded-3xl shadow-xl transform transition-all duration-300 hover:scale-[1.02] order-1 md:order-none">
              <h3 className="text-2xl font-display text-space-white mb-3 flex items-center gap-3">
                <Star className="h-7 w-7 animate-spin-slow" />
                Kids Zone!
              </h3>
              <p className="text-space-white/90 mb-4 text-lg">Ready for an amazing adventure? Jump right in!</p>
              <Link to="/kid-login" className="group block">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-space-white text-neon-orange hover:bg-soft-white font-display text-xl py-6 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-105 border-4 border-space-white"
                >
                  <Star className="mr-3 h-6 w-6 text-neon-orange group-hover:text-bright-orange animate-pulse" />
                  Start Playing!
                </Button>
              </Link>
            </div>

            {/* Parent Section */}
            <div className="bg-gradient-to-br from-electric-purple via-soft-purple to-neon-pink p-6 rounded-3xl shadow-xl transform transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-2xl font-display text-space-white mb-3 flex items-center gap-3">
                <Crown className="h-7 w-7 animate-float" />
                Parents Corner
              </h3>
              <p className="text-space-white/90 mb-4 text-lg">Create amazing challenges and rewards for your kids!</p>
              <Link to="/parent-login" className="group block">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-space-white text-electric-purple hover:bg-soft-white font-display text-xl py-6 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-105 border-4 border-space-white"
                >
                  <Sparkles className="mr-3 h-6 w-6 text-electric-purple group-hover:text-soft-purple" />
                  Parent Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Benefits - More visual */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Star className="w-8 h-8 text-neon-orange animate-pulse" />,
                text: "Earn Fun Rewards"
              },
              {
                icon: <Heart className="w-8 h-8 text-hot-pink animate-bounce" />,
                text: "Complete Tasks Together"
              },
              {
                icon: <Sparkles className="w-8 h-8 text-electric-purple animate-spin-slow" />,
                text: "Watch Progress Grow"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-space-white/95 to-space-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg flex flex-col items-center gap-3 transform transition-all duration-300 hover:scale-105 border border-soft-purple/10"
              >
                {item.icon}
                <span className="font-display text-lg text-electric-purple font-bold">
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

        {/* Newsletter Section */}
        <div className="bg-vanilla-cream py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-br from-electric-purple to-soft-purple p-8 rounded-3xl shadow-xl">
              <h3 className="text-3xl font-display text-space-white mb-4 text-center">Stay Updated!</h3>
              <p className="text-space-white/90 text-center mb-6">
                Subscribe to get the latest updates about new features and rewards!
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 text-lg bg-space-white border-2 border-space-white/20"
                  required
                />
                <Button 
                  type="submit"
                  size="lg"
                  className="h-12 px-8 bg-neon-pink hover:bg-hot-pink text-space-white font-display"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Login Options */}
        <div className="bg-vanilla-cream pb-8">
          <LoginButtons />
        </div>

        {/* Footer */}
        <footer className="bg-deep-purple text-space-white py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-space-white/80 text-sm">
                © 2024 Devera Tech. All rights reserved.
              </p>
              <div className="mt-4 flex justify-center space-x-4 text-space-white/60 text-sm">
                <a href="#" className="hover:text-space-white transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-space-white transition-colors">Terms of Service</a>
                <span>•</span>
                <a href="#" className="hover:text-space-white transition-colors">Contact Us</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;