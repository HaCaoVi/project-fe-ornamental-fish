import { PaymentPage } from "@components/features/Payment/payment-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment Page",
};
export default function Home() {
    return <PaymentPage />
}
