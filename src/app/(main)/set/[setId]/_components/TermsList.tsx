// src/app/(main)/set/[setId]/_components/TermsList.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Volume2, Pencil } from "lucide-react";

interface Card {
  id: string;
  term: string;
  definition: string;
}

interface TermsListProps {
  cards: Card[];
}

export const TermsList = ({ cards }: TermsListProps) => {
  return (
    <div className="space-y-4">
       <h2 className="text-xl font-bold">Thuật ngữ trong học phần này ({cards.length})</h2>
      {cards.map((card) => (
        <Card key={card.id} className="p-4 flex justify-between items-center">
          <div className="flex gap-16">
            <span className="w-48">{card.term}</span>
            <span>{card.definition}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Star className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Volume2 className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Pencil className="h-5 w-5" /></Button>
          </div>
        </Card>
      ))}
    </div>
  );
};