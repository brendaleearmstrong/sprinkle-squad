import { IceCream, Sparkles } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-pink via-hot-pink to-electric-purple blur-xl opacity-50 group-hover:opacity-75 animate-pulse" />
        <Sparkles 
          className="absolute -top-4 -right-4 w-6 h-6 text-neon-pink animate-spin-slow" 
          strokeWidth={1.5}
        />
        <Sparkles 
          className="absolute -bottom-4 -left-4 w-6 h-6 text-hot-pink animate-spin-slow delay-150" 
          strokeWidth={1.5}
        />
        <IceCream 
          className="w-20 h-20 text-electric-purple relative animate-float group-hover:text-neon-pink transition-colors duration-300" 
          strokeWidth={2}
        />
      </div>
    </div>
  );
};