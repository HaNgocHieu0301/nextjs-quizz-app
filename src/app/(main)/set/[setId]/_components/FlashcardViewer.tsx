// src/app/(main)/set/[setId]/_components/FlashcardViewer.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Play, Settings, Maximize, Volume2, Pencil, Star } from "lucide-react";

interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

interface FlashcardViewerProps {
  cards: Flashcard[];
}

export const FlashcardViewer = ({ cards }: FlashcardViewerProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false); // Trạng thái lật thẻ

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false); // Reset lật thẻ khi chuyển
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false); // Reset lật thẻ khi chuyển
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  if (!currentCard) {
    return <p className="text-center text-muted-foreground">Không có thẻ nào để hiển thị.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-8">
      {/* Flashcard Box */}
      <Card 
        className="relative w-full h-[500px] flex items-center justify-center text-3xl font-bold rounded-lg shadow-xl cursor-pointer select-none"
        onClick={handleFlip} // Click vào thẻ để lật
      >
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="ghost" size="icon"><Pencil className="w-5 h-5" /></Button>
          <Button variant="ghost" size="icon"><Volume2 className="w-5 h-5" /></Button>
          <Button variant="ghost" size="icon"><Star className="w-5 h-5" /></Button>
        </div>
        <span>{isFlipped ? currentCard.definition : currentCard.term}</span>
      </Card>

      {/* Control Row */}
      <div className="w-full flex items-center justify-between mt-6">
        {/* Left: Theo dõi tiến độ */}
        <div className="flex items-center gap-2">
          <Label htmlFor="progress-switch" className="text-primary font-semibold">Theo dõi tiến độ</Label>
          <Switch id="progress-switch" />
        </div>

        {/* Center: Nút điều hướng */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrev}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-lg font-semibold">
            {currentIndex + 1} / {cards.length}
          </span>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Right: Các nút chức năng khác */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon"><Play className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><Maximize className="h-5 w-5" /></Button>
        </div>
      </div>
    </div>
  );
};