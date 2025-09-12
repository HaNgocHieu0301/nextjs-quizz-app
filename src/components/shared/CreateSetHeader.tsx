import { Button } from "@/components/ui/button";

export const CreateSetHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Tạo một học phần mới</h1>
            <div className="flex gap-2">
                <Button variant="outline" type="submit" form="create-set-form" className="cursor-pointer">
                    Tạo
                </Button>
                <Button type="submit" form="create-set-form" className="cursor-pointer">
                    Tạo và ôn luyện
                </Button>
            </div>
        </div>
    );
};