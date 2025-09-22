import type { Metadata } from "next";
import "../styles/globals.css";
import { AuthProvider } from "@/context/auth.context";
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
    <AuthProvider>
      <html lang="en">
        <body>
          {children}
          <Toaster position="top-center" />
        </body>
      </html>
    </AuthProvider>
  );
}
