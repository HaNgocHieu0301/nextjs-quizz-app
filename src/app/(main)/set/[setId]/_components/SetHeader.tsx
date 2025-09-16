// src/app/(main)/set/[setId]/_components/SetHeader.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    Upload,
    Star,
    Pencil,
    Copy,
    Printer,
    Combine,
    FileOutput,
    Code,
    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SetHeaderProps {
  title: string | undefined;
  setId: string;
}

export const SetHeader = ({ title, setId }: SetHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex justify-end items-center gap-2 mt-2">
        <Button variant="outline">
          <Star className="mr-2 h-4 w-4" /> Lưu
        </Button>
        <Button variant="ghost" size="icon">
          <Upload className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="transition-colors focus-visible:ring-2 focus-visible:ring-ring">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/set/${setId}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Sửa</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Tạo một bản sao</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Printer className="mr-2 h-4 w-4" />
                    <span>In</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Combine className="mr-2 h-4 w-4" />
                    <span>Ghép</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <FileOutput className="mr-2 h-4 w-4" />
                    <span>Xuất</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Code className="mr-2 h-4 w-4" />
                    <span>Nhúng</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Xóa</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  );
};