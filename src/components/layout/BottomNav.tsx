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
                className={cn(
                  "flex flex-col items-center p-2 rounded-xl transition-all duration-300",
                  isActive
                    ? "text-berry-blast scale-110 font-semibold"
                    : "text-chocolate-swirl/60 hover:text-berry-blast hover:scale-105"
                )}
              >
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-berry-blast animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};