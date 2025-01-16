import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Star, Sparkles } from "lucide-react";

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
        // Store kid's session in localStorage
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
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <div className="text-center space-y-4">
        <h1 className="font-bubblegum text-4xl md:text-6xl text-candy-yellow animate-float">
          Kid Login
        </h1>
        <p className="font-comic text-xl text-gray-600">
          Ready for an adventure? Let's go! ✨
        </p>
      </div>
      
      <Card className="w-full max-w-md p-6 bg-white/80 backdrop-blur-sm border-2 border-mint-green">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="font-comic text-lg text-gray-700">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 text-lg"
              placeholder="superhero123"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-comic text-lg text-gray-700">PIN</label>
            <Input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-2 text-lg"
              maxLength={4}
              placeholder="****"
              required
            />
          </div>

          <Button 
            type="submit"
            className="w-full text-lg bg-gradient-to-r from-candy-yellow to-mint-green hover:opacity-90 transition-opacity"
            size="lg"
          >
            <Star className="w-5 h-5 mr-2" />
            Start Playing!
          </Button>
        </form>
      </Card>

      <div className="fixed bottom-8 animate-bounce">
        <Sparkles className="w-8 h-8 text-sprinkle-pink opacity-50" />
      </div>
    </div>
  );
};

export default KidLogin;