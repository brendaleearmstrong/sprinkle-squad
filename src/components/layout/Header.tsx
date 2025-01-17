import { Link } from "react-router-dom";
import { IceCream, Star, Crown, Gift } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-deep-purple backdrop-blur-sm border-b border-soft-purple/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 group">
            <IceCream 
              className="w-8 h-8 text-space-white group-hover:text-soft-pink transform group-hover:rotate-12 transition-all duration-300" 
              strokeWidth={2.5}
            />
            <span className="font-display text-xl sm:text-2xl font-bold bg-gradient-to-r from-space-white via-soft-pink to-space-white bg-clip-text text-transparent group-hover:via-neon-pink">
              SPRINKLESQUAD
            </span>
          </Link>

          {/* Icons Section - Updated for better mobile display */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-1.5 sm:p-2 text-space-white hover:text-soft-pink transition-colors duration-200 relative group">
              <Star className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 bg-space-white text-electric-purple text-xs py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Daily Bonus
              </span>
            </button>
            <button className="p-1.5 sm:p-2 text-space-white hover:text-soft-pink transition-colors duration-200 relative group">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 bg-space-white text-electric-purple text-xs py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Leaderboard
              </span>
            </button>
            <button className="p-1.5 sm:p-2 text-space-white hover:text-soft-pink transition-colors duration-200 relative group">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 bg-space-white text-electric-purple text-xs py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Special Rewards
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};