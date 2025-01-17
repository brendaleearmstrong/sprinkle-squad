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
      {/* Background sparkles with increased visibility and variety */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-sprinkle-pop"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `scale(${0.5 + Math.random() * 1.5})`,
            }}
          >
            {Math.random() > 0.5 ? (
              <Sparkles 
                className={`w-4 h-4 sm:w-6 sm:h-6 ${[
                  'text-neon-pink',
                  'text-hot-pink',
                  'text-neon-orange',
                  'text-bright-blue',
                  'text-neon-green',
                ][Math.floor(Math.random() * 5)]}`}
              />
            ) : (
              <Star 
                className={`w-3 h-3 sm:w-5 sm:h-5 ${[
                  'text-neon-pink',
                  'text-hot-pink',
                  'text-neon-orange',
                  'text-bright-blue',
                  'text-neon-green',
                ][Math.floor(Math.random() * 5)]}`}
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

        {/* Main CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {/* Kid Login */}
          <Link to="/kid-login" className="group">
            <div className="bg-gradient-to-br from-neon-orange to-hot-pink p-6 rounded-3xl shadow-xl transform transition-all duration-300 hover:scale-[1.02] h-full">
              <h3 className="text-2xl font-display text-space-white mb-3 flex items-center gap-3">
                <Star className="h-7 w-7 animate-spin-slow" />
                Start Your Adventure!
              </h3>
              <p className="text-space-white/90 mb-4 text-lg">Ready to collect sprinkles and earn amazing rewards?</p>
              <Button
                variant="default"
                size="lg"
                className="w-full bg-space-white text-neon-orange hover:bg-soft-white font-display text-xl py-6 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-105 border-4 border-space-white"
              >
                <Star className="mr-3 h-6 w-6 text-neon-orange group-hover:text-bright-orange animate-pulse" />
                Sprinkler Login
              </Button>
            </div>
          </Link>

          {/* Parent Section */}
          <Link to="/parent-login" className="group">
            <div className="bg-gradient-to-br from-neon-pink to-hot-pink p-6 rounded-3xl shadow-xl transform transition-all duration-300 hover:scale-[1.02] h-full">
              <h3 className="text-2xl font-display text-space-white mb-3 flex items-center gap-3">
                <Crown className="h-7 w-7 animate-float" />
                For Parents
              </h3>
              <p className="text-space-white/90 mb-4 text-lg">Create amazing challenges and rewards for your kids!</p>
              <Button
                variant="default"
                size="lg"
                className="w-full bg-space-white text-hot-pink hover:bg-soft-white font-display text-xl py-6 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-105 border-4 border-space-white"
              >
                <Sparkles className="mr-3 h-6 w-6 text-hot-pink group-hover:text-neon-pink" />
                Create Account
              </Button>
            </div>
          </Link>
        </div>

        {/* Feature Cards Section */}
        <div className="py-16">
          <FeatureCards />
        </div>

        {/* Premium Features Section */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-neon-pink to-hot-pink p-8 rounded-3xl shadow-xl">
              <h3 className="text-3xl font-display text-space-white mb-4 text-center flex items-center justify-center gap-3">
                <CreditCard className="h-8 w-8 text-space-white animate-pulse" />
                Premium Features
              </h3>
              <p className="text-space-white/90 text-center mb-6">
                Unlock advanced features and unlimited rewards with our premium subscription!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="h-12 px-8 bg-space-white hover:bg-soft-white text-hot-pink font-display flex items-center gap-2"
                >
                  <CreditCard className="h-5 w-5" />
                  Subscribe Monthly
                </Button>
                <Button 
                  size="lg"
                  variant="secondary"
                  className="h-12 px-8 bg-space-white/10 hover:bg-space-white/20 text-space-white font-display flex items-center gap-2 border-2 border-space-white"
                >
                  <Crown className="h-5 w-5" />
                  Annual Plan
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Login Buttons Section */}
        <div className="py-16">
          <LoginButtons />
        </div>
      </div>

      {/* Static Footer with hot pink background */}
      <footer className="w-full bg-hot-pink text-space-white py-8 mt-auto relative overflow-hidden">
        {/* Animated sprinkles in footer */}
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
  );
};

export default Index;
