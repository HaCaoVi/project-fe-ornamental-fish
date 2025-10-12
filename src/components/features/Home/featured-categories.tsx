"use client"

import { Card, CardContent } from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Fish, Apple, Sparkles } from "lucide-react"
import Link from "next/link"
import { CATE_ACCESSORY, CATE_FISH, CATE_FOOD } from "@lib/constants/constant"
import { listAllFollowCategoryAPI } from "@lib/api/category"
import { useEffect, useState } from "react"

export function FeaturedCategories() {
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const res = await listAllFollowCategoryAPI();
                if (res.statusCode === 200 && res.data) {
                    const data: any[] = []
                    res.data.map(item => {
                        data.push({
                            _id: item._id,
                            title: item.name,
                            description: item.description,
                            image: "/images/colorful-betta-fish-goldfish-guppy-tropical-fish-c.jpg",
                            items: item.details
                        })
                    })
                    setData(data)
                }
            } catch (error) {

            }
        })()
    }, [])
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
                    {data.map((category) => {
                        const Icon = category._id === CATE_FISH
                            ? Fish : category._id === CATE_FOOD
                                ? Apple : category._id === CATE_ACCESSORY
                                    ? Sparkles : null

                        const image = category._id === CATE_FISH
                            ? "/images/colorful-betta-fish-goldfish-guppy-tropical-fish-c.jpg"
                            : category._id === CATE_FOOD
                                ? "/images/fish-food-pellets-flakes-freeze-dried-food-contain.jpg"
                                : category._id === CATE_ACCESSORY
                                    ? "/images/aquarium-filter-air-pump-led-lights-decorations-ac.jpg" : null
                        return (
                            <Card
                                key={category._id}
                                className="group flex flex-col justify-between overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                            >
                                {/* Hình ảnh + tiêu đề */}
                                <div className="relative h-64 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            backgroundImage: image ? `url(${image})` : "none",
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            {Icon && (
                                                <div className="p-2 bg-primary rounded-lg">
                                                    <Icon className="h-5 w-5 text-primary-foreground" />
                                                </div>
                                            )}
                                            <h3 className="text-2xl font-bold text-card-foreground">
                                                {category.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Nội dung card */}
                                <CardContent className="p-6 flex flex-col flex-1 justify-between">
                                    <div>
                                        <p className="text-muted-foreground mb-4 text-pretty">
                                            {category.description}
                                        </p>

                                        {/* Danh sách chia cột tự động */}
                                        <ul
                                            className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          gap-x-4 gap-y-2 
          mb-6
        "
                                        >
                                            {category.items.map((item: any) => (
                                                <li
                                                    key={item._id}
                                                    className="text-sm text-foreground/70 flex items-center gap-2"
                                                >
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                    {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Nút Explore */}
                                    <Button asChild className="w-full rounded-full mt-auto">
                                        <Link href={`#${category._id}`}>Explore {category.title}</Link>
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
