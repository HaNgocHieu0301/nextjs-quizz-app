// src/components/shared/ImportDialog.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { importSchema, ImportSchemaType } from "@/lib/zod-schemas";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";

interface ImportDialogProps {
    children: React.ReactNode;
}

export const ImportDialog = ({ children }: ImportDialogProps) => {
    const form = useForm<ImportSchemaType>({
        resolver: zodResolver(importSchema),
        defaultValues: {
            sourceText: "",
            contentType: "vocabulary",
            cardCount: 5,
        },
    });

    const onSubmit = (data: ImportSchemaType) => {
        console.log("Form submitted with data:", data);
        // TODO: Process calling API
        alert("Kiểm tra console để xem dữ liệu form!");
    };

    const tabTriggerClass = "relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none";
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl">Nhập thẻ tự động với AI</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Tabs defaultValue="file-upload" className="w-full">
                            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                                <TabsTrigger value="file-upload" className={tabTriggerClass}>Tải tệp tin</TabsTrigger>
                                <TabsTrigger value="text-input" className={tabTriggerClass}>Nhập nội dung</TabsTrigger>
                            </TabsList>
                            <TabsContent value="file-upload" className="mt-4">
                                <div className="flex items-center justify-center w-full">
                                    <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-accent/50 hover:bg-accent/70">
                                        <UploadCloud className="w-10 h-10 mb-4 text-gray-500" />
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Nhấn để chọn</span> hoặc kéo thả tệp
                                        </p>
                                        <p className="text-xs text-gray-500">PDF, Word, Text, Images (PNG, JPG)</p>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="text-input" className="mt-4">
                                <FormField
                                    control={form.control}
                                    name="sourceText"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea placeholder="Nhập hoặc dán nội dung của bạn vào đây..." className="min-h-[180px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>

                        <div>
                            <Label>Tùy chọn</Label>
                            <div className="p-4 mt-2 border rounded-lg space-y-4">
                                <FormField
                                    control={form.control}
                                    name="contentType"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>Loại nội dung</FormLabel>
                                            <FormControl>
                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="vocabulary" /></FormControl><FormLabel className="font-normal">Từ vựng</FormLabel></FormItem>
                                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="knowledge" /></FormControl><FormLabel className="font-normal">Kiến thức</FormLabel></FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="cardCount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Số lượng Flashcards</FormLabel>
                                            <FormControl><Input type="number" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild><Button type="button" variant="ghost">Bỏ qua</Button></DialogClose>
                            <Button type="submit">Tạo thẻ mới</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};