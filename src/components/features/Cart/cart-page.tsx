"use client"

import { useState, useCallback } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@components/ui/button"
import { Checkbox } from "@components/ui/checkbox"
import { CartItem } from "./cart-item"
import { CartSummary } from "./cart-summary"
import { ICart } from "../../../types/model"
import { IMeta } from "../../../types/backend"
import PaginationCustomize from "@components/lib/Pagination"
import { deleteCartAPI, updateQuantityAPI } from "@lib/api/cart"
import { notify } from "@lib/helpers/notify"

interface IProps {
    data: ICart[],
    meta: IMeta
}
export default function CartPage({ data, meta }: IProps) {
    const [promoCode, setPromoCode] = useState("")
    const [items, setItems] = useState(data)

    const handleQuantityChange = useCallback(async (id: string, productId: string, quantity: number) => {
        try {
            const res = await updateQuantityAPI(id, productId, quantity);
            if (res.statusCode === 200) {
                setItems(prev =>
                    prev.map(item =>
                        item._id === id
                            ? {
                                ...item,
                                quantity: Math.max(1, quantity)
                            }
                            : item,
                    ),
                )
            } else {
                notify.warning(res.message)
            }
        } catch (error) {
            console.error("Update quantity failed:", error)
        }
    }, [])

    const handleToggleSelect = useCallback((id: string) => {
        setItems(prev => prev.map(item => (item._id === id ? { ...item, selected: !item.selected } : item)))
    }, [])

    const handleSelectAll = useCallback(() => {
        const allSelected = items.every(item => item.selected || item.product.stock.quantity === 0)
        setItems(prev =>
            prev.map(item => ({
                ...item,
                selected: !allSelected && item.product.stock.quantity > 0,
            })),
        )
    }, [items])

    const handleRemove = useCallback(async (id: string) => {
        try {
            setItems(prev => prev.filter(item => item._id !== id))
            await deleteCartAPI(id)
        } catch (error) {
            console.error("Remove item failed:", error)
        }
    }, [])

    const selectedItems = items.filter(item => item.selected)

    if (items.length === 0) {
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

    // ✅ Main render
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
                                checked={items.length > 0 && items.every(item => item.selected || item.product.stock.quantity === 0)}
                                onCheckedChange={handleSelectAll}
                            />
                            <span className="text-sm font-medium">
                                Select All ({selectedItems.length}/{items.filter(i => i.product.stock.quantity > 0).length})
                            </span>
                        </div>
                        {/* Items List */}
                        <div className="space-y-8">
                            <div className="grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-4 gap-6">
                                {items && items.length > 0 && items.map(item => (
                                    <CartItem
                                        key={item._id}
                                        item={item}
                                        onQuantityChange={handleQuantityChange}
                                        onToggleSelect={handleToggleSelect}
                                        onRemove={handleRemove}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            <PaginationCustomize meta={meta} />
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
