import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown, Star } from "lucide-react";

export const LoginButtons = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-2xl mx-auto mt-8 sm:mt-12 lg:mt-16 mb-16 sm:mb-20 lg:mb-24 px-4">
      <Link to="/parent-login" className="group">
        <Button
          variant="default"
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-display text-lg sm:text-xl py-6 sm:py-8 rounded-xl sm:rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1"
        >
          <Crown className="mr-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
          Parent Dashboard
        </Button>
      </Link>

      <Link to="/kid-login" className="group">
        <Button
          variant="outline"
          size="lg"
          className="w-full border-4 border-secondary bg-white/90 backdrop-blur-sm text-secondary hover:bg-secondary hover:text-white font-display text-lg sm:text-xl py-6 sm:py-8 rounded-xl sm:rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1"
        >
          <Star className="mr-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
          Kid Login
        </Button>
      </Link>
    </div>
  );
};