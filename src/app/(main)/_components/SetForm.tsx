// src/app/(main)/create-set/page.tsx
"use client";

import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSetSchema, CreateSetSchemaType } from "@/lib/zod-schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CardInputRow } from "@/app/(main)/create-set/_components/CardInputRow";
import { ActionRow } from "@/app/(main)/create-set/_components/ActionRow";
import { useEffect } from "react";

interface SetFormProps {
    onSubmit: (data: CreateSetSchemaType) => void;
    initialData?: CreateSetSchemaType;
    isSubmitting?: boolean;
}

export default function SetForm({onSubmit, initialData, isSubmitting}: SetFormProps) {
    const form = useForm<CreateSetSchemaType>({
        resolver: zodResolver(createSetSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            cards: [
                { term: "", definition: "" },
                { term: "", definition: "" },
            ],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "cards",
    });

    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        }
    }, [initialData, form]);

    return (
        <FormProvider {...form}>
            <Form {...form}>
                <form
                    id="create-set-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-8 space-y-8"
                >
                    {/* Title and Description */}
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Tiêu đề" {...field} className="text-lg border-0 border-b-2 rounded-none px-0 shadow-none focus-visible:ring-0" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormControl>
                                        <Textarea placeholder="Thêm mô tả..." {...field} className="border-0 border-b-2 rounded-none px-0 shadow-none focus-visible:ring-0" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Action List */}
                    <ActionRow />

                    {/* Card list */}
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <CardInputRow key={field.id} index={index} onRemove={remove} isDeletable={fields.length > 2} />
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button type="button" variant="outline" onClick={() => append({ term: "", definition: "" })}>
                            + Thêm thẻ
                        </Button>
                    </div>
                </form>
            </Form>
        </FormProvider>
    );
}