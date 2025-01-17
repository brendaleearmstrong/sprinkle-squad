import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Trophy, Plus, Minus, UserX, Pencil, Smile, SmilePlus, Laugh, Happy } from "lucide-react";
import { Kid, Task } from "@/types";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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

interface KidCardProps {
  kid: Kid;
  tasks: Task[];
  onSprinkleUpdate: () => void;
  onKidDeleted: () => void;
}

export const KidCard = ({ kid, tasks, onSprinkleUpdate, onKidDeleted }: KidCardProps) => {
  const [sprinkleAmount, setSprinkleAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedKid, setEditedKid] = useState({ ...kid });
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [selectedEmoticon, setSelectedEmoticon] = useState<string | null>(null);
  const { toast } = useToast();

  const calculateLevelProgress = () => {
    if (!kid.level_points_required || !kid.total_points) return 0;
    const previousLevelPoints = kid.level_number === 1 ? 0 : 
      kid.level_number === 2 ? 101 :
      kid.level_number === 3 ? 301 :
      kid.level_number === 4 ? 601 :
      kid.level_number === 5 ? 1001 :
      kid.level_number === 6 ? 1501 :
      kid.level_number === 7 ? 2001 :
      kid.level_number === 8 ? 3001 :
      kid.level_number === 9 ? 4001 : 5001;
    
    const progress = ((kid.total_points - previousLevelPoints) / 
      (kid.level_points_required - previousLevelPoints)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAvatar(e.target.files[0]);
      setSelectedEmoticon(null); // Reset emoticon when file is selected
    }
  };

  const handleEmoticonSelect = (emoticon: string) => {
    setSelectedEmoticon(emoticon);
    setNewAvatar(null); // Reset file when emoticon is selected
    setEditedKid({ ...editedKid, avatar_url: `emoticon:${emoticon}` });
  };

  const handleUpdateProfile = async () => {
    try {
      let avatarUrl = kid.avatar_url;

      if (selectedEmoticon) {
        avatarUrl = `emoticon:${selectedEmoticon}`;
      } else if (newAvatar) {
        const fileExt = newAvatar.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, newAvatar);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
          
        avatarUrl = publicUrl;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          username: editedKid.username,
          birthdate: editedKid.birthdate,
          avatar_url: avatarUrl,
        })
        .eq('id', kid.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      setIsEditing(false);
      onSprinkleUpdate(); // Refresh data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', kid.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile deleted successfully",
      });
      
      onKidDeleted();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete profile",
        variant: "destructive",
      });
    }
  };

  const renderAvatar = () => {
    if (kid.avatar_url?.startsWith('emoticon:')) {
      const emoticon = kid.avatar_url.split(':')[1];
      switch (emoticon) {
        case 'smile':
          return <Smile className="w-8 h-8 text-hot-pink" />;
        case 'smile-plus':
          return <SmilePlus className="w-8 h-8 text-hot-pink" />;
        case 'laugh':
          return <Laugh className="w-8 h-8 text-hot-pink" />;
        case 'happy':
          return <Happy className="w-8 h-8 text-hot-pink" />;
        default:
          return null;
      }
    } else if (kid.avatar_url) {
      return (
        <img 
          src={kid.avatar_url} 
          alt={kid.username} 
          className="w-8 h-8 rounded-full object-cover"
        />
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          {kid.username[0].toUpperCase()}
        </div>
      );
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-neon-pink to-hot-pink">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            {renderAvatar()}
            <span>{kid.username}</span>
          </div>
          <div className="flex items-center gap-2">
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <UserX className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
          <div className="bg-soft-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Trophy className="text-electric-purple h-6 w-6" />
                <span className="font-display text-xl">{kid.level_name}</span>
              </div>
              <span className="text-sm text-gray-500">Level {kid.level_number}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div 
                className="bg-gradient-to-r from-electric-purple to-soft-purple h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${calculateLevelProgress()}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{kid.total_points || 0} sprinkles</span>
              <span>{kid.level_points_required ? `Next level: ${kid.level_points_required}` : 'Max level reached!'}</span>
            </div>
          </div>

        <div className="bg-soft-white rounded-lg p-4">
          <div className="flex gap-2">
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
              className="bg-hot-pink hover:bg-hot-pink/90 text-white font-semibold shadow-md"
            >
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
            <Button
              size="sm"
              onClick={() => handleSprinkleTransaction('remove')}
              className="bg-neon-pink hover:bg-neon-pink/90 text-white font-semibold shadow-md"
            >
              <Minus className="w-4 h-4 mr-1" /> Remove
            </Button>
          </div>
        </div>
      </CardContent>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="font-body text-gray-700">Name</label>
              <Input
                value={editedKid.username}
                onChange={(e) => setEditedKid({ ...editedKid, username: e.target.value })}
              />
            </div>
            <div>
              <label className="font-body text-gray-700">Birthdate</label>
              <Input
                type="date"
                value={editedKid.birthdate || ''}
                onChange={(e) => setEditedKid({ ...editedKid, birthdate: e.target.value })}
              />
            </div>
            <div>
              <label className="font-body text-gray-700">Profile Picture</label>
              <div className="mt-1 space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                <div className="text-sm text-gray-600">Or choose an emoticon:</div>
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`hover:bg-pink-50 ${selectedEmoticon === 'smile' ? 'border-hot-pink' : ''}`}
                    onClick={() => handleEmoticonSelect('smile')}
                  >
                    <Smile className="w-6 h-6 text-hot-pink" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`hover:bg-pink-50 ${selectedEmoticon === 'smile-plus' ? 'border-hot-pink' : ''}`}
                    onClick={() => handleEmoticonSelect('smile-plus')}
                  >
                    <SmilePlus className="w-6 h-6 text-hot-pink" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`hover:bg-pink-50 ${selectedEmoticon === 'laugh' ? 'border-hot-pink' : ''}`}
                    onClick={() => handleEmoticonSelect('laugh')}
                  >
                    <Laugh className="w-6 h-6 text-hot-pink" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`hover:bg-pink-50 ${selectedEmoticon === 'happy' ? 'border-hot-pink' : ''}`}
                    onClick={() => handleEmoticonSelect('happy')}
                  >
                    <Happy className="w-6 h-6 text-hot-pink" />
                  </Button>
                </div>
                {(newAvatar || kid.avatar_url) && !selectedEmoticon && (
                  <img 
                    src={newAvatar ? URL.createObjectURL(newAvatar) : kid.avatar_url}
                    alt="Preview" 
                    className="w-12 h-12 rounded-full object-cover mx-auto"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                onClick={handleUpdateProfile}
                className="bg-electric-purple hover:bg-electric-purple/90 text-white font-semibold shadow-md"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your child's profile
              and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProfile}
              className="bg-destructive hover:bg-destructive/90 text-white font-semibold shadow-md"
            >
              Delete Profile
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
