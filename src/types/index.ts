export interface SignUpMetadata {
  username?: string;
  birthdate?: string;
  pin?: string;
  subscription_plan?: string;
  children?: { username: string; birthdate: string; }[];
  is_parent: boolean;
}
