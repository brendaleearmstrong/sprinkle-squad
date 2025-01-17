import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown, Star, CreditCard } from "lucide-react";

export const LoginButtons = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto mt-16 mb-24 px-4">
      <div className="space-y-4">
        <Link to="/parent-login" className="group block">
          <Button
            variant="default"
            size="lg"
            className="w-full bg-neon-pink text-space-white font-display text-2xl py-8 rounded-2xl shadow-xl transition-all duration-300"
          >
            <Crown className="mr-3 h-7 w-7 text-space-white group-hover:text-soft-pink transition-colors duration-300" />
            Parent Login
          </Button>
        </Link>
        
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-space-white text-neon-pink border-2 border-neon-pink hover:bg-neon-pink hover:text-space-white font-display transition-all duration-300"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Monthly
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-space-white text-electric-purple border-2 border-electric-purple hover:bg-electric-purple hover:text-space-white font-display transition-all duration-300"
          >
            <Crown className="mr-2 h-4 w-4" />
            Annually
          </Button>
        </div>
      </div>

      <Link to="/kid-login" className="group">
        <Button
          variant="outline"
          size="lg"
          className="w-full border-4 border-neon-orange bg-space-white text-neon-orange font-display text-2xl py-8 rounded-2xl shadow-xl transition-all duration-300"
        >
          <Star className="mr-3 h-7 w-7 text-neon-orange group-hover:text-bright-orange transition-colors duration-300" />
          Sprinkler Login
        </Button>
      </Link>
    </div>
  );
};