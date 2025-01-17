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
import { ScrollArea } from "@/components/ui/scroll-area";

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

    // Validate children data when family plan is selected
    if (subscriptionPlan === "family") {
      const isValid = children.every(child => child.username && child.birthdate);
      if (!isValid) {
        toast({
          title: "Missing information",
          description: "Please fill in all children's information",
          variant: "destructive",
        });
        return;
      }
    }

    await signUp(email, password, true, {
      subscription_plan: subscriptionPlan,
      children: subscriptionPlan === "family" ? children : [],
      username: username,
    });
  };

  const addChild = () => {
    if (subscriptionPlan === "family" && children.length < 5) {
      setChildren([...children, { username: "", birthdate: "" }]);
    }
  };

  const updateChild = (index: number, field: keyof ChildInfo, value: string) => {
    const updatedChildren = [...children];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    setChildren(updatedChildren);
  };

  const removeChild = (index: number) => {
    if (children.length > 1) {
      const updatedChildren = children.filter((_, i) => i !== index);
      setChildren(updatedChildren);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 bg-gradient-to-br from-electric-purple/5 via-soft-purple/5 to-neon-pink/5 overflow-x-hidden">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-8 w-full max-w-7xl">
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

      {/* Main Form */}
      <Card className="w-full max-w-7xl p-6 bg-white/90 backdrop-blur shadow-xl border-2 border-secondary/10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Parent Information */}
            <div className="space-y-6">
              <div className="space-y-6 p-6 border-2 rounded-lg bg-white/50">
                <h3 className="text-xl font-display font-bold text-electric-purple flex items-center gap-2">
                  <Crown className="h-5 w-5 text-neon-orange" />
                  Parent Information
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-electric-purple flex items-center gap-2">
                      <User className="h-4 w-4 text-neon-pink" />
                      Username
                    </Label>
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-2 text-base border-2 focus:ring-secondary"
                      placeholder="Your display name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium text-electric-purple flex items-center gap-2">
                      <User className="h-4 w-4 text-neon-pink" />
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 text-base border-2 focus:ring-secondary"
                      placeholder="parent@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-electric-purple flex items-center gap-2">
                      <LockKeyhole className="h-4 w-4 text-neon-pink" />
                      Password
                    </Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2 text-base border-2 focus:ring-secondary"
                      required
                      minLength={6}
                      placeholder="At least 6 characters"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium text-electric-purple flex items-center gap-2">
                      <LockKeyhole className="h-4 w-4 text-neon-pink" />
                      Confirm Password
                    </Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2 text-base border-2 focus:ring-secondary"
                      required
                      minLength={6}
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              </div>

              {/* Subscription Plan Section */}
              <div className="space-y-4">
                <Label className="text-base font-medium text-electric-purple">Choose your Sprinkle Plan</Label>
                <RadioGroup
                  value={subscriptionPlan}
                  onValueChange={(value: SubscriptionPlan) => {
                    setSubscriptionPlan(value);
                    if (value === "single") {
                      setChildren([{ username: "", birthdate: "" }]);
                    }
                  }}
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
                      className="flex flex-col p-4 border-2 rounded-lg cursor-pointer peer-checked:border-primary hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <Sprout className="h-5 w-5 text-mint-green" />
                        <span className="font-bold text-base">Single Sprinkler</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Perfect for one child's sprinkle journey</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">$4.99</span>
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
                      className="flex flex-col p-4 border-2 rounded-lg cursor-pointer peer-checked:border-primary hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-hot-pink" />
                          <span className="font-bold text-base">Family Squad (2+ Sprinklers)</span>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary hidden md:inline-flex">
                          Best Value
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Perfect for families who want to share sprinkles and rewards
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">$9.99</span>
                        <span className="text-gray-500">/month</span>
                      </div>
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
                {subscriptionPlan === "family" && children.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addChild}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Child
                  </Button>
                )}
              </div>

              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {children.map((child, index) => (
                    <Card key={index} className="p-4 border-2">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-medium text-electric-purple">Child {index + 1}</Label>
                          {children.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeChild(index)}
                              className="text-destructive hover:text-destructive/90"
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-sm text-electric-purple">Name</Label>
                            <Input
                              value={child.username}
                              onChange={(e) => updateChild(index, "username", e.target.value)}
                              placeholder="Enter child's name"
                              required={subscriptionPlan === "family"}
                              className="w-full p-2 text-base border-2 focus:ring-secondary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-electric-purple">Birthdate</Label>
                            <Input
                              type="date"
                              value={child.birthdate}
                              onChange={(e) => updateChild(index, "birthdate", e.target.value)}
                              required={subscriptionPlan === "family"}
                              className="w-full p-2 text-base border-2 focus:ring-secondary"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button 
              type="submit"
              className="w-full py-4 text-lg bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white font-display transition-all duration-300"
            >
              <Crown className="mr-2 h-5 w-5" />
              Start Your Family's Adventure
            </Button>

            <div className="text-center mt-4">
              <Link
                to="/parent-login"
                className="text-sm text-electric-purple hover:text-secondary transition-colors"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ParentSignup;