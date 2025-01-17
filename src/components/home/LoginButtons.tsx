import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown, Star } from "lucide-react";

export const LoginButtons = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto mt-12 mb-24">
      <Link to="/parent-login" className="group">
        <Button
          variant="default"
          size="lg"
          className="w-full bg-gradient-to-r from-berry-blast to-mint-chip hover:opacity-90 text-white font-display text-lg py-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300"
        >
          <Crown className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
          Parent Dashboard
        </Button>
      </Link>

      <Link to="/kid-login" className="group">
        <Button
          variant="outline"
          size="lg"
          className="w-full border-2 border-mint-chip bg-whipped-cream/90 backdrop-blur-sm text-mint-chip hover:bg-mint-chip hover:text-white font-display text-lg py-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300"
        >
          <Star className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
          Kid Login
        </Button>
      </Link>
    </div>
  );
};