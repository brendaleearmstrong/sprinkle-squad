import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const KidLogin = () => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase authentication
    toast({
      title: "Coming Soon!",
      description: "Kid login functionality will be available soon.",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <h1 className="font-bubblegum text-4xl md:text-6xl text-candy-yellow animate-float">
        Kid Login
      </h1>
      
      <Card className="w-full max-w-md p-6 bg-white/80 backdrop-blur-sm">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="font-comic text-lg">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 text-lg"
              placeholder="superhero123"
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-comic text-lg">PIN</label>
            <Input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-2 text-lg"
              maxLength={4}
              placeholder="****"
            />
          </div>

          <Button 
            type="submit"
            className="w-full text-lg bg-gradient-to-r from-candy-yellow to-mint-green hover:opacity-90 transition-opacity"
            size="lg"
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default KidLogin;