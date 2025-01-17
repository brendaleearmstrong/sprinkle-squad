import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Sprout, Users } from "lucide-react";

interface SubscriptionPlanProps {
  subscriptionPlan: "single" | "family";
  setSubscriptionPlan: (value: "single" | "family") => void;
  setChildren: React.Dispatch<React.SetStateAction<ChildInfo[]>>;
}

interface ChildInfo {
  username: string;
  birthdate: string;
}

export const SubscriptionPlan = ({
  subscriptionPlan,
  setSubscriptionPlan,
  setChildren,
}: SubscriptionPlanProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium text-electric-purple">Choose your Sprinkle Plan</Label>
      <RadioGroup
        value={subscriptionPlan}
        onValueChange={(value: "single" | "family") => {
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
  );
};