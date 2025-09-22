"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, Search } from "lucide-react"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="flex items-center">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-lg">L</span>
                            </div>
                            <span className="ml-2 text-xl font-bold text-foreground">Logo</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="/" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                            Home
                        </a>
                        <a href="/about" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                            Product
                        </a>
                        <a
                            href="/services"
                            className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                        >
                            Blog
                        </a>
                        <a
                            href="/contact"
                            className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                        >
                            Contact
                        </a>
                    </nav>

                    {/* Search Bar & Login Button */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="pl-10 w-64 bg-muted/50 border-border focus:bg-background transition-colors"
                            />
                        </div>
                        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium px-6">
                            Login
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-foreground">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border bg-background">
                            <a
                                href="/"
                                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
                            >
                                Home
                            </a>
                            <a
                                href="/about"
                                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
                            >
                                About
                            </a>
                            <a
                                href="/services"
                                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
                            >
                                Services
                            </a>
                            <a
                                href="/contact"
                                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
                            >
                                Contact
                            </a>

                            {/* Mobile Search */}
                            <div className="px-3 py-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input type="search" placeholder="Search..." className="pl-10 w-full bg-muted/50 border-border" />
                                </div>
                            </div>

                            {/* Mobile Login Button */}
                            <div className="px-3 py-2">
                                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
