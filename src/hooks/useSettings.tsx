import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Settings {
  notifications: "all" | "important" | "none";
  soundEffects: boolean;
  darkMode: boolean;
  parentalControls: {
    pinRequired: boolean;
    pin: string | null;
    restrictedFeatures: string[];
  };
}

interface SettingsContextType {
  settings: Settings | null;
  loading: boolean;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
  playSound: (soundName: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const audioElements: { [key: string]: HTMLAudioElement } = {};

  useEffect(() => {
    fetchSettings();
    initializeSounds();
  }, []);

  useEffect(() => {
    if (settings?.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings?.darkMode]);

  const initializeSounds = () => {
    // Pre-load sound effects
    const sounds = {
      success: '/sounds/success.mp3',
      error: '/sounds/error.mp3',
      notification: '/sounds/notification.mp3',
      click: '/sounds/click.mp3',
    };

    Object.entries(sounds).forEach(([name, path]) => {
      audioElements[name] = new Audio(path);
    });
  };

  const playSound = (soundName: string) => {
    if (settings?.soundEffects && audioElements[soundName]) {
      audioElements[soundName].play().catch(console.error);
    }
  };

  const fetchSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setSettings({
        notifications: data.notifications,
        soundEffects: data.sound_effects,
        darkMode: data.dark_mode,
        parentalControls: data.parental_controls,
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Could not load settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_settings')
        .update({
          notifications: newSettings.notifications ?? settings?.notifications,
          sound_effects: newSettings.soundEffects ?? settings?.soundEffects,
          dark_mode: newSettings.darkMode ?? settings?.darkMode,
          parental_controls: newSettings.parentalControls ?? settings?.parentalControls,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      setSettings(prev => prev ? { ...prev, ...newSettings } : null);
      playSound('success');
      toast({
        title: "Settings updated",
        description: "Your preferences have been saved",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      playSound('error');
      toast({
        title: "Error",
        description: "Could not update settings",
        variant: "destructive",
      });
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, updateSettings, playSound }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};