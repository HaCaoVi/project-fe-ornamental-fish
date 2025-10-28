import type { Metadata } from "next";
import "@styles/globals.css";

export const metadata: Metadata = {
    title: "Home Page",
};

const PaymentLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <>
            {children}
        </>
    );
}
export default PaymentLayout;