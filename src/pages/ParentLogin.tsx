import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Star, Sparkles, Heart, User, LockKeyhole, ArrowLeft, Crown, IceCream } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ParentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again!",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-electric-purple via-soft-purple to-deep-purple overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
              <Crown className="w-4 h-4 text-neon-pink/40" />
            ) : i % 3 === 1 ? (
              <IceCream className="w-4 h-4 text-neon-orange/40" />
            ) : (
              <Star className="w-4 h-4 text-bright-blue/40" />
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center text-space-white hover:text-space-white/90 transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="text-center space-y-4">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-display font-bold text-space-white hover:text-space-white/90 transition-colors">
              SprinkleSquad
            </h1>
          </Link>
          <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-neon-pink via-hot-pink to-neon-orange bg-clip-text text-transparent animate-float">
            Parent Dashboard
          </h2>
          <p className="text-xl text-space-white/80 font-body flex items-center justify-center gap-2">
            <Crown className="w-5 h-5 text-neon-pink animate-spin-slow" />
            {isSignUp 
              ? "Join the adventure of managing tasks and rewards!" 
              : "Continue your journey of parenting success!"}
            <Heart className="w-5 h-5 text-hot-pink animate-float" />
          </p>
        </div>
        
        <Card className="p-8 bg-white/95 backdrop-blur shadow-xl border-2 border-neon-pink/10 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-neon-pink" />
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-lg border-2 rounded-xl focus:ring-neon-pink focus:border-neon-pink transition-all duration-200"
                placeholder="parent@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <LockKeyhole className="h-4 w-4 text-neon-pink" />
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-lg border-2 rounded-xl focus:ring-neon-pink focus:border-neon-pink transition-all duration-200"
                required
                minLength={6}
              />
            </div>

            <Button 
              type="submit"
              className="w-full py-6 text-lg bg-gradient-to-r from-neon-pink to-hot-pink hover:opacity-90 text-white font-display rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSignUp ? (
                <>
                  <Crown className="mr-2 h-5 w-5 animate-spin-slow" />
                  Create Magical Account
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                  Start the Adventure
                </>
              )}
            </Button>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-gray-600 hover:text-neon-pink transition-colors underline-offset-4 hover:underline"
              >
                {isSignUp 
                  ? "Already have an account? Sign in" 
                  : "New to SprinkleSquad? Create an account"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ParentLogin;