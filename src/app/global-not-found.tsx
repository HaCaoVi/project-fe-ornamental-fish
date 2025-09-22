import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'
import Link from 'next/link'
import '../styles/globals.css';
export const metadata: Metadata = {
    title: 'Not Found',
    description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-blue-200/30 dark:bg-blue-400/20 rounded-full blur-xl"></div>
                        <div className="floating-element-delayed absolute top-40 right-20 w-32 h-32 bg-indigo-200/30 dark:bg-indigo-400/20 rounded-full blur-xl"></div>
                        <div className="floating-element absolute bottom-20 left-1/4 w-24 h-24 bg-purple-200/30 dark:bg-purple-400/20 rounded-full blur-xl"></div>
                        <div className="floating-element-delayed absolute bottom-40 right-1/3 w-16 h-16 bg-cyan-200/30 dark:bg-cyan-400/20 rounded-full blur-xl"></div>
                    </div>

                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="order-2 lg:order-1 flex justify-center">
                            <div className="relative">
                                {/* Large 404 with gradient text */}
                                <div className="text-[12rem] md:text-[16rem] font-black leading-none select-none">
                                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                                        4
                                    </span>
                                    <span className="relative inline-block">
                                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent floating-element">
                                            0
                                        </span>
                                    </span>
                                    <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
                                        4
                                    </span>
                                </div>

                                {/* Floating search icon */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="floating-element bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full p-4 shadow-lg border border-white/20">
                                        {/* <Search className="w-8 h-8 text-slate-600 dark:text-slate-300" /> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 text-center lg:text-left">
                            <div className="slide-up bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/30">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                                            Page Not Found
                                        </h1>
                                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto lg:mx-0">
                                            The page you are looking for might have been removed, had its name changed, or is temporarily
                                            unavailable.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                        >
                                            <Link href="/" className="flex items-center gap-2">
                                                {/* <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" /> */}
                                                Go Back Home
                                            </Link>
                                        </Button>

                                        <Button
                                            asChild
                                            variant="outline"
                                            size="lg"
                                            className="group border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300 bg-transparent"
                                        >
                                            <Link href="javascript:history.back()" className="flex items-center gap-2">
                                                {/* <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" /> */}
                                                Go Back
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}