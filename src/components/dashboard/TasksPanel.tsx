import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Star, Calendar, CheckCircle, Clock, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { Task } from "@/types";

interface TasksPanelProps {
  tasks: Task[];
}

export const TasksPanel = ({ tasks }: TasksPanelProps) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: editingTask.title,
          description: editingTask.description,
          points: editingTask.points
        })
        .eq('id', editingTask.id);

      if (error) throw error;

      toast({
        title: "Success! ✨",
        description: "Task updated successfully",
      });

      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      toast({
        title: "Success! 🗑️",
        description: "Task deleted successfully",
      });

      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-electric-purple to-deep-purple p-6">
        <CardTitle className="text-2xl font-display text-space-white flex items-center gap-3">
          <ClipboardList className="h-6 w-6" />
          Task Management
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card 
                key={task.id} 
                className="group p-4 hover:shadow-md transition-all duration-300 border-l-4 hover:border-l-8 border-l-electric-purple"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h4 className="font-display text-lg text-electric-purple flex items-center gap-2 group-hover:text-soft-purple transition-colors">
                      {task.title}
                      {task.completed ? (
                        <CheckCircle className="h-4 w-4 text-neon-green animate-pulse" />
                      ) : (
                        <Clock className="h-4 w-4 text-neon-orange animate-pulse" />
                      )}
                    </h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="h-4 w-4 text-hot-pink" />
                        <span>{task.category || 'Daily Task'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-bright-blue">
                        <Star className="h-4 w-4" />
                        <span className="font-semibold">{task.points}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      variant={task.completed ? "secondary" : "default"}
                      className={`animate-fade-in ${
                        task.completed 
                          ? 'bg-neon-green/10 text-neon-green hover:bg-neon-green/20' 
                          : 'bg-neon-orange/10 text-neon-orange hover:bg-neon-orange/20'
                      }`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </Badge>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Dialog open={isEditing} onOpenChange={setIsEditing}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-electric-purple/10 hover:text-electric-purple"
                            onClick={() => setEditingTask(task)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-display text-electric-purple">
                              Edit Task
                            </DialogTitle>
                          </DialogHeader>
                          {editingTask && (
                            <div className="space-y-4 pt-4">
                              <div>
                                <label className="text-sm font-medium text-gray-700">Title</label>
                                <Input
                                  value={editingTask.title}
                                  onChange={(e) => setEditingTask({
                                    ...editingTask,
                                    title: e.target.value
                                  })}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <Input
                                  value={editingTask.description || ''}
                                  onChange={(e) => setEditingTask({
                                    ...editingTask,
                                    description: e.target.value
                                  })}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Points</label>
                                <Input
                                  type="number"
                                  value={editingTask.points}
                                  onChange={(e) => setEditingTask({
                                    ...editingTask,
                                    points: parseInt(e.target.value)
                                  })}
                                  className="mt-1"
                                  min={0}
                                />
                              </div>
                              <div className="flex justify-end gap-3 pt-4">
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button 
                                  onClick={handleUpdateTask}
                                  className="bg-electric-purple hover:bg-soft-purple text-white"
                                >
                                  Save Changes
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};