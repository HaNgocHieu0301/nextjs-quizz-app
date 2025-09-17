import type { ReactNode } from "react";
import { Sidebar } from "@/app/(main)/_components/sidebar";
import { Header } from "@/app/(main)/_components/header";
import { SidebarProvider } from "@/lib/sidebar-context";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-y-auto">
                        <div className="min-h-screen px-6 py-10">{children}</div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
