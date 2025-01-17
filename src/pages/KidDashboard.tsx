import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Star, Trophy, Gift, Sparkles, Coins, ListCheck, ChartBar, Crown, Brain } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DailyBonus } from "@/components/dashboard/kid/DailyBonus";
import { TasksList } from "@/components/dashboard/kid/TasksList";
import { CupcakeBuddy } from "@/components/dashboard/kid/CupcakeBuddy";

const KidDashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [points, setPoints] = useState(0);
  const [kidData, setKidData] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [dailyBonus, setDailyBonus] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Would you like to try a new challenge today?",
    "Remember to be kind to others!",
    "Great job on completing your tasks!",
    "Don't forget to take breaks and have fun!",
    "You're doing amazing! Keep it up!",
  ]);
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
        .eq("name", "daily_bonus")
        .gte("created_at", today);

      setDailyBonus(!bonusCheck?.length);
    };

    fetchData();
  }, [navigate]);

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
          <TabsTrigger value="buddy" className="flex gap-2 data-[state=active]:bg-hot-pink data-[state=active]:text-white">
            <Brain className="h-4 w-4" /> AI Buddy
          </TabsTrigger>
          <TabsTrigger value="bonus" className="flex gap-2 data-[state=active]:bg-neon-orange data-[state=active]:text-white">
            <Gift className="h-4 w-4" /> Bonus
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex gap-2 data-[state=active]:bg-bright-blue data-[state=active]:text-white">
            <ChartBar className="h-4 w-4" /> Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4 animate-fade-in">
          <TasksList 
            tasks={tasks}
            setTasks={setTasks}
            points={points}
            setPoints={setPoints}
            kidData={kidData}
          />
        </TabsContent>

        <TabsContent value="buddy" className="animate-fade-in">
          <CupcakeBuddy kidData={kidData} suggestions={suggestions} />
        </TabsContent>

        <TabsContent value="bonus" className="space-y-4 animate-fade-in">
          <DailyBonus 
            kidData={kidData}
            points={points}
            setPoints={setPoints}
            dailyBonus={dailyBonus}
            setDailyBonus={setDailyBonus}
          />
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