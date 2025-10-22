import ThankYouMessage from "@/components/feature/ThankYouMessage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanks",
};

export default function ThankYouPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <ThankYouMessage />
    </main>
  );
}
