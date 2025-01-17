import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown, Star } from "lucide-react";

export const LoginButtons = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto mt-12 sm:mt-16 lg:mt-20 mb-16 sm:mb-20 lg:mb-24 px-4">
      <Link to="/parent-login" className="group">
        <Button
          variant="default"
          size="lg"
          className="w-full bg-chocolate-swirl hover:bg-chocolate-swirl/90 text-vanilla-cream font-display text-xl sm:text-2xl py-8 sm:py-10 rounded-xl sm:rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1"
        >
          <Crown className="mr-3 h-6 w-6 sm:h-7 sm:w-7 group-hover:rotate-12 transition-transform" />
          Parent Dashboard
        </Button>
      </Link>

      <Link to="/kid-login" className="group">
        <Button
          variant="outline"
          size="lg"
          className="w-full border-4 border-berry-blast bg-vanilla-cream/90 backdrop-blur-sm text-berry-blast hover:bg-berry-blast hover:text-vanilla-cream font-display text-xl sm:text-2xl py-8 sm:py-10 rounded-xl sm:rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1"
        >
          <Star className="mr-3 h-6 w-6 sm:h-7 sm:w-7 group-hover:rotate-12 transition-transform" />
          Kid Login
        </Button>
      </Link>
    </div>
  );
};