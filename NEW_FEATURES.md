# SprinkleSquad — New Features

_Last updated: 1 November 2026_

This is the proposed feature roadmap for SprinkleSquad. It starts by finishing what the prototype already sketches out, then adds the features a family chore-and-rewards app needs before launch. For how the app works today, see [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md).

Each feature lists what it does, why it matters, and the main pieces of work. Priorities: **P1** = needed before launch, **P2** = strong next step, **P3** = later.

---

## Phase 1 — Finish the foundations (P1)

### 1. Real authentication in place of the preview gate
- **What:** Remove the hard-coded "Coming Soon" login and rely on Supabase Auth alone. Keep a feature flag (environment variable) if a preview gate is still wanted for demos.
- **Why:** The preview credentials are readable by anyone in the public repo.
- **Work:** Delete the check in `ComingSoon.tsx` / `Routes.tsx`; add protected-route wrappers that redirect by role (parent vs kid).

### 2. Safer kid sign-in
- **What:** Kids keep a simple username + PIN, but sign-in goes through a Supabase Edge Function that checks the PIN against a hashed value and issues a session, rather than using `@sprinkler.local` emails with the PIN as a password.
- **Why:** Short PINs fall below Supabase's password rules and are easy to guess. Rate limiting and lock-out after failed attempts protect kids' accounts.
- **Work:** Edge Function, `kid_pins` table with hashed PINs, attempt counter, parent-side "reset PIN".

### 3. Working daily bonus
- **What:** One claim per kid per day, with a streak counter and a bigger bonus on streak milestones (7, 14, 30 days).
- **Work:** Finish the `TODO` in `pages/DailyBonus.tsx`; enforce "once a day" in the database (unique index on kid + date) instead of only in the UI.

### 4. Task approval flow
- **What:** When a kid marks a task done, it goes to the parent as "waiting for approval". The parent approves (sprinkles awarded) or sends it back with a note. Supports the existing validation types: parent check, photo proof, timer.
- **Work:** Status field on task completions, photo upload to Supabase Storage, approval queue in the parent dashboard, entries in `task_history`.

### 5. Reward redemption end to end
- **What:** Kids spend sprinkles on rewards from the catalogue; parents confirm when the reward is delivered.
- **Work:** Use the existing `rewards` and `reward_redemptions` tables; deduct points in a single database transaction so balances can't go negative.

### 6. Clean-up
- Regenerate Supabase types (adds the missing `user_settings` table) and use the single typed client everywhere.
- Check SQL migrations into `supabase/migrations` so the schema lives in the repo.
- Update the page title and description in `index.html`.

---

## Phase 2 — Engagement (P2)

### 7. Cupcake Buddy powered by AI
- **What:** Replace the static suggestions with short, age-appropriate encouragement and task ideas, based on the kid's level, recent tasks and streaks.
- **Guardrails:** Generated on the server through an Edge Function; no free-text chat for kids; output filtered and kept to a fixed tone; parents can switch it off.

### 8. Feeling Friend check-in (without a camera)
- **What:** Replace camera-based emotion detection with a tap-to-choose mood check-in (emoji faces). Parents see a gentle weekly mood trend.
- **Why:** Camera analysis of children's faces raises serious privacy and consent issues (GDPR, COPPA). A self-reported check-in delivers the same value without them.

### 9. Achievements and badges
- **What:** Turn on the existing `achievements` types — *Kindness Streak*, *Joy Multiplier*, *Growth Champion* — plus one badge per task category (for example, "Furry Friend Hero" for 20 pet-care tasks).
- **Work:** Award badges automatically from a database trigger or a scheduled function; add a badge shelf to the kid profile.

### 10. Levels with visible progress
- **What:** A progress bar to the next level, a level-up celebration (confetti and sound), and themed level names (Sprinkle Starter → Cupcake Captain → Sundae Superstar).

### 11. Mini-activities
- **What:** Build out the activity types already in the database — cake decorating, ice-cream making, dress-up — as short games unlocked with sprinkles or levels.

### 12. Notifications
- **What:** Parents are notified when a task is waiting for approval or a reward is requested; kids get reminders for tasks due today.
- **Work:** In-app notifications first, then web push. Respect the existing `notification_preference` setting (all / important / none).

---

## Phase 3 — Growth and business (P3)

### 13. Subscriptions and payments
- **What:** Charge for the *Single Sprinkler* and *Family* plans already chosen at signup, with a free trial.
- **Work:** Stripe Checkout and customer portal; plan limits (number of kids, custom rewards) enforced on the server.

### 14. Family sharing
- **What:** Invite a second parent or carer (for example, a grandparent) to the same squad with their own login and permissions.

### 15. Parent insights
- **What:** Weekly summary per kid — tasks completed by category, points earned, streaks, mood trend — with charts (recharts is already installed) and an optional email digest.

### 16. Task templates library
- **What:** Ready-made task packs by age group and category (morning routine, school-night routine, pet care) that parents can add in one tap.
- **Work:** Extend the existing `insert_default_tasks` function.

### 17. Installable app (PWA) and offline use
- **What:** "Add to home screen" on phones and tablets, an app icon, and offline viewing of today's tasks.

### 18. Accessibility and languages
- **What:** Screen-reader labels, reduced-motion option, larger text mode, and translations (starting with English, Norwegian and French).

---

## Privacy and safety (applies to every phase)

Because the users are children, every feature should:
- Collect the minimum personal data needed, with parental consent recorded at signup.
- Keep kids out of public or social features — the leaderboard shows only kids within the same family.
- Use Supabase row-level security so each family can only see its own data.
- Let parents export or delete their family's data.

---

## Suggested order

| Order | Feature | Priority |
|---|---|---|
| 1 | Real authentication, safer kid sign-in, clean-up | P1 |
| 2 | Task approval flow and reward redemption | P1 |
| 3 | Working daily bonus | P1 |
| 4 | Achievements, levels, notifications | P2 |
| 5 | AI Cupcake Buddy and Feeling Friend check-in | P2 |
| 6 | Mini-activities | P2 |
| 7 | Subscriptions, family sharing, parent insights | P3 |
| 8 | Templates, PWA, accessibility and languages | P3 |
