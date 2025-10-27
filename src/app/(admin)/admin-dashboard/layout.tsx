import Header from "@/components/feature/Header";
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

  return (
    <>
      <Header />
      {children}
    </>
  );
}
