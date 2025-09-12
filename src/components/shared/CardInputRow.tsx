// src/components/shared/CardInputRow.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical, Image as ImageIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

interface CardInputRowProps {
    index: number;
    onRemove: (index: number) => void;
    isDeletable: boolean;
}

export const CardInputRow = ({ index, onRemove, isDeletable }: CardInputRowProps) => {
    const { control } = useFormContext();

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex flex-row justify-between items-start text-gray-500 py-5 border-b">
                <span className="font-bold">{index + 1}</span>
                <div className="flex flex-row items-center">
                    <GripVertical className="cursor-grab" />
                    <Button variant="ghost" size="icon" className="cursor-pointer"
                        type="button"
                        onClick={() => onRemove(index)}
                        disabled={!isDeletable}>
                        <Trash2 className="w-5 h-5 text-gray-500" />
                    </Button>
                </div>
            </div>
            <div className="flex items-start gap-4 py-5">
                <div className="flex-1 grid grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name={`cards.${index}.term`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Thuật ngữ" {...field} className="py-6" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-2">
                        <FormField
                            control={control}
                            name={`cards.${index}.definition`}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input placeholder="Định nghĩa" {...field} className="py-6" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <Button variant="outline" size="icon" className="h-[52px] w-[52px] shrink-0">
                            <ImageIcon className="w-5 h-5" />
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>);
};