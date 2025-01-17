import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-electric-purple to-soft-purple bg-clip-text text-transparent">
            Parent Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your children's tasks and rewards
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-electric-purple/20 via-soft-purple/20 to-transparent mt-6" />
    </div>
  );
};