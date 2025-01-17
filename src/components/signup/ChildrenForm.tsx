import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Users } from "lucide-react";

interface ChildInfo {
  username: string;
  birthdate: string;
}

interface ChildrenFormProps {
  children: ChildInfo[];
  setChildren: React.Dispatch<React.SetStateAction<ChildInfo[]>>;
  subscriptionPlan: "single" | "family";
}

export const ChildrenForm = ({
  children,
  setChildren,
  subscriptionPlan,
}: ChildrenFormProps) => {
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
  );
};