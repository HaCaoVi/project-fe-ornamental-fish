"use client"

import { useState } from "react"
import { Card } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@components/ui/alert-dialog"
import { IOrder } from "../../../types/model"
import { format } from "date-fns"

interface OrderCardProps {
    order: IOrder
    onSelect: () => void
}

const statusConfig = {
    PENDING: { label: "Pending", className: "bg-gray-100 text-gray-800" },
    ACCEPTED: { label: "Accepted", className: "bg-green-100 text-green-800" },
    CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800" },
    REJECTED: { label: "Rejected", className: "bg-red-100 text-red-800" },
}

export function OrderCard({ order, onSelect }: OrderCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const [isCanceling, setIsCanceling] = useState(false)

    const handleCancel = async () => {
        setIsCanceling(true)
        try {
            // Call cancel API
            await fetch(`/api/orders/${order._id}/cancel`, { method: "POST" })
            // In a real app, you'd refresh the order list here
        } catch (error) {
            console.error("Failed to cancel order:", error)
        } finally {
            setIsCanceling(false)
            setShowCancelDialog(false)
        }
    }

    const config = statusConfig[order.status]

    return (
        <>
            <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="p-4 sm:p-6">
                    {/* Header Row */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold text-foreground">{order.code}</h3>
                                <Badge className={config.className}>{config.label}</Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{order.phone}</p>
                        </div>

                        <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="text-xl font-bold text-foreground">{order.totalAmount.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>

                    {/* Summary Row */}
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                            <p className="text-xs text-muted-foreground">Address</p>
                            <p className="mt-1 text-sm font-medium text-foreground line-clamp-1">{order.address.location
                                .split("-")
                                .reverse()
                                .join(", ")}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Shipping</p>
                            <p className="mt-1 text-sm font-medium text-foreground">{order.shippingFee.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Payment</p>
                            <p className="mt-1 text-sm font-medium text-foreground">{order.payment.method}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Date</p>
                            <p className="mt-1 text-sm font-medium text-foreground">{format(new Date(order.createdAt), "PPP p")}</p>
                        </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                        <div className="mt-4 border-t border-border pt-4">
                            {order.note && (
                                <div className="mb-4">
                                    <p className="text-xs text-muted-foreground">Note</p>
                                    <p className="mt-1 text-sm text-foreground">{order.note}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                <div>
                                    <p className="text-xs text-muted-foreground">Payment Status</p>
                                    <p className="mt-1 text-sm font-medium text-foreground capitalize">{order.payment.status}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Transaction ID</p>
                                    <p className="mt-1 text-sm font-medium text-foreground">{order.payment.transactionId}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Button variant="outline" size="sm" onClick={onSelect}>
                                    View Details
                                </Button>
                                {order.status === "PENDING" && (
                                    <Button variant="destructive" size="sm" onClick={() => setShowCancelDialog(true)}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Cancel Order
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Cancel Confirmation Dialog */}
            <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to cancel order {order.code}? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex gap-2">
                        <AlertDialogCancel>Keep Order</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleCancel}
                            disabled={isCanceling}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isCanceling ? "Canceling..." : "Cancel Order"}
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
