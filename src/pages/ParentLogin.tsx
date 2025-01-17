import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ParentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-soft-purple via-soft-pink to-soft-blue">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-6 h-6 text-primary/50 animate-float">
          <Star />
        </div>
        <div className="absolute bottom-20 right-10 w-6 h-6 text-secondary/50 animate-float" style={{ animationDelay: "0.5s" }}>
          <Sparkles />
        </div>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-display font-bold text-primary hover:text-primary/90 transition-colors">
              SprinkleSquad
            </h1>
          </Link>
          <h2 className="text-2xl font-display font-semibold text-gray-800">
            {isSignUp ? "Create Parent Account" : "Welcome Back!"}
          </h2>
          <p className="text-gray-600 font-body">
            {isSignUp 
              ? "Join to create and manage tasks for your kids" 
              : "Sign in to continue the adventure"}
          </p>
        </div>
        
        <Card className="p-6 bg-white/90 backdrop-blur shadow-xl border-2 border-primary/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 text-lg border-2 focus:ring-primary"
                placeholder="parent@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 text-lg border-2 focus:ring-primary"
                required
                minLength={6}
              />
            </div>

            <Button 
              type="submit"
              className="w-full py-6 text-lg bg-primary hover:bg-primary/90 text-white font-display"
            >
              {isSignUp ? (
                <>
                  <Star className="mr-2 h-5 w-5" />
                  Create Account
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Sign In
                </>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                {isSignUp 
                  ? "Already have an account? Sign in" 
                  : "Need an account? Sign up"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ParentLogin;