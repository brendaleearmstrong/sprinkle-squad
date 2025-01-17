import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { TaskCategory, CATEGORY_NAMES } from "@/types/rewards";

interface AddTaskDialogProps {
  onTaskAdded: () => void;
}

export const AddTaskDialog = ({ onTaskAdded }: AddTaskDialogProps) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    points: 0,
    category: "sparkle_scoops" as TaskCategory,
    requires_verification: false,
    requires_photo: false,
    requires_video: false,
    is_challenge: false,
    challenge_type: "daily",
    quality_bonus_percent: 0
  });
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

      setNewTask({
        title: "",
        description: "",
        points: 0,
        category: "sparkle_scoops",
        requires_verification: false,
        requires_photo: false,
        requires_video: false,
        is_challenge: false,
        challenge_type: "daily",
        quality_bonus_percent: 0
      });
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
        <Button className="bg-soft-purple hover:bg-soft-purple/90 text-white font-semibold shadow-md">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-soft-purple">
            Add New Task
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Category</Label>
            <Select
              value={newTask.category}
              onValueChange={(value: TaskCategory) => 
                setNewTask({ ...newTask, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORY_NAMES).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Title</Label>
            <Input
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Clean your room"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Input
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Make your bed and organize toys"
            />
          </div>

          <div>
            <Label>Base Points</Label>
            <Input
              type="number"
              value={newTask.points}
              onChange={(e) => setNewTask({ ...newTask, points: Number(e.target.value) })}
              min={0}
            />
          </div>

          <div>
            <Label>Quality Bonus (%)</Label>
            <Input
              type="number"
              value={newTask.quality_bonus_percent}
              onChange={(e) => setNewTask({ ...newTask, quality_bonus_percent: Number(e.target.value) })}
              min={0}
              max={100}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Requires Parent Verification</Label>
              <Switch
                checked={newTask.requires_verification}
                onCheckedChange={(checked) => 
                  setNewTask({ ...newTask, requires_verification: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Requires Photo Evidence</Label>
              <Switch
                checked={newTask.requires_photo}
                onCheckedChange={(checked) => 
                  setNewTask({ ...newTask, requires_photo: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Requires Video Evidence</Label>
              <Switch
                checked={newTask.requires_video}
                onCheckedChange={(checked) => 
                  setNewTask({ ...newTask, requires_video: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Is Challenge Task</Label>
              <Switch
                checked={newTask.is_challenge}
                onCheckedChange={(checked) => 
                  setNewTask({ ...newTask, is_challenge: checked })
                }
              />
            </div>

            {newTask.is_challenge && (
              <div>
                <Label>Challenge Type</Label>
                <Select
                  value={newTask.challenge_type}
                  onValueChange={(value) => 
                    setNewTask({ ...newTask, challenge_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Challenge</SelectItem>
                    <SelectItem value="weekly">Weekly Challenge</SelectItem>
                    <SelectItem value="monthly">Monthly Challenge</SelectItem>
                    <SelectItem value="family">Family Challenge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button 
            onClick={addTask} 
            className="w-full bg-soft-purple hover:bg-soft-purple/90 text-white font-semibold shadow-md"
          >
            Add Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};