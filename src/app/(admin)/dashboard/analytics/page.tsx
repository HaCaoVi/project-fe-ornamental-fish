"use client"

import { DashboardContent } from "@components/layout/Test/dashboard-content"

export default function DashboardPage() {

    return (
        <div className="flex h-screen bg-background">
            <div className="flex flex-1 flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto">
                    <DashboardContent />
                </main>
            </div>
        </div>
    )
}
