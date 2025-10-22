# LP Template with Next.js & Cloudflare

This is a template project for building landing pages using Next.js, deployed on Cloudflare Workers.

## ✨ Features

- **Waitlist Form**: A form to register users to a waitlist.

## 🛠️ Tech Stack

### Frameworks & Libraries

- [Next.js](https://nextjs.org/) - React framework for production
- [React Hook Form](https://react-hook-form.com/) - Performant, flexible and extensible forms with easy-to-use validation.
- [Zod](https://zod.dev/) - TypeScript-first schema validation with static type inference

### UI

- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
- [Sonner](https://sonner.emilkowal.ski/) - An opinionated toast component for React.

### Backend & Database

- [Cloudflare Workers](https://workers.cloudflare.com/) - Deployment Platform
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM that feels like writing SQL
- [Cloudflare D1](https://developers.cloudflare.com/d1/) - Serverless SQL Database

### Language & Runtime

- [TypeScript](https://www.typescriptlang.org/)
- [Bun](https://bun.sh/)

## 📂 Directory Structure

```
src/
├── app/                # Next.js App Router
├── actions/            # Server Actions
├── components/         # UI components
├── drizzle/            # Drizzle ORM (schema, migrations)
├── lib/                # Utility functions
├── types/              # TypeScript types
└── zod/                # Zod validation schemas
```

## 🚀 Getting Started

First, install the dependencies:

```bash
bun install
```

Next, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Database Setup (Cloudflare D1)

This project uses Cloudflare D1 as its database. Follow these steps to set it up.

### 1. Create a D1 Database

Choose a name for your database and create it using the following command. Replace `<YOUR_DATABASE_NAME>` with the name you have chosen.

```bash
npx wrangler d1 create <YOUR_DATABASE_NAME>
```

This command will create the database and update your `wrangler.jsonc` file with the connection details.

### 2. Configure `wrangler.jsonc`

After the file is updated, you need to configure the database binding.

1.  **Add migrations path (Required):** Add the `migrations_dir` property to point to your migration files.
2.  **Set a binding name (Optional):** Change the default `"binding": "<YOUR_DATABASE_BINDING_NAME>"` to a name of your choice (e.g., `"binding": "MY_DB"`). This binding name will be used to access the database from your code. If you are fine with the default name, this change is not required.

Your configuration should look like this:

```jsonc:wrangler.jsonc
"d1_databases": [
  {
    "binding": "<YOUR_DATABASE_BINDING_NAME>",
    "database_name": "<YOUR_DATABASE_NAME>",
    "database_id": "...",
    "migrations_dir": "src/drizzle/migrations"
  }
]
```

### 3. Update Type Definitions

Next, manually update the Cloudflare environment type definitions in `cloudflare-env.d.ts`.
Add the `<YOUR_DATABASE_BINDING_NAME>` you set in `wrangler.jsonc` to the `Cloudflare.Env` interface.

```typescript:cloudflare-env.d.ts
declare namespace Cloudflare {
  interface Env {
    // ... other bindings
    <YOUR_DATABASE_BINDING_NAME>: D1Database;
  }
}
```

> **Warning**
> The `cloudflare-env.d.ts` file is managed by Wrangler. Your manual changes will be overwritten if you run `bunx wrangler types`. It is highly recommended to use this command instead of editing the file manually.

### 4. Apply Migrations

Finally, apply the database schema migrations.
Use the database name you created in Step 1.

First, apply to the local database.

```bash
npx wrangler d1 migrations apply <YOUR_DATABASE_NAME> --local
```

Next, apply to the remote database.

```bash
npx wrangler d1 migrations apply <YOUR_DATABASE_NAME>
```
