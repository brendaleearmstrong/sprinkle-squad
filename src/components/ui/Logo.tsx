import { IceCream } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-pink via-hot-pink to-electric-purple blur-xl opacity-50 animate-pulse" />
        <IceCream 
          className="w-20 h-20 text-electric-purple relative animate-float" 
          strokeWidth={2}
        />
      </div>
    </div>
  );
};