# Next.js & Cloudflare を利用した LP テンプレート

これは Next.js を使用して構築し、Cloudflare Workers にデプロイするためのランディングページ用テンプレートプロジェクトです。

## ✨ 機能

- **ウェイトリストフォーム**: ユーザーをウェイトリストに登録するためのフォームです。

## 🛠️ 技術スタック

### フレームワーク & ライブラリ

- [Next.js](https://nextjs.org/) - 本番環境向けの React フレームワーク
- [React Hook Form](https://react-hook-form.com/) - 使いやすいバリデーション機能を備えた、高パフォーマンスで柔軟かつ拡張可能なフォーム
- [Zod](https://zod.dev/) - 静的型推論を備えた TypeScript ファーストのスキーマバリデーション

### UI

- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストの CSS フレームワーク
- [shadcn/ui](https://ui.shadcn.com/) - Radix UI と Tailwind CSS を使用して構築された再利用可能なコンポーネント
- [Sonner](https://sonner.emilkowal.ski/) - React 用のトーストコンポーネント

### バックエンド & データベース

- [Cloudflare Workers](https://workers.cloudflare.com/) - デプロイメントプラットフォーム
- [Drizzle ORM](https://orm.drizzle.team/) - SQL を書いているかのような感覚で使える TypeScript ORM
- [Cloudflare D1](https://developers.cloudflare.com/d1/) - サーバーレス SQL データベース

### 言語 & ランタイム

- [TypeScript](https://www.typescriptlang.org/)
- [Bun](https://bun.sh/)

## 📂 ディレクトリ構成

```
src/
├── app/                # Next.js App Router
├── actions/            # Server Actions
├── components/         # UIコンポーネント
├── drizzle/            # Drizzle ORM (スキーマ, マイグレーション)
├── lib/                # ユーティリティ関数
├── types/              # TypeScriptの型定義
└── zod/                # Zodバリデーションスキーマ
```

## 🚀 はじめに

まず、依存関係をインストールします:

```bash
bun install
```

次に、開発サーバーを起動します:

```bash
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

## 📦 データベースのセットアップ (Cloudflare D1)

このプロジェクトではデータベースとして Cloudflare D1 を使用します。以下の手順でセットアップしてください。

### 1. D1 データベースの作成

データベースの名前を任意に決めて、以下のコマンドで作成します。`<あなたのデータベース名>` の部分を、決めた名前に置き換えてください。

```bash
npx wrangler d1 create <あなたのデータベース名>
```

このコマンドでデータベースが作成され、`wrangler.jsonc`ファイルに接続情報が追記されます。

### 2. `wrangler.jsonc` の設定

ファイルが更新された後、データベースのバインディングを設定します。

1.  **マイグレーションパスを追加（必須）:** `migrations_dir` プロパティを追加して、マイグレーションファイルを指定します。
2.  **バインディング名を設定（任意）:** デフォルトの `"binding": "<あなたのデータベースバインディング名>"` を任意の名前に変更します (例: `"binding": "MY_DB"`)。この名前でコードからデータベースにアクセスします。デフォルトの名前で問題ない場合は、この変更は必須ではありません。

設定は以下のようになります:

```jsonc:wrangler.jsonc
"d1_databases": [
  {
    "binding": "<あなたのデータベースバインディング名>",
    "database_name": "<あなたのデータベース名>",
    "database_id": "...",
    "migrations_dir": "src/drizzle/migrations"
  }
]
```

### 3. 型定義の更新

次に、`cloudflare-env.d.ts` の型定義を手動で更新します。
`wrangler.jsonc` で設定した `<あなたのデータベースバインディング名>` を `Cloudflare.Env` インターフェースに追加してください。

```typescript:cloudflare-env.d.ts
declare namespace Cloudflare {
  interface Env {
    // ... 他に設定したバインディング
    <あなたのデータベースバインディング名>: D1Database;
  }
}
```

> **警告** > `cloudflare-env.d.ts` ファイルは Wrangler によって管理されています。手動で加えた変更は、将来 `bunx wrangler types` を実行すると上書きされます。このステップは、手動で編集する代わりにこのコマンドを使用することを強く推奨します。

### 4. マイグレーションの適用

まず、データベーススキーマのマイグレーションを適用します。
ステップ 1 で作成したデータベース名を使用してください。

まず、ローカルのデータベースに適用します。

```bash
npx wrangler d1 migrations apply <あなたのデータベース名> --local
```

次に、リモートのデータベースに適用します。

```bash
npx wrangler d1 migrations apply <あなたのデータベース名>
```

### 5. データベース接続コードの更新

`src/drizzle/db.ts` ファイルを更新して、`wrangler.jsonc` で設定したバインディング名でデータベースに接続するようにします。

`env.waitlist_lp_template_db` の `waitlist_lp_template_db` を、`<あなたのデータベースバインディング名>`に置き換えてください。

**変更前:** `src/drizzle/db.ts`

```typescript
// ...
export const getDb = async () => {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.waitlist_lp_template_db);
};
// ...
```

**変更後 (例):** `src/drizzle/db.ts`

```typescript
// ...
export const getDb = async () => {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.<あなたのデータベースバインディング名>);
};
// ...
```
