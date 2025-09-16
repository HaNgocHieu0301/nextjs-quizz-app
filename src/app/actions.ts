"use server";

import { cookies } from "next/headers";

export async function toggleSidebar() {
    const cookieStore = await cookies();

    const isCollapsed = cookieStore.get("sidebar-collapsed")?.value === "true";
    cookieStore.set("sidebar-collapsed", String(!isCollapsed), { path: "/" });
}