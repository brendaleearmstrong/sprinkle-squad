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
import { useToast } from "@/hooks/use-toast";

interface ChildInfo {
  username: string;
  birthdate: string;
}

type SubscriptionPlan = "single" | "family";

const ParentSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>("single");
  const [children, setChildren] = useState<ChildInfo[]>([{ username: "", birthdate: "" }]);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    await signUp(email, password, true, {
      subscription_plan: subscriptionPlan,
      children: children,
      username: username,
    });
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-electric-purple/5 via-soft-purple/5 to-neon-pink/5">
      {/* Decorative background elements */}
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

      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-electric-purple hover:text-electric-purple/90 transition-colors">
              SprinkleSquad
            </h1>
          </Link>
          <h2 className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-neon-pink via-hot-pink to-neon-orange bg-clip-text text-transparent">
            Join the Squad!
          </h2>
          <p className="text-lg md:text-xl text-electric-purple/80 font-body flex items-center justify-center gap-2">
            <Crown className="w-5 h-5 text-neon-orange animate-spin-slow" />
            Create your family's sprinkle adventure!
            <Heart className="w-5 h-5 text-hot-pink animate-float" />
          </p>
        </div>
        
        {/* Main Form Card */}
        <Card className="p-4 md:p-8 bg-white/90 backdrop-blur shadow-xl border-2 border-secondary/10">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column - Parent Information */}
            <div className="space-y-6">
              <div className="space-y-6 p-4 md:p-6 border-2 rounded-lg bg-white/50">
                <h3 className="text-xl font-display font-bold text-electric-purple flex items-center gap-2">
                  <Crown className="h-5 w-5 text-neon-orange" />
                  Parent Information
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base md:text-lg font-medium text-electric-purple flex items-center gap-2">
                      <User className="h-4 w-4 text-neon-pink" />
                      Username
                    </Label>
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-2 md:p-3 text-base md:text-lg border-2 focus:ring-secondary"
                      placeholder="Your display name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base md:text-lg font-medium text-electric-purple flex items-center gap-2">
                      <User className="h-4 w-4 text-neon-pink" />
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 md:p-3 text-base md:text-lg border-2 focus:ring-secondary"
                      placeholder="parent@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-base md:text-lg font-medium text-electric-purple flex items-center gap-2">
                      <LockKeyhole className="h-4 w-4 text-neon-pink" />
                      Password
                    </Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2 md:p-3 text-base md:text-lg border-2 focus:ring-secondary"
                      required
                      minLength={6}
                      placeholder="At least 6 characters"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base md:text-lg font-medium text-electric-purple flex items-center gap-2">
                      <LockKeyhole className="h-4 w-4 text-neon-pink" />
                      Confirm Password
                    </Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2 md:p-3 text-base md:text-lg border-2 focus:ring-secondary"
                      required
                      minLength={6}
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              </div>

              {/* Subscription Plan Section */}
              <div className="space-y-4">
                <Label className="text-base md:text-lg font-medium text-electric-purple">Choose your Sprinkle Plan</Label>
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
                      className="flex flex-col p-4 md:p-6 border-2 rounded-lg cursor-pointer peer-checked:border-primary hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <Sprout className="h-5 w-5 text-mint-green" />
                        <span className="font-bold text-base md:text-lg">Single Sprinkler</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Perfect for one child's sprinkle journey</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg md:text-xl font-bold text-primary">$4.99</span>
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
                      className="flex flex-col p-4 md:p-6 border-2 rounded-lg cursor-pointer peer-checked:border-primary hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-hot-pink" />
                          <span className="font-bold text-base md:text-lg">Family Squad (2+ Sprinklers)</span>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary hidden md:inline-flex">
                          Best Value
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Perfect for families who want to share sprinkles and rewards
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg md:text-xl font-bold text-primary">$9.99</span>
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
            </div>

            {/* Right Column - Children Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display font-bold text-electric-purple flex items-center gap-2">
                  <Users className="h-5 w-5 text-hot-pink" />
                  Children
                </h3>
                {subscriptionPlan === "family" && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addChild}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Sibling
                  </Button>
                )}
              </div>

              <div className="space-y-4 max-h-[400px] md:max-h-[500px] overflow-y-auto pr-2 md:pr-4">
                {children.map((child, index) => (
                  <Card key={index} className="p-4 md:p-6 border-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-base md:text-lg font-medium text-electric-purple">Child's Name</Label>
                        <Input
                          value={child.username}
                          onChange={(e) => updateChild(index, "username", e.target.value)}
                          placeholder="Enter child's name"
                          required
                          className="w-full p-2 md:p-3 text-base md:text-lg border-2 focus:ring-secondary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base md:text-lg font-medium text-electric-purple">Birthdate</Label>
                        <Input
                          type="date"
                          value={child.birthdate}
                          onChange={(e) => updateChild(index, "birthdate", e.target.value)}
                          required
                          className="w-full p-2 md:p-3 text-base md:text-lg border-2 focus:ring-secondary"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Submit Button - Full Width */}
            <div className="col-span-1 lg:col-span-2 mt-6">
              <Button 
                type="submit"
                className="w-full py-4 md:py-6 text-base md:text-lg bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white font-display transition-all duration-300"
              >
                <Crown className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                Start Your Family's Adventure
              </Button>

              <div className="text-center mt-4">
                <Link
                  to="/parent-login"
                  className="text-sm md:text-base text-electric-purple hover:text-secondary transition-colors"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ParentSignup;