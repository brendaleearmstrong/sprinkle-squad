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
          className="w-full bg-gradient-to-r from-neon-pink via-hot-pink to-electric-purple hover:opacity-90 text-space-white font-display text-2xl py-8 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1"
        >
          <Crown className="mr-3 h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
          Parent Login
        </Button>
      </Link>

      <Link to="/kid-login" className="group">
        <Button
          variant="outline"
          size="lg"
          className="w-full border-4 border-electric-blue bg-gradient-to-r from-space-white to-soft-white backdrop-blur-sm text-electric-blue hover:text-space-white hover:bg-gradient-to-r hover:from-electric-blue hover:to-bright-blue font-display text-2xl py-8 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1"
        >
          <Star className="mr-3 h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
          Kid Login
        </Button>
      </Link>
    </div>
  );
};