import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-electric-purple to-deep-purple rounded-lg shadow-lg mb-8">
      <div>
        <h1 className="text-4xl font-display bg-gradient-to-r from-neon-pink to-hot-pink bg-clip-text text-transparent">
          Parent Dashboard
        </h1>
        <p className="text-soft-white mt-2 font-body">
          Manage your squad's tasks and rewards
        </p>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-6 w-6 text-soft-white" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-neon-pink rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New task completed</DropdownMenuItem>
            <DropdownMenuItem>Level up achievement</DropdownMenuItem>
            <DropdownMenuItem>Daily streak bonus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6 text-soft-white" />
        </Button>
      </div>
    </div>
  );
};