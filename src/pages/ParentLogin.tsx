import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Star, Sparkles, Heart, User, LockKeyhole, Crown, IceCream, Plus, Users, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ChildInfo {
  username: string;
  birthdate: string;
}

type SubscriptionPlan = "single" | "family";

const ParentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>("single");
  const [children, setChildren] = useState<ChildInfo[]>([{ username: "", birthdate: "" }]);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      await signUp(email, password, true, {
        subscription_plan: subscriptionPlan,
        children: children,
      });
    } else {
      await signIn(email, password);
    }
  };

  const addChild = () => {
    if (subscriptionPlan === "family") {
      setChildren([...children, { username: "", birthdate: "" }]);
    }
  };

  const updateChild = (index: number, field: keyof ChildInfo, value: string) => {
    const updatedChildren = [...children];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    setChildren(updatedChildren);
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
            Parent Dashboard
          </h2>
          <p className="text-xl text-gray-600 font-body flex items-center justify-center gap-2">
            <Crown className="w-5 h-5 text-neon-orange animate-spin-slow" />
            {isSignUp 
              ? "Create your family's sprinkle adventure!" 
              : "Continue managing your sprinkle squad!"}
            <Heart className="w-5 h-5 text-hot-pink animate-float" />
          </p>
        </div>
        
        <Card className="p-6 bg-white/90 backdrop-blur shadow-xl border-2 border-secondary/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-neon-pink" />
                Email
              </label>
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
              <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <LockKeyhole className="h-4 w-4 text-neon-pink" />
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-lg border-2 focus:ring-secondary"
                required
                minLength={6}
              />
            </div>

            {isSignUp && (
              <>
                <div className="space-y-4">
                  <Label className="text-lg font-medium text-gray-700">Choose your Sprinkle Plan</Label>
                  <RadioGroup
                    value={subscriptionPlan}
                    onValueChange={(value: SubscriptionPlan) => setSubscriptionPlan(value)}
                    className="grid grid-cols-1 gap-4"
                  >
                    <div className="relative">
                      <RadioGroupItem
                        value="single"
                        id="single"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="single"
                        className="flex flex-col p-6 border-2 rounded-lg cursor-pointer peer-checked:border-primary hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-2">
                          <Sprout className="h-5 w-5 text-mint-green" />
                          <span className="font-bold text-lg">Single Sprinkler</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Perfect for one child's sprinkle journey</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xl font-bold text-primary">$9.99</span>
                          <span className="text-gray-500">/month</span>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="relative">
                      <RadioGroupItem
                        value="family"
                        id="family"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="family"
                        className="flex flex-col p-6 border-2 rounded-lg cursor-pointer peer-checked:border-primary hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-hot-pink" />
                            <span className="font-bold text-lg">Family Squad</span>
                          </div>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Best Value
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Perfect for 2+ children who can share sprinkles and rewards
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xl font-bold text-primary">$14.99</span>
                          <span className="text-gray-500">/month</span>
                        </div>
                        <ul className="mt-3 space-y-2 text-sm text-gray-600">
                          <li className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-candy-yellow" />
                            Children can send sprinkles to siblings
                          </li>
                          <li className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-hot-pink" />
                            Share rewards within the family
                          </li>
                        </ul>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-medium text-gray-700">Children</Label>
                    {subscriptionPlan === "family" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addChild}
                        className="flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add Sibling
                      </Button>
                    )}
                  </div>
                  {children.map((child, index) => (
                    <div key={index} className="space-y-4 p-4 border-2 rounded-lg">
                      <div className="space-y-2">
                        <Label>Child's Name</Label>
                        <Input
                          value={child.username}
                          onChange={(e) => updateChild(index, "username", e.target.value)}
                          placeholder="Enter child's name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Birthdate</Label>
                        <Input
                          type="date"
                          value={child.birthdate}
                          onChange={(e) => updateChild(index, "birthdate", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <Button 
              type="submit"
              className="w-full py-6 text-lg bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white font-display transition-all duration-300"
            >
              {isSignUp ? (
                <>
                  <Crown className="mr-2 h-6 w-6" />
                  Start Your Family's Adventure
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-6 w-6 animate-pulse" />
                  Continue the Journey
                </>
              )}
            </Button>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-gray-600 hover:text-secondary transition-colors"
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