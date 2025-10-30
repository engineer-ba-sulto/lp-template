# Next.js & Cloudflare を利用した Waitlist LP テンプレート

👉 以下のドキュメントを参照してください。

- セットアップ手順（途中）: [docs/setup.md](docs/setup.md)
- デプロイ手順（途中）: [docs/deploy.md](docs/deploy.md)

これは Next.js を使用して構築し、Cloudflare Workers にデプロイするためのランディングページ用テンプレートプロジェクトです。

## 機能

- **ウェイトリストフォーム**: ユーザーをウェイトリストに登録するためのフォームです。
- **サンクスページ**: 登録成功後に表示される感謝のページです。
- **SNS 共有機能**: サンクスページから X（旧 Twitter）でサービスを共有できます。
- **ユーザー認証**: メールアドレスとパスワードによるログイン・サインアップ機能
- **ダッシュボード**: 認証されたユーザー専用のダッシュボードページ
- **管理者ダッシュボード**: ウェイトリストデータの管理・確認が可能な管理者専用ページ
- **メールアドレス制限**: 管理者権限を特定のメールアドレスに制限する機能

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

### 認証

- [Better Auth](https://www.better-auth.com/) - モダンな認証ライブラリ

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

## 環境変数の設定

このプロジェクトでは以下の環境変数を使用します。必要に応じて設定してください。

### 開発環境での設定

開発環境では、プロジェクトルートに `.env.local` ファイルを作成して環境変数を設定します。

```bash
# .env.local
GOOGLE_ANALYTICS_ID=your_google_analytics_id
NEXT_PUBLIC_ALLOWED_EMAIL_ADDRESSES=admin@example.com,manager@example.com
```

### 本番環境での設定（Cloudflare Workers）

本番環境では、Wrangler CLI を使用して環境変数を設定します。

#### 1. 公開環境変数の設定

```bash
# wrangler.jsonc の vars セクションに追加
npx wrangler secret put GOOGLE_ANALYTICS_ID
```

#### 2. 秘密環境変数の設定

```bash
# 本番URLの設定（OGP画像などで使用）
npx wrangler secret put CF_PAGES_URL

# 管理者メールアドレスの設定（管理者権限制御用）
npx wrangler secret put NEXT_PUBLIC_ALLOWED_EMAIL_ADDRESSES
```

### 環境変数の一覧

| 変数名                                | 説明                                                   | 必須             | デフォルト値            |
| ------------------------------------- | ------------------------------------------------------ | ---------------- | ----------------------- |
| `GOOGLE_ANALYTICS_ID`                 | Google Analytics のトラッキング ID                     | 任意             | 空文字列                |
| `CF_PAGES_URL`                        | 本番環境の URL（OGP 画像などで使用）                   | 本番環境では必須 | `http://localhost:3000` |
| `NEXT_PUBLIC_ALLOWED_EMAIL_ADDRESSES` | 管理者アクセスを許可するメールアドレス（カンマ区切り） | 任意             | 空文字列（制限なし）    |

### 環境変数の使用例

```typescript
// Google Analytics の設定例
<GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || ""} />;

// ベースURLの取得例
const baseUrl = await getBaseUrl(); // 環境に応じて自動判別

// メールアドレス制限の設定例
const allowedEmails =
  process.env.NEXT_PUBLIC_ALLOWED_EMAIL_ADDRESSES?.split(",") || [];
```

## 認証機能の設定

このプロジェクトでは Better Auth を使用してユーザー認証機能を提供しています。認証機能は自動的にセットアップされており、追加の設定は不要です。

### 認証機能の概要

- **ログイン**: メールアドレスとパスワードによる認証
- **サインアップ**: 新規ユーザー登録
- **セッション管理**: 自動的なセッション管理とセキュリティ
- **ルート保護**: 認証が必要なページの自動リダイレクト

### 認証が必要なページ

- `/dashboard` - 一般ユーザー用ダッシュボードページ（認証が必要）
- `/admin-dashboard` - 管理者用ダッシュボードページ（認証 + 管理者権限が必要）
- 未認証のユーザーは自動的に `/login` にリダイレクトされます
- 一般ユーザーが管理者ページにアクセスした場合は `/dashboard` にリダイレクトされます

### 認証フロー

1. ユーザーが `/signup` でアカウントを作成
2. 作成後、自動的にログイン状態になる
3. メールアドレスに基づいて適切なダッシュボードにリダイレクト
   - 管理者メールアドレス: `/admin-dashboard` にリダイレクト
   - 一般ユーザー: `/dashboard` にリダイレクト
4. ログアウト後は `/login` で再ログイン

### 管理者権限の設定

管理者権限は `NEXT_PUBLIC_ALLOWED_EMAIL_ADDRESSES` 環境変数で制御されます。

#### 開発環境での設定

```bash
# .env.local
NEXT_PUBLIC_ALLOWED_EMAIL_ADDRESSES=admin@example.com,manager@example.com
```

#### 本番環境での設定

```bash
# 公開環境変数として設定
npx wrangler secret put NEXT_PUBLIC_ALLOWED_EMAIL_ADDRESSES
```

#### 管理者権限の動作

- 環境変数が設定されていない場合: すべてのユーザーが一般ユーザーとして扱われる
- 環境変数が設定されている場合: 指定されたメールアドレスのみが管理者権限を持つ
- 管理者は `/admin-dashboard` でウェイトリストデータの管理が可能
- 一般ユーザーは `/dashboard` のみアクセス可能

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

> **注意** > 認証機能を使用する場合、マイグレーションには以下のテーブルが含まれます：
>
> - `users` - ユーザー情報
> - `sessions` - セッション管理
> - `accounts` - アカウント情報
> - `verifications` - メール認証など

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

> **注意** > 環境変数の設定については、上記の「環境変数の設定」セクションも参照してください。

## 認証機能のカスタマイズ

### 認証設定の変更

認証機能の設定は `src/lib/auth/server.ts` で管理されています。必要に応じて以下の設定を変更できます：

- **認証方法**: 現在はメールアドレスとパスワードのみ対応
- **セッション設定**: セッションの有効期限やセキュリティ設定
- **データベース設定**: 認証データの保存方法

### 認証フォームのカスタマイズ

ログイン・サインアップフォームは以下のファイルで管理されています：

- `src/components/feature/LoginForm.tsx` - ログインフォーム
- `src/components/feature/SignupForm.tsx` - サインアップフォーム

### ルート保護の追加

新しいページを認証必須にする場合は、`src/app/(app)/layout.tsx` を参考にレイアウトファイルを作成してください。

### 管理者権限の実装

管理者権限が必要なページを作成する場合は、`src/app/(admin)/admin-dashboard/layout.tsx` を参考にレイアウトファイルを作成してください。

```typescript
// 管理者権限チェックの例
import { isEmailAddressAllowed } from "@/lib/auth/domainUtils";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authInstance = await auth();
  const session = await authInstance.api.getSession({
    headers: await headers(),
  });

  // セッションがない場合はログインページにリダイレクト
  if (!session) {
    redirect("/login");
  }

  // 許可されたメールアドレスかチェック
  if (!isEmailAddressAllowed(session.user.email)) {
    redirect("/dashboard"); // 一般ユーザーダッシュボードにリダイレクト
  }

  return <>{children}</>;
}
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

サービスの魅力を伝え、ウェイティングリストへの登録を促進するための note 記事を自動生成する機能です。一般ユーザー向けと開発者向けの 2 つの記事生成機能を提供しています。

### 一般向け note 記事生成

プロダクトの魅力を一般ユーザー向けに伝える note 記事を生成します。マーケティング担当者の視点で、ユーザーの感情に訴えかける魅力的な記事を作成します。

#### 使い方

1.  Cursor のチャットパネルを開きます。
2.  `/generate-product-note-post` と入力し、コマンドを実行します。
3.  以下の情報を入力してください:
    - プロダクト名
    - コア機能
    - ターゲット層
    - 主要な価値提案（4 つまで）

コマンドを実行すると、入力された情報に基づいた 1,500〜2,000 字の note 記事が生成されます。記事は `docs/articles/generated-product-note-post.md` ファイルとして保存されます。

#### 記事の特徴

- **7 ステップ構成**: 共感を呼ぶ導入から行動喚起まで、効果的なマーケティングフロー
- **感情への訴求**: 論理的な説明だけでなく、夢や希望といった感情に訴えかける
- **視覚的強調**: 重要なキーワードの太字強調と箇条書きで読みやすさを向上
- **ハッシュタグ**: 関連性の高いハッシュタグを 5〜7 個自動付与

### 技術系 note 記事生成

プロダクトの技術的な魅力と革新性を開発者コミュニティ向けに伝える note 記事を自動生成します。プロダクト内のファイルを自動的に調査し、技術スタックやアーキテクチャを分析して記事を作成します。

#### 使い方

1.  Cursor のチャットパネルを開きます。
2.  `/generate-tech-note-post` と入力し、コマンドを実行します。

コマンドを実行すると、プロダクト内の以下のファイルを自動調査して技術記事が生成されます：

- `package.json` - プロダクト名と技術スタック
- `README.md` - プロダクト概要と機能説明
- `src/` ディレクトリ - ソースコード構造とアーキテクチャ
- 設定ファイル（`next.config.ts`, `tsconfig.json` など）- 技術設定
- ドキュメントファイル - 機能説明と価値提案
- `docs/` ディレクトリ - 開発状況やロードマップ
- `TODO.md` や `CHANGELOG.md` - 開発進捗と予定

#### 記事の特徴

- **1,500〜2,000 字**: 技術者向けの詳細で専門的な内容
- **7 ステップ構成**: 技術的課題への共感から参加のお誘いまで
- **個人開発の視点**: 一人での開発プロセスや技術選択の判断プロセスを織り交ぜ
- **抽象化重視**: 具体的なファイル名や関数名は避け、技術的な概念に焦点
- **開発状況の透明性**: 開発途中の場合は現在の状況と今後の予定を明確に表示

#### 開発途中プロダクトへの対応

技術系 note 記事生成は開発途中のプロダクトにも対応しています：

- 実装済み機能と開発中の機能を区別
- 現在の開発状況を明記
- 将来性と技術的な可能性をアピール
- 早期アクセスやベータテストへの参加を促進
- 個人開発者ならではのリアルな体験や判断プロセスを盛り込み

#### 出力形式

生成された記事は `docs/articles/generated-tech-note-post.md` ファイルとして保存され、そのまま note に投稿できる形式で出力されます。
