import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, Gift, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Trophy, label: "Tasks", path: "/kid-dashboard" },
    { icon: Gift, label: "Rewards", path: "/rewards" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#F1F0FB] border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center p-2 rounded-lg transition-all duration-300"
              >
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  isActive ? "bg-neon-pink/10" : "hover:bg-neon-pink/5"
                )}>
                  <item.icon 
                    className={cn(
                      "w-6 h-6 transition-colors duration-300",
                      isActive 
                        ? "text-neon-pink" 
                        : "text-gray-600 hover:text-neon-pink"
                    )} 
                  />
                </div>
                <span className={cn(
                  "text-xs font-medium mt-1 transition-colors duration-300",
                  isActive ? "text-neon-pink" : "text-gray-600"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};