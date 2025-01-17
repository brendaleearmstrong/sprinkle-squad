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
    <nav className="fixed bottom-0 left-0 right-0 bg-[#8B5CF6] border-t border-[#9B69F6] shadow-lg z-50">
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
                  isActive ? "bg-white/20" : "hover:bg-white/10"
                )}>
                  <item.icon 
                    className={cn(
                      "w-6 h-6 transition-colors duration-300",
                      isActive 
                        ? "text-white" 
                        : "text-white/80 hover:text-white"
                    )} 
                  />
                </div>
                <span className={cn(
                  "text-xs font-medium mt-1 transition-colors duration-300",
                  isActive ? "text-white" : "text-white/80"
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