"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@components/ui/button"
import { Card } from "@components/ui/card"
import { Checkbox } from "@components/ui/checkbox"
import { Badge } from "@components/ui/badge"
import Image from "next/image"

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

interface CartItemProps {
    item: Product
    onQuantityChange: (id: string, quantity: number) => void
    onToggleSelect: (id: string) => void
    onRemove: (id: string) => void
}

export function CartItem({ item, onQuantityChange, onToggleSelect, onRemove }: CartItemProps) {
    const isOutOfStock = item.stock === 0
    const discountedPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price
    const totalPrice = discountedPrice * item.quantity

    return (
        <Card className="p-4 border border-border hover:border-primary/50 transition-colors">
            <div className="flex gap-4">
                {/* Checkbox */}
                <div className="flex items-start pt-1">
                    <Checkbox
                        checked={item.selected && !isOutOfStock}
                        onCheckedChange={() => onToggleSelect(item.id)}
                        disabled={isOutOfStock}
                    />
                </div>

                {/* Product Image */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">Out of Stock</span>
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Stock: {item.stock > 0 ? `${item.stock} available` : "Out of stock"}
                    </p>

                    {/* Price Section */}
                    <div className="flex items-center gap-2 mt-2">
                        {item.discount ? (
                            <>
                                <span className="text-sm line-through text-muted-foreground">${item.price.toFixed(2)}</span>
                                <span className="font-semibold text-foreground">${discountedPrice.toFixed(2)}</span>
                                <Badge variant="secondary" className="text-xs">
                                    -{item.discount}%
                                </Badge>
                            </>
                        ) : (
                            <span className="font-semibold text-foreground">${item.price.toFixed(2)}</span>
                        )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                            disabled={isOutOfStock || item.quantity <= 1}
                            className="h-8 w-8 p-0"
                        >
                            <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                            disabled={isOutOfStock || item.quantity >= item.stock}
                            className="h-8 w-8 p-0"
                        >
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Right Section: Total Price & Remove */}
                <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-lg font-bold text-foreground">${totalPrice.toFixed(2)}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}
