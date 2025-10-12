"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Badge } from "@components/ui/badge"
import { ShoppingCart } from "lucide-react"

interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
    inStock: boolean
}

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/detail/${product.id}`}>
            <Card className="group overflow-hidden backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                        <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {!product.inStock && (
                            <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">Hết Hàng</Badge>
                        )}
                        {product.inStock && (
                            <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">Còn Hàng</Badge>
                        )}
                    </div>

                    <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-lg text-foreground line-clamp-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between pt-2">
                            <span className="text-2xl font-bold text-primary">{product.price.toLocaleString("vi-VN")}đ</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                    <Button
                        className="w-full gap-2"
                        disabled={!product.inStock}
                        variant={product.inStock ? "default" : "secondary"}
                        onClick={(e) => {
                            e.preventDefault()
                            // Add to cart logic here
                        }}
                    >
                        <ShoppingCart className="h-4 w-4" />
                        {product.inStock ? "Thêm Vào Giỏ" : "Hết Hàng"}
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}
