"use client"

import { Card, CardContent } from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Fish, Apple, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { CATE_ACCESSORY, CATE_FISH, CATE_FOOD } from "@lib/constants/constant"
import { listAllFollowCategoryAPI } from "@lib/api/category"
import { useEffect, useState } from "react"

export function FeaturedCategories() {
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        ; (async () => {
            try {
                const res = await listAllFollowCategoryAPI()
                if (res.statusCode === 200 && res.data) {
                    const data: any[] = []
                    res.data.map((item) => {
                        data.push({
                            _id: item._id,
                            title: item.name,
                            description: item.description,
                            image: "/images/colorful-betta-fish-goldfish-guppy-tropical-fish-c.jpg",
                            items: item.details,
                        })
                    })
                    setData(data)
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error)
            }
        })()
    }, [])

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />

            <div className="container relative mx-auto px-4">
                <div className="text-center mb-20">
                    <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
                        <span className="text-sm font-medium text-primary">Explore Our Collection</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance tracking-tight">Shop by Category</h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
                        Discover premium aquarium essentials curated for thriving aquatic ecosystems
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {data.map((category, index) => {
                        const Icon =
                            category._id === CATE_FISH
                                ? Fish
                                : category._id === CATE_FOOD
                                    ? Apple
                                    : category._id === CATE_ACCESSORY
                                        ? Sparkles
                                        : null

                        const image =
                            category._id === CATE_FISH
                                ? "/images/colorful-betta-fish-goldfish-guppy-tropical-fish-c.jpg"
                                : category._id === CATE_FOOD
                                    ? "/images/fish-food-pellets-flakes-freeze-dried-food-contain.jpg"
                                    : category._id === CATE_ACCESSORY
                                        ? "/images/aquarium-filter-air-pump-led-lights-decorations-ac.jpg"
                                        : null

                        return (
                            <Card
                                key={category._id}
                                className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ${index === 1 ? "md:mt-8" : ""
                                    }`}
                            >
                                <div className="relative h-80 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage: image ? `url(${image})` : "none",
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                    {Icon && (
                                        <div className="absolute top-6 right-6 p-3 bg-background/90 backdrop-blur-sm rounded-xl shadow-lg">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                    )}

                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-3xl font-bold text-white mb-2 text-balance">{category.title}</h3>
                                        <p className="text-white/80 text-sm text-pretty leading-relaxed">{category.description}</p>
                                    </div>
                                </div>

                                <CardContent className="p-6 bg-card">
                                    <div className="mb-6">
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                                            Popular Items
                                        </h4>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                            {category.items.slice(0, 6).map((item: any) => (
                                                <div key={item._id} className="flex items-center gap-2 text-sm text-foreground/80 group/item">
                                                    <div className="h-1 w-1 rounded-full bg-primary/60 group-hover/item:bg-primary transition-colors" />
                                                    <span className="group-hover/item:text-foreground transition-colors">{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Button asChild className="w-full group/btn rounded-xl h-12 text-base font-medium">
                                        <Link href={`/products/${category._id}`} className="flex items-center justify-center gap-2">
                                            Explore {category.title}
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
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
