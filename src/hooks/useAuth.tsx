import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export const useAuth = () => {
  const { user, loading } = useAuthState();
  const { signIn, signUp, signOut } = useAuthActions();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        // Check if the user is a parent before redirecting
        const checkUserType = async () => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('is_parent')
            .eq('id', session?.user?.id)
            .single();

          if (profile?.is_parent) {
            navigate('/parent-dashboard');
          } else {
            navigate('/kid-dashboard');
          }
        };
        checkUserType();
      } else if (event === 'SIGNED_OUT') {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
};