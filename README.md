# AlgoVerse

A premium, sign-up-free Data Structures & Algorithms learning platform. AlgoVerse pairs a clean,
Vercel/Linear-inspired interface with in-depth, hand-written algorithm content: intuition, dry
runs, complexity analysis, dual-language implementations, and curated practice problems — with no
authentication, no accounts, and no backend user state. Bookmarks, progress, recently viewed
items, and theme preference all live in the browser via `localStorage`.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Local Storage Model](#local-storage-model)
- [Development Scripts](#development-scripts)
- [Deployment Guide](#deployment-guide)

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui-style components, TanStack Query, Zustand, Shiki |
| Backend | NestJS, TypeScript, Prisma ORM |
| Database | PostgreSQL |
| Monorepo | Turborepo, npm workspaces |
| Tooling | Docker & Docker Compose, ESLint, Prettier |
| Deployment | Vercel (web), Railway (api + Postgres) |

## Folder Structure

```
AlgoVerse/
├── apps/
│   ├── web/                      # Next.js 14 App Router frontend
│   │   ├── src/
│   │   │   ├── app/              # Routes (pages, layouts, metadata)
│   │   │   ├── components/       # ui/ (primitives), layout/, algorithm/, category/, search/, progress/, home/, explorer/, shared/
│   │   │   ├── hooks/            # useDebounce, useProgressSummary, ...
│   │   │   ├── lib/
│   │   │   │   ├── api/          # fetch wrappers per resource (algorithms, categories, search, complexities)
│   │   │   │   ├── query/        # TanStack Query hooks + query key registry
│   │   │   │   ├── stores/       # Zustand + localStorage stores (bookmarks, progress, recently-viewed)
│   │   │   │   └── utils/        # cn(), icon registry
│   │   │   └── providers/        # ThemeProvider, QueryProvider
│   │   └── public/
│   └── api/                      # NestJS REST API
│       ├── src/
│       │   ├── modules/          # algorithms/, categories/, complexities/, search/ — each: controller → service → repository → dto →  mapper
│       │   ├── common/           # response envelope, exception filter, pagination DTO, shared exceptions
│       │   ├── config/           # typed configuration + env validation
│       │   └── database/         # PrismaService / PrismaModule
│       └── prisma/
│           ├── schema.prisma     # database schema
│           ├── seed.ts           # seed orchestrator
│           └── seed-data/        # categories, complexity references, 32 algorithms (4 batches)
├── packages/
│   └── shared-types/             # TypeScript contracts shared by api and web
├── docker-compose.yml
├── turbo.json
└── package.json                  # npm workspaces root
```

## Architecture Overview

**Monorepo.** Turborepo orchestrates three workspaces: `apps/web`, `apps/api`, and
`packages/shared-types`. The shared-types package defines every entity, API envelope, and
LocalStorage record shape once; both the API's DTOs/mappers and the web app's fetch layer and
Zustand stores import from it, so the contract between frontend and backend can never silently
drift apart.

**Backend layering.** Every API resource follows a strict, one-directional flow:

```
Controller  →  Service  →  Repository  →  Prisma (PostgreSQL)
   (HTTP)      (business       (data
                 rules)         access)
```

- **Controllers** only parse/validate HTTP input (via DTOs + `class-validator`) and delegate.
- **Services** contain business rules (pagination math, "not found" semantics) and call mappers to
  convert Prisma rows into the shared, API-facing shapes.
- **Repositories** are the only layer that touches `PrismaService` directly.
- A global `ResponseInterceptor` wraps every success response in `{ success: true, data, meta }`,
  and a global `HttpExceptionFilter` normalizes every error into
  `{ success: false, error: { code, message, details } }`, so the client never has to branch on
  per-endpoint response shapes.

**Frontend data flow.** Content-heavy, mostly-static pages (algorithm detail, category detail,
complexity reference, categories index) fetch directly from the API in async Server Components for
fast first paint and good SEO. Interactive, filter-heavy pages (Explorer, Search) are Client
Components using TanStack Query, so filtering/pagination feels instant without full page reloads.
All personalization — bookmarks, progress, recently viewed, theme — is Zustand state persisted to
`localStorage` via `zustand/middleware`'s `persist`; none of it ever touches the API.

## Getting Started

### Prerequisites

- Node.js ≥ 18.18
- npm ≥ 10
- Docker & Docker Compose (recommended, for PostgreSQL) — or a local/managed PostgreSQL instance

### 1. Install dependencies

```bash
npm install
```

This installs and links all three workspaces (`apps/web`, `apps/api`, `packages/shared-types`).

### 2. Configure environment variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

The defaults match the `docker-compose.yml` Postgres service, so no edits are required for local
development. See [Environment Variables](#environment-variables) for details.

### 3. Start PostgreSQL

```bash
docker compose up -d postgres
```

(Or point `DATABASE_URL` in `apps/api/.env` at any PostgreSQL 14+ instance you already have
running.)

### 4. Run database migrations and seed data

```bash
npm run db:generate   # generate the Prisma client
npm run db:migrate    # create tables from prisma/schema.prisma
npm run db:seed       # load categories, complexity references, and 32 algorithms
```

### 5. Start the dev servers

```bash
npm run dev
```

This runs both `apps/api` (http://localhost:4000/api) and `apps/web` (http://localhost:3000) in
parallel via Turborepo. Visit **http://localhost:3000**.

## Environment Variables

### `apps/api/.env`

| Variable | Description | Default |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma | `postgresql://algoverse:algoverse@localhost:5432/algoverse?schema=public` |
| `PORT` | Port the NestJS server listens on | `4000` |
| `NODE_ENV` | `development` \| `production` \| `test` | `development` |
| `CORS_ORIGIN` | Comma-separated list of origins allowed to call the API | `http://localhost:3000` |

### `apps/web/.env.local`

| Variable | Description | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the AlgoVerse API, including the `/api` prefix | `http://localhost:4000/api` |

### `docker-compose.yml` (root `.env`, optional)

| Variable | Description | Default |
| --- | --- | --- |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | Postgres container credentials | `algoverse` / `algoverse` / `algoverse` |
| `POSTGRES_PORT` | Host port mapped to Postgres | `5432` |
| `API_PORT` | Host port mapped to the API container | `4000` |
| `WEB_PORT` | Host port mapped to the web container | `3000` |
| `CORS_ORIGIN` | Passed through to the API container | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Passed through to the web container | `http://localhost:4000/api` |

## Database Schema

Defined in [`apps/api/prisma/schema.prisma`](apps/api/prisma/schema.prisma).

| Model | Purpose |
| --- | --- |
| `Category` | The 28 DSA categories (Arrays, Graphs, Dynamic Programming, ...) |
| `Algorithm` | One row per algorithm — every section of the algorithm page lives here (introduction, problem statement, intuition, step-by-step array, dry run, complexity fields, advantages/disadvantages/applications/common mistakes arrays, tags, C++/Python source) |
| `RelatedAlgorithm` | Explicit join table for the self-referential many-to-many "related algorithms" graph |
| `PracticeProblem` | Curated external practice problems per algorithm (title, URL, platform, difficulty) |
| `ExternalLink` | General reference links per algorithm (LeetCode/Codeforces/CSES/AtCoder) |
| `ComplexityReference` | Standalone Big-O glossary powering the Complexity Reference page, independent of any single algorithm |

Relationships: `Category 1—N Algorithm`; `Algorithm 1—N PracticeProblem`; `Algorithm 1—N
ExternalLink`; `Algorithm N—M Algorithm` (via `RelatedAlgorithm`).

## API Documentation

Base URL: `http://localhost:4000/api`.

Every response is wrapped as:

```jsonc
// success
{ "success": true, "data": /* payload */, "meta": { "page": 1, "pageSize": 20, "total": 32, "totalPages": 3 } }

// error
{ "success": false, "error": { "code": "NOT_FOUND", "message": "Algorithm with identifier \"foo\" was not found" } }
```

| Method | Path | Description | Query Params |
| --- | --- | --- | --- |
| `GET` | `/algorithms` | Paginated, filterable algorithm list | `page`, `pageSize`, `category`, `difficulty`, `tag` |
| `GET` | `/algorithms/:slug` | Full algorithm detail | — |
| `GET` | `/categories` | All categories with algorithm counts | — |
| `GET` | `/categories/:slug` | Single category | — |
| `GET` | `/complexities` | Big-O complexity glossary | — |
| `GET` | `/search` | Full-text-ish search across name/summary/tags | `q`, `category`, `difficulty`, `tag`, `complexity`, `page`, `pageSize` |
| `GET` | `/health` | Liveness check | — |

## Local Storage Model

No authentication exists anywhere in this app. All personalization is stored client-side under
these keys (see `packages/shared-types/src/local.ts` for the exact shapes):

| Key | Store | Contents |
| --- | --- | --- |
| `algoverse:bookmarks` | `useBookmarksStore` | `BookmarkEntry[]` |
| `algoverse:progress` | `useProgressStore` | `ProgressEntry[]` (completed algorithms) |
| `algoverse:recently-viewed` | `useRecentlyViewedStore` | `RecentlyViewedEntry[]` (max 12, most recent first) |
| `theme` | `next-themes` | `"light" \| "dark" \| "system"` |

## Development Scripts

Run from the repo root (Turborepo fans these out to the relevant workspace):

```bash
npm run dev          # start api + web in parallel
npm run build         # production build of every workspace
npm run lint           # lint every workspace
npm run type-check    # tsc --noEmit across every workspace
npm run format         # prettier --write

npm run db:generate    # prisma generate
npm run db:migrate     # prisma migrate dev
npm run db:seed        # run the seed script
npm run db:studio      # open Prisma Studio
```

## Deployment Guide

### Backend + Database → Railway

1. Create a new Railway project and add a **PostgreSQL** plugin.
2. Add a service from this repo, set its root/build context to the repository root, and point it
   at `apps/api/Dockerfile` (Railway's Dockerfile builder supports a custom Dockerfile path).
3. Set environment variables on the service: `DATABASE_URL` (Railway injects this automatically
   when you reference the Postgres plugin), `PORT=4000`, `NODE_ENV=production`, and `CORS_ORIGIN`
   set to your deployed web app's URL.
4. After the first deploy, run migrations and seed once via Railway's shell:
   ```bash
   npx prisma migrate deploy
   npx ts-node --transpile-only prisma/seed.ts
   ```
5. Note the public URL Railway assigns the API service (e.g. `https://algoverse-api.up.railway.app`) —
   you'll need it, with `/api` appended, for the frontend's `NEXT_PUBLIC_API_URL`.

### Frontend → Vercel

1. Import this repository into Vercel as a new project.
2. Set the **Root Directory** to `apps/web`.
3. Framework preset: Next.js (auto-detected). Build command and install command can stay at their
   Vercel defaults since `apps/web/package.json` defines standard `build`/`dev` scripts; Vercel
   will install the whole npm workspace from the repo root automatically.
4. Add the environment variable `NEXT_PUBLIC_API_URL` pointing to your deployed Railway API URL,
   including the `/api` suffix (e.g. `https://algoverse-api.up.railway.app/api`).
5. Deploy. On subsequent pushes to your default branch, Vercel redeploys automatically.

### Local production build (sanity check before deploying)

```bash
npm run build
npm run start --workspace=apps/api &
npm run start --workspace=apps/web
```

### Docker Compose (all three services locally)

```bash
docker compose up --build
```

This builds and runs PostgreSQL, the API, and the web app together, using the images defined by
`apps/api/Dockerfile` and `apps/web/Dockerfile`. Run the migration + seed commands once against the
containerized database the same way as in step 4 of local setup, targeting the container's exposed
Postgres port.
