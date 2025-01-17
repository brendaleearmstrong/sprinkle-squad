import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Volume2, Lock } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { settings, updateSettings, playSound } = useSettings();
  const { toast } = useToast();
  const [pin, setPin] = useState("");
  const [showPinInput, setShowPinInput] = useState(false);

  const handlePinToggle = (enabled: boolean) => {
    if (enabled) {
      setShowPinInput(true);
    } else {
      updateSettings({
        parentalControls: {
          ...settings?.parentalControls!,
          pinRequired: false,
          pin: null,
        },
      });
      setShowPinInput(false);
    }
  };

  const handlePinSubmit = () => {
    if (pin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be 4 digits",
        variant: "destructive",
      });
      return;
    }

    updateSettings({
      parentalControls: {
        ...settings?.parentalControls!,
        pinRequired: true,
        pin,
      },
    });
    setShowPinInput(false);
    setPin("");
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={settings?.notifications}
            onValueChange={(value: "all" | "important" | "none") => 
              updateSettings({ notifications: value })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="important" id="important" />
              <Label htmlFor="important">Important only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">None</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Sound Effects
          </CardTitle>
          <CardDescription>Toggle sound effects in the app</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings?.soundEffects}
              onCheckedChange={(checked) => {
                updateSettings({ soundEffects: checked });
                if (checked) playSound('click');
              }}
            />
            <Label>Enable sound effects</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize your app experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings?.darkMode}
              onCheckedChange={(checked) => updateSettings({ darkMode: checked })}
            />
            <Label>Dark mode</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Parental Controls
          </CardTitle>
          <CardDescription>Set up PIN protection for sensitive features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings?.parentalControls.pinRequired}
              onCheckedChange={handlePinToggle}
            />
            <Label>Enable PIN protection</Label>
          </div>

          {showPinInput && (
            <div className="space-y-2">
              <Label>Enter 4-digit PIN</Label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  maxLength={4}
                  pattern="[0-9]*"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  className="w-32"
                />
                <Button onClick={handlePinSubmit}>Set PIN</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}