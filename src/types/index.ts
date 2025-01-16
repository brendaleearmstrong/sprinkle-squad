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
  username: string;
  pin: string;
  points: number;
  parent_id: string;
  created_at: string;
}

export interface Parent {
  id: string;
  email: string;
  kids: Kid[];
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