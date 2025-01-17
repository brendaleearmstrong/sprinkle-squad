import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const KidSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !birthdate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    await signUp(email, password, {
      subscription_plan: "single",
      username,
      birthdate,
      is_parent: false,
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 md:p-6 lg:p-8 bg-gradient-to-br from-electric-purple/5 via-soft-purple/5 to-neon-pink/5">
      <h1 className="text-4xl font-display font-bold text-electric-purple mb-4">Kid Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
        <div>
          <label className="font-body text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="font-body text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="font-body text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="font-body text-gray-700">Birthdate</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <Button type="submit" className="w-full py-2 bg-gradient-to-r from-secondary to-primary text-white font-display transition-all duration-300">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default KidSignup;
