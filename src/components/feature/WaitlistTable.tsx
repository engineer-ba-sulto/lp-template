"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type WaitlistRecord } from "@/types/waitlistForm";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function WaitlistTable({ data }: { data: WaitlistRecord[] }) {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        ウェイトリストに登録されたデータがありません
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">メールアドレス</TableHead>
            <TableHead className="w-[150px]">登録日時</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.email}</TableCell>
              <TableCell>
                {format(new Date(record.createdAt), "yyyy年MM月dd日 HH:mm", {
                  locale: ja,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
