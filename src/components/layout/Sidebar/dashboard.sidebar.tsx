"use client"

import { cn } from "@components/lib/utils"
import { Button } from "@components/ui/button"
import { LayoutDashboard, BarChart3, Users, Settings, X, Columns2, ChevronDown, ChevronRight, Fish, FishSymbol } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

interface SidebarProps {
    onClose?: () => void
}

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Users", href: "/dashboard/users", icon: Users },
    {
        name: "Categories",
        href: "/dashboard/categories",
        icon: LayoutDashboard,
        children: [
            { name: "Ornamental Fish", href: "/dashboard/categories/list", icon: Fish },
            { name: "Aquarium Fish Food", href: "/dashboard/categories/create", icon: FishSymbol },
        ],
    },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar({ onClose }: SidebarProps) {
    const router = useRouter();
    const pathName = usePathname()
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const navigate = (href: string) => router.push(href);

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

                    const isActive = pathName === item.href || item.children?.some(c => c.href === pathName)
                    const isOpen = openMenu === item.name

                    return (
                        <div key={item.name}>
                            <Button
                                variant={isActive ? "default" : "ghost"}
                                className={cn(
                                    "w-full justify-between gap-3 h-10",
                                    isActive
                                        ? "bg-primary text-white hover:bg-primary/90"
                                        : "text-sidebar-foreground hover:bg-primary hover:text-sidebar-accent-foreground",
                                )}
                                onClick={() => {
                                    if (item.children) {
                                        setOpenMenu(isOpen ? null : item.name)
                                    } else {
                                        navigate(item.href)
                                    }
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="h-4 w-4" />
                                    {item.name}
                                </div>
                                {item.children && (
                                    isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                                )}
                            </Button>

                            {item.children && isOpen && (
                                <div className="ml-6 mt-1 space-y-1">
                                    {item.children.map((child) => {
                                        const ChildIcon = child.icon
                                        return (
                                            <Button
                                                key={child.name}
                                                variant={child.href === pathName ? "default" : "ghost"}
                                                className={cn(
                                                    "w-full justify-start gap-2 h-9 text-sm",
                                                    child.href === pathName
                                                        ? "bg-primary text-white hover:bg-primary/90"
                                                        : "text-sidebar-foreground hover:bg-primary hover:text-sidebar-accent-foreground",
                                                )}
                                                onClick={() => navigate(child.href)}
                                            >
                                                {ChildIcon && <ChildIcon className="h-4 w-4" />}
                                                {child.name}
                                            </Button>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-sidebar-border">
                <div className="text-xs text-muted-foreground">© 2025 ShopMart. All rights reserved.</div>
            </div>
        </div>
    )
}
