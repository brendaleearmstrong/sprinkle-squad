import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Trophy, Plus, Minus, RefreshCw } from "lucide-react";
import { Kid, Task, SprinkleTransaction } from "@/types";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface KidCardProps {
  kid: Kid;
  tasks: Task[];
  onSprinkleUpdate: () => void;
}

export const KidCard = ({ kid, tasks, onSprinkleUpdate }: KidCardProps) => {
  const [sprinkleAmount, setSprinkleAmount] = useState("");
  const { toast } = useToast();

  const handleSprinkleTransaction = async (type: 'add' | 'remove') => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const amount = parseInt(sprinkleAmount);
      if (isNaN(amount) || amount <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter a valid number of sprinkles",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("sprinkle_transactions")
        .insert([
          {
            sender_id: type === 'remove' ? kid.id : userData.user.id,
            receiver_id: type === 'add' ? kid.id : userData.user.id,
            amount: amount,
            transaction_type: 'gift',
            message: `Parent ${type === 'add' ? 'added' : 'removed'} sprinkles`,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: `${amount} sprinkles ${type === 'add' ? 'added to' : 'removed from'} ${kid.username}'s account`,
      });

      setSprinkleAmount("");
      onSprinkleUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process sprinkle transaction",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-candy-yellow to-mint-green">
        <CardTitle className="text-white flex items-center justify-between">
          <span>{kid.username}</span>
          <Trophy className="w-6 h-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="text-candy-yellow h-6 w-6" />
          <span className="font-fredoka text-2xl">{kid.total_points || 0} sprinkles</span>
          <span className="text-sm text-gray-500">Level {kid.level || 1}</span>
        </div>

        {/* Sprinkle Management */}
        <div className="mb-4 p-4 bg-soft-cream rounded-lg">
          <div className="flex gap-2 mb-2">
            <Input
              type="number"
              min="0"
              value={sprinkleAmount}
              onChange={(e) => setSprinkleAmount(e.target.value)}
              placeholder="Amount"
              className="w-24"
            />
            <Button
              size="sm"
              onClick={() => handleSprinkleTransaction('add')}
              className="bg-mint-green hover:bg-mint-green/90"
            >
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
            <Button
              size="sm"
              onClick={() => handleSprinkleTransaction('remove')}
              className="bg-hot-pink hover:bg-hot-pink/90"
            >
              <Minus className="w-4 h-4 mr-1" /> Remove
            </Button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-2">
          <h3 className="font-comic text-lg mb-2">Pending Tasks</h3>
          {tasks
            .filter((task) => task.kid_id === kid.id && !task.completed)
            .map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-2 bg-soft-cream rounded-lg"
              >
                <div className="flex flex-col">
                  <span className="font-comic">{task.title}</span>
                  {task.description && (
                    <span className="text-sm text-gray-500">{task.description}</span>
                  )}
                </div>
                <span className="font-fredoka text-sprinkle-pink">
                  {task.points} <Star className="w-4 h-4 inline" />
                </span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};