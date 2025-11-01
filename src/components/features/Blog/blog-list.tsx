"use client"

import { useState } from "react"
import { Button } from "@components/ui/button"
import { BlogCard } from "./blog-card"
import { getAllBlogPosts } from "@components/lib/blog-data"

export function BlogList() {
  const allPosts = getAllBlogPosts()
  const [displayCount, setDisplayCount] = useState(6)

  const visiblePosts = allPosts.slice(0, displayCount)
  const hasMore = displayCount < allPosts.length

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {visiblePosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button onClick={() => setDisplayCount((prev) => prev + 6)} size="lg" className="rounded-full px-8">
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  )
}
