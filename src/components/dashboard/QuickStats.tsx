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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 bg-gradient-to-br from-neon-pink/10 to-hot-pink/5 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-neon-pink/10 rounded-lg">
            <Users className="h-6 w-6 text-neon-pink" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Children</p>
            <p className="text-2xl font-bold text-neon-pink">{kidCount}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-electric-purple/10 to-deep-purple/5 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-electric-purple/10 rounded-lg">
            <Star className="h-6 w-6 text-electric-purple" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <p className="text-2xl font-bold text-electric-purple">{taskCount}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-neon-green/10 to-neon-green/5 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-neon-green/10 rounded-lg">
            <Trophy className="h-6 w-6 text-neon-green" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-neon-green">{completedTasks}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-neon-orange/10 to-bright-orange/5 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-neon-orange/10 rounded-lg">
            <Plus className="h-6 w-6 text-neon-orange" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-neon-orange">{pendingTasks}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};