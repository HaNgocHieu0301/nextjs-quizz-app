// src/app/(main)/set/[setId]/page.tsx
"use client"; // Tạm thời dùng client component để dễ phát triển

import { SetHeader } from "@/app/(main)/set/[setId]/_components/SetHeader";
import { StudyModes } from "@/app/(main)/set/[setId]/_components/StudyModes";
import { TermsList } from "@/app/(main)/set/[setId]/_components/TermsList";
import { SetFooter } from "@/app/(main)/set/[setId]/_components/SetFooter";
import { FlashcardViewer } from "@/app/(main)/set/[setId]/_components/FlashcardViewer";

// Dữ liệu mẫu (giữ nguyên)
const mockSetData = {
  id: "clx123abc",
  title: "TESTSTSET",
  author: {
    name: "hieuha0301",
    avatarUrl: "https://github.com/shadcn.png",
  },
  createdAt: "4 ngày trước",
  cards: [
    { id: "1", term: "123", definition: "234" },
    { id: "2", term: "234", definition: "456" },
    { id: "3", term: "Hello", definition: "Xin chào" },
    { id: "4", term: "World", definition: "Thế giới" },
  ],
};

export default function SetDetailPage({ params }: { params: { setId: string } }) {
  // Trong tương lai, bạn sẽ dùng params.setId để fetch dữ liệu
  const set = mockSetData;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <SetHeader title={set.title} />
      <StudyModes />

      <FlashcardViewer cards={set.cards} />
      <TermsList cards={set.cards} />

      <SetFooter 
        authorName={set.author.name}
        avatarUrl={set.author.avatarUrl}
        createdAt={set.createdAt}
      />
    </div>
  );
}