"use client"

import { ProductCard } from "./product-card"


interface RecommendedProductsProps {
    currentProductId: number
}

// Mock recommended products data
const recommendedProducts = [
    {
        id: 2,
        name: "Guppy Neon Blue",
        description: "Cá Bảy Màu xanh neon rực rỡ, dễ nuôi",
        price: 25000,
        image: "/test/colorful-guppy-fish.jpg",
        inStock: true,
    },
    {
        id: 3,
        name: "Koi Kohaku",
        description: "Cá Koi Nhật Bản thuần chủng, màu đỏ trắng",
        price: 850000,
        image: "/test/kohaku-koi-fish-red-white.jpg",
        inStock: true,
    },
    {
        id: 4,
        name: "Goldfish Oranda",
        description: "Cá Vàng Oranda với mào đầu đặc trưng",
        price: 180000,
        image: "/test/oranda-goldfish-orange.jpg",
        inStock: true,
    },
    {
        id: 5,
        name: "Neon Tetra",
        description: "Cá Neon nhỏ xinh, bơi thành đàn đẹp mắt",
        price: 15000,
        image: "/test/neon-tetra-fish-blue-red.jpg",
        inStock: true,
    },
]

export function RecommendedProducts({ currentProductId }: RecommendedProductsProps) {
    const filteredProducts = recommendedProducts.filter((p) => p.id !== currentProductId)

    return (
        <section className="py-12 border-t border-border/50">
            <h2 className="text-3xl font-bold text-foreground mb-8">Sản Phẩm Liên Quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
