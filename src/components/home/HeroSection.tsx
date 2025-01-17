import { Logo } from "@/components/ui/Logo";
import { Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-4">
      <div className="flex justify-center mb-2">
        <div className="relative transform hover:scale-110 transition-transform duration-300 animate-float">
          <Logo className="w-32 h-32" />
          <div className="absolute -top-4 -right-4">
            <Sparkles className="w-6 h-6 text-neon-pink animate-spin-slow" />
          </div>
          <div className="absolute -bottom-2 -left-4">
            <Sparkles className="w-5 h-5 text-hot-pink animate-spin-slow" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
      
      <div className="relative inline-block w-full max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
          <span className="bg-gradient-to-r from-neon-pink via-hot-pink to-neon-orange bg-clip-text text-transparent">
            Turn Tasks into
          </span>
          <br />
          <span className="relative inline-block bg-gradient-to-r from-hot-pink via-neon-orange to-electric-purple bg-clip-text text-transparent">
            Sweet Adventures!
            <span className="absolute -top-6 right-4 transform rotate-12">
              <Sparkles className="w-8 h-8 text-neon-pink animate-spin-slow" />
            </span>
          </span>
        </h1>
      </div>

      <p className="text-lg sm:text-xl md:text-2xl font-body text-electric-purple/90 max-w-2xl mx-auto leading-relaxed bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-hot-pink/20">
        Join the fun! Complete tasks, collect magical{" "}
        <span className="relative inline-block">
          <span className="text-neon-pink font-bold">
            ✨sprinkles✨
          </span>
          <span className="absolute -top-3 -right-3">
            <Sparkles className="w-4 h-4 text-neon-orange animate-spin-slow" />
          </span>
        </span>
        {" "}and unlock amazing rewards!
      </p>
    </div>
  );
};