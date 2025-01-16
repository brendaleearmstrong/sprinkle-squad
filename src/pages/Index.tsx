import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Star, Sparkles, Gift } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <div className="text-center space-y-4 relative">
        {/* Animated sparkles */}
        <div className="absolute -top-8 -left-8 animate-sprinkle-pop">
          <Sparkles className="w-8 h-8 text-candy-yellow" />
        </div>
        <div className="absolute -top-4 -right-8 animate-sprinkle-pop delay-100">
          <Star className="w-6 h-6 text-sprinkle-pink" />
        </div>
        <div className="absolute bottom-0 -left-12 animate-sprinkle-pop delay-200">
          <Gift className="w-7 h-7 text-mint-green" />
        </div>
        
        <h1 className="font-bubblegum text-5xl md:text-7xl bg-gradient-to-r from-sprinkle-pink via-candy-yellow to-mint-green text-transparent bg-clip-text animate-float">
          SprinkleSquad
        </h1>
        <p className="font-comic text-xl md:text-2xl text-gray-700">
          Where chores become magical adventures! ✨
        </p>
      </div>

      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm border-2 border-cotton-candy shadow-xl rounded-2xl">
        <div className="space-y-6">
          <Button 
            className="w-full h-16 text-xl font-fredoka bg-gradient-to-r from-sprinkle-pink to-cupcake-blue hover:opacity-90 transition-all hover:scale-105 transform duration-200 shadow-lg"
            onClick={() => navigate("/parent-login")}
          >
            <Star className="w-6 h-6 mr-2" />
            Parent Login
          </Button>
          
          <Button 
            className="w-full h-16 text-xl font-fredoka bg-gradient-to-r from-candy-yellow to-mint-green hover:opacity-90 transition-all hover:scale-105 transform duration-200 shadow-lg"
            onClick={() => navigate("/kid-login")}
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Kid Login
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="font-comic text-gray-600">
            Join the fun and earn amazing rewards! 🎉
          </p>
        </div>
      </Card>

      {/* Floating background elements */}
      <div className="fixed top-20 left-20 animate-float delay-100">
        <Star className="w-12 h-12 text-lavender-purple opacity-20" />
      </div>
      <div className="fixed bottom-20 right-20 animate-float delay-200">
        <Sparkles className="w-12 h-12 text-cotton-candy opacity-20" />
      </div>
      <div className="fixed top-1/2 left-1/3 animate-float delay-300">
        <Gift className="w-10 h-10 text-mint-green opacity-20" />
      </div>
    </div>
  );
};

export default Index;