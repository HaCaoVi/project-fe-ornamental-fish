"use client"

import { motion } from "framer-motion"
import { Card } from "@components/ui/card"

interface Product {
    id: string
    name: string
    image: string
    quantity: number
    price: number
}

const mockProducts: Product[] = [
    {
        id: "1",
        name: "Premium Wireless Headphones",
        image: "/wireless-headphones.png",
        quantity: 1,
        price: 199.99,
    },
    {
        id: "2",
        name: "USB-C Cable (2m)",
        image: "/usb-cable.png",
        quantity: 2,
        price: 12.99,
    },
    {
        id: "3",
        name: "Phone Case",
        image: "/colorful-phone-case-display.png",
        quantity: 1,
        price: 24.99,
    },
]

const SHIPPING_FEE = 9.99

export function OrderSummary() {
    const subtotal = mockProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)
    const total = subtotal + SHIPPING_FEE

    return (
        <Card className="p-6 shadow-lg sticky top-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

            {/* Products */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {mockProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 pb-4 border-b border-border last:border-0"
                    >
                        <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-20 h-20 rounded-lg object-cover bg-muted"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-sm">{product.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">Qty: {product.quantity}</p>
                            <p className="font-semibold text-foreground mt-2">${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Divider */}
            <div className="border-t border-border my-6" />

            {/* Pricing Details */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">${SHIPPING_FEE.toFixed(2)}</span>
                </div>
            </div>

            {/* Total */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20"
            >
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                </div>
            </motion.div>
        </Card>
    )
}
