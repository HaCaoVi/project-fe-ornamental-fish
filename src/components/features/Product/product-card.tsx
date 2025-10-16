"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Badge } from "@components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { IProduct } from "../../../types/model"

interface ProductCardProps {
    product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/detail/${product.code}`}>
            <Card className="group overflow-hidden backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                        <Image
                            src={product.mainImageUrl || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {product.stock.quantity === 0 ? (
                            <Badge
                                className="
      absolute top-3 right-3 
      bg-red-500/90 text-white 
      rounded-full px-3 py-1.5 text-xs font-semibold 
      shadow-md backdrop-blur-sm
    "
                            >
                                Out of stock
                            </Badge>
                        ) : (
                            <Badge
                                className="
      absolute top-3 right-3 
      bg-green-500/90 text-white 
      rounded-full px-3 py-1.5 text-xs font-semibold 
      shadow-md backdrop-blur-sm
    "
                            >
                                In stock
                            </Badge>
                        )}
                    </div>

                    <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-lg text-foreground line-clamp-1">{product.name}</h3>
                        <div
                            className="prose prose-sm max-w-none text-foreground 
    prose-headings:text-foreground 
    prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 
    prose-h4:text-lg prose-h4:font-semibold prose-h4:mb-2 
    prose-p:mb-3 prose-ul:mb-3 prose-li:text-foreground prose-strong:text-primary
    line-clamp-2 overflow-hidden"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />

                        <div className="flex items-center justify-start gap-2 pt-2">
                            {product.discount !== 0 && <div className="text-2xl text-gray-400 line-through">{product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>}
                            <div className={`text-2xl font-bold ${product.discount === 0 ? "text-primary" : "text-red-500"} `}>{(product.price - product.discount).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                    <Button
                        className="w-full gap-2"
                        disabled={product.stock.quantity === 0}
                        variant={product.stock.quantity > 0 ? "default" : "secondary"}
                        onClick={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <ShoppingCart className="h-4 w-4" />
                        {product.stock.quantity > 0 ? "Thêm Vào Giỏ" : "Out of stock"}
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}
