import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Star, Calendar, CheckCircle, Clock } from "lucide-react";
import type { Task } from "@/types";

interface TasksPanelProps {
  tasks: Task[];
}

export const TasksPanel = ({ tasks }: TasksPanelProps) => {
  return (
    <Card className="col-span-full xl:col-span-2 shadow-lg hover:shadow-xl transition-shadow">
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
                        {task.frequency || 'Daily Task'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      variant={task.completed ? "secondary" : "default"}
                      className="animate-fade-in"
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </Badge>
                    <div className="flex items-center gap-1 text-neon-pink">
                      <Star className="h-4 w-4" />
                      <span>{task.points}</span>
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