"use client"

import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { Check, ArrowRight, Zap } from "lucide-react"
import { PaymentDetails } from "./payment-result"
import { parseVnPayDate } from "@lib/helpers/convert.helper"
import { format } from "date-fns"


interface SuccessStateProps {
    payment: PaymentDetails
    onViewOrder: () => void
    onBackToHome: () => void
    onContactSupport: () => void
}

export default function PaymentSuccessState({
    payment,
    onViewOrder,
    onBackToHome,
    onContactSupport,
}: SuccessStateProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="relative w-20 h-20">
                        {/* Outer circle animation */}
                        <div className="absolute inset-0 rounded-full bg-success/10 animate-pulse"></div>
                        {/* Middle circle */}
                        <div
                            className="absolute inset-2 rounded-full bg-success/20 animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                        ></div>
                        {/* Inner success badge */}
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-success to-accent">
                            <Check className="w-10 h-10 text-white" strokeWidth={3} />
                        </div>
                    </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Payment Successful</h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Thank you — your payment was received and confirmed. Your order is now being processed.
                </p>
            </div>

            <Card className="border border-border/50 bg-card shadow-sm hover:shadow-md transition-shadow py-5">
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-start pb-4 border-b border-border/50">
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Order Code</p>
                                <p className="text-lg font-mono font-semibold text-foreground mt-1">{payment.vnp_TxnRef}</p>
                            </div>
                            <button className="text-primary/60 hover:text-primary transition p-2 hover:bg-primary/5 rounded-lg">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z"></path>
                                    <path d="M13 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Amount</p>
                                <p className="text-xl font-bold text-foreground mt-2">
                                    {(+payment.vnp_Amount / 100).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}{" "}
                                    {/* <span className="text-sm text-muted-foreground font-normal">{payment.currency}</span> */}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Method</p>
                                <p className="text-lg font-semibold text-foreground mt-2">VNPay</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Transaction ID</p>
                                <p className="text-sm font-mono text-foreground/70 mt-2">{payment.vnp_TransactionNo}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Date & Time</p>
                                <p className="text-sm text-foreground/70 mt-2">
                                    {payment.vnp_PayDate
                                        ? format(parseVnPayDate(payment.vnp_PayDate + "")!, "PPP p")
                                        : "N/A"}</p>
                            </div>
                        </div>

                        <div className="pt-3 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                            <span className="text-sm font-semibold text-success">Confirmed</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border border-border/50 bg-gradient-to-br from-muted/50 to-muted/30 py-5">
                <CardContent className="">
                    <div className="flex items-start gap-3 mb-4">
                        <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <h3 className="font-semibold text-foreground">What's next?</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-foreground/80 ml-8">
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span>A confirmation email has been sent to your registered email address.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span>Track your order status from your account dashboard.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span>Receive shipping updates via email and SMS.</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                    onClick={onViewOrder}
                    className="flex-1 h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    View Order
                </Button>
                <Button
                    onClick={onBackToHome}
                    variant="outline"
                    className="flex-1 h-12 text-base font-semibold border-border/50 bg-muted/30 hover:bg-muted/50 rounded-lg transition-all"
                >
                    Back to Home
                </Button>
            </div>

            <div className="text-center pt-6 border-t border-border/50">
                <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mb-4">Support</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
                    <a href="tel:+84287300008" className="text-primary hover:text-primary/80 font-semibold transition">
                        +84 (2) 8730 0008
                    </a>
                    <span className="hidden sm:block text-border">•</span>
                    <a href="mailto:support@vnpay.vn" className="text-primary hover:text-primary/80 font-semibold transition">
                        support@vnpay.vn
                    </a>
                    <span className="hidden sm:block text-border">•</span>
                    <button onClick={onContactSupport} className="text-primary hover:text-primary/80 font-semibold transition">
                        Live Chat
                    </button>
                </div>
            </div>

            <div className="text-center text-xs text-muted-foreground pt-4 px-4 pb-2">
                <p className="leading-relaxed">
                    Your transaction is secured with industry-standard encryption. Payment information is never shared with
                    merchants.
                </p>
            </div>
        </div>
    )
}
