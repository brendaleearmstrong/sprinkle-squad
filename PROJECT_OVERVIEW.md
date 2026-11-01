# SprinkleSquad — Project Overview

SprinkleSquad is a gamified chore-and-rewards web app for families. Parents ("the Squad") create tasks and rewards for their children; kids ("Sprinklers") complete tasks to earn **sprinkles** (points), level up, and redeem rewards. The whole experience is themed around sweets — cupcakes, ice cream, sundaes and sprinkles — with bright gradients, playful animations and sound effects aimed at young children.

The app was generated and iterated in [Lovable](https://lovable.dev/projects/624060d4-4a20-423d-a000-ed45d319d493), so changes pushed to this repo sync back to the Lovable project and vice versa.

---

## Tech stack

| Layer | Tools |
|---|---|
| Build / dev server | Vite 5 (React SWC plugin) |
| UI | React 18, TypeScript, Tailwind CSS 3, shadcn/ui (Radix primitives), lucide-react icons |
| Animation | framer-motion, tailwindcss-animate |
| Routing | react-router-dom v6 |
| Data fetching | @tanstack/react-query, supabase-js |
| Forms & validation | react-hook-form, zod |
| Backend | Supabase (Postgres, Auth, Storage) — project `xomqvvduvaialpynwyhe` |
| Charts | recharts |
| Fonts | Quicksand and Nunito (Google Fonts) |

## Getting started

```sh
npm install
npm run dev        # local dev server
npm run build      # production build
npm run lint       # eslint
```

The Supabase URL and publishable (anon) key are hard-coded in `src/lib/supabase.ts` and `src/integrations/supabase/client.ts`, so no `.env` file is needed to run it against the existing backend.

---

## How the app works

### 1. Preview gate
Before any route renders, `src/Routes.tsx` shows a **"Coming Soon"** screen (`src/pages/ComingSoon.tsx`). Entering the preview credentials sets `preview-authenticated` in `localStorage` and unlocks the rest of the app. This is a client-side gate for demos only — it is not real security.

### 2. Two kinds of users

**Parents** sign up with email and password (`/parent-signup`), choosing a plan and adding their children in the same flow:
- *Single Sprinkler* plan — one child
- *Family* plan — several children

**Kids (Sprinklers)** log in at `/kid-login` with a **username and PIN**. Behind the scenes each kid is a Supabase Auth user with the synthetic email `<username>@sprinkler.local` and the PIN as the password. The login first checks that the username exists in `profiles` and is linked to a parent in `parent_kid_relationships`.

After login, `Routes.tsx` reads `profiles.is_parent` and sends parents to `/parent-dashboard`.

### 3. Parent dashboard (`/parent-dashboard`)
- **Squad overview and quick stats** for all linked kids
- **Kid cards** — avatar, points, level; parents can gift sprinkles (writes to `sprinkle_transactions`)
- **Add Kid** dialog — creates the kid profile, uploads an avatar to the `avatars` storage bucket, and links it to the parent
- **Tasks panel / Add Task** dialog — create tasks with points, frequency (daily, weekly, monthly, once), category, required level and validation type (parent approval, photo, timer, none)
- **Rewards panel** — define rewards kids can redeem
- **Notifications panel**

### 4. Kid dashboard (`/kid-dashboard`)
- **Tasks list** — the kid's assigned tasks, completed to earn sprinkles
- **Cupcake Buddy** — an animated cupcake mascot that rotates through encouraging suggestions
- **Daily Bonus** — a once-a-day sprinkle bonus logged in `activities`
- **AI Recommendations** and **Feeling Friend** (emotion check-in) cards — both are placeholders for now (see *Status* below)

### 5. Other pages
| Route | Purpose |
|---|---|
| `/` | Landing page with hero, feature cards and separate parent / kid login buttons |
| `/leaderboard` | Kids ranked by points and level |
| `/special-rewards` | Reward catalogue |
| `/daily-bonus` | Standalone daily bonus claim page |
| `/profile` | User profile |
| `/settings` | Preferences (notifications, etc.) via `user_settings` |

### Task categories
Tasks are grouped into sweet-themed categories (`src/types/rewards.ts`), each with its own gradient colour:

| Category | Meaning |
|---|---|
| Sparkle Scoops | Daily chores and responsibilities |
| Sweet Sprinkles | Acts of kindness and helping others |
| Brain Freeze Bonanza | Learning and education |
| Energy Explosion | Physical activity and exercise |
| Furry Friend Frostings | Pet care |
| Green Sprinkle Goals | Eco-friendly tasks |
| Colorful Creations | Arts and crafts |
| Sundae Specials | Special achievements and milestones |
| Friend Flavors | Social skills and friendship |

---

## Data model (Supabase)

Generated types live in `src/integrations/supabase/types.ts`. Main tables:

| Table | Holds |
|---|---|
| `profiles` | Every user (parent or kid): username, `is_parent`, birthdate, avatar, total points, level number / name / points required |
| `parent_kid_relationships` | Links each kid to their parent |
| `tasks` | Tasks a parent assigns: title, points, frequency, category, validation, multiplier, streak count |
| `task_history` | Record of completed tasks |
| `rewards` | Rewards parents define |
| `reward_redemptions` | Rewards kids have claimed |
| `sprinkle_transactions` | Sprinkle movements between users (gifts, trades) |
| `activities` | Kid activity log, including daily bonuses and mini-activities (cake decorating, ice-cream making, doll dressing) |
| `achievements` | Badges such as *kindness streak*, *joy multiplier*, *growth champion* |

There is also a database function `insert_default_tasks` that seeds starter tasks, and an `avatars` storage bucket.

> The app also reads and writes a `user_settings` table (in `useAuth` and `useSettings`), but that table does not appear in the generated types — the types may need regenerating.

No SQL migrations are checked into `supabase/`; only `config.toml` is present, so the schema lives in the hosted Supabase project.

---

## Project structure

```
src/
├── App.tsx                  # Providers: React Query, Router, Auth, Settings, Toaster
├── Routes.tsx               # Preview gate + route table
├── pages/                   # One file per route
├── components/
│   ├── home/                # Landing page sections
│   ├── signup/              # Parent info, children and plan forms
│   ├── dashboard/           # Parent dashboard panels and dialogs
│   │   └── kid/             # Kid dashboard pieces (tasks, Cupcake Buddy, daily bonus)
│   ├── ai/                  # AI recommendations and emotion detector (placeholders)
│   ├── layout/              # Header, bottom nav, main layout
│   ├── testing/             # Dev testing panel
│   └── ui/                  # shadcn/ui components + Logo
├── hooks/                   # Auth state/actions, settings, toast, mobile detection
├── integrations/supabase/   # Generated client and DB types
├── lib/                     # Supabase client, utils
├── types/                   # Task, Kid, Profile, transaction and category types
└── utils/                   # Auth error helpers
public/
└── sounds/                  # click, success, error and notification sound effects
```

---

## Status and known gaps

The app is a working prototype, last updated September 2025. Notable unfinished or rough areas:

- **AI features are stubs.** `AIRecommendations` returns static suggestions ("until the OpenAI integration is complete"), and `EmotionDetector` only simulates detection pending camera access.
- **`/daily-bonus` page** shows a success toast but has a `TODO` for the actual claim logic (the kid-dashboard `DailyBonus` component does write to the database).
- **Preview gate credentials are in client code** in a public repo, so anyone can read them. Fine for a demo; it should be removed or replaced before launch.
- **Kid auth** relies on synthetic `@sprinkler.local` emails and short PINs as passwords — worth reviewing for security and for Supabase's minimum password length.
- **Two Supabase clients** exist (`src/lib/supabase.ts`, untyped, and `src/integrations/supabase/client.ts`, typed); most code uses the untyped one.
- **`user_settings`** is missing from the generated types (see above).
- **Subscription plans** are captured at signup but there is no payment integration.
- `index.html` still has the default Lovable title and description.
