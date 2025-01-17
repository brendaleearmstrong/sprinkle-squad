import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Star, Calendar, CheckCircle, Clock, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
        title: "Success",
        description: "Task updated successfully",
      });

      setIsEditing(false);
      window.location.reload(); // Refresh to see changes
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
        title: "Success",
        description: "Task deleted successfully",
      });

      window.location.reload(); // Refresh to see changes
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-electric-purple to-deep-purple">
        <CardTitle className="text-2xl font-display text-soft-white flex items-center gap-2">
          <ClipboardList className="h-6 w-6" />
          Task Management
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-display text-lg text-electric-purple flex items-center gap-2">
                      {task.title}
                      {task.completed ? (
                        <CheckCircle className="h-4 w-4 text-bright-blue" />
                      ) : (
                        <Clock className="h-4 w-4 text-neon-orange" />
                      )}
                    </h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-neon-pink" />
                      <span className="text-gray-500">
                        {task.category || 'Daily Task'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={task.completed ? "secondary" : "default"}
                        className="animate-fade-in"
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </Badge>
                      <div className="flex items-center gap-1 text-bright-blue">
                        <Star className="h-4 w-4" />
                        <span>{task.points}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog open={isEditing} onOpenChange={setIsEditing}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-100"
                            onClick={() => setEditingTask(task)}
                          >
                            <Pencil className="h-4 w-4 text-gray-500" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Task</DialogTitle>
                          </DialogHeader>
                          {editingTask && (
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                  value={editingTask.title}
                                  onChange={(e) => setEditingTask({
                                    ...editingTask,
                                    title: e.target.value
                                  })}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Description</label>
                                <Input
                                  value={editingTask.description || ''}
                                  onChange={(e) => setEditingTask({
                                    ...editingTask,
                                    description: e.target.value
                                  })}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Points</label>
                                <Input
                                  type="number"
                                  value={editingTask.points}
                                  onChange={(e) => setEditingTask({
                                    ...editingTask,
                                    points: parseInt(e.target.value)
                                  })}
                                />
                              </div>
                              <Button onClick={handleUpdateTask}>
                                Save Changes
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
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