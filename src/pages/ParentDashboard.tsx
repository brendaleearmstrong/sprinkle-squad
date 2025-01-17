import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { AddKidDialog } from "@/components/dashboard/AddKidDialog";
import { AddTaskDialog } from "@/components/dashboard/AddTaskDialog";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { SquadOverview } from "@/components/dashboard/SquadOverview";
import type { Kid, Task } from "@/types";
import { Loader2 } from "lucide-react";

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
    <div className="container mx-auto p-4 space-y-6 min-h-screen">
      <DashboardHeader />
      
      <div className="flex flex-wrap gap-4 justify-end mb-8">
        <AddKidDialog onKidAdded={fetchKids} />
        <AddTaskDialog onTaskAdded={fetchTasks} />
      </div>

      <QuickStats
        kidCount={kids.length}
        taskCount={tasks.length}
        completedTasks={tasks.filter(task => task.completed).length}
        pendingTasks={tasks.filter(task => !task.completed).length}
      />

      <SquadOverview 
        kids={kids}
        tasks={tasks}
        onSprinkleUpdate={fetchKids}
      />
    </div>
  );
};

export default ParentDashboard;