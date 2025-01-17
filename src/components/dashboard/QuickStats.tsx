import { Card } from "@/components/ui/card";
import { Users, Star, Trophy, Plus } from "lucide-react";

interface QuickStatsProps {
  kidCount: number;
  taskCount: number;
  completedTasks: number;
  pendingTasks: number;
}

export const QuickStats = ({
  kidCount,
  taskCount,
  completedTasks,
  pendingTasks,
}: QuickStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Children</p>
            <p className="text-2xl font-bold text-primary">{kidCount}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-secondary/10 rounded-lg">
            <Star className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <p className="text-2xl font-bold text-secondary">{taskCount}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-primary">{completedTasks}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-secondary/10 rounded-lg">
            <Plus className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-secondary">{pendingTasks}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};