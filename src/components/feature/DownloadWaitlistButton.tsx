"use client";

import { Button } from "@/components/ui/button";
import {
  convertWaitlistToCsv,
  downloadCsvFile,
  generateTimestamp,
} from "@/lib/csvUtils";
import { type WaitlistRecord } from "@/types/waitlistForm";
import { Download } from "lucide-react";

export default function DownloadWaitlistButton({
  data,
}: {
  data: WaitlistRecord[];
}) {
  const handleDownload = () => {
    if (data.length === 0) {
      alert("ダウンロードするデータがありません");
      return;
    }

    try {
      const csvContent = convertWaitlistToCsv(data);
      const timestamp = generateTimestamp();
      const filename = `waitlist_${timestamp}`;

      downloadCsvFile(csvContent, filename);
    } catch (error) {
      console.error("CSVダウンロードエラー:", error);
      alert("CSVファイルのダウンロードに失敗しました");
    }
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      size="sm"
      disabled={data.length === 0}
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      CSVダウンロード
    </Button>
  );
}
