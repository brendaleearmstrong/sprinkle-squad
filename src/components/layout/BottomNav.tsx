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
                  "flex flex-col items-center p-2 rounded-xl transition-all duration-300 group relative",
                  isActive
                    ? "text-berry-blast scale-110 font-semibold"
                    : "text-chocolate-swirl/60 hover:text-berry-blast"
                )}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-berry-blast/0 group-hover:bg-berry-blast/5 rounded-xl transition-colors duration-300" />
                
                {/* Icon with bounce animation */}
                <item.icon 
                  className={cn(
                    "w-6 h-6 mb-1 transition-all duration-300",
                    "group-hover:scale-110 group-hover:-translate-y-1",
                    isActive && "animate-bounce"
                  )} 
                />
                
                {/* Label with slide-up animation */}
                <span className={cn(
                  "text-xs font-medium transition-all duration-300",
                  "group-hover:text-berry-blast group-hover:font-semibold"
                )}>
                  {item.label}
                </span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-berry-blast animate-pulse" />
                )}
                
                {/* Hover sparkle effect */}
                <div className={cn(
                  "absolute -inset-1 opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-300 pointer-events-none"
                )}>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "absolute w-1 h-1 rounded-full",
                        "animate-ping",
                        i === 0 ? "bg-berry-blast top-0 left-1/2" :
                        i === 1 ? "bg-mint-chip -top-1 left-1/4 delay-75" :
                        "bg-cherry-top -top-2 right-1/4 delay-150"
                      )}
                      style={{
                        animationDuration: '1.5s',
                      }}
                    />
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};