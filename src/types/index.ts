import { User } from '@supabase/supabase-js';

export interface Kid {
  id: string;
  username: string;
  total_points?: number;
  level_name?: string;
  level_number?: number;
  level_points_required?: number;
  avatar_url?: string;
  birthdate?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  parent_id: string;
  kid_id: string;
}

export interface UserProfile extends User {
  is_parent: boolean;
  username: string;
  avatar_url?: string;
  birthdate?: string;
}
