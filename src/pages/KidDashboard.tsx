import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Star, Trophy, Gift, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Task } from "@/types";
import { useNavigate } from "react-router-dom";

const KidDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [points, setPoints] = useState(0);
  const [kidData, setKidData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const kidSession = localStorage.getItem("kidSession");
    if (!kidSession) {
      navigate("/kid-login");
      return;
    }

    const kid = JSON.parse(kidSession);
    setKidData(kid);
    setPoints(kid.points);
    fetchTasks(kid.id);
  }, [navigate]);

  const fetchTasks = async (kidId: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", kidId)
      .eq("completed", false);

    if (error) {
      toast({
        title: "Oops!",
        description: "Couldn't load your tasks. Try again!",
        variant: "destructive",
      });
      return;
    }

    setTasks(data || []);
  };

  const completeTask = async (taskId: string, taskPoints: number) => {
    if (!kidData) return;

    const { error: updateError } = await supabase
      .from("tasks")
      .update({ completed: true })
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
      .from("kids")
      .update({ points: newPoints })
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

    // Show celebration toast
    toast({
      title: "Woohoo! 🎉",
      description: `You earned ${taskPoints} sprinkles!`,
      className: "bg-gradient-to-r from-sprinkle-pink to-cupcake-blue text-white",
    });

    // Show special celebration for milestone achievements
    if (newPoints >= 100 && points < 100) {
      toast({
        title: "Achievement Unlocked! 🏆",
        description: "You've reached 100 sprinkles! Amazing job!",
        className: "bg-gradient-to-r from-candy-yellow to-mint-green text-white",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("kidSession");
    navigate("/kid-login");
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bubblegum text-sprinkle-pink">
          {kidData?.username}'s Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-candy-yellow to-mint-green p-3 rounded-xl">
            <Star className="text-white h-6 w-6" />
            <span className="font-fredoka text-2xl text-white">{points}</span>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-2 border-sprinkle-pink text-sprinkle-pink hover:bg-sprinkle-pink hover:text-white"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="group hover:scale-105 transition-transform duration-200">
            <CardHeader className="bg-gradient-to-r from-lavender-purple to-cotton-candy rounded-t-lg">
              <CardTitle className="text-white">{task.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="font-comic text-gray-600">{task.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Star className="text-candy-yellow h-5 w-5" />
                  <span className="font-fredoka text-xl">{task.points}</span>
                </div>
                <Button
                  onClick={() => completeTask(task.id, task.points)}
                  className="bg-gradient-to-r from-mint-green to-cupcake-blue hover:opacity-90 transition-opacity"
                >
                  Complete!
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tasks.length === 0 && (
        <Card className="p-8 text-center bg-soft-cream">
          <Trophy className="mx-auto h-12 w-12 text-candy-yellow mb-4" />
          <h3 className="font-bubblegum text-2xl text-sprinkle-pink mb-2">
            All Done!
          </h3>
          <p className="font-comic text-gray-600">
            Great job! You've completed all your tasks! 🎉
          </p>
        </Card>
      )}

      {points >= 100 && (
        <Card className="p-6 bg-gradient-to-r from-sprinkle-pink to-cupcake-blue text-white animate-float">
          <div className="flex items-center gap-4">
            <Gift className="h-8 w-8" />
            <div>
              <h3 className="font-bubblegum text-2xl">Reward Available!</h3>
              <p className="font-comic">You have enough sprinkles to claim a reward!</p>
            </div>
            <Button
              className="ml-auto bg-white text-sprinkle-pink hover:bg-opacity-90"
              onClick={() => toast({
                title: "Coming Soon!",
                description: "Rewards feature will be available soon!",
              })}
            >
              Claim Reward
            </Button>
          </div>
        </Card>
      )}

      {/* Floating background elements */}
      <div className="fixed top-20 left-20 animate-float delay-100">
        <Star className="w-12 h-12 text-lavender-purple opacity-20" />
      </div>
      <div className="fixed bottom-20 right-20 animate-float delay-200">
        <Sparkles className="w-12 h-12 text-cotton-candy opacity-20" />
      </div>
      <div className="fixed top-1/2 left-1/3 animate-float delay-300">
        <Gift className="w-10 h-10 text-mint-green opacity-20" />
      </div>
    </div>
  );
};

export default KidDashboard;