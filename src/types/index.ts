export interface SignUpMetadata {
  username?: string;
  birthdate?: string;
  pin?: string;
  subscription_plan?: string;
  children?: { username: string; birthdate: string; }[];
  is_parent: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  points: number;
  completed?: boolean;
  kid_id?: string;
  parent_id?: string;
  created_at: string;
  completed_at?: string;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'once';
  level_required?: number;
  category?: 'chores' | 'homework' | 'exercise' | 'reading' | 'other';
  validation_type?: 'parent' | 'photo' | 'timer' | 'none';
  validation_data?: any;
  multiplier?: number;
  streak_count?: number;
}

export interface Kid {
  id: string;
  username: string;
  total_points: number;
  level_number: number;
  level_name: string;
  level_points_required: number;
  birthdate?: string;
  avatar_url?: string;
}

export interface Profile {
  id: string;
  username: string;
  is_parent: boolean;
  birthdate?: string;
  avatar_url?: string;
  total_points?: number;
  level_number?: number;
  level_name?: string;
  level_points_required?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ParentKidRelationship {
  parent_id: string;
  kid_id: string;
  created_at?: string;
}

export interface SprinkleTransaction {
  id: string;
  sender_id: string;
  receiver_id: string;
  amount: number;
  transaction_type: 'gift' | 'reward' | 'task' | 'bonus';
  message?: string;
  created_at: string;
}
