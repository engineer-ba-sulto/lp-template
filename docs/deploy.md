# デプロイ手順

デプロイは、Cloudflare Workers を使用して行います。

## 1. デプロイ

```bash
npx wrangler deploy
```

## 2. 環境変数の設定

デプロイの後に、環境変数の設定を行います。

### `BETTER_AUTH_SECRET`

`BETTER_AUTH_SECRET`は、Better Auth に必要な「認証用シークレット」です。
発行方法は[こちら](https://www.better-auth.com/docs/getting-started/generate-secret)を参照してください。

```bash
npx wrangler secret put BETTER_AUTH_SECRET
```

### `BETTER_AUTH_URL`と`CF_PAGES_URL`

`BETTER_AUTH_URL`と`CF_PAGES_URL`は、アプリケーションのベース `URL` を指定します。
同じ `URL` を指定します。

```bash
npx wrangler secret put BETTER_AUTH_URL
npx wrangler secret put CF_PAGES_URL
```

### `NEXT_PUBLIC_ALLOWED_EMAIL_ADDRESSES`

`NEXT_PUBLIC_ALLOWED_EMAIL_ADDRESSES`は、管理者権限を持つメールアドレスを指定します。
カンマ区切りで複数指定することができます。

```bash
npx wrangler secret put NEXT_PUBLIC_ALLOWED_EMAIL_ADDRESSES
```

## 3. カスタムドメインの設定

Cloudflare Dashboard からカスタムドメインを設定します。
Workers & Pages のページからプロジェクトを選択します。
設定、ドメインとルートから追加ボタンで、カスタムドメインを設定します。
カスタムドメインを設定したら、**2. 環境変数の設定**の`BETTER_AUTH_URL`と`CF_PAGES_URL`の値を、カスタムドメインの URL に設定しなおします。
