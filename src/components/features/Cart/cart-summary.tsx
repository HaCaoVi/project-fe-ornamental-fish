"use client"

import { Button } from "@components/ui/button"
import { Card } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Separator } from "@components/ui/separator"

interface Product {
    id: string
    name: string
    price: number
    quantity: number
    discount?: number
}

interface CartSummaryProps {
    items: Product[]
    promoCode: string
    onPromoCodeChange: (code: string) => void
}

export function CartSummary({ items, promoCode, onPromoCodeChange }: CartSummaryProps) {
    const subtotal = items.reduce((sum, item) => {
        const price = item.discount ? item.price * (1 - item.discount / 100) : item.price
        return sum + price * item.quantity
    }, 0)

    // Mock promo code discount (10% for valid codes)
    const promoDiscount = promoCode.toUpperCase() === "SAVE10" ? subtotal * 0.1 : 0
    const tax = (subtotal - promoDiscount) * 0.1
    const total = subtotal - promoDiscount + tax

    return (
        <Card className="p-6 border border-border">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Promo Code */}
            <div className="mb-6">
                <label className="text-sm font-medium text-foreground block mb-2">Promo Code</label>
                <div className="flex gap-2">
                    <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => onPromoCodeChange(e.target.value.toUpperCase())}
                        className="text-sm"
                    />
                    <Button variant="outline" size="sm">
                        Apply
                    </Button>
                </div>
                {promoCode === "SAVE10" && <p className="text-xs text-green-600 mt-2">✓ Code applied</p>}
            </div>

            <Separator className="mb-4" />

            {/* Pricing Breakdown */}
            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                        <span>Promo Discount</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
            </div>

            <Separator className="mb-4" />

            {/* Total */}
            <div className="flex justify-between mb-6">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Button className="w-full mb-3" disabled={items.length === 0} size="lg">
                Proceed to Checkout
            </Button>

            <Button variant="outline" className="w-full bg-transparent" size="sm">
                Continue Shopping
            </Button>

            {/* Info */}
            <p className="text-xs text-muted-foreground text-center mt-4">Free shipping on orders over $100</p>
        </Card>
    )
}
