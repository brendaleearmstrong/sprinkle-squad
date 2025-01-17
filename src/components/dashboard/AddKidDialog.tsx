import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface AddKidDialogProps {
  onKidAdded: () => void;
}

export const AddKidDialog = ({ onKidAdded }: AddKidDialogProps) => {
  const [newKid, setNewKid] = useState({ username: "", birthdate: "", avatar: null as File | null });
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewKid({ ...newKid, avatar: e.target.files[0] });
    }
  };

  const addKid = async () => {
    if (!newKid.username || !newKid.birthdate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to add a child",
          variant: "destructive",
        });
        return;
      }

      let avatarUrl = null;
      if (newKid.avatar) {
        const fileExt = newKid.avatar.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('avatars')
          .upload(fileName, newKid.avatar);

        if (uploadError) throw uploadError;

        avatarUrl = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          username: newKid.username,
          is_parent: false,
          birthdate: newKid.birthdate,
          avatar_url: avatarUrl,
          total_points: 0,
          level_number: 1,
          level_name: 'Sprinkle Starter',
          level_points_required: 100,
        })
        .select('id')
        .single();

      if (profileError || !profile) {
        throw profileError || new Error('Failed to create profile');
      }

      const { error: relationError } = await supabase
        .from('parent_kid_relationships')
        .insert({
          parent_id: user.id,
          kid_id: profile.id,
        });

      if (relationError) {
        throw relationError;
      }

      toast({
        title: "Success! 🎉",
        description: `Added ${newKid.username} to your squad!`,
      });

      setNewKid({ username: "", birthdate: "", avatar: null });
      onKidAdded();
      setOpen(false);
    } catch (error: any) {
      console.error('Error adding child:', error);
      toast({
        title: "Error",
        description: error.message || "Couldn't add child",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-electric-purple hover:bg-electric-purple/90 text-white font-semibold shadow-md"
          disabled={isUploading}
        >
          <UserPlus className="mr-2 h-4 w-4" /> Add Child
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-electric-purple">
            Add New Child
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="font-body text-gray-700">Name</label>
            <Input
              value={newKid.username}
              onChange={(e) => setNewKid({ ...newKid, username: e.target.value })}
              placeholder="Enter child's name"
              required
            />
          </div>
          <div>
            <label className="font-body text-gray-700">Birthdate</label>
            <Input
              type="date"
              value={newKid.birthdate}
              onChange={(e) => setNewKid({ ...newKid, birthdate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="font-body text-gray-700">Profile Picture</label>
            <div className="mt-1 flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="flex-1"
              />
              {newKid.avatar && (
                <img 
                  src={URL.createObjectURL(newKid.avatar)} 
                  alt="Preview" 
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
            </div>
          </div>
          <Button 
            onClick={addKid} 
            className="w-full bg-electric-purple hover:bg-electric-purple/90 text-white font-semibold shadow-md"
            disabled={isUploading}
          >
            {isUploading ? "Adding..." : "Add Child"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};