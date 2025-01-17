import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Star, Plus, Gift, Trophy, Loader2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Kid, Task } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const ParentDashboard = () => {
  const [kids, setKids] = useState<Kid[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", points: 0 });
  const [newKid, setNewKid] = useState({ username: "", pin: "" });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      toast({
        title: "Not configured",
        description: "Please connect to Supabase first",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
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
  };

  const fetchData = async () => {
    try {
      await Promise.all([fetchKids(), fetchTasks()]);
    } finally {
      setLoading(false);
    }
  };

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

  const addKid = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data, error } = await supabase
      .from("kids")
      .insert([
        {
          username: newKid.username,
          pin: newKid.pin,
          parent_id: userData.user.id,
        },
      ])
      .select();

    if (error) {
      toast({
        title: "Error",
        description: "Couldn't add kid",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success! 🎉",
      description: `Added ${newKid.username} to your squad!`,
    });

    setNewKid({ username: "", pin: "" });
    fetchKids();
  };

  const addTask = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { error } = await supabase
      .from("tasks")
      .insert([
        {
          ...newTask,
          parent_id: userData.user.id,
        },
      ]);

    if (error) {
      toast({
        title: "Error",
        description: "Couldn't add task",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success! ✨",
      description: "New task added!",
    });

    setNewTask({ title: "", description: "", points: 0 });
    fetchTasks();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <Card className="p-8 text-center bg-soft-cream">
        <Gift className="mx-auto h-12 w-12 text-candy-yellow mb-4" />
        <h3 className="font-bubblegum text-2xl text-sprinkle-pink mb-2">
          Connect to Supabase
        </h3>
        <p className="font-comic text-gray-600">
          Please connect to Supabase to manage your SprinkleSquad! 🌟
        </p>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bubblegum text-sprinkle-pink">
          Parent Dashboard
        </h1>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-candy-yellow to-mint-green hover:opacity-90">
                <Plus className="mr-2" /> Add Kid
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-bubblegum text-2xl text-sprinkle-pink">
                  Add New Kid
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="font-comic text-gray-700">Username</label>
                  <Input
                    value={newKid.username}
                    onChange={(e) => setNewKid({ ...newKid, username: e.target.value })}
                    placeholder="superhero123"
                  />
                </div>
                <div>
                  <label className="font-comic text-gray-700">PIN (4 digits)</label>
                  <Input
                    type="password"
                    maxLength={4}
                    value={newKid.pin}
                    onChange={(e) => setNewKid({ ...newKid, pin: e.target.value })}
                    placeholder="****"
                  />
                </div>
                <Button onClick={addKid} className="w-full">
                  Add Kid
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-mint-green to-cupcake-blue hover:opacity-90">
                <Plus className="mr-2" /> Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-bubblegum text-2xl text-sprinkle-pink">
                  Add New Task
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="font-comic text-gray-700">Title</label>
                  <Input
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Clean your room"
                  />
                </div>
                <div>
                  <label className="font-comic text-gray-700">Description</label>
                  <Input
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Make your bed and organize toys"
                  />
                </div>
                <div>
                  <label className="font-comic text-gray-700">Points</label>
                  <Input
                    type="number"
                    value={newTask.points}
                    onChange={(e) => setNewTask({ ...newTask, points: Number(e.target.value) })}
                    min={0}
                  />
                </div>
                <Button onClick={addTask} className="w-full">
                  Add Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kids.map((kid) => (
          <Card key={kid.id} className="overflow-hidden group hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-candy-yellow to-mint-green">
              <CardTitle className="text-white flex items-center justify-between">
                <span>{kid.username}</span>
                <Trophy className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="text-candy-yellow h-6 w-6" />
                <span className="font-fredoka text-2xl">{kid.points} points</span>
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
                        {task.points} <Star className="w-4 h-4 inline" />
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