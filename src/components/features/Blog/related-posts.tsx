import { getRelatedPosts } from "@components/lib/blog-data"
import { BlogCard } from "./blog-card"


interface RelatedPostsProps {
  currentSlug: string
  category: string
}

export function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentSlug, category)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
