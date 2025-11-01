"use client"

import { useEffect, useState } from "react"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import { OrderList } from "@components/features/Order/order-list"
import { IOrder } from "../../../types/model"
import { IMeta } from "../../../types/backend"
import PaginationCustomize from "@components/lib/Pagination"
import { useRouter, useSearchParams } from "next/navigation"

type OrderStatus = "*" | "PENDING" | "APPROVED"
interface IProps {
    data: IOrder[],
    meta: IMeta
}

const statuses: { value: OrderStatus; label: string }[] = [
    { value: "*", label: "All Orders" },
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
]

export default function OrdersPage({ data, meta }: IProps) {
    const [filters, setFilters] = useState<OrderStatus>("*")
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (filters !== "*") {
            params.set("filters", JSON.stringify({ status: filters }));
        } else {
            params.delete("filters");
        }

        const newUrl = `?${params.toString()}`;
        const currentUrl = `?${searchParams.toString()}`;
        if (newUrl !== currentUrl) {
            router.replace(newUrl);
        }
    }, [filters]);

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
                    {/* Status Filter */}
                    <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                            <Button
                                key={status.value}
                                variant={filters === status.value ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilters(status.value)}
                            >
                                {status.label}
                            </Button>
                        ))}
                    </div>
                </div>
                {/* Order List */}
                <OrderList orders={data} />
                {/* Pagination */}
                <div className="my-5"></div>
                <PaginationCustomize meta={meta} />
            </div>
        </main>
    )
}
