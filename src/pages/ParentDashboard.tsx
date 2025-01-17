import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Gift, Loader2, Users, Plus, Star, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { KidCard } from "@/components/dashboard/KidCard";
import { AddKidDialog } from "@/components/dashboard/AddKidDialog";
import { AddTaskDialog } from "@/components/dashboard/AddTaskDialog";
import type { Kid, Task } from "@/types";

const ParentDashboard = () => {
  const [kids, setKids] = useState<Kid[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Not authenticated",
          description: "Please login first",
          variant: "destructive",
        });
        navigate("/parent-login");
        return;
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Failed to check authentication status",
        variant: "destructive",
      });
      navigate("/parent-login");
    }
  };

  const fetchData = async () => {
    try {
      await Promise.all([fetchKids(), fetchTasks()]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchKids = async () => {
    if (!supabase) return;
    
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data, error } = await supabase
      .from("parent_kid_relationships")
      .select(`
        kid:kid_id (
          id,
          username,
          total_points,
          level_number,
          level_name,
          level_points_required
        )
      `)
      .eq("parent_id", userData.user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Couldn't load kids data",
        variant: "destructive",
      });
      return;
    }

    if (data) {
      const transformedKids = data.map((item: any) => ({
        id: item.kid.id,
        username: item.kid.username,
        total_points: item.kid.total_points || 0,
        level_number: item.kid.level_number || 1,
        level_name: item.kid.level_name || 'Sprinkle Starter',
        level_points_required: item.kid.level_points_required || 100
      }));
      setKids(transformedKids);
    }
  };

  const fetchTasks = async () => {
    if (!supabase) return;
    
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("parent_id", userData.user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Couldn't load tasks",
        variant: "destructive",
      });
      return;
    }

    setTasks(data || []);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8 min-h-screen bg-gradient-to-b from-deep-purple to-electric-purple">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-space-white/10 p-6 rounded-lg backdrop-blur-sm">
        <div>
          <h1 className="text-4xl font-bubblegum bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">
            Parent Dashboard
          </h1>
          <p className="text-soft-white mt-2">Manage your squad's tasks and rewards</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <AddKidDialog onKidAdded={fetchKids} />
          <AddTaskDialog onTaskAdded={fetchTasks} />
        </div>
      </div>

      {/* Squad Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kids.length > 0 ? (
          kids.map((kid) => (
            <KidCard 
              key={kid.id} 
              kid={kid} 
              tasks={tasks} 
              onSprinkleUpdate={fetchKids}
            />
          ))
        ) : (
          <Card className="col-span-full p-8 text-center bg-space-white/5 backdrop-blur-sm border-2 border-neon-pink/20">
            <Gift className="mx-auto h-12 w-12 text-neon-pink mb-4 animate-bounce" />
            <h3 className="font-bubblegum text-2xl text-neon-pink mb-2">
              Welcome to SprinkleSquad!
            </h3>
            <p className="font-comic text-soft-white mb-4">
              Start by adding your kids to manage their tasks and rewards! 🌟
            </p>
            <AddKidDialog onKidAdded={fetchKids} />
          </Card>
        )}
      </div>

      {/* Quick Stats */}
      {kids.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-space-white/5 backdrop-blur-sm border-neon-pink/20">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-neon-pink" />
              <div>
                <p className="text-soft-white">Total Squad Members</p>
                <p className="text-2xl font-bold text-neon-pink">{kids.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-space-white/5 backdrop-blur-sm border-electric-blue/20">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-electric-blue" />
              <div>
                <p className="text-soft-white">Total Tasks</p>
                <p className="text-2xl font-bold text-electric-blue">{tasks.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-space-white/5 backdrop-blur-sm border-neon-green/20">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-neon-green" />
              <div>
                <p className="text-soft-white">Completed Tasks</p>
                <p className="text-2xl font-bold text-neon-green">
                  {tasks.filter(task => task.completed).length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-space-white/5 backdrop-blur-sm border-neon-orange/20">
            <div className="flex items-center gap-3">
              <Plus className="h-8 w-8 text-neon-orange" />
              <div>
                <p className="text-soft-white">Pending Tasks</p>
                <p className="text-2xl font-bold text-neon-orange">
                  {tasks.filter(task => !task.completed).length}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;