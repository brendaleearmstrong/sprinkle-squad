import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Star, Trophy, Gift, Sparkles, Coins, ListCheck, ChartBar, Crown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
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

      // Check daily bonus - using 'name' instead of 'type'
      const today = new Date().toISOString().split('T')[0];
      const { data: bonusCheck } = await supabase
        .from("activities")
        .select("*")
        .eq("kid_id", user.id)
        .eq("name", "daily_bonus")
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
        name: "daily_bonus", // Changed from 'type' to 'name'
        description: "Daily Bonus Claimed",
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
    <div className="container mx-auto p-4 space-y-8 min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header with Points and Level */}
      <div className="bg-gradient-to-r from-electric-purple to-hot-pink rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-display text-white mb-2 flex items-center gap-2">
                Hi, {kidData?.username}! <Crown className="h-8 w-8 text-yellow-300 animate-pulse" />
              </h1>
              <p className="text-white/90 text-lg">
                Level {kidData?.level_number}: {kidData?.level_name}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <Coins className="text-yellow-300 h-8 w-8" />
              <div>
                <p className="text-white/80 text-sm">Total Sprinkles</p>
                <span className="font-display text-3xl text-white">{points}</span>
              </div>
            </div>
          </div>
          {kidData?.level_points_required && (
            <div className="mt-6 space-y-2">
              <Progress 
                value={(points / kidData.level_points_required) * 100} 
                className="h-3 bg-white/20"
              />
              <div className="flex justify-between text-white/80 text-sm">
                <span>{points} points</span>
                <span>{kidData.level_points_required} needed for next level</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList className="grid grid-cols-4 gap-4 bg-background/95 p-1 rounded-lg">
          <TabsTrigger value="tasks" className="flex gap-2 data-[state=active]:bg-electric-purple data-[state=active]:text-white">
            <ListCheck className="h-4 w-4" /> Tasks
          </TabsTrigger>
          <TabsTrigger value="bank" className="flex gap-2 data-[state=active]:bg-hot-pink data-[state=active]:text-white">
            <Coins className="h-4 w-4" /> Bank
          </TabsTrigger>
          <TabsTrigger value="bonus" className="flex gap-2 data-[state=active]:bg-neon-orange data-[state=active]:text-white">
            <Gift className="h-4 w-4" /> Bonus
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex gap-2 data-[state=active]:bg-bright-blue data-[state=active]:text-white">
            <ChartBar className="h-4 w-4" /> Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4 animate-fade-in">
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
        </TabsContent>

        <TabsContent value="bank" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader className="bg-gradient-to-r from-hot-pink to-electric-purple">
              <CardTitle className="text-white">Sprinkle Bank</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-gradient-to-br from-background to-gray-50 rounded-xl">
                  <div>
                    <p className="text-gray-600">Current Balance</p>
                    <p className="text-3xl font-display text-electric-purple mt-1">
                      {points} sprinkles
                    </p>
                  </div>
                  <Coins className="h-12 w-12 text-yellow-400" />
                </div>
                <Button 
                  onClick={() => navigate("/special-rewards")}
                  className="w-full bg-gradient-to-r from-neon-pink to-hot-pink hover:opacity-90 text-white font-semibold"
                >
                  View Available Rewards
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bonus" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader className="bg-gradient-to-r from-neon-orange to-hot-pink">
              <CardTitle className="text-white">Daily Bonus</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {dailyBonus ? (
                <div className="text-center space-y-6">
                  <Gift className="mx-auto h-20 w-20 text-hot-pink animate-bounce" />
                  <div>
                    <h3 className="text-2xl font-display text-gray-800">Daily Bonus Available!</h3>
                    <p className="text-gray-600 mt-2">Claim your 50 sprinkles now!</p>
                  </div>
                  <Button 
                    onClick={claimDailyBonus}
                    className="w-full bg-gradient-to-r from-neon-orange to-hot-pink hover:opacity-90 text-white font-semibold"
                  >
                    Claim Bonus
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <Sparkles className="mx-auto h-20 w-20 text-gray-400" />
                  <div>
                    <h3 className="text-2xl font-display text-gray-800">Come Back Tomorrow!</h3>
                    <p className="text-gray-600 mt-2">
                      You've already claimed your daily bonus. Check back tomorrow for more sprinkles!
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-gradient-to-r from-bright-blue to-electric-purple">
                <CardTitle className="text-white">Leaderboard</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {leaderboard.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-br from-background to-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {index === 0 ? (
                          <Crown className="h-6 w-6 text-yellow-400" />
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
              <CardHeader className="bg-gradient-to-r from-electric-purple to-deep-purple">
                <CardTitle className="text-white">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-background to-gray-50 rounded-xl">
                    <p className="text-gray-600">Current Level</p>
                    <p className="text-2xl font-display text-electric-purple mt-1">{kidData?.level_name}</p>
                    <Progress 
                      value={(points / (kidData?.level_points_required || 100)) * 100} 
                      className="mt-4"
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