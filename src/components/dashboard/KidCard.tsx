import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Trophy } from "lucide-react";
import { Kid, Task } from "@/types";

interface KidCardProps {
  kid: Kid;
  tasks: Task[];
}

export const KidCard = ({ kid, tasks }: KidCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-candy-yellow to-mint-green">
        <CardTitle className="text-white flex items-center justify-between">
          <span>{kid.username}</span>
          <Trophy className="w-6 h-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="text-candy-yellow h-6 w-6" />
          <span className="font-fredoka text-2xl">{kid.total_points} points</span>
        </div>
        <div className="space-y-2">
          {tasks
            .filter((task) => task.user_id === kid.id && !task.completed)
            .map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-2 bg-soft-cream rounded-lg"
              >
                <span className="font-comic">{task.title}</span>
                <span className="font-fredoka text-sprinkle-pink">
                  {task.points} <Star className="w-4 h-4 inline" />
                </span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};