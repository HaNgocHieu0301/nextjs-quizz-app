"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarNav } from "./sidebar-nav";
import { useSidebar } from "@/lib/sidebar-context";

export function Sidebar() {
    const { isCollapsed, toggleSidebar } = useSidebar();

    return (
        <aside
            className="sidebar flex h-screen shrink-0 flex-col border-r border-slate-200 bg-white shadow-sm"
            data-collapsed={isCollapsed}
        >
            <div className="flex items-center px-4 py-6">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            aria-label="Toggle menu"
                            className="h-10 w-10 rounded-xl"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>{isCollapsed ? "Mở rộng" : "Thu gọn"}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <SidebarNav isCollapsed={isCollapsed} />
        </aside>
    );
}