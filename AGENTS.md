# Next.js Development Rules

## Technology Stack

### Core Frameworks & Language

- Bun
- TypeScript
- Next.js

### UI/Frontend

- Tailwind CSS
- shadcn/ui

### Backend & Database

- Hono
- Drizzle
- Cloudflare D1
- Cloudflare Workers

### Tooling & Services

- ESLint
- Prettier
- date-fns
- date-fns-tz

### Authentication & Payments

- Better Auth
- Stripe

### Forms & Validation

- React Hook Form
- Zod

### Email

- Resend

## File Length and Structure

Never allow a file to exceed 500 lines.
If a file approaches 400 lines, break it up immediately.
Treat 1000 lines as unacceptable, even temporarily.
Use folders and naming conventions to keep small files logically grouped.

## OOP First

Every functionality should be in a dedicated class, struct, or protocol, even if it's small.
Favor composition over inheritance, but always use object-oriented thinking.
Code must be built for reuse, not just to "make it work."

## Single Responsibility Principle

Every file, class, and function should do one thing only.
If it has multiple responsibilities, split it immediately.
Each view, manager, or utility should be laser-focused on one concern.

## Modular Design

Code should connect like Lego - interchangeable, testable, and isolated.
Ask: "Can I reuse this class in a different screen or project?" If not, refactor it.
Reduce tight coupling between components. Favor dependency injection or protocols.

## Responsibility Separation Patterns

Use the following directory structure for logic separation:
Routing & Pages -> app/ (Next.js App Router)
UI logic -> hooks/, components/
Business logic -> utils/
State management -> providers/
Never mix view logic and business logic directly in page components.
Use dependency injection and clear separation of concerns to avoid tight coupling.

## Function and Class Size

Keep functions under 30-40 lines.
If a class is over 200 lines, assess splitting into smaller helper classes.

## Naming and Readability

All class, method, and variable names must be descriptive and intention-revealing.
Avoid vague names like data, info, helper, or temp.

## Scalability Mindset

Always code as if someone else will scale this.
Include extension points (e.g., protocol conformance, dependency injection) from day one.

## Avoid God Classes

Never let one file or class hold everything (e.g., massive Screen, Hook, or Utils).
Split into app/, hooks/, utils/, providers/, etc.

## Project Structure

```
src/
├── app/                   # Next.js App Router: pages, layouts, route handlers
│   ├── (auth)/            # Route group for authentication pages (e.g., login, register)
│   │   └── login/
│   │       └── page.tsx
│   ├── (marketing)/       # Route group for marketing pages (e.g., landing, pricing)
│   │   └── page.tsx
│   ├── (app)/             # Route group for authenticated app pages
│   │   └── dashboard/
│   │       └── page.tsx
│   └── api/               # API routes (Hono on Cloudflare Workers)
│       └── route.ts
├── actions/               # Server Actions for data mutations
├── components/            # Reusable UI components
│   ├── feature/           # Feature-specific components (e.g., WaitlistForm, UserProfile)
│   └── ui/                # Generic, reusable UI components from shadcn/ui (e.g., Button, Input)
├── constants/             # Site-wide constants and configuration
├── drizzle/               # Drizzle ORM: database client, schema, migrations
│   ├── migrations/        # Database migration files
│   ├── schema/            # Drizzle schema definitions
│   └── db.ts              # Drizzle client instance
├── hooks/                 # Custom React hooks (e.g., useAuth, use-form-state)
├── lib/                   # Business logic, helpers, and external service clients
│   ├── auth/              # Authentication logic (e.g., Better Auth integration)
│   ├── db/                # Database-related utilities and queries
│   ├── email/             # Email sending logic (e.g., Resend integration)
│   ├── stripe/            # Stripe integration logic
│   ├── utils.ts           # Utility functions (e.g., clsx, tailwind-merge)
│   └── date.ts            # Date utility functions
├── providers/             # React Context providers (e.g., ThemeProvider, AuthProvider)
├── types/                 # TypeScript type definitions
└── zod/                   # Zod validation schemas
```

## File Naming Conventions

App Router

- lowercase, special names
- page.tsx, layout.tsx, template.tsx, loading.tsx, error.tsx

Components

- PascalCase. Suffix with `.client.tsx` or `.server.tsx` if needed for clarity.
- UserProfile.tsx, ProductCard.tsx, SignInButton.client.tsx

Hooks

- camelCase, starting with 'use'
- useAuth.ts, useApi.ts, useLocalStorage.ts

Types

- feature name + purpose
- auth.ts, user.ts, api.ts

Zod Schemas (Validation)

- camelCase. Suffix with `.schema.ts`. Located in `src/zod/`. Schema objects should be camelCase and suffixed with `Schema`.
- login.schema.ts, updateUser.schema.ts (defines `loginSchema`, `updateUserSchema`)

Database Schemas (Drizzle)

- camelCase. Suffix with `Schema.ts`. Located in `src/drizzle/schema/`. Tables should be plural camelCase and suffixed with `Table`. Tables should be defined in the schema file.
- userSchema.ts, productSchema.ts (defines `usersTable`, `productsTable` tables)

Utils/Lib

- camelCase. Group by feature.
- authUtils.ts, validation.ts, dateFormatting.ts

Providers

- PascalCase + Provider
- AuthProvider.tsx, ThemeProvider.tsx

Actions

- camelCase. Suffix with `.actions.ts`
- user.ts, product.ts

API Routes

- route.ts inside `app/api/...` directories.

## Server Action Rules

Server Actions must only be used for data mutations.
Do not use them for data fetching (queries) or GET requests.
Their primary purpose is handling form submissions and state updates via startTransition.

## Rules for using Cursor's Plan feature

- First, propose a branch name
- Do not perform git operations

## Commit Message Rules

Please create commit messages according to the following example.
Also, write in Japanese.

```
ユーザー認証時のセッション管理バグを修正

- ログイン後のセッションが正しく保持されない問題を解決
- セキュリティトークンの有効期限チェックを追加
```
