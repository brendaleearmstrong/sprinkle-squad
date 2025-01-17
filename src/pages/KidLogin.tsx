import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const KidLogin = () => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from("kids")
        .select("*")
        .eq("username", username)
        .eq("pin", pin)
        .single();

      if (error) throw error;

      if (data) {
        localStorage.setItem("kidSession", JSON.stringify(data));
        
        toast({
          title: "Welcome back! 🌟",
          description: `Ready for some fun activities, ${data.username}?`,
        });
        
        navigate("/kid-dashboard");
      } else {
        toast({
          title: "Oops!",
          description: "Username or PIN is incorrect",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-soft-yellow via-soft-green to-soft-blue">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-8 h-8 text-yellow-400 animate-sprinkle-pop">
          <Star />
        </div>
        <div className="absolute bottom-20 right-10 w-8 h-8 text-green-400 animate-sprinkle-pop" style={{ animationDelay: "0.5s" }}>
          <Sparkles />
        </div>
        <div className="absolute top-20 right-20 w-8 h-8 text-blue-400 animate-sprinkle-pop" style={{ animationDelay: "1s" }}>
          <Star />
        </div>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-display font-bold text-secondary hover:text-secondary/90 transition-colors">
              SprinkleSquad
            </h1>
          </Link>
          <h2 className="text-3xl font-display font-bold text-gray-800 animate-float">
            Kid Login
          </h2>
          <p className="text-xl text-gray-600 font-body">
            Ready for an adventure? Let's go! ✨
          </p>
        </div>
        
        <Card className="p-6 bg-white/90 backdrop-blur shadow-xl border-2 border-secondary/10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 text-lg border-2 focus:ring-secondary"
                placeholder="superhero123"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">PIN</label>
              <Input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full p-3 text-lg border-2 focus:ring-secondary"
                maxLength={4}
                placeholder="****"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full py-6 text-lg bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white font-display transition-opacity"
            >
              <Star className="mr-2 h-6 w-6" />
              Start Playing!
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default KidLogin;