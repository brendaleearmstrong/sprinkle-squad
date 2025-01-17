import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-soft-purple via-soft-pink to-soft-blue">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-8 h-8 text-yellow-400 animate-sprinkle-pop">
          <Star />
        </div>
        <div className="absolute bottom-20 right-10 w-8 h-8 text-pink-400 animate-sprinkle-pop" style={{ animationDelay: "0.5s" }}>
          <Star />
        </div>
        <div className="absolute top-20 right-20 w-8 h-8 text-purple-400 animate-sprinkle-pop" style={{ animationDelay: "1s" }}>
          <Star />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary animate-float">
            SprinkleSquad
          </h1>
          <p className="text-xl md:text-2xl font-body text-gray-600">
            Where Tasks Become Adventures! ✨
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
          <Link to="/parent-login" className="transform hover:scale-105 transition-transform">
            <Button
              variant="default"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white font-display text-lg py-6"
            >
              <Users className="mr-2 h-5 w-5" />
              I'm a Parent
            </Button>
          </Link>

          <Link to="/kid-login" className="transform hover:scale-105 transition-transform">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-display text-lg py-6"
            >
              <Users className="mr-2 h-5 w-5" />
              I'm a Kid
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;