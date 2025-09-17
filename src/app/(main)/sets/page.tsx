// src/app/(main)/sets/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCollections, Collection as CollectionRecord } from "@/services/api";

export default function SetsPage() {
    const [collections, setCollections] = useState<CollectionRecord[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchSets() {
            try {
                const response = await getCollections();
                setCollections(response.data.items);
            } catch (error) {
                console.error("Lỗi khi tải danh sách học phần:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchSets();
    }, []);

    if (loading) {
        return <div className="text-center p-8">Đang tải...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Học phần của bạn</h1>
                <Link href="/create-set" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                    Tạo học phần mới
                </Link>
            </div>
            <div className="flex flex-col gap-6">
                {collections.map((col) => (
                    <Link href={`/set/${col.id}`} key={col.id}>
                        <div className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow">
                            <h2 className="text-xl font-semibold mb-2">{col.title}</h2>
                            <p className="text-gray-600 truncate">{col.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
