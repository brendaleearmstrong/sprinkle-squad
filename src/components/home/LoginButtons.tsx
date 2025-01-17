import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown, Star, CreditCard, Heart } from "lucide-react";

export const LoginButtons = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Parent Section */}
        <div className="space-y-6 bg-gradient-to-br from-electric-purple to-deep-purple p-8 rounded-3xl shadow-xl">
          <h3 className="text-3xl font-display text-space-white mb-4">Parents Dashboard</h3>
          <p className="text-space-white/90 mb-6 text-lg">Create tasks, set rewards, and watch your children grow through positive reinforcement!</p>
          
          <div className="space-y-4">
            <Link to="/parent-login" className="block">
              <Button
                variant="default"
                size="lg"
                className="w-full bg-neon-pink text-space-white font-display text-xl py-6 rounded-xl shadow-lg transition-all duration-300 hover:bg-hot-pink"
              >
                <Crown className="mr-3 h-6 w-6" />
                Parent Login
              </Button>
            </Link>
            
            <div className="grid grid-cols-2 gap-4">
              <Link to="/parent-signup" className="block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-space-white/10 text-space-white border-2 border-space-white hover:bg-space-white hover:text-electric-purple font-display transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center w-full">
                    <span className="flex items-center mb-1">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Single Child
                    </span>
                    <span className="text-sm opacity-90">$9.99/month</span>
                  </div>
                </Button>
              </Link>
              
              <Link to="/parent-signup" className="block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-space-white/10 text-space-white border-2 border-space-white hover:bg-space-white hover:text-electric-purple font-display transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="flex flex-col items-center w-full">
                    <span className="flex items-center mb-1">
                      <Crown className="mr-2 h-5 w-5" />
                      Family Plan
                    </span>
                    <span className="text-sm opacity-90">$14.99/month</span>
                  </div>
                  <div className="absolute top-0 right-0 bg-neon-pink text-white text-xs px-2 py-1 rotate-45 translate-x-2 translate-y-1">
                    Best Value
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Kids Section */}
        <div className="space-y-6 bg-gradient-to-br from-neon-orange to-hot-pink p-8 rounded-3xl shadow-xl">
          <h3 className="text-3xl font-display text-space-white mb-4">Sprinkler Zone</h3>
          <p className="text-space-white/90 mb-6 text-lg">Start your adventure! Complete fun challenges, earn sprinkles, and unlock amazing rewards!</p>
          
          <Link to="/kid-login" className="block">
            <Button
              variant="default"
              size="lg"
              className="w-full bg-space-white text-neon-orange hover:bg-soft-white font-display text-xl py-6 rounded-xl shadow-lg transition-all duration-300 group border-4 border-space-white"
            >
              <Star className="mr-3 h-6 w-6 text-neon-orange group-hover:text-bright-orange" />
              Sprinkler Login
            </Button>
          </Link>
          
          <div className="mt-4 text-space-white/80 text-center">
            <p className="flex items-center justify-center gap-2">
              <Heart className="h-5 w-5 text-soft-pink" />
              Join the fun with your parent's invitation!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};