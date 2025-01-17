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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="p-4 bg-gradient-to-br from-space-white/10 to-electric-purple/5 backdrop-blur-sm border-neon-pink/20 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-neon-pink/10 rounded-lg">
            <Users className="h-6 w-6 text-neon-pink" />
          </div>
          <div>
            <p className="text-soft-white text-sm">Squad Members</p>
            <p className="text-2xl font-bold text-neon-pink">{kidCount}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-space-white/10 to-electric-purple/5 backdrop-blur-sm border-electric-blue/20 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-electric-blue/10 rounded-lg">
            <Star className="h-6 w-6 text-electric-blue" />
          </div>
          <div>
            <p className="text-soft-white text-sm">Total Tasks</p>
            <p className="text-2xl font-bold text-electric-blue">{taskCount}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-space-white/10 to-electric-purple/5 backdrop-blur-sm border-neon-green/20 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-neon-green/10 rounded-lg">
            <Trophy className="h-6 w-6 text-neon-green" />
          </div>
          <div>
            <p className="text-soft-white text-sm">Completed</p>
            <p className="text-2xl font-bold text-neon-green">{completedTasks}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-space-white/10 to-electric-purple/5 backdrop-blur-sm border-neon-orange/20 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-neon-orange/10 rounded-lg">
            <Plus className="h-6 w-6 text-neon-orange" />
          </div>
          <div>
            <p className="text-soft-white text-sm">Pending</p>
            <p className="text-2xl font-bold text-neon-orange">{pendingTasks}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};