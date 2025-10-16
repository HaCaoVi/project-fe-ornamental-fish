"use client"

import { useState } from "react"
import { Button } from "@components/ui/button"
import { Badge } from "@components/ui/badge"
import { Card } from "@components/ui/card"
import { ShoppingCart, Heart, Share2, Ruler, Palette, MapPin, Package } from "lucide-react"
import { ProductImageViewer } from "./product-image-viewer"
import { IProduct } from "../../../types/model"

interface ProductDetailViewProps {
    product: IProduct
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
    const [quantity, setQuantity] = useState(1)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Product Image */}
            <ProductImageViewer imageUrl={product.mainImageUrl} videoUrl={product.mainVideoUrl} productName={product.name} />

            {/* Right: Product Info */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
                    <p className="text-muted-foreground">Product code: {product.code}</p>
                </div>

                <div className="flex items-center gap-3">
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

                <div className="flex items-center justify-start gap-2">
                    {product.discount !== 0 && <div className="text-4xl text-gray-400 line-through">{product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>}
                    <div className={`text-4xl font-bold ${product.discount === 0 ? "text-primary" : "text-red-500"} `}>{(product.price - product.discount).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>
                </div>
                {/* Product Attributes */}
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Palette className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Color</p>
                                <p className="font-semibold text-foreground">{product.color}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Ruler className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Size</p>
                                <p className="font-semibold text-foreground">{product.size}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Origin</p>
                                <p className="font-semibold text-foreground">{product.origin}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Package className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <p className="font-semibold text-foreground">{product.stock.quantity > 0 ? "In stock" : "Out of stock"}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                    <span className="text-foreground font-medium">Quantity:</span>
                    <div className="flex items-center border border-border rounded-lg">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-4 py-2 hover:bg-muted transition-colors"
                        >
                            -
                        </button>
                        <span className="px-6 py-2 border-x border-border">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-muted transition-colors">
                            +
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Button size="lg" className="flex-1 gap-2" disabled={product.stock.quantity === 0}>
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                    </Button>
                    <Button
                        size="lg"
                        variant="default"
                        className="flex-1 bg-accent hover:bg-accent/90"
                        disabled={product.stock.quantity === 0}
                    >
                        Buy Now
                    </Button>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" size="lg" className="flex-1 gap-2 bg-transparent">
                        <Heart className="h-5 w-5" />
                        Favourite
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1 gap-2 bg-transparent">
                        <Share2 className="h-5 w-5" />
                        Share
                    </Button>
                </div>
                {/* Detailed Description */}
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Detailed Description</h2>
                    <div
                        className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 prose-h4:text-lg prose-h4:font-semibold prose-h4:mb-2 prose-p:mb-3 prose-ul:mb-3 prose-li:text-foreground prose-strong:text-primary"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                </Card>
            </div>
        </div>
    )
}
