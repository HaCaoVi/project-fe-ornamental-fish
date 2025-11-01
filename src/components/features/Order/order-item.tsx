"use client"

import { Card } from "@components/ui/card"
import Image from "next/image"
import { IOrderItem } from "../../../types/model"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"

interface OrderItemProps {
    orderItems: IOrderItem[]
}

export function OrderItem({ orderItems }: OrderItemProps) {
    return (
        <Card
            className={`relative p-4 border border-border hover:border-primary/50 transition-colors`}
        >
            <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">Order Items</h3>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-semibold">Code</TableHead>
                                <TableHead className="font-semibold">Picture</TableHead>
                                <TableHead className="font-semibold">Product</TableHead>
                                <TableHead className="font-semibold">Price</TableHead>
                                <TableHead className="font-semibold text-center">Quantity</TableHead>
                                <TableHead className="font-semibold">Discount</TableHead>
                                <TableHead className="font-semibold">Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderItems.map((item) => {
                                const discount = item.discount || 0
                                const subtotal = (item.price - discount) * item.quantity
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell className="font-medium">{item.product.code}</TableCell>
                                        <TableCell className="font-medium">
                                            <div className="relative w-24 h-24 overflow-hidden rounded-lg group">
                                                <Image
                                                    src={item.product.mainImageUrl || "/placeholder.svg"}
                                                    alt={item.product.name}
                                                    fill
                                                    sizes="100px"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{item.product.name}</TableCell>
                                        <TableCell className="">{item.price.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}</TableCell>
                                        <TableCell className="text-center">{item.quantity}</TableCell>
                                        <TableCell className="">
                                            {discount > 0 ? `${(discount).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}` : "-"}
                                        </TableCell>
                                        <TableCell className=" font-semibold">{subtotal.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Card>
    )
}