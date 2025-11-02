"use client"

import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { AlertTriangle, RotateCcw, Info } from "lucide-react"
import { PaymentDetails } from "./payment-result"

interface FailureStateProps {
    payment: PaymentDetails
    onRetryPayment: () => void
    onContactSupport: () => void
}

export default function PaymentFailureState({ payment, onRetryPayment, onContactSupport }: FailureStateProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full bg-error/10 animate-pulse"></div>
                        <div className="absolute inset-2 rounded-full bg-error/20"></div>
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-error to-error/80">
                            <AlertTriangle className="w-10 h-10 text-white" strokeWidth={2} />
                        </div>
                    </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Payment Failed</h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">{payment.error}</p>
            </div>

            {/* <Card className="py-5 border-2" style={{ borderColor: "var(--error)", backgroundColor: "var(--error-light)" }}>
                <CardContent className="pt-6">
                    <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--error)" }} />
                        <div>
                            <h3 className="font-semibold" style={{ color: "var(--error)" }}>
                                {failureInfo.title}
                            </h3>
                            <p className="text-sm mt-1 opacity-90" style={{ color: "var(--error)" }}>
                                {payment.failureReason ? failureInfo.title : "An unexpected error occurred"}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card> */}

            <Card className="py-5 border border-border/50 bg-card shadow-sm">
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="pb-4 border-b border-border/50">
                            <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Order Code</p>
                            <p className="text-lg font-mono font-semibold text-foreground mt-2">{payment.vnp_TxnRef}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Amount</p>
                                <p className="text-xl font-bold text-foreground mt-2">
                                    {(+payment.vnp_Amount / 100).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Status</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="w-2 h-2 rounded-full bg-error"></div>
                                    <span className="text-sm font-semibold text-error">Failed</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Transaction ID</p>
                            <p className="text-sm font-mono text-foreground/70 mt-2">{payment.vnp_TransactionNo}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="py-5 border border-border/50 bg-muted/30">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <h3 className="font-semibold text-foreground">Troubleshooting Tips</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-foreground/80 ml-8">
                        <li className="flex gap-2">
                            <span className="text-error font-bold">→</span>
                            <span>Ensure you have sufficient balance in your account</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-error font-bold">→</span>
                            <span>Verify your card details are correct and not expired</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-error font-bold">→</span>
                            <span>Try using a different payment method or card</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-error font-bold">→</span>
                            <span>Clear your browser cache and try again</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-error font-bold">→</span>
                            <span>Contact your bank if the issue persists</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                    onClick={onRetryPayment}
                    className="flex-1 h-12 text-base font-semibold text-white hover:opacity-90 rounded-lg transition-all shadow-sm hover:shadow-md"
                    style={{ backgroundColor: "var(--error)" }}
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retry Payment
                </Button>
                <Button
                    onClick={onContactSupport}
                    variant="outline"
                    className="flex-1 h-12 text-base font-semibold border-border/50 bg-muted/30 hover:bg-muted/50 rounded-lg transition-all"
                >
                    Contact Support
                </Button>
            </div>

            <div className="text-center pt-6 border-t border-border/50">
                <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mb-4">Still need help?</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
                    <a href="tel:+84287300008" className="text-primary hover:text-primary/80 font-semibold transition">
                        +84 907626222
                    </a>
                    <span className="hidden sm:block text-border">•</span>
                    <a href="mailto:support@vnpay.vn" className="text-primary hover:text-primary/80 font-semibold transition">
                        support@vnpay.vn
                    </a>
                    <span className="hidden sm:block text-border">•</span>
                    <a
                        href="https://support.vnpay.vn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-semibold transition"
                    >
                        FAQ
                    </a>
                </div>
            </div>

            <div className="text-center text-xs text-muted-foreground pt-4 px-4 pb-2">
                <p className="leading-relaxed">
                    Your payment was not processed. No charges have been made to your account. You can safely try again.
                </p>
            </div>
        </div>
    )
}
