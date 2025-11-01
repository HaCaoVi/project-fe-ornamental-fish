"use client"

import { motion } from "framer-motion"
import { Card } from "@components/ui/card"
import { ICart } from "../../../types/model"

interface IProps {
    items: ICart[]
    shippingFee: number
}

export function OrderSummary({ items, shippingFee }: IProps) {
    const subtotal = items.reduce((sum, product) => sum + (product.product.price - product.product.discount) * product.quantity, 0)
    const total = subtotal + shippingFee;

    return (
        <Card className="p-6 shadow-lg sticky top-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

            {/* Products */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items && items.length > 0 && items.map((product, index) => (
                    <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 pb-4 border-b border-border last:border-0"
                    >
                        <img
                            src={product.product.mainImageUrl || "/placeholder.svg"}
                            alt={product.product.name}
                            className="w-20 h-20 rounded-lg object-cover bg-muted"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-sm">{product.product.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">Quantity: {product.quantity}</p>
                            <div className="flex items-center justify-start gap-2 pt-2">
                                {product.product.discount !== 0 && <div className="text-md text-gray-400 line-through">{product.product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>}
                                <div className={`font-semibold text-foreground mt-2 ${product.product.discount === 0 ? "text-black" : "text-red-500"} `}>{(product.product.price - product.product.discount).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>
                            </div>
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
                    <span className="font-medium text-foreground">{subtotal.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping fee</span>
                    <span className="font-medium text-foreground">{shippingFee && shippingFee === 0 ? "--" : shippingFee.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
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
                    <span className="text-2xl font-bold text-primary">{total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                </div>
            </motion.div>
        </Card>
    )
}
