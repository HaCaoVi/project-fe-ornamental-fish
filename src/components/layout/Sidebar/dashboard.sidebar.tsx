"use client"

import { cn } from "@lib/utils"
import { Button } from "@components/ui/button"
import { LayoutDashboard, BarChart3, Users, Settings, Database, Zap, FileText, X } from "lucide-react"

interface SidebarProps {
    onClose?: () => void
}

const navigation = [
    { name: "Dashboard", href: "#", icon: LayoutDashboard, current: true },
    { name: "Analytics", href: "#", icon: BarChart3, current: false },
    { name: "Users", href: "#", icon: Users, current: false },
    { name: "Database", href: "#", icon: Database, current: false },
    { name: "Functions", href: "#", icon: Zap, current: false },
    { name: "Reports", href: "#", icon: FileText, current: false },
    { name: "Settings", href: "#", icon: Settings, current: false },
]

export function Sidebar({ onClose }: SidebarProps) {
    return (
        <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-semibold text-sidebar-foreground">Dashboard</span>
                </div>
                {onClose && (
                    <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                        <Button
                            key={item.name}
                            variant={item.current ? "default" : "ghost"}
                            className={cn(
                                "w-full justify-start gap-3 h-10",
                                item.current
                                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.name}
                        </Button>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-sidebar-border">
                <div className="text-xs text-muted-foreground">v2.1.0 • Built with Next.js</div>
            </div>
        </div>
    )
}
