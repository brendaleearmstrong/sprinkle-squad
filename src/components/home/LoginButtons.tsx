import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown, Star } from "lucide-react";

export const LoginButtons = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 max-w-2xl mx-auto mt-16 mb-24">
      <Link to="/parent-login" className="group">
        <Button
          variant="default"
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-display text-xl py-8 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1"
        >
          <Crown className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
          Parent Dashboard
        </Button>
      </Link>

      <Link to="/kid-login" className="group">
        <Button
          variant="outline"
          size="lg"
          className="w-full border-4 border-secondary bg-white/90 backdrop-blur-sm text-secondary hover:bg-secondary hover:text-white font-display text-xl py-8 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1"
        >
          <Star className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
          Kid Login
        </Button>
      </Link>
    </div>
  );
};