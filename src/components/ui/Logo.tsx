import { IceCream } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="relative">
        <IceCream 
          className="w-12 h-12 text-berry-blast animate-float" 
          strokeWidth={2.5}
        />
      </div>
      <span className="bg-gradient-to-r from-berry-blast via-mint-chip to-caramel-drizzle bg-clip-text text-transparent text-4xl sm:text-5xl font-display font-bold">
        SprinkleSquad
      </span>
    </div>
  );
};