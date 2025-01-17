import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface AddTaskDialogProps {
  onTaskAdded: () => void;
}

export const AddTaskDialog = ({ onTaskAdded }: AddTaskDialogProps) => {
  const [newTask, setNewTask] = useState({ title: "", description: "", points: 0 });
  const { toast } = useToast();

  const addTask = async () => {
    try {
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

      if (error) throw error;

      toast({
        title: "Success! ✨",
        description: "New task added!",
      });

      setNewTask({ title: "", description: "", points: 0 });
      onTaskAdded();
    } catch (error) {
      toast({
        title: "Error",
        description: "Couldn't add task",
        variant: "destructive",
      });
    }
  };

  return (
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
  );
};