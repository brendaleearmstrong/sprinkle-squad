import { IceCream, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <div className="relative group">
        {/* Sprinkles container that only shows on hover */}
        <div className="absolute -inset-4 opacity-0 group-hover:opacity-100">
          {[...Array(6)].map((_, i) => (
            <Sparkles 
              key={i}
              className={`
                absolute w-4 h-4
                animate-sprinkle-pop
                ${[
                  'text-sprinkle-rainbow-red',
                  'text-sprinkle-rainbow-orange',
                  'text-sprinkle-rainbow-yellow',
                  'text-sprinkle-rainbow-green',
                  'text-sprinkle-rainbow-blue',
                  'text-sprinkle-rainbow-purple'
                ][i]}
              `}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`
              }}
              strokeWidth={1.5}
            />
          ))}
        </div>
        
        {/* Glow effect behind ice cream */}
        <div className="absolute inset-0 bg-gradient-to-br from-sprinkle-rainbow-pink via-sprinkle-rainbow-purple to-sprinkle-rainbow-blue blur-xl opacity-25 group-hover:opacity-75 transition-opacity duration-300" />
        
        {/* Main ice cream icon */}
        <IceCream 
          className="w-20 h-20 text-electric-purple relative group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" 
          strokeWidth={2}
        />
        
        {/* Permanent decorative sparkles */}
        <Sparkles 
          className="absolute -top-2 -right-2 w-4 h-4 text-sprinkle-rainbow-pink animate-spin-slow" 
          strokeWidth={1.5}
        />
        <Sparkles 
          className="absolute -bottom-2 -left-2 w-4 h-4 text-sprinkle-rainbow-purple animate-spin-slow delay-150" 
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
};