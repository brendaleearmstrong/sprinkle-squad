import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Star, Sparkles, Heart, IceCream, Cloud, Candy } from "lucide-react";

interface ComingSoonProps {
  onAuthenticate: () => void;
}

// Background decoration components
const BackgroundElement = ({ icon: Icon, className }: { icon: any; className: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <Icon className="w-6 h-6" />
  </div>
);

export const ComingSoon = ({ onAuthenticate }: ComingSoonProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Replace these with your desired credentials
    if (username === "sprinkle" && password === "squad2024") {
      localStorage.setItem("preview-authenticated", "true");
      onAuthenticate();
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-electric-purple/5 via-soft-purple/5 to-neon-pink/5 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <BackgroundElement icon={Cloud} className="top-[10%] left-[10%] text-soft-purple animate-float" />
      <BackgroundElement icon={Star} className="top-[20%] right-[15%] text-neon-pink animate-spin-slow" />
      <BackgroundElement icon={IceCream} className="bottom-[15%] left-[20%] text-hot-pink animate-float" />
      <BackgroundElement icon={Candy} className="bottom-[25%] right-[25%] text-neon-orange animate-bounce" />
      <BackgroundElement icon={Heart} className="top-[30%] left-[25%] text-electric-purple animate-pulse" />
      <BackgroundElement icon={Sparkles} className="bottom-[35%] right-[15%] text-bright-orange animate-spin-slow" />

      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 border-secondary/10 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-neon-pink via-hot-pink to-neon-orange bg-clip-text text-transparent">
            SprinkleSquad
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-6 h-6 text-neon-orange animate-spin-slow" />
            <h2 className="text-2xl font-display font-bold text-electric-purple">
              Coming Soon!
            </h2>
            <Star className="w-6 h-6 text-neon-pink animate-spin-slow" />
          </div>
          <p className="text-lg text-electric-purple/80">
            Get ready for an amazing adventure filled with fun, rewards, and lots of sprinkles!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-3 text-lg border-2 focus:ring-secondary"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 text-lg border-2 focus:ring-secondary"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-6 text-lg bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white font-display transition-all duration-300"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Enter Preview
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-electric-purple/60">
            Contact the SprinkleSquad team for access credentials
          </p>
        </div>
      </div>
    </div>
  );
};