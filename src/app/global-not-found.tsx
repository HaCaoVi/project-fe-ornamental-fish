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
                <div className="min-h-screen flex items-center justify-center bg-background">
                    <div className="text-center space-y-6 px-4">
                        <div className="space-y-2">
                            <h1 className="text-6xl font-bold text-foreground">404</h1>
                            <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                The page you are looking for might have been removed or is temporarily unavailable.
                            </p>
                        </div>

                        <div className="pt-4">
                            <Button asChild>
                                <Link href="/">Go Back Home</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}