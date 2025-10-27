import { type Waitlist } from "@/types/waitlist";
import { format } from "date-fns";

/**
 * CSVの値をエスケープする
 * カンマ、ダブルクォート、改行文字を含む場合はダブルクォートで囲み、内部のダブルクォートは2つ重ねる
 */
function escapeCsvValue(value: string): string {
  if (
    value.includes(",") ||
    value.includes('"') ||
    value.includes("\n") ||
    value.includes("\r")
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * ウェイトリストデータをCSV形式の文字列に変換する
 * @param data - ウェイトリストデータの配列
 * @returns CSV形式の文字列（BOM付きUTF-8）
 */
export function convertWaitlistToCsv(data: Waitlist[]): string {
  // ヘッダー行
  const headers = ["メールアドレス", "登録日時"];

  // データ行を生成
  const rows = data.map((record) => {
    const email = escapeCsvValue(record.email);
    const createdAt = escapeCsvValue(
      format(new Date(record.createdAt), "yyyy-MM-dd HH:mm:ss")
    );
    return [email, createdAt];
  });

  // CSV文字列を構築
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // BOM付きUTF-8エンコーディングで日本語の文字化けを防止
  const bom = "\uFEFF";
  return bom + csvContent;
}

/**
 * CSVファイルをダウンロードする
 * @param csvContent - CSV形式の文字列
 * @param filename - ファイル名（拡張子なし）
 */
export function downloadCsvFile(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * 現在の日時からファイル名用のタイムスタンプを生成する
 * @returns YYYYMMDD_HHmmss形式の文字列
 */
export function generateTimestamp(): string {
  return format(new Date(), "yyyyMMdd_HHmmss");
}
