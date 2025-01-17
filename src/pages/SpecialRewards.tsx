import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "@/hooks/useAuthState";
import { Gift, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const SpecialRewards = () => {
  const { user } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/parent-login");
    }
  }, [user, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-neon-pink to-hot-pink p-8 rounded-3xl shadow-xl text-space-white">
          <h1 className="text-3xl font-display mb-6 flex items-center gap-3">
            <Gift className="w-8 h-8" />
            Special Rewards
          </h1>

          <div className="grid gap-6">
            <div className="bg-space-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <Star className="w-12 h-12 text-neon-orange" />
                <div>
                  <h2 className="text-2xl font-display">Weekend Bonus</h2>
                  <p className="text-space-white/80">Double points on all tasks!</p>
                </div>
              </div>
              <Button className="w-full bg-space-white text-hot-pink hover:bg-soft-white">
                Available in 2 days
              </Button>
            </div>

            <div className="bg-space-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <Heart className="w-12 h-12 text-electric-purple" />
                <div>
                  <h2 className="text-2xl font-display">Birthday Surprise</h2>
                  <p className="text-space-white/80">Special gift on your birthday!</p>
                </div>
              </div>
              <Button className="w-full bg-space-white text-hot-pink hover:bg-soft-white">
                Coming soon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialRewards;