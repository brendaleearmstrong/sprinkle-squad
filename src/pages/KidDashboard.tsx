import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Star, Trophy, Gift, Sparkles, Coins, ListCheck, ChartBar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const KidDashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [points, setPoints] = useState(0);
  const [kidData, setKidData] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [dailyBonus, setDailyBonus] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/kid-login");
        return;
      }

      // Fetch kid's profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setKidData(profile);
        setPoints(profile.total_points || 0);
      }

      // Fetch tasks
      const { data: tasksData } = await supabase
        .from("tasks")
        .select("*")
        .eq("kid_id", user.id)
        .eq("completed", false);

      setTasks(tasksData || []);

      // Fetch leaderboard
      const { data: leaderboardData } = await supabase
        .from("profiles")
        .select("username, total_points, level_name")
        .order("total_points", { ascending: false })
        .limit(5);

      setLeaderboard(leaderboardData || []);

      // Check daily bonus
      const today = new Date().toISOString().split('T')[0];
      const { data: bonusCheck } = await supabase
        .from("activities")
        .select("*")
        .eq("kid_id", user.id)
        .eq("type", "daily_bonus")
        .gte("created_at", today);

      setDailyBonus(!bonusCheck?.length);
    };

    fetchData();
  }, [navigate]);

  const claimDailyBonus = async () => {
    if (!kidData) return;

    const bonusPoints = 50;
    const { error: activityError } = await supabase
      .from("activities")
      .insert({
        kid_id: kidData.id,
        type: "daily_bonus",
        name: "Daily Bonus Claimed",
        points_earned: bonusPoints
      });

    if (activityError) {
      toast({
        title: "Oops!",
        description: "Couldn't claim your bonus. Try again!",
        variant: "destructive",
      });
      return;
    }

    const newPoints = points + bonusPoints;
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
    setDailyBonus(false);
    toast({
      title: "Woohoo! 🎉",
      description: `You earned ${bonusPoints} sprinkles!`,
    });
  };

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
    <div className="container mx-auto p-4 space-y-6">
      {/* Header with Points and Level */}
      <div className="bg-gradient-to-r from-neon-pink to-electric-purple p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display text-white mb-2">
              Hi, {kidData?.username}! 👋
            </h1>
            <p className="text-white/80">
              Level {kidData?.level_number}: {kidData?.level_name}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 p-3 rounded-xl">
            <Coins className="text-yellow-300 h-6 w-6" />
            <span className="font-display text-2xl text-white">{points}</span>
          </div>
        </div>
        {kidData?.level_points_required && (
          <Progress 
            value={(points / kidData.level_points_required) * 100} 
            className="mt-4 bg-white/20"
          />
        )}
      </div>

      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="tasks" className="flex gap-2">
            <ListCheck className="h-4 w-4" /> Tasks
          </TabsTrigger>
          <TabsTrigger value="bank" className="flex gap-2">
            <Coins className="h-4 w-4" /> Bank
          </TabsTrigger>
          <TabsTrigger value="bonus" className="flex gap-2">
            <Gift className="h-4 w-4" /> Bonus
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex gap-2">
            <ChartBar className="h-4 w-4" /> Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="group hover:scale-105 transition-transform duration-200">
              <CardHeader className="bg-gradient-to-r from-neon-orange to-hot-pink rounded-t-lg">
                <CardTitle className="text-white">{task.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-600">{task.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-400 h-5 w-5" />
                    <span className="font-display text-xl">{task.points}</span>
                  </div>
                  <Button
                    onClick={() => completeTask(task.id, task.points)}
                    className="bg-gradient-to-r from-neon-green to-electric-blue hover:opacity-90"
                  >
                    Complete!
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {tasks.length === 0 && (
            <Card className="p-8 text-center bg-gray-50">
              <Trophy className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="font-display text-2xl text-gray-800 mb-2">
                All Done!
              </h3>
              <p className="text-gray-600">
                Great job! You've completed all your tasks! 🎉
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="bank" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sprinkle Bank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">Current Balance</p>
                    <p className="text-3xl font-display text-electric-purple">
                      {points} sprinkles
                    </p>
                  </div>
                  <Coins className="h-12 w-12 text-yellow-400" />
                </div>
                <Button 
                  onClick={() => navigate("/special-rewards")}
                  className="w-full bg-gradient-to-r from-neon-pink to-hot-pink"
                >
                  View Available Rewards
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bonus" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Bonus</CardTitle>
            </CardHeader>
            <CardContent>
              {dailyBonus ? (
                <div className="text-center space-y-4">
                  <Gift className="mx-auto h-16 w-16 text-hot-pink" />
                  <h3 className="text-2xl font-display">Daily Bonus Available!</h3>
                  <p className="text-gray-600">Claim your 50 sprinkles now!</p>
                  <Button 
                    onClick={claimDailyBonus}
                    className="w-full bg-gradient-to-r from-neon-orange to-hot-pink"
                  >
                    Claim Bonus
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <Sparkles className="mx-auto h-16 w-16 text-gray-400" />
                  <h3 className="text-2xl font-display">Come Back Tomorrow!</h3>
                  <p className="text-gray-600">
                    You've already claimed your daily bonus. Check back tomorrow for more sprinkles!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {index === 0 ? (
                          <Trophy className="h-6 w-6 text-yellow-400" />
                        ) : (
                          <div className="w-6 h-6 flex items-center justify-center font-bold text-gray-500">
                            {index + 1}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{player.username}</p>
                          <p className="text-sm text-gray-500">{player.level_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{player.total_points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Current Level</p>
                    <p className="text-2xl font-display">{kidData?.level_name}</p>
                    <Progress 
                      value={(points / (kidData?.level_points_required || 100)) * 100} 
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {points} / {kidData?.level_points_required} points to next level
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KidDashboard;