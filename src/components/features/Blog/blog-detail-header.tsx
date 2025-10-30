import Image from "next/image"
import { Calendar, User } from "lucide-react"
import { Badge } from "@components/ui/badge"
import { cn } from "@components/lib/utils"

interface BlogDetailHeaderProps {
  post: {
    title: string
    description: string
    image: string
    author: string
    date: string
    category: string
  }
}

const categoryColors: Record<string, string> = {
  "care-tips": "bg-primary/10 text-primary",
  food: "bg-secondary/10 text-secondary",
  "aquarium-setup": "bg-accent/10 text-accent",
  species: "bg-chart-2/10 text-chart-2",
  health: "bg-chart-3/10 text-chart-3",
}

export function BlogDetailHeader({ post }: BlogDetailHeaderProps) {
  return (
    <div className="relative">
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill sizes="100" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative -mt-32">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className={cn("mb-4", categoryColors[post.category] || "bg-muted")}>
            {post.category
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{post.title}</h1>

          <p className="text-lg text-muted-foreground mb-6 text-pretty">{post.description}</p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
