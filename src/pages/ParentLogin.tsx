import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Star, Sparkles } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <div className="text-center space-y-4">
        <h1 className="font-bubblegum text-4xl md:text-6xl text-sprinkle-pink animate-float">
          {isSignUp ? "Join SprinkleSquad!" : "Welcome Back!"}
        </h1>
        <p className="font-comic text-xl text-gray-600">
          {isSignUp 
            ? "Create an account to manage your kids' tasks and rewards" 
            : "Sign in to continue the adventure"}
        </p>
      </div>
      
      <Card className="w-full max-w-md p-6 bg-white/80 backdrop-blur-sm border-2 border-cotton-candy">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="font-comic text-lg text-gray-700">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 text-lg"
              placeholder="parent@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-comic text-lg text-gray-700">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 text-lg"
              required
              minLength={6}
            />
          </div>

          <Button 
            type="submit"
            className="w-full text-lg bg-gradient-to-r from-sprinkle-pink to-cupcake-blue hover:opacity-90 transition-opacity"
            size="lg"
          >
            {isSignUp ? (
              <>
                <Star className="w-5 h-5 mr-2" />
                Sign Up
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Sign In
              </>
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-comic text-gray-600 hover:text-sprinkle-pink transition-colors"
            >
              {isSignUp 
                ? "Already have an account? Sign in" 
                : "Need an account? Sign up"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ParentLogin;