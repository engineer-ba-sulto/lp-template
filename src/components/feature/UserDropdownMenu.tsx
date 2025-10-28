"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth/client";
import { isEmailAddressAllowed } from "@/lib/auth/domainUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export default function UserDropdownMenu() {
  const { data: session, isPending, error } = authClient.useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const isAdmin = session?.user?.email
    ? isEmailAddressAllowed(session.user.email)
    : false;

  // ローディング状態の処理
  if (isPending) {
    return <Spinner />;
  }

  // エラー状態の処理
  if (error) {
    console.error("Session error:", error);
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      {/* ユーザーメニュー */}
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Avatar className="cursor-pointer size-9 ring-2 ring-gray-200 hover:ring-gray-300 transition-all">
              <AvatarImage
                src={session?.user.image || ""}
                alt={session?.user.name || "ユーザー"}
              />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                {session?.user.name?.charAt(0) ||
                  session?.user.email?.charAt(0) ||
                  "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-3 py-2 border-b">
            <p className="text-sm font-medium text-gray-900">
              {session?.user.name || "ユーザー"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {session?.user.email}
            </p>
            {session?.user.name && (
              <p className="text-xs text-gray-500">@{session?.user.name}</p>
            )}
          </div>

          {!session ? (
            <>
              <DropdownMenuItem asChild>
                <Link href="/login">ログイン</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/signup">サインアップ</Link>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              {isAdmin ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">ダッシュボード</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin-dashboard">管理者ダッシュボード</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">ダッシュボード</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="w-full flex-1 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={async () => {
                  await authClient.signOut();
                  router.push("/");
                }}
              >
                ログアウト
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
