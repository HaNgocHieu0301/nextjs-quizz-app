"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { NAV_SECTIONS } from "@/lib/constants";

interface SidebarNavProps {
    isCollapsed: boolean;
}

export function SidebarNav({ isCollapsed }: SidebarNavProps) {
    const pathname = usePathname();

    return (
        <TooltipProvider delayDuration={0}>
            <div className="flex-1 overflow-y-auto px-3 pb-6">
                {NAV_SECTIONS.map((section, index) => (
                    <div key={section.title ?? index} className={cn(index > 0 && "mt-6")}>
                        {index > 0 && <div className="mx-1 mb-4 h-px bg-slate-200" />}
                        {section.title && (
                            <p className={cn("sidebar-content px-3 text-xs font-semibold uppercase tracking-wide text-slate-400")}>
                                {section.title}
                            </p>
                        )}
                        <nav className="mt-2 space-y-1">
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                                return (
                                    <Tooltip key={item.label}>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "group relative flex items-center gap-3 rounded-xl py-2 text-sm font-medium text-slate-600 px-4",
                                                    isActive
                                                        ? "bg-primary/10 text-primary"
                                                        : "hover:bg-primary/5 hover:text-primary"
                                                )}
                                            >
                                                <Icon className="h-5 w-5 shrink-0" />
                                                <span className="sidebar-content truncate">
                                                    {item.label}
                                                </span>
                                            </Link>
                                        </TooltipTrigger>
                                        {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                                    </Tooltip>
                                );
                            })}
                        </nav>
                    </div>
                ))}
            </div>
        </TooltipProvider>
    );
}