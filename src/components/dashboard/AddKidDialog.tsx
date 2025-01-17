import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface AddKidDialogProps {
  onKidAdded: () => void;
}

export const AddKidDialog = ({ onKidAdded }: AddKidDialogProps) => {
  const [newKid, setNewKid] = useState({ username: "", pin: "" });
  const { toast } = useToast();

  const addKid = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            username: newKid.username,
            is_parent: false,
          },
        ])
        .select()
        .single();

      if (profileError) throw profileError;

      const { error: relationError } = await supabase
        .from("parent_kid_relationships")
        .insert([
          {
            parent_id: userData.user.id,
            kid_id: profileData.id,
          },
        ]);

      if (relationError) throw relationError;

      toast({
        title: "Success! 🎉",
        description: `Added ${newKid.username} to your squad!`,
      });

      setNewKid({ username: "", pin: "" });
      onKidAdded();
    } catch (error) {
      toast({
        title: "Error",
        description: "Couldn't add kid",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-candy-yellow to-mint-green hover:opacity-90">
          <Plus className="mr-2" /> Add Kid
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bubblegum text-2xl text-sprinkle-pink">
            Add New Kid
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="font-comic text-gray-700">Username</label>
            <Input
              value={newKid.username}
              onChange={(e) => setNewKid({ ...newKid, username: e.target.value })}
              placeholder="superhero123"
            />
          </div>
          <div>
            <label className="font-comic text-gray-700">PIN (4 digits)</label>
            <Input
              type="password"
              maxLength={4}
              value={newKid.pin}
              onChange={(e) => setNewKid({ ...newKid, pin: e.target.value })}
              placeholder="****"
            />
          </div>
          <Button onClick={addKid} className="w-full">
            Add Kid
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};