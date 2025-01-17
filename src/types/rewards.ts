export type TaskCategory = 
  | 'sparkle_scoops'
  | 'sweet_sprinkles'
  | 'brain_freeze_bonanza'
  | 'energy_explosion'
  | 'furry_friend_frostings'
  | 'green_sprinkle_goals'
  | 'colorful_creations'
  | 'sundae_specials'
  | 'friend_flavors';

export const CATEGORY_NAMES: Record<TaskCategory, string> = {
  sparkle_scoops: 'Sparkle Scoops',
  sweet_sprinkles: 'Sweet Sprinkles',
  brain_freeze_bonanza: 'Brain Freeze Bonanza',
  energy_explosion: 'Energy Explosion',
  furry_friend_frostings: 'Furry Friend Frostings',
  green_sprinkle_goals: 'Green Sprinkle Goals',
  colorful_creations: 'Colorful Creations',
  sundae_specials: 'Sundae Specials',
  friend_flavors: 'Friend Flavors'
};

export const CATEGORY_DESCRIPTIONS: Record<TaskCategory, string> = {
  sparkle_scoops: 'Daily chores and responsibilities',
  sweet_sprinkles: 'Acts of kindness and helping others',
  brain_freeze_bonanza: 'Learning and educational activities',
  energy_explosion: 'Physical activities and exercise',
  furry_friend_frostings: 'Taking care of pets',
  green_sprinkle_goals: 'Environmental and eco-friendly tasks',
  colorful_creations: 'Arts, crafts, and creative activities',
  sundae_specials: 'Special achievements and milestones',
  friend_flavors: 'Social skills and friendship building'
};

export const CATEGORY_COLORS: Record<TaskCategory, { from: string; to: string }> = {
  sparkle_scoops: { from: 'from-pink-400', to: 'to-purple-500' },
  sweet_sprinkles: { from: 'from-red-400', to: 'to-pink-500' },
  brain_freeze_bonanza: { from: 'from-blue-400', to: 'to-indigo-500' },
  energy_explosion: { from: 'from-green-400', to: 'to-emerald-500' },
  furry_friend_frostings: { from: 'from-yellow-400', to: 'to-orange-500' },
  green_sprinkle_goals: { from: 'from-emerald-400', to: 'to-green-500' },
  colorful_creations: { from: 'from-violet-400', to: 'to-purple-500' },
  sundae_specials: { from: 'from-yellow-400', to: 'to-red-500' },
  friend_flavors: { from: 'from-blue-400', to: 'to-purple-500' }
};