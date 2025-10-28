import Link from "next/link";
import UserDropdownMenu from "./UserDropdownMenu";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Waitlist LP
          </Link>
          <UserDropdownMenu />
        </div>
      </div>
    </header>
  );
}
