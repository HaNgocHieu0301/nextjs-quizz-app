"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useLayoutEffect } from "react";

interface SidebarContextType {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
function getInitialCollapsed() {
    if (typeof window === "undefined") return false; // SSR safety
    try {
        return localStorage.getItem("sidebar-collapsed") === "true";
    } catch {
        return false;
    }
}
export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useLayoutEffect(() => {
        try {
            const stored = localStorage.getItem("sidebar-collapsed");
            setIsCollapsed(stored === "true");
        } catch { }
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(prev => {
            const newValue = !prev;
            localStorage.setItem("sidebar-collapsed", String(newValue));
            return newValue;
        });
    };

    const contextValue = {
        isCollapsed,
        toggleSidebar,
    };

    return (
        <SidebarContext.Provider value={contextValue}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}