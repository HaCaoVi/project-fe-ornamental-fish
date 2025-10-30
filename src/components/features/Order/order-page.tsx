"use client"

import { useState } from "react"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import { OrderList } from "@components/features/Order/order-list"
import { OrderDetailsModal } from "@components/features/Order/order-detail"
import { IOrder } from "../../../types/model"
import { IMeta } from "../../../types/backend"

type OrderStatus = "all" | "PENDING" | "ACCEPTED" | "CANCELLED"
interface IProps {
    data: IOrder[],
    meta: IMeta
}
export default function OrdersPage({ data, meta }: IProps) {
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null)
    const [statusFilter, setStatusFilter] = useState<OrderStatus>("all")
    const [searchQuery, setSearchQuery] = useState("")

    const statuses: { value: OrderStatus; label: string }[] = [
        { value: "all", label: "All Orders" },
        { value: "PENDING", label: "Pending" },
        { value: "ACCEPTED", label: "Accepted" },
        { value: "CANCELLED", label: "Cancelled" },
    ]

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Order History</h1>
                    <p className="mt-2 text-muted-foreground">View and manage your orders</p>
                </div>

                {/* Filters */}
                <div className="mb-6 space-y-4">
                    {/* Search */}
                    <div>
                        <Input
                            placeholder="Search by order code or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="max-w-md"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                            <Button
                                key={status.value}
                                variant={statusFilter === status.value ? "default" : "outline"}
                                size="sm"
                                onClick={() => setStatusFilter(status.value)}
                            >
                                {status.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Order List */}
                <OrderList orders={data} statusFilter={statusFilter} searchQuery={searchQuery} onSelectOrder={setSelectedOrder} />

                {/* Order Details Modal */}
                {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
            </div>
        </main>
    )
}
