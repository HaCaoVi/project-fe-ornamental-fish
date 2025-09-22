import type { Metadata } from "next";
import "../../styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "Home Page",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
