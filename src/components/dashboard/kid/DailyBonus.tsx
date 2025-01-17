import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface DailyBonusProps {
  kidData: any;
  points: number;
  setPoints: (points: number) => void;
  dailyBonus: boolean;
  setDailyBonus: (dailyBonus: boolean) => void;
}

export const DailyBonus = ({ kidData, points, setPoints, dailyBonus, setDailyBonus }: DailyBonusProps) => {
  const { toast } = useToast();

  const claimDailyBonus = async () => {
    if (!kidData) return;

    const bonusPoints = 50;
    const { error: activityError } = await supabase
      .from("activities")
      .insert({
        kid_id: kidData.id,
        name: "daily_bonus",
        description: "Daily Bonus Claimed",
        points_earned: bonusPoints
      });

    if (activityError) {
      toast({
        title: "Oops!",
        description: "Couldn't claim your bonus. Try again!",
        variant: "destructive",
      });
      return;
    }

    const newPoints = points + bonusPoints;
    const { error: pointsError } = await supabase
      .from("profiles")
      .update({ total_points: newPoints })
      .eq("id", kidData.id);

    if (pointsError) {
      toast({
        description: "Points not updated. Please try again!",
        variant: "destructive",
      });
      return;
    }

    setPoints(newPoints);
    setDailyBonus(false);
    toast({
      title: "Woohoo! 🎉",
      description: `You earned ${bonusPoints} sprinkles!`,
    });
  };

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-neon-orange to-hot-pink">
        <CardTitle className="text-white">Daily Bonus</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {dailyBonus ? (
          <div className="text-center space-y-6">
            <Gift className="mx-auto h-20 w-20 text-hot-pink animate-bounce" />
            <div>
              <h3 className="text-2xl font-display text-gray-800">Daily Bonus Available!</h3>
              <p className="text-gray-600 mt-2">Claim your 50 sprinkles now!</p>
            </div>
            <Button 
              onClick={claimDailyBonus}
              className="w-full bg-gradient-to-r from-neon-orange to-hot-pink hover:opacity-90 text-white font-semibold"
            >
              Claim Bonus
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <Sparkles className="mx-auto h-20 w-20 text-gray-400" />
            <div>
              <h3 className="text-2xl font-display text-gray-800">Come Back Tomorrow!</h3>
              <p className="text-gray-600 mt-2">
                You've already claimed your daily bonus. Check back tomorrow for more sprinkles!
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};