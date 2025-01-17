import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Star, Heart, User, LockKeyhole, IceCream } from "lucide-react";
import { Link } from "react-router-dom";
import type { SignUpMetadata } from "@/types";

const KidSignup = () => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const metadata: SignUpMetadata = {
      username,
      birthdate,
    };
    await signUp(username, pin, false, metadata);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-soft-yellow via-soft-green to-soft-blue">
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
            Join the Fun!
          </h2>
          <p className="text-xl text-gray-600 font-body flex items-center justify-center gap-2">
            <IceCream className="w-5 h-5 text-neon-orange animate-bounce" />
            Create your sprinkle adventure!
            <Heart className="w-5 h-5 text-hot-pink animate-float" />
          </p>
        </div>
        
        <Card className="p-6 bg-white/90 backdrop-blur shadow-xl border-2 border-secondary/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-neon-pink" />
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 text-lg border-2 focus:ring-secondary"
                placeholder="Your cool username"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <LockKeyhole className="h-4 w-4 text-neon-pink" />
                PIN
              </label>
              <Input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full p-3 text-lg border-2 focus:ring-secondary"
                placeholder="Create a secret PIN"
                required
                minLength={4}
                maxLength={4}
                pattern="[0-9]*"
              />
            </div>

            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <Star className="h-4 w-4 text-neon-pink" />
                Birthdate
              </label>
              <Input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full p-3 text-lg border-2 focus:ring-secondary"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full py-6 text-lg bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white font-display transition-all duration-300"
            >
              <Star className="mr-2 h-6 w-6 animate-spin-slow" />
              Start Your Adventure
            </Button>

            <div className="text-center pt-4">
              <Link
                to="/kid-login"
                className="text-sm text-gray-600 hover:text-secondary transition-colors"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default KidSignup;