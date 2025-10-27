"use client"

import { Button } from "@components/ui/button"
import { Card } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Separator } from "@components/ui/separator"
import { ICart } from "../../../types/model"


interface CartSummaryProps {
    items: ICart[]
    promoCode: string
    onPromoCodeChange: (code: string) => void
}

export function CartSummary({ items, promoCode, onPromoCodeChange }: CartSummaryProps) {
    const subtotal = items.reduce((sum, item) => {
        const price = item.product.discount ? item.product.price * (1 - item.product.discount / 100) : item.product.price
        return sum + price * item.quantity
    }, 0)

    // Mock promo code discount (10% for valid codes)
    const promoDiscount = promoCode.toUpperCase() === "SAVE10" ? subtotal * 0.1 : 0
    const total = subtotal - promoDiscount

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
                    <span className="font-medium">{subtotal.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                </div>

                {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                        <span>Promo Discount</span>
                        <span>-{promoDiscount.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery fee</span>
                    <span className="font-medium">--</span>
                </div>
            </div>

            <Separator className="mb-4" />

            {/* Total */}
            <div className="flex justify-between mb-6">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">{total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
            </div>

            {/* Checkout Button */}
            <Button className="w-full mb-3" disabled={items.length === 0} size="lg">
                Proceed to Checkout
            </Button>

            <Button variant="outline" className="w-full bg-transparent" size="sm">
                Continue Shopping
            </Button>
        </Card>
    )
}
