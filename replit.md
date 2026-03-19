# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the AngelHeart AI emotional intelligence platform.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Animations**: Framer Motion

## Project: AngelHeart AI

An emotional intelligence platform with:
- User auth (session-based, password hashing with SHA-256 + salt)
- Mood tracking (mood, sleep, stress, workload)
- Burnout prediction engine
- Emotional health score (0–100)
- Emotion trigger detection
- AI recommendations
- AI emotional support chat (empathetic responses)
- Voice journal (Web Speech API + emotional tone analysis)
- Weekly emotional report with charts
- Task manager (title, deadline, priority, completion)
- Sidebar navigation layout

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   │   └── src/
│   │       ├── lib/
│   │       │   └── aiEngine.ts  # Burnout calc, health score, recommendations
│   │       └── routes/
│   │           ├── auth.ts      # Signup, login, logout, me
│   │           ├── mood.ts      # Mood entries + dashboard
│   │           ├── tasks.ts     # Task CRUD
│   │           ├── voice.ts     # Voice journal
│   │           ├── chat.ts      # AI chat
│   │           └── reports.ts   # Weekly reports
│   └── angelheart-ai/      # React + Vite frontend
│       └── src/
│           ├── pages/      # login, dashboard, mood, chat, tasks, voice, reports
│           └── components/
│               └── layout/ # Sidebar + MainLayout
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/
│       └── src/schema/     # users, mood_data, tasks, voice_journal, chat_messages
└── ...
```

## Database Tables

- `users` — id, username, password_hash, created_at
- `mood_data` — id, user_id, mood, sleep_hours, stress_level, workload_level, notes, health_score, burnout_risk, created_at
- `tasks` — id, user_id, title, description, deadline, priority, completed, created_at
- `voice_journal` — id, user_id, transcript, emotional_tone, audio_data, created_at
- `chat_messages` — id, user_id, role, content, created_at

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API types from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes

## Auth

Session-based auth using `express-session`. Sessions stored server-side. Passwords hashed with SHA-256 + salt. `credentials: "include"` set on all fetch requests.
