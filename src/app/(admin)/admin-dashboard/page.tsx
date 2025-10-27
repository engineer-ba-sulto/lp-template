import { getWaitlist } from "@/actions/waitlist.action";
import DownloadWaitlistButton from "@/components/feature/DownloadWaitlistButton";
import WaitlistTable from "@/components/feature/WaitlistTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理者ダッシュボード",
};

export default async function DashboardPage() {
  // ウェイトリストデータを取得
  const waitlistData = await getWaitlist();
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">管理者ダッシュボード</h1>
          <p className="text-muted-foreground">
            ウェイトリストに登録されたデータを管理・確認できます
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">ウェイトリスト登録者一覧</h2>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                総登録数: {waitlistData.length}件
              </div>
              <DownloadWaitlistButton data={waitlistData} />
            </div>
          </div>

          <WaitlistTable data={waitlistData} />
        </div>
      </div>
    </div>
  );
}
