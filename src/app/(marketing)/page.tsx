import WaitlistForm from "@/components/feature/WaitlistForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waitlist",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Home</h1>
      <WaitlistForm />
    </main>
  );
}
