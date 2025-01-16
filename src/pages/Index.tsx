import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Star, Sparkles, Gift, Rocket } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-lavender-purple/20 via-cotton-candy/20 to-mint-green/20 -z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sprinkle-pink/10 via-transparent to-transparent" />
      
      <div className="w-full max-w-6xl px-4 space-y-12 relative">
        {/* Hero Section */}
        <div className="text-center space-y-6 relative">
          <div className="absolute -top-10 -left-10 animate-sprinkle-pop">
            <Sparkles className="w-10 h-10 text-candy-yellow" />
          </div>
          <div className="absolute -top-6 -right-10 animate-sprinkle-pop delay-100">
            <Star className="w-8 h-8 text-sprinkle-pink" />
          </div>
          <div className="absolute bottom-0 -left-14 animate-sprinkle-pop delay-200">
            <Gift className="w-9 h-9 text-mint-green" />
          </div>
          
          <h1 className="font-bubblegum text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-sprinkle-pink via-candy-yellow to-mint-green text-transparent bg-clip-text animate-float">
            SprinkleSquad
          </h1>
          <p className="font-comic text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Transform everyday tasks into exciting adventures! Join our magical world of achievements and rewards. ✨
          </p>
        </div>

        {/* Login Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Parent Card */}
          <Card className="group p-8 bg-white/95 backdrop-blur-sm border-2 border-sprinkle-pink/20 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-6">
              <div className="h-16 w-16 bg-gradient-to-br from-sprinkle-pink to-lavender-purple rounded-2xl p-4 mx-auto transform group-hover:scale-110 transition-transform duration-300">
                <Star className="w-full h-full text-white" />
              </div>
              <h2 className="text-2xl font-fredoka text-gray-800 text-center">Parent Portal</h2>
              <p className="text-gray-600 font-comic text-center">
                Create tasks, track progress, and reward your children's achievements
              </p>
              <Button 
                className="w-full h-14 text-lg font-fredoka bg-gradient-to-r from-sprinkle-pink to-cupcake-blue hover:opacity-90 transition-all duration-300 shadow-lg group-hover:shadow-xl"
                onClick={() => navigate("/parent-login")}
              >
                <Star className="w-5 h-5 mr-2" />
                Parent Login
              </Button>
            </div>
          </Card>

          {/* Kid Card */}
          <Card className="group p-8 bg-white/95 backdrop-blur-sm border-2 border-mint-green/20 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-6">
              <div className="h-16 w-16 bg-gradient-to-br from-candy-yellow to-mint-green rounded-2xl p-4 mx-auto transform group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-full h-full text-white" />
              </div>
              <h2 className="text-2xl font-fredoka text-gray-800 text-center">Kid Zone</h2>
              <p className="text-gray-600 font-comic text-center">
                Complete tasks, earn points, and unlock amazing rewards!
              </p>
              <Button 
                className="w-full h-14 text-lg font-fredoka bg-gradient-to-r from-candy-yellow to-mint-green hover:opacity-90 transition-all duration-300 shadow-lg group-hover:shadow-xl"
                onClick={() => navigate("/kid-login")}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Kid Login
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="text-center mt-16 space-y-4">
          <h3 className="font-fredoka text-2xl text-gray-800">
            Join thousands of happy families! 🎉
          </h3>
          <p className="font-comic text-gray-600 max-w-2xl mx-auto">
            Make task management fun and rewarding for the whole family.
          </p>
        </div>
      </div>

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