import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const TestingPanel = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const testDatabaseConnection = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      if (error) throw error;
      
      toast({
        title: "Database Connection Success! 🎉",
        description: "Successfully connected to Supabase database.",
      });
    } catch (error) {
      toast({
        title: "Database Connection Failed",
        description: "Could not connect to the database. Please check configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testAuthSystem = async () => {
    setIsLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      toast({
        title: "Auth System Check",
        description: session 
          ? "User is authenticated ✅" 
          : "No active session (as expected) ✅",
      });
    } catch (error) {
      toast({
        title: "Auth System Error",
        description: "Could not verify authentication system.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testStorageAccess = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .storage
        .getBucket('avatars');
      
      if (error) throw error;
      
      toast({
        title: "Storage System Check ✅",
        description: "Successfully accessed storage bucket.",
      });
    } catch (error) {
      toast({
        title: "Storage System Error",
        description: "Could not access storage system.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-space-white/10 to-electric-purple/5">
      <h2 className="text-2xl font-display text-electric-purple mb-4">System Health Check</h2>
      <div className="space-y-4">
        <div>
          <Button 
            onClick={testDatabaseConnection}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-electric-purple to-deep-purple hover:opacity-90"
          >
            Test Database Connection
          </Button>
        </div>
        <div>
          <Button 
            onClick={testAuthSystem}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-neon-pink to-hot-pink hover:opacity-90"
          >
            Test Auth System
          </Button>
        </div>
        <div>
          <Button 
            onClick={testStorageAccess}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-bright-blue to-electric-blue hover:opacity-90"
          >
            Test Storage System
          </Button>
        </div>
      </div>
    </Card>
  );
};