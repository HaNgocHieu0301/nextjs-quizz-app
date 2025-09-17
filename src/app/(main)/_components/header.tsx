"use client";

import { Plus, Search, Menu } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function Header() {
    return (
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-3 px-6 py-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <Input
                            type="search"
                            placeholder="Tìm thẻ ghi nhớ"
                            className="h-12 rounded-2xl border-none bg-slate-100 pl-12 text-sm text-slate-600 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-indigo-100"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        asChild
                        size="icon"
                        className="h-10 w-10 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                        aria-label="Tạo mới"
                    >
                        <Link href="/create-set">
                            <Plus className="h-5 w-5" />
                        </Link>
                    </Button>
                    <Button
                        type="button"
                        className="rounded-full bg-yellow-400 px-5 py-2 font-medium text-black hover:bg-yellow-500"
                    >
                        Nâng cấp: dùng thử miễn phí 7 ngày
                    </Button>
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt="User avatar" />
                        <AvatarFallback>H</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
