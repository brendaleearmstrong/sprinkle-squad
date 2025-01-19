import { Sparkles, Star, Heart, IceCream } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-8 pt-20">
      <div className="relative inline-block">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-hot-pink animate-float" />
          <IceCream className="w-7 h-7 text-neon-orange animate-spin-slow" />
          <span className="text-3xl font-display font-bold bg-gradient-to-r from-neon-pink via-hot-pink to-electric-purple bg-clip-text text-transparent">
            Hi Sprinkle Squad!
          </span>
          <Star className="w-6 h-6 text-neon-pink animate-float" style={{ animationDelay: '0.5s' }} />
          <Heart className="w-6 h-6 text-hot-pink animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Floating confetti-like elements */}
        <div className="absolute -top-4 -left-8">
          <Sparkles className="w-5 h-5 text-neon-orange animate-sprinkle-pop" />
        </div>
        <div className="absolute -top-6 -right-4">
          <Star className="w-4 h-4 text-electric-purple animate-float" />
        </div>
        <div className="absolute -bottom-2 right-1/4">
          <Heart className="w-4 h-4 text-hot-pink animate-sprinkle-pop" style={{ animationDelay: '0.3s' }} />
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