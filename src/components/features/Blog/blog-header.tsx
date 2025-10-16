import { Search } from "lucide-react"
import { Input } from "@components/ui/input"
import { CategoryFilter } from "./category-filter"

export function BlogHeader() {
  return (
    <div className="relative bg-gradient-to-b from-primary/10 to-background">
      <div className="wave-divider h-24 absolute bottom-0 left-0 right-0" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Aquatic Life & Fish Care Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Expert tips, guides, and insights for keeping your aquatic friends happy and healthy
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-12 h-12 bg-card border-border rounded-xl"
            />
          </div>

          <CategoryFilter />
        </div>
      </div>
    </div>
  )
}
