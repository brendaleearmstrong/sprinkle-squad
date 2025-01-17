import { IceCream, Sparkles } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-4xl font-display font-bold">
      <div className="relative">
        <IceCream className="w-12 h-12 text-berry-blast animate-float" />
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-mint-chip animate-spin-slow" />
      </div>
      <span className="bg-gradient-to-r from-berry-blast via-mint-chip to-cherry-top bg-clip-text text-transparent">
        SprinkleSquad
      </span>
    </div>
  );
};