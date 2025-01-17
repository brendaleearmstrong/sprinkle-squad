import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { LoginButtons } from "@/components/home/LoginButtons";
import { Heart, Star, Sparkles, Crown, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white">
      {/* Background sparkles with increased visibility */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-sprinkle-pop"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `scale(${0.8 + Math.random() * 2})`,
            }}
          >
            {Math.random() > 0.5 ? (
              <Sparkles 
                className={`w-6 h-6 sm:w-8 sm:h-8 ${[
                  'text-neon-pink',
                  'text-hot-pink',
                  'text-neon-orange',
                  'text-bright-blue',
                  'text-neon-green',
                  'text-electric-purple',
                ][Math.floor(Math.random() * 6)]}`}
              />
            ) : (
              <Star 
                className={`w-4 h-4 sm:w-6 sm:h-6 ${[
                  'text-neon-pink',
                  'text-hot-pink',
                  'text-neon-orange',
                  'text-bright-blue',
                  'text-neon-green',
                  'text-electric-purple',
                ][Math.floor(Math.random() * 6)]}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="pt-8 pb-12">
          <HeroSection />
        </div>

        {/* Login/Join Section */}
        <LoginButtons />

        {/* Feature Cards Section with expanded descriptions */}
        <div className="py-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12 bg-gradient-to-r from-neon-pink via-hot-pink to-neon-orange bg-clip-text text-transparent">
            Transform Tasks into Adventures!
          </h2>
          <FeatureCards />
        </div>

        {/* Premium Features Section */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-electric-purple to-deep-purple p-8 rounded-3xl shadow-xl">
              <h3 className="text-3xl font-display text-space-white mb-6 text-center">
                Premium Benefits for Parents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-space-white/10 p-6 rounded-2xl">
                  <h4 className="text-xl font-display text-space-white mb-2">Monthly Plan</h4>
                  <ul className="text-space-white/90 space-y-2">
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-neon-pink" />
                      Unlimited task creation
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-neon-orange" />
                      Custom reward system
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-hot-pink" />
                      Progress tracking
                    </li>
                  </ul>
                </div>
                <div className="bg-space-white/10 p-6 rounded-2xl">
                  <h4 className="text-xl font-display text-space-white mb-2">Annual Plan</h4>
                  <ul className="text-space-white/90 space-y-2">
                    <li className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-neon-orange" />
                      Everything in Monthly
                    </li>
                    <li className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-neon-pink" />
                      2 months free
                    </li>
                    <li className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-bright-blue" />
                      Priority support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full bg-hot-pink text-space-white py-8 mt-auto relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={`footer-sparkle-${i}`}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <Sparkles 
                className={`w-4 h-4 ${[
                  'text-space-white/30',
                  'text-space-white/20',
                  'text-space-white/40',
                ][Math.floor(Math.random() * 3)]}`}
              />
            </div>
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <p className="text-space-white/90 text-sm">
              © 2025 Devera Tech. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-4 text-space-white/80 text-sm">
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
