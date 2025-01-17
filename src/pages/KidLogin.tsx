import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Star, Sparkles, Heart, IceCream } from "lucide-react";
import { Link } from "react-router-dom";

const KidLogin = () => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // First, find the profile with matching username
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, username")
        .eq("username", username)
        .single();

      if (profileError) {
        throw new Error("Username not found");
      }

      // Check if this profile belongs to a kid (sprinkler) by checking parent_kid_relationships
      const { data: relationshipData, error: relationshipError } = await supabase
        .from("parent_kid_relationships")
        .select("kid_id")
        .eq("kid_id", profileData.id)
        .single();

      if (relationshipError) {
        throw new Error("This account is not a Sprinkler account");
      }

      // Sign in with magic link (since kids don't have passwords)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: `${username}@sprinkler.local`,
        password: pin,
      });

      if (signInError) {
        throw signInError;
      }

      // Store the profile data in local storage
      localStorage.setItem("sprinklerProfile", JSON.stringify(profileData));
      
      toast({
        title: "Welcome back! 🌟",
        description: `Ready for some fun activities, ${profileData.username}?`,
      });
      
      navigate("/kid-dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Oops!",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-soft-yellow via-soft-green to-soft-blue">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: '0.4',
              transform: `scale(${0.5 + Math.random() * 1.5})`,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="w-4 h-4 text-neon-pink/40" />
            ) : i % 3 === 1 ? (
              <IceCream className="w-4 h-4 text-neon-orange/40" />
            ) : (
              <Star className="w-4 h-4 text-bright-blue/40" />
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-display font-bold text-secondary hover:text-secondary/90 transition-colors">
              SprinkleSquad
            </h1>
          </Link>
          <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-neon-pink via-hot-pink to-neon-orange bg-clip-text text-transparent animate-float">
            Sprinkler Login
          </h2>
          <p className="text-xl text-gray-600 font-body flex items-center justify-center gap-2">
            <IceCream className="w-5 h-5 text-neon-orange animate-spin-slow" />
            Ready for a sweet adventure? Let's go! ✨
            <Heart className="w-5 h-5 text-hot-pink animate-float" />
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
              Start Your Adventure!
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default KidLogin;