"use client"

import { useState } from "react"
import { Button } from "@components/ui/button"
import { Badge } from "@components/ui/badge"
import { Card } from "@components/ui/card"
import { ShoppingCart, Heart, Share2, Ruler, Palette, MapPin, Package } from "lucide-react"
import { ProductImageViewer } from "./product-image-viewer"

interface ProductDetail {
    id: number
    name: string
    productCode: string
    description: string
    price: number
    color: string
    size: string
    origin: string
    image: string
    mainVideoUrl?: string
    inStock: boolean
    detailedDescription: string
}

interface ProductDetailViewProps {
    product: ProductDetail
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
    const [quantity, setQuantity] = useState(1)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Product Image */}
            <ProductImageViewer imageUrl={product.image} videoUrl={product.mainVideoUrl} productName={product.name} />

            {/* Right: Product Info */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
                    <p className="text-muted-foreground">Mã sản phẩm: {product.productCode}</p>
                </div>

                <div className="flex items-center gap-3">
                    {product.inStock ? (
                        <Badge className="bg-accent text-accent-foreground px-4 py-1">Còn Hàng</Badge>
                    ) : (
                        <Badge className="bg-destructive text-destructive-foreground px-4 py-1">Hết Hàng</Badge>
                    )}
                </div>

                <div className="text-4xl font-bold text-primary">{product.price.toLocaleString("vi-VN")}đ</div>

                {/* Product Attributes */}
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Palette className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Màu sắc</p>
                                <p className="font-semibold text-foreground">{product.color}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Ruler className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Kích thước</p>
                                <p className="font-semibold text-foreground">{product.size}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Xuất xứ</p>
                                <p className="font-semibold text-foreground">{product.origin}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Package className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Tình trạng</p>
                                <p className="font-semibold text-foreground">{product.inStock ? "Còn hàng" : "Hết hàng"}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                    <span className="text-foreground font-medium">Số lượng:</span>
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
                    <Button size="lg" className="flex-1 gap-2" disabled={!product.inStock}>
                        <ShoppingCart className="h-5 w-5" />
                        Thêm Vào Giỏ
                    </Button>
                    <Button
                        size="lg"
                        variant="default"
                        className="flex-1 bg-accent hover:bg-accent/90"
                        disabled={!product.inStock}
                    >
                        Mua Ngay
                    </Button>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" size="lg" className="flex-1 gap-2 bg-transparent">
                        <Heart className="h-5 w-5" />
                        Yêu Thích
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1 gap-2 bg-transparent">
                        <Share2 className="h-5 w-5" />
                        Chia Sẻ
                    </Button>
                </div>

                {/* Detailed Description */}
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Mô Tả Chi Tiết</h2>
                    <div
                        className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 prose-h4:text-lg prose-h4:font-semibold prose-h4:mb-2 prose-p:mb-3 prose-ul:mb-3 prose-li:text-foreground prose-strong:text-primary"
                        dangerouslySetInnerHTML={{ __html: product.detailedDescription }}
                    />
                </Card>
            </div>
        </div>
    )
}
