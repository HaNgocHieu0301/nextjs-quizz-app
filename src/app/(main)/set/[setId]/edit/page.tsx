// src/app/(main)/set/[setId]/edit/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CreateSetSchemaType } from "@/lib/zod-schemas";
import { CreateSetHeader } from "@/app/(main)/create-set/_components/CreateSetHeader";
import SetForm from '@/app/(main)/_components/SetForm';
import { getCollectionById, updateCollection, Collection as CollectionRecord, Card as CardRecord } from "@/services/api";

export default function EditSetPage() {
    const router = useRouter();
    const params = useParams();
    const setId = params.setId as string;

    const [initialData, setInitialData] = useState<CreateSetSchemaType | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!setId) return;

        async function fetchSet() {
            try {
                const response = await getCollectionById(setId);
                const collection = response.data;
                const cards = collection.expand?.['cards(collection)'] || [];

                setInitialData({
                    title: collection.title,
                    description: collection.description || "",
                    cards: cards.map(c => ({ id: c.id, term: c.term, definition: c.definition })),
                });
            } catch (error) {
                console.error("Failed to fetch set details for editing:", error);
                alert("Không thể tải dữ liệu học phần.");
            } finally {
                setLoading(false);
            }
        }

        fetchSet();
    }, [setId]);

    const onSubmit = async (data: CreateSetSchemaType) => {
        setIsSubmitting(true);
        try {
            // Giả sử updateCollection sẽ được tạo ở bước 5
            await updateCollection(setId, data);
            alert("Cập nhật học phần thành công!");
            router.push(`/set/${setId}`);
        } catch (error) {
            console.error("Error updating set:", error);
            alert("Đã có lỗi xảy ra khi cập nhật.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center p-8">Đang tải dữ liệu để chỉnh sửa...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-8">
            <CreateSetHeader />
            <SetForm
                onSubmit={onSubmit}
                initialData={initialData}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}