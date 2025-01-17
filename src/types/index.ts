export interface Task {
  id: string;
  title: string;
  description: string | null;
  points: number;
  completed: boolean | null;
  kid_id: string | null;
  parent_id: string | null;
  created_at: string;
  completed_at: string | null;
  frequency: 'daily' | 'weekly' | 'monthly' | null;
  level_required: number | null;
}

export interface Kid {
  id: string;
  username: string | null;
  total_points: number | null;
  level: number | null;
}

export interface Parent {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  email: string | null;
  created_at: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string | null;
  points_required: number;
  parent_id: string | null;
  created_at: string;
  level_required: number | null;
}

export interface SprinkleTransaction {
  id: string;
  sender_id: string;
  receiver_id: string;
  amount: number;
  transaction_type: 'gift' | 'trade';
  message: string | null;
  created_at: string;
}

export interface ChildInfo {
  username: string;
  birthdate: string;
}

export interface SignUpMetadata {
  subscription_plan: 'single' | 'family';
  children?: ChildInfo[];
  username?: string;
  birthdate?: string;
}