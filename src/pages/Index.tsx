import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-5xl md:text-7xl font-bubblegum text-sprinkle-pink animate-float">
          SprinkleSquad
        </h1>
        <p className="text-xl md:text-2xl font-comic text-gray-600 max-w-2xl mx-auto">
          A fun way for parents and kids to manage tasks and rewards together! ✨
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/parent-login">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-sprinkle-pink to-cupcake-blue hover:opacity-90 transition-opacity"
            >
              <Users className="mr-2" />
              I'm a Parent
            </Button>
          </Link>
          
          <Link to="/kid-login">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-candy-yellow text-candy-yellow hover:bg-candy-yellow hover:text-white transition-colors"
            >
              <Users className="mr-2 scale-90" />
              I'm a Kid
            </Button>
          </Link>
        </div>

        <div className="mt-12 flex justify-center space-x-4">
          <Star className="text-candy-yellow animate-spin-slow w-8 h-8" />
          <Star className="text-mint-green animate-bounce w-6 h-6" />
          <Star className="text-sprinkle-pink animate-pulse w-10 h-10" />
        </div>
      </div>
    </div>
  );
};

export default Index;