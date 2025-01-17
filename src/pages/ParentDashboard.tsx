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
import { Loader2, Users, Star, Trophy, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ParentDashboard = () => {
  const [children, setChildren] = useState<Kid[]>([]);
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
      await Promise.all([fetchChildren(), fetchTasks()]);
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

  const fetchChildren = async () => {
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
        description: "Couldn't load children data",
        variant: "destructive",
      });
      return;
    }

    if (data) {
      const transformedChildren = data.map((item: any) => ({
        id: item.kid.id,
        username: item.kid.username,
        total_points: item.kid.total_points || 0,
        level_number: item.kid.level_number || 1,
        level_name: item.kid.level_name || 'Sprinkle Starter',
        level_points_required: item.kid.level_points_required || 100
      }));
      setChildren(transformedChildren);
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
    <div className="container mx-auto p-4 space-y-6 min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-primary">Family Dashboard</h1>
          <div className="flex gap-4">
            <AddKidDialog onKidAdded={fetchChildren} />
            <AddTaskDialog onTaskAdded={fetchTasks} />
          </div>
        </div>

        <QuickStats
          kidCount={children.length}
          taskCount={tasks.length}
          completedTasks={tasks.filter(task => task.completed).length}
          pendingTasks={tasks.filter(task => !task.completed).length}
        />

        <Tabs defaultValue="squad" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="squad">Squad Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks Manager</TabsTrigger>
          </TabsList>
          
          <TabsContent value="squad" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child) => (
                <Card key={child.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20">
                    <CardTitle className="flex items-center justify-between">
                      <span>{child.username}</span>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        <span>{child.total_points}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-secondary" />
                        <span>{child.level_name}</span>
                      </div>
                      <div className="w-full bg-secondary/20 rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min((child.total_points / (child.level_points_required || 100)) * 100, 100)}%`
                          }}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {child.level_points_required ? 
                          `${child.total_points} / ${child.level_points_required} points to next level` :
                          'Max level reached!'
                        }
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{task.title}</span>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        <span>{task.points}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{task.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        task.completed ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'
                      }`}>
                        {task.completed ? 'Completed' : 'Pending'}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Assigned to: {children.find(k => k.id === task.kid_id)?.username || 'Unassigned'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParentDashboard;