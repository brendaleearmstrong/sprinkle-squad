import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Gift, Loader2 } from "lucide-react";
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
          level
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

    const transformedKids: Kid[] = data?.map((item) => ({
      id: item.kid.id,
      username: item.kid.username,
      total_points: item.kid.total_points,
      level: item.kid.level
    })) || [];

    setKids(transformedKids);
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
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bubblegum text-sprinkle-pink">
          Parent Dashboard
        </h1>
        <div className="flex gap-4">
          <AddKidDialog onKidAdded={fetchKids} />
          <AddTaskDialog onTaskAdded={fetchTasks} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kids.map((kid) => (
          <KidCard key={kid.id} kid={kid} tasks={tasks} />
        ))}
      </div>

      {kids.length === 0 && (
        <Card className="p-8 text-center bg-soft-cream">
          <Gift className="mx-auto h-12 w-12 text-candy-yellow mb-4" />
          <h3 className="font-bubblegum text-2xl text-sprinkle-pink mb-2">
            Welcome to SprinkleSquad!
          </h3>
          <p className="font-comic text-gray-600">
            Start by adding your kids to manage their tasks and rewards! 🌟
          </p>
        </Card>
      )}
    </div>
  );
};

export default ParentDashboard;
