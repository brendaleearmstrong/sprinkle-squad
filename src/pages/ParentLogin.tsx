import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Star, Sparkles, Heart, User, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const ParentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      if (error.message?.includes('Invalid login credentials')) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please check your credentials and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-electric-purple/5 via-soft-purple/5 to-neon-pink/5">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-display font-bold text-electric-purple hover:text-electric-purple/90 transition-colors">
              SprinkleSquad
            </h1>
          </Link>
          <h2 className="text-2xl font-display font-bold bg-gradient-to-r from-neon-pink via-hot-pink to-neon-orange bg-clip-text text-transparent">
            Parent Dashboard
          </h2>
          <p className="text-lg text-electric-purple/80 font-body flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-neon-orange animate-spin-slow" />
            Continue managing your sprinkle squad!
            <Heart className="w-5 h-5 text-hot-pink animate-float" />
          </p>
        </div>
        
        <Card className="p-6 bg-white/90 backdrop-blur shadow-xl border-2 border-secondary/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-neon-pink" />
                Email
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-lg border-2 focus:ring-secondary"
                placeholder="parent@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <LockKeyhole className="h-4 w-4 text-neon-pink" />
                Password
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-lg border-2 focus:ring-secondary"
                required
                minLength={6}
              />
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-lg bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white font-display transition-all duration-300"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 animate-spin" />
                  Logging in...
                </span>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                  Continue the Journey
                </>
              )}
            </Button>

            <div className="text-center pt-4">
              <Link
                to="/parent-signup"
                className="text-sm text-gray-600 hover:text-secondary transition-colors"
              >
                New to SprinkleSquad? Create an account
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ParentLogin;