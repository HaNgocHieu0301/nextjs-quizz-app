// src/app/(main)/create-set/page.tsx
"use client";

import { useState } from "react";
import { CreateSetSchemaType } from "@/lib/zod-schemas";

import { CreateSetHeader } from "@/app/(main)/create-set/_components/CreateSetHeader";
import { createCollection } from "@/services/api";
import { useRouter } from 'next/navigation';
import SetForm from "@/app/(main)/_components/SetForm";

export default function CreateSetPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async(data: CreateSetSchemaType) => {
        setIsSubmitting(true);
        try{
            await createCollection(data);
            alert("Tạo bộ thẻ thành công!");
            router.push(`/sets`);
        }catch(error){
            console.error("Error creating set:", error);
            alert("Đã có lỗi xảy ra khi tạo bộ thẻ.");
        }finally{
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8">
            <CreateSetHeader />
            <SetForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </div>
    );
}