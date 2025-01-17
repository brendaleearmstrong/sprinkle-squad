import { AuthError, AuthApiError } from '@supabase/supabase-js';

export const getErrorMessage = (error: AuthError) => {
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