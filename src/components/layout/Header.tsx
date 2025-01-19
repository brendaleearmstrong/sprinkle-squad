import { Link } from "react-router-dom";
import { IceCream, Star, Crown, Gift, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "See you next time! 👋",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-deep-purple backdrop-blur-sm border-b border-soft-purple/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <IceCream 
              className="w-8 h-8 text-space-white group-hover:text-neon-pink transition-colors duration-300" 
              strokeWidth={2.5}
            />
            <span className="font-display text-xl sm:text-2xl font-bold text-space-white group-hover:text-neon-pink transition-colors duration-300">
              SPRINKLESQUAD
            </span>
          </Link>

          <div className="flex items-center">
            {/* Login Links */}
            {!user && (
              <div className="hidden sm:flex items-center mr-6 space-x-4">
                <Link 
                  to="/parent-login"
                  className="text-space-white hover:text-neon-pink transition-colors duration-200"
                >
                  Parent Login
                </Link>
                <span className="text-space-white/50">|</span>
                <Link 
                  to="/kid-login"
                  className="text-space-white hover:text-neon-pink transition-colors duration-200"
                >
                  Sprinkle Login
                </Link>
              </div>
            )}

            {/* Existing Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link 
                to="/daily-bonus"
                className="p-1.5 sm:p-2 text-space-white hover:text-neon-orange transition-colors duration-200 relative group"
              >
                <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 bg-space-white text-electric-purple text-xs py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Daily Bonus
                </span>
              </Link>
              <Link 
                to="/leaderboard"
                className="p-1.5 sm:p-2 text-space-white hover:text-neon-orange transition-colors duration-200 relative group"
              >
                <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 bg-space-white text-electric-purple text-xs py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Leaderboard
                </span>
              </Link>
              <Link 
                to="/special-rewards"
                className="p-1.5 sm:p-2 text-space-white hover:text-neon-orange transition-colors duration-200 relative group"
              >
                <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 bg-space-white text-electric-purple text-xs py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Special Rewards
                </span>
              </Link>
              {user && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="p-1.5 sm:p-2 text-space-white hover:text-neon-orange transition-colors duration-200 relative group"
                >
                  <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 bg-space-white text-electric-purple text-xs py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Logout
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
