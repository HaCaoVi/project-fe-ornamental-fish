"use client"

import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group"

interface PaymentMethodSelectorProps {
    value: string
    onChange: (value: string) => void
}

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
    const methods = [
        {
            id: "COD",
            name: "Cash on Delivery",
            description: "Pay when you receive your order",
            icon: "💵",
        },
        {
            id: "VN_PAY",
            name: "VNPAY",
            description: "Secure online payment",
            icon: "💳",
        },
    ]

    return (
        <RadioGroup value={value} onValueChange={onChange}>
            <div className="space-y-3">
                {methods.map((method) => (
                    <motion.div key={method.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <label
                            className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${value === method.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card"
                                }`}
                        >
                            <RadioGroupItem value={method.id} id={method.id} />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{method.icon}</span>
                                    <div>
                                        <p className="font-semibold text-foreground">{method.name}</p>
                                        <p className="text-sm text-muted-foreground">{method.description}</p>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </motion.div>
                ))}
            </div>
        </RadioGroup>
    )
}
