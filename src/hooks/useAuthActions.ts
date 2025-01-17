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
      console.log('Attempting to sign in with:', email);
      
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        toast({
          title: "Login failed",
          description: getErrorMessage(signInError),
          variant: "destructive",
        });
        return;
      }

      if (!user) {
        toast({
          title: "Login failed",
          description: "User not found",
          variant: "destructive",
        });
        return;
      }

      console.log('Successfully signed in user:', user.id);

      // Get user profile to check if they're a parent
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_parent')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        toast({
          title: "Profile error",
          description: "Could not fetch user profile",
          variant: "destructive",
        });
        return;
      }

      if (!profile) {
        console.log('Creating new profile for user:', user.id);
        // Create a profile if it doesn't exist
        const { error: createProfileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: user.id,
              is_parent: true,
              email: email
            }
          ]);

        if (createProfileError) {
          console.error('Profile creation error:', createProfileError);
          toast({
            title: "Profile creation failed",
            description: "Could not create user profile",
            variant: "destructive",
          });
          return;
        }

        navigate('/parent-dashboard');
        return;
      }

      console.log('User profile found:', profile);
      toast({
        title: "Welcome back! 🌟",
        description: "Successfully logged in",
      });
      
      navigate(profile.is_parent ? '/parent-dashboard' : '/kid-dashboard');
    } catch (error) {
      console.error('Unexpected error during sign in:', error);
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
