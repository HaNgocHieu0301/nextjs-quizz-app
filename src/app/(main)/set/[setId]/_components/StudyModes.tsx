// src/app/(main)/set/[setId]/_components/StudyModes.tsx
import { Button } from "@/components/ui/button";
import { CreditCard , BookOpen, PenSquare, Blocks, Zap, Combine } from "lucide-react";

const studyModes = [
  { name: "Thẻ ghi nhớ", icon: CreditCard  },
  { name: "Học", icon: BookOpen },
  { name: "Kiểm tra", icon: PenSquare },
  { name: "Blocks", icon: Blocks },
  { name: "Blast", icon: Zap },
  { name: "Ghep thẻ", icon: Combine },
];

export const StudyModes = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8">
      {studyModes.map((mode) => (
        <Button key={mode.name} variant="outline" className="justify-start p-4 h-auto text-base">
          <mode.icon className="mr-3 h-6 w-6 text-primary" />
          {mode.name}
        </Button>
      ))}
    </div>
  );
};