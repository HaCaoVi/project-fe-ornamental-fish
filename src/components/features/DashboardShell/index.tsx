"use client"

import { Header } from "@components/layout/Header/dashboard.header"
import { Sidebar } from "@components/layout/Sidebar/dashboard.sidebar"
import { useState } from "react"
import ProtectedRoute from "@config/protected-route.config";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <div className="flex h-screen bg-background">
                {/* Sidebar desktop */}
                <div className="hidden lg:flex lg:w-64 lg:flex-col">
                    <Sidebar />
                </div>

                {/* Sidebar mobile */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div className="absolute left-0 top-0 h-full w-64 bg-sidebar">
                            <Sidebar onClose={() => setSidebarOpen(false)} />
                        </div>
                    </div>
                )}

                {/* Main */}
                <div className="flex flex-1 flex-col overflow-hidden">
                    <Header onMenuClick={() => setSidebarOpen(true)} />
                    <main className="flex-1 overflow-y-auto">{children}</main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
