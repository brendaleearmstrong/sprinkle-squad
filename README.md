# 🧁 SprinkleSquad

A gamified chore-and-rewards web app for families. Parents (**the Squad**) set tasks and rewards; kids (**Sprinklers**) complete tasks to earn **sprinkles**, level up, climb the leaderboard and redeem rewards. Everything is themed around sweets: cupcakes, ice cream, sundaes and sprinkles.

> **Status:** working prototype. See [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) for how the app works today and [NEW_FEATURES.md](NEW_FEATURES.md) for the roadmap.

## Features

**For parents**
- Sign up with email on a *Single Sprinkler* or *Family* plan and add children during sign-up
- Squad overview with quick stats and a card for each kid (avatar, points, level)
- Create tasks with points, frequency, category, required level and validation type (parent approval, photo, timer or none)
- Define rewards and gift sprinkles to kids

**For kids**
- Simple username + PIN login
- Personal task list for earning sprinkles
- **Cupcake Buddy**, an animated mascot with encouraging suggestions
- Daily bonus, leaderboard and special-rewards catalogue

**Task categories:** Sparkle Scoops (chores), Sweet Sprinkles (kindness), Brain Freeze Bonanza (learning), Energy Explosion (exercise), Furry Friend Frostings (pet care), Green Sprinkle Goals (eco), Colorful Creations (arts & crafts), Sundae Specials (milestones) and Friend Flavors (social skills).

## Tech stack

| Layer | Tools |
|---|---|
| Build | Vite 5, TypeScript |
| UI | React 18, Tailwind CSS 3, shadcn/ui (Radix), lucide-react, framer-motion |
| Routing & data | react-router-dom v6, TanStack Query |
| Forms | react-hook-form, zod |
| Backend | Supabase (Postgres, Auth, Storage) |
| Charts | recharts |

## Getting started

Requires Node.js 18+ and npm.

```sh
git clone https://github.com/brendaleearmstrong/sprinkle-squad.git
cd sprinkle-squad
npm install
npm run dev
```

The app connects to the existing hosted Supabase project, so no `.env` file is needed to run it locally.

| Script | What it does |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run build:dev` | Development-mode build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── pages/          # Routes: landing, parent/kid login & signup, dashboards,
│                   # leaderboard, rewards, daily bonus, profile, settings
├── components/     # dashboard, home, layout, signup, ai and shadcn/ui components
├── hooks/          # Auth, settings and data hooks
├── integrations/   # Supabase client and generated types
├── lib/ utils/     # Helpers
└── types/          # Shared types (task categories, rewards)
supabase/           # Supabase config
```

## Data model

Main Supabase tables: `profiles`, `parent_kid_relationships`, `tasks`, `task_history`, `rewards`, `reward_redemptions`, `sprinkle_transactions`, `activities` and `achievements`, plus an `avatars` storage bucket. Details are in [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md#data-model-supabase).

## Known limitations

- The "Coming Soon" preview screen is a client-side demo gate, not real security.
- Kid sign-in uses the PIN as a Supabase password; a hashed-PIN flow is planned.
- Task approval, reward redemption and the daily bonus are not yet complete end to end.
- The AI Recommendations and Feeling Friend cards are placeholders.
- SQL migrations are not yet checked into `supabase/migrations`.

These are covered in Phase 1 of [NEW_FEATURES.md](NEW_FEATURES.md).

## Development and deployment

The project was created with [Lovable](https://lovable.dev/projects/624060d4-4a20-423d-a000-ed45d319d493). Changes pushed to this repo sync to the Lovable project, and edits made in Lovable are committed here automatically. To deploy, open the Lovable project and choose **Share → Publish**.
