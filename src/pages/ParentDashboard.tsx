import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Star, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Kid, Task } from "@/types";

const ParentDashboard = () => {
  const [kids, setKids] = useState<Kid[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchKids();
    fetchTasks();
  }, []);

  const fetchKids = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data, error } = await supabase
      .from("kids")
      .select("*")
      .eq("parent_id", userData.user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Couldn't load kids data",
        variant: "destructive",
      });
      return;
    }

    setKids(data || []);
  };

  const fetchTasks = async () => {
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

  const addTask = async () => {
    toast({
      title: "Coming Soon!",
      description: "Task creation will be available soon!",
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bubblegum text-sprinkle-pink">
          Parent Dashboard
        </h1>
        <Button
          onClick={addTask}
          className="bg-gradient-to-r from-mint-green to-cupcake-blue hover:opacity-90"
        >
          <Plus className="mr-2" /> Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kids.map((kid) => (
          <Card key={kid.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-candy-yellow to-mint-green">
              <CardTitle className="text-white">{kid.username}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="text-candy-yellow h-6 w-6" />
                <span className="font-fredoka text-2xl">{kid.points}</span>
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
                        {task.points}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {kids.length === 0 && (
        <Card className="p-8 text-center bg-soft-cream">
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