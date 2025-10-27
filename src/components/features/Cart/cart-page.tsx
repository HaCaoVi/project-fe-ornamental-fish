"use client"

import { useState, useCallback } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@components/ui/button"
import { Checkbox } from "@components/ui/checkbox"
import { CartItem } from "./cart-item"
import { CartSummary } from "./cart-summary"

interface Product {
    id: string
    name: string
    price: number
    image: string
    quantity: number
    stock: number
    discount?: number
    selected: boolean
}

const MOCK_CART_ITEMS: Product[] = [
    {
        id: "1",
        name: "Premium Wireless Headphones",
        price: 199.99,
        image: "https://cdn.tgdd.vn/Products/Images/42/332934/oppo-reno13-blue-thumbnew-600x600.jpg",
        quantity: 1,
        stock: 5,
        discount: 20,
        selected: true,
    },
    {
        id: "2",
        name: "USB-C Cable (2m)",
        price: 19.99,
        image: "https://cdn.tgdd.vn/Products/Images/7077/329160/apple-watch-s10-lte-42mm-vien-titanium-day-thep-thumb-3-1-600x600.jpg",
        quantity: 2,
        stock: 10,
        selected: true,
    },
    {
        id: "3",
        name: "Phone Case - Black",
        price: 29.99,
        image: "https://cdn.tgdd.vn/Products/Images/42/329959/vivo-v40-lite-tim-thumb-600x600.jpg",
        quantity: 1,
        stock: 0,
        selected: false,
    },
]

export default function CartPage() {
    const [items, setItems] = useState<Product[]>(MOCK_CART_ITEMS)
    const [promoCode, setPromoCode] = useState("")

    const handleQuantityChange = useCallback((id: string, quantity: number) => {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item)))
    }, [])

    const handleToggleSelect = useCallback((id: string) => {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
    }, [])

    const handleSelectAll = useCallback(() => {
        const allSelected = items.every((item) => item.selected || item.stock === 0)
        setItems((prev) =>
            prev.map((item) => ({
                ...item,
                selected: !allSelected && item.stock > 0,
            })),
        )
    }, [items])

    const handleRemove = useCallback((id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }, [])

    const selectedItems = items.filter((item) => item.selected)
    const isEmpty = items.length === 0

    if (isEmpty) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-6">Add some items to get started</p>
                    <Button>Continue Shopping</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Select All */}
                        <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                            <Checkbox
                                checked={items.length > 0 && items.every((item) => item.selected || item.stock === 0)}
                                onCheckedChange={handleSelectAll}
                            />
                            <span className="text-sm font-medium">
                                Select All ({selectedItems.length}/{items.filter((i) => i.stock > 0).length})
                            </span>
                        </div>

                        {/* Items List */}
                        <div className="space-y-3">
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={handleQuantityChange}
                                    onToggleSelect={handleToggleSelect}
                                    onRemove={handleRemove}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Sticky Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <CartSummary items={selectedItems} promoCode={promoCode} onPromoCodeChange={setPromoCode} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
