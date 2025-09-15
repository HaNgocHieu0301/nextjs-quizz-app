// src/app/(main)/set/[setId]/_components/SetFooter.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SetFooterProps {
  authorName: string;
  avatarUrl: string;
  createdAt: string;
}

export const SetFooter = ({ authorName, avatarUrl, createdAt }: SetFooterProps) => {
  return (
    <div className="my-8 flex items-center gap-4">
      <Avatar>
        <AvatarImage src={avatarUrl} alt={authorName} />
        <AvatarFallback>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm text-muted-foreground">Tạo bởi</p>
        <p className="font-bold">{authorName}</p>
        <p className="text-sm text-muted-foreground">Đã tạo {createdAt}</p>
      </div>
    </div>
  );
};