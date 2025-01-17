import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Reward {
  id: string;
  title: string;
  description: string | null;
  points_required: number;
  level_required: number | null;
}

interface RewardsPanelProps {
  rewards: Reward[];
  onRewardDeleted: () => void;
}

export const RewardsPanel = ({ rewards, onRewardDeleted }: RewardsPanelProps) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteReward = async (rewardId: string) => {
    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from("rewards")
        .delete()
        .eq("id", rewardId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Reward deleted successfully",
      });
      
      onRewardDeleted();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete reward",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Rewards</CardTitle>
        <CardDescription>Manage your kids' rewards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rewards.map((reward) => (
          <Card key={reward.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{reward.title}</h4>
                {reward.description && (
                  <p className="text-sm text-gray-500">{reward.description}</p>
                )}
                <div className="mt-2 space-x-2">
                  <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                    {reward.points_required} points
                  </span>
                  {reward.level_required && (
                    <span className="text-sm bg-secondary/10 text-secondary px-2 py-1 rounded">
                      Level {reward.level_required}
                    </span>
                  )}
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/90"
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Reward</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this reward? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteReward(reward.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        ))}
        {rewards.length === 0 && (
          <p className="text-center text-gray-500">No rewards created yet</p>
        )}
      </CardContent>
    </Card>
  );
};