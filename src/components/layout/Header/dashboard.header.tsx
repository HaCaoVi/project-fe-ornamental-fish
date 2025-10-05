"use client"

import { useState } from "react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Menu, Search, Sun, Moon } from "lucide-react"
import UserMenu from "@components/features/UserMenu"
import { useAuthContext } from "@hooks/app.hook"
import { AutoBreadcrumb } from "@components/lib/Breadcrumb"

interface HeaderProps {
    onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
    const [isDark, setIsDark] = useState(false)
    const { user } = useAuthContext();

    const toggleTheme = () => {
        setIsDark(!isDark)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <header className="h-16 border-b border-border bg-card px-4 lg:px-6">
            <div className="flex h-full items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    {/* Mobile menu button */}
                    <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden">
                        <Menu className="h-4 w-4" />
                    </Button>

                    {/* Breadcrumb */}
                    <div className="p-6 space-y-4">
                        <AutoBreadcrumb />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search..." className="w-64 pl-9 bg-background" />
                    </div>

                    {/* Theme toggle */}
                    <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-9 w-9">
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>

                    {/* User menu */}
                    {user && <UserMenu user={user} />}
                </div>
            </div>
        </header>
    )
}
