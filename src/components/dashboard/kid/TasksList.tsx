import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface TasksListProps {
  tasks: any[];
  setTasks: (tasks: any[]) => void;
  points: number;
  setPoints: (points: number) => void;
  kidData: any;
}

export const TasksList = ({ tasks, setTasks, points, setPoints, kidData }: TasksListProps) => {
  const { toast } = useToast();

  const completeTask = async (taskId: string, taskPoints: number) => {
    if (!kidData) return;

    const { error: updateError } = await supabase
      .from("tasks")
      .update({ 
        completed: true,
        completed_at: new Date().toISOString()
      })
      .eq("id", taskId);

    if (updateError) {
      toast({
        title: "Oops!",
        description: "Couldn't complete the task. Try again!",
        variant: "destructive",
      });
      return;
    }

    const newPoints = points + taskPoints;
    const { error: pointsError } = await supabase
      .from("profiles")
      .update({ total_points: newPoints })
      .eq("id", kidData.id);

    if (pointsError) {
      toast({
        description: "Points not updated. Please try again!",
        variant: "destructive",
      });
      return;
    }

    setPoints(newPoints);
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast({
      title: "Task Complete! 🌟",
      description: `You earned ${taskPoints} sprinkles!`,
    });
  };

  return (
    <>
      {tasks.map((task) => (
        <Card key={task.id} className="group hover:scale-[1.02] transition-all duration-200">
          <CardHeader className="bg-gradient-to-r from-neon-orange to-hot-pink rounded-t-lg p-4">
            <CardTitle className="text-white flex justify-between items-center">
              <span>{task.title}</span>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                <Star className="text-yellow-300 h-4 w-4" />
                <span>{task.points}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-600">{task.description}</p>
            <Button
              onClick={() => completeTask(task.id, task.points)}
              className="w-full bg-gradient-to-r from-neon-green to-electric-blue hover:opacity-90 text-white font-semibold"
            >
              Complete Task!
            </Button>
          </CardContent>
        </Card>
      ))}
      {tasks.length === 0 && (
        <Card className="p-8 text-center bg-gradient-to-br from-neon-green/10 to-electric-blue/10">
          <Trophy className="mx-auto h-16 w-16 text-yellow-400 mb-4" />
          <h3 className="font-display text-2xl text-gray-800 mb-2">
            All Tasks Complete!
          </h3>
          <p className="text-gray-600">
            Amazing job! You've finished all your tasks! 🎉
          </p>
        </Card>
      )}
    </>
  );
};