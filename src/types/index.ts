export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  created_at: string;
  user_id: string;
}

export interface Kid {
  id: string;
  username: string;
  pin: string;
  points: number;
  parent_id: string;
}

export interface Parent {
  id: string;
  email: string;
  kids: Kid[];
}