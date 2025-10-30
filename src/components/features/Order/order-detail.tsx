"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { Badge } from "@components/ui/badge"
import { IOrder } from "../../../types/model"

interface OrderDetailsModalProps {
    onClose: () => void
    order: IOrder
}

const statusConfig = {
    PENDING: { label: "Pending", className: "bg-gray-100 text-gray-800" },
    ACCEPTED: { label: "Accepted", className: "bg-green-100 text-green-800" },
    CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800" },
    REJECTED: { label: "Cancelled", className: "bg-red-100 text-red-800" },
}

export function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {

    const config = statusConfig[order?.status || "PENDING"]

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-2xl">{order?.code}</DialogTitle>
                            <p className="mt-1 text-sm text-muted-foreground">Ordered on {order?.createdAt}</p>
                        </div>
                        {order && <Badge className={config.className}>{config.label}</Badge>}
                    </div>
                </DialogHeader>

                {order ? (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            {/* Order Items */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-foreground">Order Items</h3>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Product</TableHead>
                                                <TableHead className="text-right">Price</TableHead>
                                                <TableHead className="text-right">Qty</TableHead>
                                                <TableHead className="text-right">Discount</TableHead>
                                                <TableHead className="text-right">Subtotal</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {order.orderItems.map((item) => {
                                                const discount = item.discount || 0
                                                const subtotal = item.price * item.quantity * (1 - discount)
                                                return (
                                                    <TableRow key={item._id}>
                                                        <TableCell className="font-medium">{item.product.name}</TableCell>
                                                        <TableCell className="text-right">${item.price.toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        })}</TableCell>
                                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                                        <TableCell className="text-right">
                                                            {discount > 0 ? `${(discount * 100).toFixed(0)}%` : "-"}
                                                        </TableCell>
                                                        <TableCell className="text-right font-semibold">${subtotal.toFixed(2)}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="space-y-2 border-t border-border pt-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">${(order.totalAmount - order.shippingFee).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="font-medium">${order.shippingFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between border-t border-border pt-2 text-lg font-bold">
                                    <span>Total</span>
                                    <span>${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="space-y-3 border-t border-border pt-4">
                                <h3 className="font-semibold text-foreground">Payment Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Payment Method</p>
                                        <p className="mt-1 font-medium text-foreground">{order.payment.method}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Payment Status</p>
                                        <p className="mt-1 font-medium capitalize text-foreground">{order.payment.status}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-muted-foreground">Transaction ID</p>
                                        <p className="mt-1 font-mono text-sm font-medium text-foreground">{order.payment.transactionId}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Information */}
                            <div className="space-y-3 border-t border-border pt-4">
                                <h3 className="font-semibold text-foreground">Shipping Address</h3>
                                <div>
                                    <p className="text-sm text-muted-foreground">Address</p>
                                    <p className="mt-1 font-medium text-foreground">  {order.address.location
                                        .split("-")
                                        .reverse()
                                        .join(", ")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="mt-1 font-medium text-foreground">{order.phone}</p>
                                </div>
                                {order.note && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Note</p>
                                        <p className="mt-1 font-medium text-foreground">{order.note}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ) : null}
            </DialogContent>
        </Dialog>
    )
}
