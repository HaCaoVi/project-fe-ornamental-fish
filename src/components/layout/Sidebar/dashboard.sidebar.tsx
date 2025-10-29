"use client"

import { cn } from "@components/lib/utils"
import { Button } from "@components/ui/button"
import { LayoutDashboard, BarChart3, Users, Settings, X, Crown, ShieldCheck, Columns2, ShoppingBag } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface SidebarProps {
    onClose?: () => void
}

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Products", href: "/dashboard/products", icon: ShoppingBag },
    { name: "Categories", href: "/dashboard/categories", icon: Columns2 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar({ onClose }: SidebarProps) {
    const router = useRouter();
    const pathName = usePathname()
    const navigate = (href: string) => {
        return router.push(href);
    }

    return (
        <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
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
                            variant={item.href === pathName ? "default" : "ghost"}
                            className={cn(
                                "w-full justify-start gap-3 h-10",
                                item.href === pathName
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "text-sidebar-foreground hover:bg-primary hover:text-sidebar-accent-foreground",
                            )}
                            onClick={() => navigate(item.href)}
                        >
                            <Icon className="h-4 w-4" />
                            {item.name}
                        </Button>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-sidebar-border">
                <div className="text-xs text-muted-foreground">© 2025 IFish. All rights reserved.</div>
            </div>
        </div>
    )
}