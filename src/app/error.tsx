"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@components/ui/button"
import { AlertTriangle, Home, RotateCcw } from "lucide-react"
import '@styles/globals.css';

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-200/30 dark:bg-red-800/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-orange-200/30 dark:bg-orange-800/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-200/40 dark:bg-yellow-800/30 rounded-full blur-2xl animate-bounce"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="hidden lg:flex justify-center items-center">
                        <div className="relative">
                            <div className="w-80 h-80 bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <AlertTriangle className="w-48 h-48 text-red-500 dark:text-red-400 animate-bounce" strokeWidth={1} />
                                    <div className="absolute inset-0 w-48 h-48 border-4 border-red-300 dark:border-red-600 rounded-full animate-ping opacity-30"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center lg:text-left space-y-8 animate-slide-up">
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 dark:border-gray-800/20">
                            <div className="space-y-6">
                                <div className="lg:hidden flex justify-center mb-6">
                                    <div className="relative">
                                        <AlertTriangle
                                            className="w-24 h-24 text-red-500 dark:text-red-400 animate-bounce"
                                            strokeWidth={1.5}
                                        />
                                        <div className="absolute inset-0 w-24 h-24 border-2 border-red-300 dark:border-red-600 rounded-full animate-ping opacity-30"></div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent animate-pulse">
                                        500
                                    </h1>
                                    <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
                                        Something went wrong
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                                        An unexpected error has occurred. Our team has been notified and is working to fix this issue.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                                    <Button
                                        onClick={reset}
                                        size="lg"
                                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group"
                                    >
                                        <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                                        Try Again
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="border-2 border-gray-300 dark:border-gray-600 hover:border-red-400 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group bg-transparent"
                                    >
                                        <Link href="/">
                                            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                                            Go Back Home
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
