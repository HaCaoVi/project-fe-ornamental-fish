import { Card, CardContent } from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Fish, Apple, Sparkles } from "lucide-react"
import Link from "next/link"

const categories = [
    {
        id: "fish",
        title: "Tropical Fish",
        description: "Explore our collection of vibrant and healthy fish species",
        icon: Fish,
        image: "/images/colorful-betta-fish-goldfish-guppy-tropical-fish-c.jpg",
        items: ["Betta Fish", "Goldfish", "Guppies", "Tetras", "Angelfish"],
    },
    {
        id: "food",
        title: "Premium Fish Food",
        description: "Nutritious food to keep your fish healthy and vibrant",
        icon: Apple,
        image: "/images/fish-food-pellets-flakes-freeze-dried-food-contain.jpg",
        items: ["Pellets", "Flakes", "Freeze-Dried", "Live Food", "Treats"],
    },
    {
        id: "accessories",
        title: "Aquarium Accessories",
        description: "Everything you need for the perfect aquarium setup",
        icon: Sparkles,
        image: "/images/aquarium-filter-air-pump-led-lights-decorations-ac.jpg",
        items: ["Filters", "Air Pumps", "LED Lights", "Decorations", "Plants"],
    },
]

export function FeaturedCategories() {
    return (
        <section className="py-20 md:py-48 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Shop by Category</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Find everything you need to create and maintain a thriving aquatic ecosystem
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {categories.map((category) => {
                        const Icon = category.icon
                        return (
                            <Card
                                key={category.id}
                                className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${category.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-primary rounded-lg">
                                                <Icon className="h-5 w-5 text-primary-foreground" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-card-foreground">{category.title}</h3>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <p className="text-muted-foreground mb-4 text-pretty">{category.description}</p>
                                    <ul className="space-y-2 mb-6">
                                        {category.items.map((item) => (
                                            <li key={item} className="text-sm text-foreground/70 flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button asChild className="w-full rounded-full">
                                        <Link href={`#${category.id}`}>Explore {category.title}</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
