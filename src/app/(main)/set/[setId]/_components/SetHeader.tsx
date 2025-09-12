// src/app/(main)/set/[setId]/_components/SetHeader.tsx
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Upload, Star } from "lucide-react";

interface SetHeaderProps {
  title: string;
}

export const SetHeader = ({ title }: SetHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex justify-end items-center gap-2 mt-2">
        <Button variant="outline"><Star className="mr-2 h-4 w-4" /> Lưu</Button>
        <Button variant="ghost" size="icon"><Upload className="h-5 w-5" /></Button>
        <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5" /></Button>
      </div>
    </div>
  );
};