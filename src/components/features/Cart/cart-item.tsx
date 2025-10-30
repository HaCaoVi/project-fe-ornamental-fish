"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@components/ui/button"
import { Card } from "@components/ui/card"
import { Checkbox } from "@components/ui/checkbox"
import Image from "next/image"
import { ICart } from "../../../types/model"

interface CartItemProps {
    item: ICart
    onQuantityChange: (id: string, productId: string, quantity: number) => void
    onToggleSelect: (id: string) => void
    onRemove: (id: string) => void
}

export function CartItem({ item, onQuantityChange, onToggleSelect, onRemove }: CartItemProps) {
    const isOutOfStock = item.product.stock.quantity === 0
    const discountedPrice = item.product.discount ? item.product.price - item.product.discount : item.product.price
    const totalPrice = discountedPrice * item.quantity
    const stockNotEnough = item.product.stock.quantity + 1 < item.quantity

    return (
        <Card
            className={`relative p-4 border border-border hover:border-primary/50 transition-colors ${isOutOfStock || stockNotEnough ? "opacity-50" : ""
                }`}
        >
            {isOutOfStock && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                    <span className="text-black font-semibold text-sm">Out of stock</span>
                </div>
            )}

            {stockNotEnough && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                    <span className="text-black font-semibold text-sm">Insufficient stock</span>
                </div>
            )}

            <div className="flex gap-4">
                {/* Checkbox */}
                <div className="flex items-start pt-1">
                    <Checkbox
                        className="cursor-pointer"
                        checked={item.selected}
                        onCheckedChange={() => onToggleSelect(item._id)}
                        disabled={isOutOfStock || stockNotEnough}
                    />
                </div>

                {/* Product Image */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image
                        src={item.product.mainImageUrl || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        sizes=""
                        className="object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                        {item.product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Stock:{" "}
                        {item.product.stock.quantity > 0
                            ? `${item.product.stock.quantity} available`
                            : "Out of stock"}
                    </p>

                    {/* Price Section */}
                    <div className="flex items-center gap-2 mt-2">
                        {item.product.discount !== 0 && (
                            <div className="text-sm line-through text-muted-foreground">
                                {item.product.price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </div>
                        )}
                        <div
                            className={`font-semibold ${item.product.discount === 0
                                ? "text-primary"
                                : "text-red-500"
                                }`}
                        >
                            {discountedPrice.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                onQuantityChange(item._id, item.product._id, item.quantity - 1)
                            }
                            disabled={isOutOfStock || item.quantity <= 1}
                            className={`h-8 w-8 p-0 ${stockNotEnough ? "z-50" : ""}`}
                        >
                            <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                onQuantityChange(item._id, item.product._id, item.quantity + 1)
                            }
                            disabled={
                                isOutOfStock ||
                                item.quantity >= item.product.stock.quantity
                            }
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
                        <p className="text-lg font-bold text-foreground">
                            {totalPrice.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(item._id)}
                        className={`text-destructive hover:text-destructive hover:bg-destructive/10 ${stockNotEnough || isOutOfStock ? "z-50" : ""}`}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}