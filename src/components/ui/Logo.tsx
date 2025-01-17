import { IceCream, Sparkles, Cake, Cookie } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-3 text-4xl font-display font-bold">
      <div className="relative flex items-center gap-2">
        <IceCream className="w-12 h-12 text-berry-blast animate-float" />
        <Cake className="w-10 h-10 text-mint-chip animate-float" style={{ animationDelay: "0.2s" }} />
        <Cookie className="w-8 h-8 text-chocolate-swirl animate-float" style={{ animationDelay: "0.4s" }} />
        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-sprinkle-rainbow-yellow animate-spin-slow" />
      </div>
      <span className="bg-gradient-to-r from-berry-blast via-mint-chip to-cherry-top bg-clip-text text-transparent text-5xl">
        SprinkleSquad
      </span>
    </div>
  );
};