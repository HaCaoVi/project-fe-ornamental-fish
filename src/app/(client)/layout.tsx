import type { Metadata } from "next";
import "@styles/globals.css";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import { cookies } from "next/headers";
import { countCartAPI } from "@lib/api/cart";

export const metadata: Metadata = {
    title: "Home Page",
};

const GuestLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const cookiesStore = await cookies();
    let countCart = 0
    if (cookiesStore.get('access_token')) {
        const res = await countCartAPI();
        countCart = res.statusCode === 200 ? res.data : 0
    }
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header countCart={countCart} />
            <div className="">
                {children}
            </div>
            <Footer />
        </div>
    );
}
export default GuestLayout;