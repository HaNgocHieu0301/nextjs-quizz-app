import type { ComponentType } from "react";
import { Bell, Folder, FolderOpen, Home, NotebookText, Plus, StickyNote } from "lucide-react";

export type NavItem = {
    label: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
    badge?: number;
};

export type NavSection = {
    title?: string;
    items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
    {
        items: [
            { label: "Trang chủ", href: "/", icon: Home },
            { label: "Thư viện của bạn", href: "/sets", icon: Folder },
        ],
    },
    {
        title: "Thư mục của bạn",
        items: [
            { label: "Thư mục của bạn", href: "/folders", icon: FolderOpen }, // Giả sử có route /folders
            { label: "Tạo mới", href: "/create-set", icon: Plus },
        ],
    }
];