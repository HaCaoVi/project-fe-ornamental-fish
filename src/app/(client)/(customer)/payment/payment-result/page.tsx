"use server"

import PaymentResultContent from "@components/features/Payment/payment-state/payment-result"

const PaymentResultPage = async ({ searchParams }) => {
    const { vnp_TxnRef, vnp_Amount, vnp_ResponseCode, vnp_TransactionStatus, vnp_PayDate, vnp_TransactionNo, error } = await searchParams;

    return (
        <PaymentResultContent error={error} vnp_TransactionNo={vnp_TransactionNo} vnp_TxnRef={vnp_TxnRef} vnp_Amount={vnp_Amount} vnp_ResponseCode={vnp_ResponseCode} vnp_TransactionStatus={vnp_TransactionStatus} vnp_PayDate={vnp_PayDate} />
    )
}
export default PaymentResultPage
