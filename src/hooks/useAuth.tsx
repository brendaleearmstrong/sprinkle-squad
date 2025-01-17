import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { AuthError, AuthApiError } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          return 'Invalid email or password';
        case 422:
          return 'Email is already registered';
        default:
          return error.message;
      }
    }
    return error.message;
  };

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user is a parent (has email) or kid (no email)
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      const isParent = !!profileData?.email;
      
      toast({
        title: "Welcome back! 🌟",
        description: "Successfully logged in",
      });
      
      navigate(isParent ? '/parent-dashboard' : '/kid-dashboard');
    } catch (error) {
      toast({
        title: "Oops!",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  const signUp = async (email: string, password: string, isParent: boolean = true) => {
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
          },
        },
      });

      if (error) throw error;

      if (data?.user) {
        // Update profile
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            email: isParent ? email : null,
          })
          .eq('id', data.user.id);

        if (profileError) throw profileError;
      }

      toast({
        title: "Welcome to SprinkleSquad! ✨",
        description: "Please check your email to verify your account",
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: getErrorMessage(error),
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
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
};