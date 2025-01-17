import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Star, Trophy, Calendar, BellRing } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const NotificationsPanel = () => {
  const notifications = [
    {
      id: 1,
      type: "achievement",
      title: "New Achievement Unlocked!",
      description: "Sarah reached Level 5",
      time: "2 hours ago",
      icon: Trophy,
      color: "text-bright-blue",
    },
    {
      id: 2,
      type: "task",
      title: "Task Completed",
      description: "Math homework finished",
      time: "3 hours ago",
      icon: Star,
      color: "text-electric-purple",
    },
    {
      id: 3,
      type: "reminder",
      title: "Daily Streak",
      description: "Keep the momentum going!",
      time: "5 hours ago",
      icon: Calendar,
      color: "text-hot-pink",
    },
  ];

  return (
    <Card className="col-span-full xl:col-span-1 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-electric-purple to-deep-purple">
        <CardTitle className="text-2xl font-display text-soft-white flex items-center gap-2">
          <BellRing className="h-6 w-6" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className="p-4 hover:shadow-md transition-shadow animate-fade-in"
              >
                <div className="flex items-start gap-4">
                  <div className={`${notification.color} p-2 rounded-lg bg-gray-50`}>
                    <notification.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-lg text-electric-purple">
                        {notification.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {notification.time}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{notification.description}</p>
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