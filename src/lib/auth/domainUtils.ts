/**
 * メールアドレス制限に関するユーティリティ関数
 */

/**
 * メールアドレスが許可されているかどうかを判定する
 * @param email - チェックするメールアドレス
 * @returns メールアドレスが許可されている場合はtrue、そうでなければfalse
 */
export function isEmailAddressAllowed(email: string): boolean {
  // 環境変数が設定されていない場合は制限なし（すべて許可）
  const allowedEmailsEnv = process.env.NEXT_PUBLIC_ALLOWED_EMAIL_ADDRESSES;
  if (!allowedEmailsEnv || allowedEmailsEnv.trim() === "") {
    return true;
  }

  // メールアドレスの形式をチェック
  if (!isValidEmail(email)) {
    return false;
  }

  // 許可されたメールアドレスリストを取得（カンマ区切りで分割し、空白を除去）
  const allowedEmails = allowedEmailsEnv
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0);

  // メールアドレスが許可リストに含まれているかチェック（大文字小文字を区別しない）
  return allowedEmails.includes(email.toLowerCase());
}

/**
 * メールアドレスの形式が有効かどうかをチェックする
 * @param email - メールアドレス
 * @returns 有効なメールアドレスの場合はtrue、そうでなければfalse
 */
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false;
  }

  const atIndex = email.lastIndexOf("@");
  if (atIndex === -1 || atIndex === email.length - 1) {
    return false;
  }

  const domain = email.substring(atIndex + 1).toLowerCase();

  // 基本的なメールアドレス形式チェック（ドットが含まれ、適切な長さ）
  if (domain.includes(".") && domain.length > 3) {
    return true;
  }

  return false;
}
