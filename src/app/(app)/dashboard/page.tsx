import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ダッシュボード",
};

export default async function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
      </div>
    </div>
  );
}
