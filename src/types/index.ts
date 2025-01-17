export interface Kid {
  id: string;
  username: string;
  total_points?: number;
  level_name?: string;
  level_number?: number;
  level_points_required?: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  points: number;
  kid_id: string;
  parent_id: string;
  completed: boolean;
  created_at: string;
}

export interface SprinkleTransaction {
  id: string;
  sender_id: string;
  receiver_id: string;
  amount: number;
  transaction_type: 'task' | 'gift' | 'purchase';
  message?: string;
  created_at: string;
}

export interface SignUpMetadata {
  subscription_plan?: 'single' | 'family';
  children?: Array<{
    username: string;
    birthdate: string;
  }>;
  username?: string;
  birthdate?: string;
}