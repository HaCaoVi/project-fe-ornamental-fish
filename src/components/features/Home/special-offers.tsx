"use client"

import { Card, CardContent } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { ChevronLeft, ChevronRight, Tag } from "lucide-react"
import { useState } from "react"

const offers = [
    {
        id: 1,
        title: "Premium Betta Collection",
        description: "Stunning halfmoon and crowntail bettas",
        discount: "20% OFF",
        image: "/images/beautiful-colorful-betta-fish-halfmoon-crowntail.jpg",
        badge: "New Arrival",
    },
    {
        id: 2,
        title: "Complete Starter Kit",
        description: "Everything you need to start your aquarium journey",
        discount: "30% OFF",
        image: "/images/aquarium-starter-kit-tank-filter-accessories-setup.jpg",
        badge: "Best Value",
    },
    {
        id: 3,
        title: "LED Aquarium Lighting",
        description: "Energy-efficient full-spectrum LED lights",
        discount: "25% OFF",
        image: "/images/modern-led-aquarium-light-illuminated-fish-tank.jpg",
        badge: "Limited Time",
    },
    {
        id: 4,
        title: "Premium Fish Food Bundle",
        description: "Variety pack of pellets, flakes, and treats",
        discount: "15% OFF",
        image: "/images/fish-food-variety-pack-pellets-flakes-containers.jpg",
        badge: "Popular",
    },
]

export function SpecialOffers() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % offers.length)
    }

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length)
    }

    return (
        <section className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                        <Tag className="h-4 w-4" />
                        <span className="text-sm font-medium">Special Offers</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">New Arrivals & Deals</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Don't miss out on our latest products and exclusive discounts
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="overflow-hidden rounded-2xl">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {offers.map((offer) => (
                                <div key={offer.id} className="min-w-full">
                                    <Card className="border-2 overflow-hidden">
                                        <div className="grid md:grid-cols-2 gap-0">
                                            <div
                                                className="h-64 md:h-96 bg-cover bg-center"
                                                style={{ backgroundImage: `url(${offer.image})` }}
                                            />
                                            <CardContent className="flex flex-col justify-center p-8 md:p-12">
                                                <Badge className="w-fit mb-4 bg-accent text-accent-foreground">{offer.badge}</Badge>
                                                <h3 className="text-3xl md:text-4xl font-bold mb-3 text-balance">{offer.title}</h3>
                                                <p className="text-muted-foreground mb-6 text-pretty">{offer.description}</p>
                                                <div className="flex items-center gap-4 mb-6">
                                                    <span className="text-4xl font-bold text-primary">{offer.discount}</span>
                                                </div>
                                                <Button size="lg" className="w-full md:w-auto rounded-full">
                                                    Shop Now
                                                </Button>
                                            </CardContent>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur"
                        onClick={prev}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur"
                        onClick={next}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>

                    <div className="flex justify-center gap-2 mt-6">
                        {offers.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-primary" : "w-2 bg-border"
                                    }`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
