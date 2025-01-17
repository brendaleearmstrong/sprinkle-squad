import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { User, Heart, Star, Trophy } from "lucide-react";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/parent-login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6 bg-white/90 backdrop-blur shadow-xl">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <User className="w-12 h-12" />
          </Avatar>
          <h1 className="text-2xl font-bold">{user.email}</h1>
          
          <div className="grid grid-cols-3 gap-4 w-full mt-6">
            <div className="text-center p-4 bg-gradient-to-br from-neon-pink to-hot-pink rounded-lg">
              <Heart className="w-8 h-8 mx-auto text-white mb-2" />
              <span className="text-white font-medium">Level 5</span>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-neon-orange to-bright-orange rounded-lg">
              <Star className="w-8 h-8 mx-auto text-white mb-2" />
              <span className="text-white font-medium">1250 Points</span>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-electric-purple to-deep-purple rounded-lg">
              <Trophy className="w-8 h-8 mx-auto text-white mb-2" />
              <span className="text-white font-medium">15 Tasks</span>
            </div>
          </div>

          <Button 
            variant="destructive"
            className="mt-8 w-full"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) {
                toast({
                  title: "Error signing out",
                  description: error.message,
                  variant: "destructive",
                });
              } else {
                navigate("/");
              }
            }}
          >
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;