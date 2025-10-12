import type { Metadata } from "next";
import "@styles/globals.css";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

export const metadata: Metadata = {
    title: "Home Page",
};

const GuestLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    );
}
export default GuestLayout;