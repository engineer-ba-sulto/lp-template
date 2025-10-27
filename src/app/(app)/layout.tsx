import Header from "@/components/feature/Header";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AppLayout({
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

  return (
    <>
      <Header />
      {children}
    </>
  );
}
