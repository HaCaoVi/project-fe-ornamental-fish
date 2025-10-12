"use client"

import { Button } from "@components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "./product-card"

const products = [
    {
        id: 1,
        name: "Cá Betta Rồng Xanh",
        description: "Cá Betta đực với màu xanh lam rực rỡ và vây dài",
        price: 120000,
        image: "/test/blue-betta-fish-dragon.jpg",
        inStock: true,
    },
    {
        id: 2,
        name: "Cá Bảy Màu Guppy",
        description: "Cá Guppy nhiều màu sắc, dễ nuôi và sinh sản",
        price: 35000,
        image: "/test/colorful-guppy-fish.jpg",
        inStock: true,
    },
    {
        id: 3,
        name: "Cá Koi Kohaku",
        description: "Cá Koi Nhật Bản trắng đỏ cao cấp",
        price: 450000,
        image: "/test/kohaku-koi-fish-red-white.jpg",
        inStock: true,
    },
    {
        id: 4,
        name: "Cá Vàng Oranda",
        description: "Cá vàng Oranda với mào đầu đặc trưng",
        price: 180000,
        image: "/test/oranda-goldfish-orange.jpg",
        inStock: false,
    },
    {
        id: 5,
        name: "Cá Tetra Neon",
        description: "Cá Tetra Neon xanh đỏ, bơi theo đàn",
        price: 25000,
        image: "/test/neon-tetra-fish-blue-red.jpg",
        inStock: true,
    },
    {
        id: 6,
        name: "Cá Betta Halfmoon",
        description: "Cá Betta Halfmoon đỏ với vây hình bán nguyệt",
        price: 150000,
        image: "/test/red-halfmoon-betta-fish.jpg",
        inStock: true,
    },
    {
        id: 7,
        name: "Cá Guppy Tuxedo",
        description: "Cá Guppy Tuxedo đen trắng sang trọng",
        price: 45000,
        image: "/test/tuxedo-guppy-fish-black-white.jpg",
        inStock: true,
    },
    {
        id: 8,
        name: "Cá Koi Showa",
        description: "Cá Koi Showa ba màu đen đỏ trắng",
        price: 520000,
        image: "/test/showa-koi-fish-black-red-white.jpg",
        inStock: true,
    },
    {
        id: 9,
        name: "Cá Vàng Ranchu",
        description: "Cá vàng Ranchu không vây lưng, đầu to",
        price: 200000,
        image: "/test/ranchu-goldfish-orange.jpg",
        inStock: false,
    },
]

export function ProductGrid() {
    return (
        <div className="space-y-8">
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 pt-4">
                <Button variant="outline" size="icon" disabled>
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button variant="default" size="sm" className="min-w-10">
                    1
                </Button>
                <Button variant="outline" size="sm" className="min-w-10 bg-transparent">
                    2
                </Button>
                <Button variant="outline" size="sm" className="min-w-10 bg-transparent">
                    3
                </Button>
                <Button variant="outline" size="sm" className="min-w-10 bg-transparent">
                    4
                </Button>

                <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
