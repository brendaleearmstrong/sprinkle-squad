import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown, Star } from "lucide-react";

export const LoginButtons = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto mt-16 mb-24 px-4">
      <Link to="/parent-login" className="group">
        <Button
          variant="default"
          size="lg"
          className="w-full bg-neon-pink text-space-white font-display text-2xl py-8 rounded-2xl shadow-xl transition-all duration-300"
        >
          <Crown className="mr-3 h-7 w-7 text-space-white group-hover:text-soft-pink transition-colors duration-300" />
          Parent Login
        </Button>
      </Link>

      <Link to="/kid-login" className="group">
        <Button
          variant="outline"
          size="lg"
          className="w-full border-4 border-electric-blue bg-space-white text-electric-blue font-display text-2xl py-8 rounded-2xl shadow-xl transition-all duration-300"
        >
          <Star className="mr-3 h-7 w-7 text-electric-blue group-hover:text-bright-blue transition-colors duration-300" />
          Sprinkle Login
        </Button>
      </Link>
    </div>
  );
};