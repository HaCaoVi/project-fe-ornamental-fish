"use client"

import { useState } from "react"
import { Card } from "@components/ui/card"
import { OrderCard } from "./order-cart"
import { IOrder } from "../../../types/model"

interface OrderListProps {
    orders: IOrder[]
}

export function OrderList({ orders }: OrderListProps) {
    if (orders.length === 0) {
        return (
            <Card className="flex items-center justify-center py-12">
                <div className="text-center">
                    <p className="text-lg font-medium text-foreground">No orders found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
                </div>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {/* Order Cards */}
            {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
            ))}
        </div>
    )
}
