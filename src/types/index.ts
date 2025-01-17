export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  user_id: string;
  parent_id: string;
  created_at: string;
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
  description: string;
  points_cost: number;
  parent_id: string;
  created_at: string;
}

export interface SignUpMetadata {
  subscription_plan: 'single' | 'family';
  children?: Array<{
    username: string;
    birthdate: string;
  }>;
  username?: string;
  birthdate?: string;
}