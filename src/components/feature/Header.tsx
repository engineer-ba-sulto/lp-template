"use client";

import { authClient } from "@/lib/auth/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Header() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Waitlist LP
          </Link>
          <nav className="flex space-x-4">
            {!session ? (
              <>
                <Button variant="link" asChild>
                  <Link href="/login">ログイン</Link>
                </Button>
                <Button variant="link" asChild>
                  <Link href="/signup">サインアップ</Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="link"
                  onClick={async () => {
                    await authClient.signOut();
                    router.push("/");
                  }}
                >
                  ログアウト
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
