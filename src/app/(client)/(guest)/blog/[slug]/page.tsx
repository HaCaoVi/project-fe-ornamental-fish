import { BlogContent } from "@components/features/Blog/blog-content"
import { BlogDetailHeader } from "@components/features/Blog/blog-detail-header"
import { BlogNavigation } from "@components/features/Blog/blog-navigation"
import { CommentSection } from "@components/features/Blog/comment-section"
import { RelatedPosts } from "@components/features/Blog/related-posts"
import { getAllBlogSlugs, getBlogPost } from "@components/lib/blog-data"
import { notFound } from "next/navigation"


export async function generateStaticParams() {
    const slugs = getAllBlogSlugs()
    return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = getBlogPost(params.slug)

    if (!post) {
        return {
            title: "Post Not Found",
        }
    }

    return {
        title: `${post.title} | Fish Care Blog`,
        description: post.description,
    }
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
    const post = getBlogPost(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            <BlogDetailHeader post={post} />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <BlogContent content={post.content} />
                <BlogNavigation currentSlug={params.slug} />
                <div className="mt-16">
                    <RelatedPosts currentSlug={params.slug} category={post.category} />
                </div>
                <div className="mt-16">
                    <CommentSection postSlug={params.slug} />
                </div>
            </div>
        </div>
    )
}
