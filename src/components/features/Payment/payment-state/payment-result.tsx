"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import PaymentSuccessState from "./success-state"
import PaymentFailureState from "./fail-state"

export interface PaymentDetails {
    vnp_TxnRef: string,
    vnp_Amount: number,
    vnp_ResponseCode: string,
    vnp_TransactionStatus: string,
    vnp_PayDate: number,
    vnp_TransactionNo: string,
    error?: string
}

export default function PaymentResultContent({ vnp_TxnRef, vnp_Amount, vnp_ResponseCode, vnp_TransactionStatus, vnp_PayDate, vnp_TransactionNo, error }: PaymentDetails) {
    const router = useRouter()

    const handleRetryPayment = () => {
        router.push("/checkout")
    }

    const handleViewOrder = () => {
        router.push(`/orders`)
    }

    const handleBackToHome = () => {
        router.push("/")
    }

    const handleContactSupport = () => {
        window.open("https://support.vnpay.vn", "_blank")
    }



    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">

                {/* Status-specific content */}
                {vnp_ResponseCode === "00" ? (
                    <PaymentSuccessState
                        payment={{ vnp_TxnRef, vnp_Amount, vnp_ResponseCode, vnp_TransactionStatus, vnp_PayDate, vnp_TransactionNo }}
                        onViewOrder={handleViewOrder}
                        onBackToHome={handleBackToHome}
                        onContactSupport={handleContactSupport}
                    />
                ) :
                    <PaymentFailureState
                        payment={{ vnp_TxnRef, vnp_Amount, vnp_ResponseCode, vnp_TransactionStatus, vnp_PayDate, vnp_TransactionNo, error }}
                        onRetryPayment={handleRetryPayment}
                        onContactSupport={handleContactSupport}
                    />}
            </div>
        </main>
    )
}
