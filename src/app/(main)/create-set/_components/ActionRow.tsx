// src/components/shared/ActionRow.tsx
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Settings, Shuffle, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SettingsDialogContent } from "@/app/(main)/create-set/_components/SettingsDiaglog";
import { ImportDialog } from "./ImportDiaglog";
import { QuizzTooltip} from "@/app/_components/QuizzTooltip"


export const ActionRow = () => {
    const iconButtonClass = "cursor-pointer hover:bg-accent hover:text-accent-foreground";

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <ImportDialog>
                    <Button variant="outline" className={iconButtonClass}> + Nhập</Button>
                </ImportDialog>
            </div>

            <div className="flex items-center gap-2" suppressHydrationWarning={true}>
                <TooltipProvider>
                    {/* Settings button */}
                    <Dialog>
                        <QuizzTooltip label="Cài đặt">
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className={iconButtonClass}>
                                    <Settings className="w-5 h-5" />
                                </Button>
                            </DialogTrigger>
                        </QuizzTooltip>

                        <SettingsDialogContent />
                    </Dialog>

                    {/* Swap button */}
                    <QuizzTooltip label="Tráo đổi">
                        <Button variant="ghost" size="icon" className={iconButtonClass}>
                            <Shuffle className="w-5 h-5" />
                        </Button>
                    </QuizzTooltip>

                    {/* Delete button */}
                    <QuizzTooltip label="Xóa học phần">
                        <Button variant="ghost" size="icon" className={`${iconButtonClass} hover:!bg-destructive/10 hover:!text-destructive`}>
                            <Trash2 className="w-5 h-5" />
                        </Button>
                    </QuizzTooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};