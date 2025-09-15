// src/app/(main)/set/[setId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { SetHeader } from "@/app/(main)/set/[setId]/_components/SetHeader";
import { StudyModes } from "@/app/(main)/set/[setId]/_components/StudyModes";
import { TermsList } from "@/app/(main)/set/[setId]/_components/TermsList";
import { SetFooter } from "@/app/(main)/set/[setId]/_components/SetFooter";
import { FlashcardViewer } from "@/app/(main)/set/[setId]/_components/FlashcardViewer";
import { getCollectionById, Collection as CollectionRecord, Card as CardRecord } from "@/services/api";

export default function SetDetailPage() {
  const params = useParams();
  const setId = params.setId as string;

  const [collection, setCollection] = useState<CollectionRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<CardRecord[]>([]);

  useEffect(() => {
    if (!setId) return;

    async function fetchSetDetails() {
      try {
        const response = await getCollectionById(setId);
        const collection = response.data
        setCollection(collection);
        setCards(collection.expand?.['cards(collection)'] || []);
      } catch (error: any) {
        console.error("Lỗi khi tải chi tiết học phần:", error);
        setError("Lỗi khi tải chi tiết học phần");
      } finally {
        setLoading(false);
      }
    }
    fetchSetDetails();
  }, [setId]);

  if (loading) {
    return <div className="text-center p-8">Đang tải học phần..</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <SetHeader title={collection?.title} />
      <StudyModes />
      <FlashcardViewer cards={cards} />
      {/* <SetFooter
        authorName={collection?.author.name}
        avatarUrl={collection?.author.avatarUrl}
        createdAt={collection?.createdAt}
      /> */}
      <TermsList cards={cards} />
    </div>
  );
}