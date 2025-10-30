# セットアップ手順

## 1. アプリ名の変更

`waitlist-lp-template`を検索して、プロジェクト名を変更してください。

## 2. 依存関係のインストール

### ロックファイルの削除

`bun.lock` と `bun.lockb` を削除してください。

```bash
rm bun.lock bun.lockb
```

### 依存関係のインストール

```bash
bun install
```

## 2. データベース設定

### データベースの作成

`npx wrangler d1 create <DATABASE_NAME>`を実行して、データベースを作成してください。

### データベースのバインディング設定

`wrangler.jsonc`の `"migrations_dir": "src/drizzle/migrations"`
を新しいデータベースの設定に移動してください。

### データベースの接続

`binding`の`waitlist_lp_template_db`を検索して、新たに作成した DB の`binding`に変更してください。

`BETTER_AUTH_SECRET=`の発行方法を追加する
