import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Upload } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface AddKidDialogProps {
  onKidAdded: () => void;
}

export const AddKidDialog = ({ onKidAdded }: AddKidDialogProps) => {
  const [newKid, setNewKid] = useState({ username: "", pin: "", birthdate: "", avatar: null as File | null });
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewKid({ ...newKid, avatar: e.target.files[0] });
    }
  };

  const addKid = async () => {
    try {
      setIsUploading(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      let avatarUrl = null;
      if (newKid.avatar) {
        const fileExt = newKid.avatar.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, newKid.avatar);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
          
        avatarUrl = publicUrl;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            username: newKid.username,
            is_parent: false,
            birthdate: newKid.birthdate || null,
            avatar_url: avatarUrl,
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

      setNewKid({ username: "", pin: "", birthdate: "", avatar: null });
      onKidAdded();
    } catch (error) {
      toast({
        title: "Error",
        description: "Couldn't add child",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="bg-electric-blue hover:bg-electric-blue/90 text-white"
          disabled={isUploading}
        >
          <UserPlus className="mr-2" /> Add Child
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
            />
          </div>
          <div>
            <label className="font-body text-gray-700">PIN (4 digits)</label>
            <Input
              type="password"
              maxLength={4}
              value={newKid.pin}
              onChange={(e) => setNewKid({ ...newKid, pin: e.target.value })}
              placeholder="****"
            />
          </div>
          <div>
            <label className="font-body text-gray-700">Birthdate</label>
            <Input
              type="date"
              value={newKid.birthdate}
              onChange={(e) => setNewKid({ ...newKid, birthdate: e.target.value })}
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
            className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white"
            disabled={isUploading}
          >
            {isUploading ? "Adding..." : "Add Child"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};