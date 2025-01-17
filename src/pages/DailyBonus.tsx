import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "@/hooks/useAuthState";
import { Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DailyBonus = () => {
  const { user } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/parent-login");
    }
  }, [user, navigate]);

  const claimDailyBonus = async () => {
    // TODO: Implement daily bonus claim logic
    toast.success("Daily bonus claimed! +50 sprinkles! 🎉");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-neon-orange to-hot-pink p-8 rounded-3xl shadow-xl text-space-white">
          <h1 className="text-3xl font-display mb-6 flex items-center gap-3">
            <Star className="w-8 h-8" />
            Daily Bonus
          </h1>
          
          <div className="bg-space-white/10 p-6 rounded-2xl mb-6">
            <h2 className="text-2xl font-display mb-4">Today's Rewards</h2>
            <div className="flex items-center gap-4 mb-4">
              <Gift className="w-12 h-12 text-neon-pink" />
              <div>
                <p className="text-xl">50 Sprinkles</p>
                <p className="text-space-white/80">Claim your daily bonus!</p>
              </div>
            </div>
            <Button 
              onClick={claimDailyBonus}
              className="w-full bg-space-white text-hot-pink hover:bg-soft-white"
            >
              Claim Bonus
            </Button>
          </div>

          <div className="bg-space-white/10 p-6 rounded-2xl">
            <h2 className="text-2xl font-display mb-4">Streak Bonus</h2>
            <p className="text-space-white/80 mb-4">
              Keep logging in daily to earn bigger rewards!
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((day) => (
                <div
                  key={day}
                  className="flex-1 aspect-square bg-space-white/20 rounded-lg flex items-center justify-center"
                >
                  <span className="text-lg font-bold">+{day * 10}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyBonus;