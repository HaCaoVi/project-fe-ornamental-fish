"use client"

import Link from "next/link"
import { Button } from "@components/ui/button"
import { ShieldX, Home, LogIn, Lock } from "lucide-react"
import { useEffect, useState } from "react"

const UnauthorizedPage = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/10 rounded-full blur-lg"></div>
                    <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
                </div>
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div
                            className={`text-center lg:text-left transition-all duration-700 ${isVisible ? "slide-up" : "opacity-0"}`}
                        >
                            <div className="relative">
                                {/* Floating illustration elements */}
                                <div className="float-animation">
                                    <div className="relative inline-block">
                                        <div className="w-80 h-80 mx-auto lg:mx-0 relative">
                                            {/* Main shield illustration */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-full blur-3xl"></div>
                                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                                <div className="relative">
                                                    <ShieldX className="w-32 h-32 text-destructive drop-shadow-lg" />
                                                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-destructive rounded-full flex items-center justify-center pulse-glow">
                                                        <Lock className="w-4 h-4 text-destructive-foreground" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute top-0 left-0 w-4 h-4 bg-primary rounded-full opacity-60 animate-ping"></div>
                                <div className="absolute bottom-10 right-10 w-3 h-3 bg-secondary rounded-full opacity-40 animate-pulse"></div>
                            </div>
                        </div>

                        <div className={`transition-all duration-700 delay-300 ${isVisible ? "slide-up" : "opacity-0"}`}>
                            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border/50 hover:shadow-3xl transition-all duration-300">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-medium">
                                            <Lock className="w-4 h-4" />
                                            Access Restricted
                                        </div>

                                        <h1 className="text-4xl lg:text-5xl font-bold text-card-foreground text-balance">Access Denied</h1>

                                        <p className="text-lg text-muted-foreground text-balance leading-relaxed">
                                            You don't have permission to view this page. This area is restricted to authorized users only.
                                        </p>

                                        <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                                            <p className="text-sm text-muted-foreground">
                                                <strong className="text-card-foreground">Need access?</strong> Contact your administrator or
                                                sign in with appropriate credentials.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="group hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                                        >
                                            <Link href="/" className="flex items-center gap-2">
                                                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                Go Back Home
                                            </Link>
                                        </Button>

                                        <Button
                                            variant="outline"
                                            asChild
                                            size="lg"
                                            className="group hover:scale-105 transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                                        >
                                            <Link href="/auth/login" className="flex items-center gap-2">
                                                <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                Sign In
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UnauthorizedPage;