import { IceCream, Sparkles, Cake, Cookie } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-4xl font-display font-bold">
      <div className="relative flex items-center gap-1">
        <IceCream className="w-12 h-12 text-berry-blast animate-float" />
        <Cake className="w-8 h-8 text-mint-chip animate-float" style={{ animationDelay: "0.2s" }} />
        <Cookie className="w-8 h-8 text-chocolate-swirl animate-float" style={{ animationDelay: "0.4s" }} />
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-sprinkle-rainbow-yellow animate-spin-slow" />
      </div>
      <span className="bg-gradient-to-r from-berry-blast via-mint-chip to-cherry-top bg-clip-text text-transparent">
        SprinkleSquad
      </span>
    </div>
  );
};