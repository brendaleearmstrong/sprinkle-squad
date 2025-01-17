import { Link, useLocation } from "react-router-dom";
import { IceCream, Trophy, Gift, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: IceCream, label: "Home", path: "/" },
    { icon: Trophy, label: "Tasks", path: "/kid-dashboard" },
    { icon: Gift, label: "Rewards", path: "/rewards" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg transition-all duration-300",
                  "hover:bg-gray-50",
                  isActive && "bg-gray-50"
                )}
              >
                {/* Icon with neon hover effect */}
                <item.icon 
                  className={cn(
                    "w-6 h-6 mb-1 transition-colors duration-300",
                    isActive 
                      ? "text-electric-blue" 
                      : "text-gray-500 hover:text-neon-orange"
                  )} 
                />
                
                {/* Label */}
                <span className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  isActive ? "text-electric-blue" : "text-gray-500"
                )}>
                  {item.label}
                </span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-electric-blue" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};