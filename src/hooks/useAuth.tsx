import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';

export const useAuth = () => {
  const { user, loading } = useAuthState();
  const { signIn, signUp, signOut } = useAuthActions();

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
};