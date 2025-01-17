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
        throw signInError;
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
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        toast({
          title: "Profile error",
          description: "Could not fetch user profile",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Welcome back! 🌟",
        description: "Successfully logged in",
      });
      
      navigate(profile?.is_parent ? '/parent-dashboard' : '/kid-dashboard');
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
        // Create or update profile
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: email,
            is_parent: isParent,
            username: metadata?.username,
          });

        if (profileError) throw profileError;
      }

      toast({
        title: "Welcome to SprinkleSquad! ✨",
        description: "Account created successfully",
      });

      // Redirect to dashboard based on user type
      navigate(isParent ? '/parent-dashboard' : '/kid-dashboard');
    } catch (error) {
      toast({
        title: "Signup failed",
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
        title: "Logout failed",
        description: getErrorMessage(error as AuthError),
        variant: "destructive",
      });
    }
  };

  return { signIn, signUp, signOut };
};