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
    <nav className="px-4 py-3">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center p-2 transition-colors duration-300"
              >
                {/* Icon with color transition only */}
                <item.icon 
                  className={cn(
                    "w-6 h-6 mb-1 transition-colors duration-300",
                    isActive ? "text-berry-blast" : "text-chocolate-swirl/60 hover:text-berry-blast"
                  )} 
                />
                
                {/* Label */}
                <span className={cn(
                  "text-xs font-medium",
                  isActive ? "text-berry-blast" : "text-chocolate-swirl/60"
                )}>
                  {item.label}
                </span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <span className="w-1.5 h-1.5 mt-1 rounded-full bg-berry-blast" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};