import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const ParentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase authentication
    toast({
      title: "Coming Soon!",
      description: "Parent login functionality will be available soon.",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <h1 className="font-bubblegum text-4xl md:text-6xl text-sprinkle-pink animate-float">
        Parent Login
      </h1>
      
      <Card className="w-full max-w-md p-6 bg-white/80 backdrop-blur-sm">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="font-comic text-lg">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 text-lg"
              placeholder="parent@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-comic text-lg">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 text-lg"
            />
          </div>

          <Button 
            type="submit"
            className="w-full text-lg bg-gradient-to-r from-sprinkle-pink to-cupcake-blue hover:opacity-90 transition-opacity"
            size="lg"
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ParentLogin;