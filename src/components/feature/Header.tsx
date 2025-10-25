import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Waitlist LP
          </Link>
          <nav className="flex space-x-4">
            <Button variant="link" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/signup">サインアップ</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
