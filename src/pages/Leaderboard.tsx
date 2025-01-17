import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "@/hooks/useAuthState";
import { Trophy, Crown, Medal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Kid } from "@/types";

const Leaderboard = () => {
  const { user } = useAuthState();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<Kid[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/parent-login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("total_points", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching leaderboard:", error);
        return;
      }

      setLeaderboard(data);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-electric-purple to-deep-purple p-8 rounded-3xl shadow-xl text-space-white">
          <h1 className="text-3xl font-display mb-6 flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            Leaderboard
          </h1>

          <div className="space-y-4">
            {leaderboard.map((kid, index) => (
              <div
                key={kid.id}
                className="bg-space-white/10 p-4 rounded-2xl flex items-center gap-4"
              >
                <div className="w-8 text-center">
                  {index === 0 ? (
                    <Crown className="w-6 h-6 text-neon-orange" />
                  ) : index === 1 ? (
                    <Medal className="w-6 h-6 text-electric-blue" />
                  ) : index === 2 ? (
                    <Medal className="w-6 h-6 text-hot-pink" />
                  ) : (
                    <span className="text-xl">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-display">{kid.username}</p>
                  <p className="text-sm text-space-white/80">Level {kid.level_number}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{kid.total_points}</p>
                  <p className="text-sm text-space-white/80">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;