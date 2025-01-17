import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, LockKeyhole } from "lucide-react";

interface ParentInfoFormProps {
  username: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
}

export const ParentInfoForm = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: ParentInfoFormProps) => {
  return (
    <div className="space-y-6 p-6 border-2 rounded-lg bg-white/50">
      <h3 className="text-xl font-display font-bold text-electric-purple flex items-center gap-2">
        <User className="h-5 w-5 text-neon-orange" />
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
  );
};