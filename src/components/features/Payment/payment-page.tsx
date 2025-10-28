"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Card } from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { OrderSummary } from "./order-summary"
import { PaymentMethodSelector } from "./payment-method-selector"

const paymentSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    phone: z.string().regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
    address: z.string().min(5, "Address is required"),
    note: z.string().optional(),
    paymentMethod: z.enum(["COD", "VN_PAY"], { message: "Please select a payment method" }),
})

type PaymentFormData = z.infer<typeof paymentSchema>

export function PaymentPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            address: "",
            note: "",
            paymentMethod: "COD",
        },
    })

    const selectedPaymentMethod = watch("paymentMethod")

    const onSubmit = async (data: PaymentFormData) => {
        setIsSubmitting(true)
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log("Order placed:", data)
            alert("Order placed successfully!")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-background dark:from-slate-950 dark:to-slate-900 py-4 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-foreground mb-2">Payment</h1>
                    <p className="text-muted-foreground">Complete your order with secure payment</p>
                </motion.div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-1"
                    >
                        <OrderSummary />
                    </motion.div>

                    {/* Right Column - Payment Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <Card className="p-8 shadow-lg">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                                    <Controller
                                        name="fullName"
                                        control={control}
                                        render={({ field }) => <Input {...field} placeholder="John Doe" className="w-full" />}
                                    />
                                    {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                                </div>

                                {/* Phone & Address Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            render={({ field }) => <Input {...field} placeholder="+1 (555) 000-0000" className="w-full" />}
                                        />
                                        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">Address</label>
                                        <Controller
                                            name="address"
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} placeholder="123 Main St, City, State" className="w-full" />
                                            )}
                                        />
                                        {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
                                    </div>
                                </div>

                                {/* Note */}
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Order Note (Optional)</label>
                                    <Controller
                                        name="note"
                                        control={control}
                                        render={({ field }) => (
                                            <Textarea {...field} placeholder="Add any special instructions..." className="w-full min-h-24" />
                                        )}
                                    />
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-4">Payment Method</label>
                                    <Controller
                                        name="paymentMethod"
                                        control={control}
                                        render={({ field }) => <PaymentMethodSelector value={field.value} onChange={field.onChange} />}
                                    />
                                    {errors.paymentMethod && <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button type="submit" disabled={isSubmitting} className="w-full py-6 text-lg font-semibold">
                                        {isSubmitting ? "Processing..." : "Place Order"}
                                    </Button>
                                </motion.div>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
