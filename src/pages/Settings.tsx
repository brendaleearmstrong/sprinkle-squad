import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Volume2, Moon, Shield } from "lucide-react";

const Settings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/parent-login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const settings = [
    {
      icon: Bell,
      label: "Push Notifications",
      description: "Get notified about new tasks and rewards",
    },
    {
      icon: Volume2,
      label: "Sound Effects",
      description: "Play sounds when completing tasks",
    },
    {
      icon: Moon,
      label: "Dark Mode",
      description: "Switch to dark theme",
    },
    {
      icon: Shield,
      label: "Parental Controls",
      description: "Manage access and restrictions",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6 bg-white/90 backdrop-blur shadow-xl">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="space-y-6">
          {settings.map((setting) => (
            <div key={setting.label} className="flex items-start space-x-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <setting.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <Label htmlFor={setting.label} className="text-lg font-medium">
                  {setting.label}
                </Label>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
              <Switch id={setting.label} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Settings;