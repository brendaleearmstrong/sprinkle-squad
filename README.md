# 🧁 SprinkleSquad

**A gamified chore-and-rewards app for families.**

Parents (the *Squad*) set up tasks and rewards; kids (the *Sprinklers*) complete tasks to earn **sprinkles**, level up, and redeem rewards. Everything is themed around sweets — cupcakes, ice cream and sundaes — with bright gradients, playful animations and sound effects designed for young children.

> **Status:** working prototype. See [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) for a full walkthrough and [NEW_FEATURES.md](NEW_FEATURES.md) for the roadmap.

---

## Features

**For parents**
- Sign up with email and password, choose a plan (*Single Sprinkler* or *Family*) and add children in one flow
- Squad overview with quick stats for every linked kid
- Create tasks with points, frequency (daily, weekly, monthly, once), category, required level and validation type
- Define rewards, gift sprinkles, and see notifications

**For kids**
- Simple login with a username and PIN
- Personal task list for earning sprinkles
- **Cupcake Buddy** — an animated mascot with encouraging suggestions
- **Daily Bonus** — a once-a-day sprinkle reward
- Leaderboard, reward catalogue, and levels

**Sweet-themed task categories**

| Category | Focus |
|---|---|
| Sparkle Scoops | Daily chores |
| Sweet Sprinkles | Kindness and helping others |
| Brain Freeze Bonanza | Learning |
| Energy Explosion | Physical activity |
| Furry Friend Frostings | Pet care |
| Green Sprinkle Goals | Eco-friendly tasks |
| Colorful Creations | Arts and crafts |
| Sundae Specials | Special achievements |
| Friend Flavors | Social skills |

---

## Tech stack

| Layer | Tools |
|---|---|
| Build | Vite 5 (React SWC) |
| UI | React 18, TypeScript, Tailwind CSS, shadcn/ui (Radix), lucide-react |
| Animation | framer-motion |
| Routing | react-router-dom v6 |
| Data | @tanstack/react-query, supabase-js |
| Forms | react-hook-form, zod |
| Backend | Supabase (Postgres, Auth, Storage) |
| Charts | recharts |

---

## Getting started

**Requirements:** Node.js 18+ and npm.

```sh
git clone https://github.com/brendaleearmstrong/sprinkle-squad.git
cd sprinkle-squad
npm install
npm run dev
```

The dev server prints a local URL (by default `http://localhost:8080`).

| Script | What it does |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

The app connects to a hosted Supabase project; the client is configured in `src/integrations/supabase/client.ts`.

---

## Project structure

```
src/
├── App.tsx              # Providers: React Query, Router, Auth, Settings, Toaster
├── Routes.tsx           # Route table
├── pages/               # One file per route
├── components/
│   ├── home/            # Landing page sections
│   ├── signup/          # Parent signup forms
│   ├── dashboard/       # Parent dashboard (and kid/ for the kid dashboard)
│   ├── ai/              # AI recommendations and mood check-in (in progress)
│   ├── layout/          # Header, navigation, layout
│   └── ui/              # shadcn/ui components
├── hooks/               # Auth, settings, toast, mobile helpers
├── integrations/supabase/  # Supabase client and generated types
├── lib/  types/  utils/
public/sounds/           # Sound effects
```

---

## Data model

Main Supabase tables: `profiles`, `parent_kid_relationships`, `tasks`, `task_history`, `rewards`, `reward_redemptions`, `sprinkle_transactions`, `activities` and `achievements`, plus an `avatars` storage bucket. Details are in [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md#data-model-supabase).

---

## Roadmap

Highlights from [NEW_FEATURES.md](NEW_FEATURES.md):

1. **Foundations** — real authentication, safer kid sign-in, task approval flow, reward redemption, working daily bonus
2. **Engagement** — AI-powered Cupcake Buddy, mood check-in, achievements, levels, notifications, mini-activities
3. **Growth** — subscriptions, family sharing, parent insights, task templates, installable PWA, accessibility and translations

Because SprinkleSquad is built for children, privacy comes first: minimal data collection, parental consent, family-only visibility and row-level security.

---

## Deployment

`npm run build` produces a static site in `dist/` that can be hosted on any static host (Netlify, Vercel, Cloudflare Pages, etc.). Configure the host to serve `index.html` for all routes so client-side routing works.

---

## License

Released under the [MIT License](LICENSE).
