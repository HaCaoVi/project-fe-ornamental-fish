import Link from "next/link"
import Image from "next/image"
import { Calendar, User } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { cn } from "@components/lib/utils"

interface BlogCardProps {
  post: {
    slug: string
    title: string
    description: string
    image: string
    author: string
    date: string
    category: string
  }
}

const categoryColors: Record<string, string> = {
  "care-tips": "bg-primary/10 text-primary hover:bg-primary/20",
  food: "bg-secondary/10 text-secondary hover:bg-secondary/20",
  "aquarium-setup": "bg-accent/10 text-accent hover:bg-accent/20",
  species: "bg-chart-2/10 text-chart-2 hover:bg-chart-2/20",
  health: "bg-chart-3/10 text-chart-3 hover:bg-chart-3/20",
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group border-border">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            sizes="200"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <CardHeader className="pb-3">
          <Badge variant="secondary" className={cn("w-fit mb-2", categoryColors[post.category] || "bg-muted")}>
            {post.category
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Badge>
          <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 text-balance">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{post.description}</p>
        </CardContent>

        <CardFooter className="flex items-center gap-4 text-xs text-muted-foreground pt-0">
          <div className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{post.date}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
