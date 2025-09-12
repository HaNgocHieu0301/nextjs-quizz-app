// src/components/shared/SettingsDialog.tsx
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const SettingsDialogContent = () => {
    return (
        <DialogContent className="sm:max-w-4xl sm:top-[15%] sm:translate-y-0">
            <DialogHeader>
                <DialogTitle>Quản lý quyền truy cập</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-4">
                <div>
                    <label className="text-sm font-medium">Hiển thị với</label>
                    <Select defaultValue="everyone">
                        <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Chọn quyền" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="everyone">Mọi người</SelectItem>
                            <SelectItem value="only-me">Chỉ tôi</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-2">
                        Mọi người dùng có thể sử dụng học phần này.
                    </p>
                </div>
                <div>
                    <label className="text-sm font-medium">Ai có thể sửa</label>
                    <Select defaultValue="only-me">
                        <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Chọn quyền" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="only-me">Chỉ tôi</SelectItem>
                            <SelectItem value="password">Người có mật khẩu</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-2">
                        Chỉ có bạn mới chỉnh sửa được học phần này.
                    </p>
                </div>
            </div>
            <DialogFooter>
                <Button type="button">Lưu</Button>
            </DialogFooter>
        </DialogContent>
    );
};