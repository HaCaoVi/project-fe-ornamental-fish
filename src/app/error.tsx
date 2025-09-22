"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
    const triggerError = () => {
        throw new Error("This is a test error!")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6 px-4">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-foreground">Error Pages Demo</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Test the custom error and not found pages created for your Next.js app.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Button asChild variant="default">
                        <Link href="/nonexistent-page">Test 404 Page</Link>
                    </Button>
                    <Button onClick={triggerError} variant="destructive">
                        Test Error Page
                    </Button>
                </div>
            </div>
        </div>
    )
}
