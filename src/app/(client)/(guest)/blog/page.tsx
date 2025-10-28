import { BlogHeader } from "@components/features/Blog/blog-header"
import { BlogList } from "@components/features/Blog/blog-list"
import { Suspense } from "react"

export const metadata = {
    title: "Fish Care Blog | Aquatic Tips & Guides",
    description:
        "Expert advice on fish care, aquarium setup, and aquatic life. Learn from our comprehensive guides and tips.",
}

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background">
            <BlogHeader />
            <Suspense fallback={<BlogListSkeleton />}>
                <BlogList />
            </Suspense>
        </div>
    )
}

function BlogListSkeleton() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse">
                        <div className="h-48 bg-muted" />
                        <div className="p-6 space-y-3">
                            <div className="h-4 bg-muted rounded w-3/4" />
                            <div className="h-3 bg-muted rounded w-full" />
                            <div className="h-3 bg-muted rounded w-5/6" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
