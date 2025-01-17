import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Star, Crown, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ParentInfoForm } from "@/components/signup/ParentInfoForm";
import { SubscriptionPlan } from "@/components/signup/SubscriptionPlan";
import { ChildrenForm } from "@/components/signup/ChildrenForm";

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

    await signUp(email, password, {
      subscription_plan: subscriptionPlan,
      children: subscriptionPlan === "family" ? children : [],
      username: username,
      is_parent: true,
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 md:p-6 lg:p-8 bg-gradient-to-br from-electric-purple/5 via-soft-purple/5 to-neon-pink/5">
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
      <div className="w-full max-w-7xl">
        <form onSubmit={handleSubmit} className="space-y-8 bg-white/90 backdrop-blur shadow-xl border-2 border-secondary/10 rounded-lg p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Parent Information */}
            <div className="space-y-6">
              <ParentInfoForm
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
              />
              <SubscriptionPlan
                subscriptionPlan={subscriptionPlan}
                setSubscriptionPlan={setSubscriptionPlan}
                setChildren={setChildren}
              />
            </div>

            {/* Right Column - Children Section */}
            <div className="space-y-6">
              <ChildrenForm
                children={children}
                setChildren={setChildren}
                subscriptionPlan={subscriptionPlan}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button 
              type="submit"
              className="w-full py-6 text-lg bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white font-display transition-all duration-300"
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
      </div>
    </div>
  );
};

export default ParentSignup;