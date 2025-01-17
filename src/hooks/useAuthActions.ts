import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { AuthError } from '@supabase/supabase-js';
import { SignUpMetadata } from '@/types';
import { getErrorMessage } from '@/utils/auth-errors';

export const useAuthActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      toast({
        title: "Not configured",
        description: "Please connect to Supabase first",
        variant: "destructive",
      });
      return;
    }

    try {
      // First attempt to sign in with auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error('Auth error:', authError);
        toast({
          title: "Login failed",
          description: getErrorMessage(authError),
          variant: "destructive",
        });
        return;
      }

      if (!authData.user) {
        toast({
          title: "Login failed",
          description: "User not found",
          variant: "destructive",
        });
        return;
      }

      // After successful auth, get the user's profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('is_parent')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Profile lookup error:', profileError);
        toast({
          title: "Profile error",
          description: "Could not fetch user profile",
          variant: "destructive",
        });
        return;
      }

      if (!profileData) {
        toast({
          title: "Profile not found",
          description: "Please contact support",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Welcome back! 🌟",
        description: "Successfully logged in",
      });
      
      navigate(profileData.is_parent ? '/parent-dashboard' : '/kid-dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Login failed",
        description: getErrorMessage(error as AuthError),
        variant: "destructive",
      });
    }
  };

  const signUp = async (email: string, password: string, isParent: boolean = true, metadata?: SignUpMetadata) => {
    if (!isSupabaseConfigured()) {
      toast({
        title: "Not configured",
        description: "Please connect to Supabase first",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            is_parent: isParent,
            ...metadata,
          },
        },
      });

      if (error) throw error;

      if (data?.user) {
        await handleProfileSetup(data.user.id, isParent, metadata);
      }

      toast({
        title: "Welcome to SprinkleSquad! ✨",
        description: "Please check your email to verify your account",
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: getErrorMessage(error as AuthError),
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      toast({
        title: "Not configured",
        description: "Please connect to Supabase first",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate('/');
      toast({
        title: "Goodbye! 👋",
        description: "Successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: getErrorMessage(error as AuthError),
        variant: "destructive",
      });
    }
  };

  return { signIn, signUp, signOut };
};

const handleProfileSetup = async (userId: string, isParent: boolean, metadata?: SignUpMetadata) => {
  // Update parent profile
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      is_parent: isParent,
      email: metadata?.email,
    })
    .eq('id', userId);

  if (profileError) throw profileError;

  // Create child profiles and relationships if signing up as a parent
  if (isParent && metadata?.children) {
    for (const child of metadata.children) {
      // Create child profile
      const { data: childData, error: childError } = await supabase
        .from('profiles')
        .insert({
          username: child.username,
          birthdate: child.birthdate,
          is_parent: false,
        })
        .select()
        .single();

      if (childError) throw childError;

      // Create parent-child relationship
      const { error: relationError } = await supabase
        .from('parent_kid_relationships')
        .insert({
          parent_id: userId,
          kid_id: childData.id,
        });

      if (relationError) throw relationError;
    }
  }
};
