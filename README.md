# Next.js & Cloudflare を利用した Waitlist LP テンプレート

これは Next.js を使用して構築し、Cloudflare Workers にデプロイするためのランディングページ用テンプレートプロジェクトです。

## 機能

- **ウェイトリストフォーム**: ユーザーをウェイトリストに登録するためのフォームです。
- **サンクスページ**: 登録成功後に表示される感謝のページです。
- **SNS 共有機能**: サンクスページから X（旧 Twitter）でサービスを共有できます。

## 技術スタック

### フレームワーク & ライブラリ

- [Next.js](https://nextjs.org/) - 本番環境向けの React フレームワーク
- [React Hook Form](https://react-hook-form.com/) - 使いやすいバリデーション機能を備えた、高パフォーマンスで柔軟かつ拡張可能なフォーム
- [Zod](https://zod.dev/) - 静的型推論を備えた TypeScript ファーストのスキーマバリデーション
- [react-share](https://github.com/nygardk/react-share) - SNS 共有ボタンを簡単に実装するための React コンポーネント

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

## ディレクトリ構成

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

## はじめに

まず、依存関係をインストールします:

```bash
bun install
```

次に、開発サーバーを起動します:

```bash
bun run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

## データベースのセットアップ (Cloudflare D1)

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

次に、`cloudflare-env.d.ts` の型定義を設定します。
`wrangler.jsonc` で設定した `<あなたのデータベースバインディング名>` を `Cloudflare.Env` インターフェースに追加してください。

```typescript:cloudflare-env.d.ts
declare namespace Cloudflare {
  interface Env {
    // ... 他に設定したバインディング
    <あなたのデータベースバインディング名>: D1Database;
  }
}
```

> **警告** > `cloudflare-env.d.ts` ファイルは Wrangler によって管理されています。
> 手動で加えた変更は、将来 `bunx wrangler types` を実行すると上書きされます。

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

## メタデータの設定

サイト全体のメタデータ（タイトル、説明、OGP タグなど）は `src/app/layout.tsx` ファイルで設定します。
プロジェクトに合わせてこのファイルを編集してください。

```typescript:src/app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: "%s | あなたのアプリ名",
    default: "あなたのアプリ名",
  },
  metadataBase: new URL(getBaseUrl()),
  description: "あなたのアプリの説明",
  keywords: ["キーワード1", "キーワード2"],
  openGraph: {
    title: "あなたのアプリ名",
    description: "あなたのアプリの説明",
    type: "website",
    locale: "ja_JP",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "あなたのアプリ名",
    description: "あなたのアプリの説明",
    images: ["/opengraph-image.png"],
  },
};
```

### 主な設定項目

- **title**: サイトのタイトルです。`template` を使うと、各ページで設定したタイトルに共通の接尾辞を追加できます。
- **description**: サイトの説明文です。検索エンジンや SNS で表示されます。
- **openGraph**: Facebook や LINE などで共有された際に表示される情報です。
- **twitter**: X (旧 Twitter) で共有された際に表示される情報です。
- **images**: OGP 画像のパスです。`app` ディレクトリに `opengraph-image.png` や `opengraph-image.jpg` などの画像を配置してください。`metadataBase` を基準とした絶対パスになります。

`getBaseUrl()` は `src/lib/url-utils.ts` で定義されており、開発環境と本番環境で自動的に適切な URL を返します。

## ユーティリティの設定

### ベース URL の自動判別 (`src/lib/url-utils.ts`)

`src/lib/url-utils.ts` に含まれる `getBaseUrl` 関数は、アプリケーションのベース URL を環境に応じて自動的に返却します。これは、`src/app/layout.tsx` で `metadataBase` を設定する際に重要です。

#### 関数の仕組み

- **ローカル開発環境（サーバーサイド）**: `http://localhost:3000` を返します。
- **Cloudflare Workers 本番環境（サーバーサイド）**: `CF_PAGES_URL` という環境変数から本番 URL を読み取ります。この変数は、デプロイ後に手動で設定する必要があります。
- **クライアントサイド**: ブラウザ環境で実行される際は、`window.location.origin` を使用して現在の URL を取得します。

これにより、開発時と本番時でコードを書き換えることなく、常に正しい URL がメタデータに設定されます。

#### 本番環境の URL 設定

このプロジェクトを Cloudflare Workers にデプロイした後、本番環境で正しい OGP 画像などを表示するためには、アプリケーションの公開 URL を `CF_PAGES_URL` という名前の環境変数として設定する必要があります。

Wrangler CLI を使って、以下のコマンドで設定できます。

```bash
npx wrangler secret put CF_PAGES_URL
```

## ページ生成

このテンプレートには、簡単な質問に答えるだけでウェイティングリスト用のランディングページを自動生成する機能が含まれています。

### 使い方

1.  Cursor のチャットパネルを開きます。
2.  `/generate-waitlist-page` と入力し、コマンドを実行します。
3.  以下の質問に順番に答えてください:
    - アプリ名（日本語）
    - 英語アプリ名
    - アプリの目的・機能
    - ターゲットユーザー
    - 主要な価値提案
    - 特筆すべき機能や特徴

回答が完了すると、`src/app/(marketing)/page.tsx` が提供された情報に基づいて自動的に更新されます。

## X(旧 Twitter)ポスト生成

簡単な質問に答えるだけで、サービスの告知やアップデート情報など、様々な用途に合わせた X の投稿文を自動で 3 パターン生成する機能です。

### 使い方

1.  Cursor のチャットパネルを開きます。
2.  `/generate-x-post` と入力し、コマンドを実行します。
3.  以下の質問に順番に答えてください:
    - 投稿の主題
    - 最も伝えたいこと（アピールポイント）
    - 投稿に含める URL
    - トーン＆マナー（例：カジュアル、丁寧、専門的など）

回答が完了すると、提供された情報に基づいた 3 パターンの投稿文が生成されます。

## note 記事生成

サービスの魅力を伝え、ウェイティングリストへの登録を促進するための note 記事を自動生成する機能です。
このコマンドはテンプレートとして「絵本コンテンツ生成アプリケーション」のプロモーション記事を生成します。必要に応じて `.cursor/commands/generate-note-post.md` の内容を書き換えて、ご自身のサービスに合わせてご利用ください。

### 使い方

1.  Cursor のチャットパネルを開きます。
2.  `/generate-note-post` と入力し、コマンドを実行します。

コマンドを実行すると、`generate-note-post.md` の内容に基づいた note 記事が生成されます。
