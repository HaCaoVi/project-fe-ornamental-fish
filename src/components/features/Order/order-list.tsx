"use client"

import { useState, useEffect } from "react"
import { Card } from "@components/ui/card"
import { Skeleton } from "@components/ui/skeleton"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@components/ui/pagination"
import { OrderCard } from "./order-cart"
import { IOrder } from "../../../types/model"

interface OrderListProps {
    statusFilter: "all" | "PENDING" | "ACCEPTED" | "CANCELLED"
    searchQuery: string
    onSelectOrder: (order: IOrder) => void,
    orders: IOrder[]
}

const ITEMS_PER_PAGE = 5

export function OrderList({ statusFilter, searchQuery, onSelectOrder, orders }: OrderListProps) {

    const [currentPage, setCurrentPage] = useState(1)

    // Filter orders
    const filteredOrders = orders.filter((order) => {
        const matchesStatus = statusFilter === "all" || order.status === statusFilter
        const matchesSearch =
            order.code.toLowerCase().includes(searchQuery.toLowerCase()) || order.phone.includes(searchQuery)
        return matchesStatus && matchesSearch
    })

    // Paginate
    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    if (filteredOrders.length === 0) {
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
            {paginatedOrders.map((order) => (
                <OrderCard key={order._id} order={order} onSelect={() => onSelectOrder(order)} />
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {[...Array(totalPages)].map((_, i) => (
                                <PaginationItem key={i + 1}>
                                    <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}
