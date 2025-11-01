import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "@components/ui/card"
import { getAdjacentPosts } from "@components/lib/blog-data"

interface BlogNavigationProps {
  currentSlug: string
}

export function BlogNavigation({ currentSlug }: BlogNavigationProps) {
  const { previous, next } = getAdjacentPosts(currentSlug)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-12 border-t border-border">
      {previous ? (
        <Link href={`/blog/${previous.slug}`}>
          <Card className="p-6 h-full hover:shadow-lg transition-all group border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <ChevronLeft className="h-4 w-4" />
              <span>Previous Article</span>
            </div>
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
              {previous.title}
            </h3>
          </Card>
        </Link>
      ) : (
        <div />
      )}

      {next && (
        <Link href={`/blog/${next.slug}`}>
          <Card className="p-6 h-full hover:shadow-lg transition-all group border-border">
            <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
              <span>Next Article</span>
              <ChevronRight className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 text-right">
              {next.title}
            </h3>
          </Card>
        </Link>
      )}
    </div>
  )
}
